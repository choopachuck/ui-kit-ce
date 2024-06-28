import * as React from 'react'
import { MaskedInputCore } from '../../core/MaskedInputCore'
import { InputChangeReason } from '@v-uik/input'

export type MaskedInputActionType =
  | 'backspace'
  | 'delete'
  | 'clear'
  | 'input'
  | 'unknown'

export type MaskedInputActionInfo = {
  isBackspace: boolean
  isDelete: boolean
  isInput: boolean
  isClear: boolean
}

export type MaskedInputActionOptions = {
  maskAsPlaceholder?: boolean
  reason?: InputChangeReason
  valueWithoutMask?: boolean
}

/**
 * Класс для изменения значения внутри маски `MaskedInputCore`
 *
 * Данный класс дублирует на себя все события изменения значения обычного инпута и применяет их к самой маске. Тип
 * события и соответствующие шорткаты, выполняемые на клавиатуре, определяются с помощью значения `event.eventType`.
 *
 * @see https://www.w3schools.com/jsref/event_inputevent_inputtype.asp
 */
export class MaskedInputAction {
  private readonly maskedInputCore: MaskedInputCore
  private readonly event: React.ChangeEvent<HTMLInputElement>
  private readonly actionType: MaskedInputActionType
  private readonly actionInfo: MaskedInputActionInfo

  private readonly options: MaskedInputActionOptions = {
    maskAsPlaceholder: false,
    reason: 'input',
  }

  /**
   * Конструктор класса `MaskedInputAction`
   *
   * @param {MaskedInputCore} maskedInputCore Экземпляр объекта `MaskedInputCore` для манипуляции маской и ее значением
   * @param {React.ChangeEvent<HTMLInputElement>} event Инициированное событие
   * @param {MaskedInputActionOptions} options Объект с настройками изменения значения
   */
  constructor(
    maskedInputCore: MaskedInputCore,
    event: React.ChangeEvent<HTMLInputElement>,
    options: MaskedInputActionOptions
  ) {
    this.maskedInputCore = maskedInputCore
    this.event = event
    this.options = options

    this.actionInfo = MaskedInputAction._detectActionByEvent(
      event.nativeEvent as InputEvent,
      options
    )

    if (this.actionInfo.isBackspace) {
      this.actionType = 'backspace'
    } else if (this.actionInfo.isDelete) {
      this.actionType = 'delete'
    } else if (this.actionInfo.isInput) {
      this.actionType = 'input'
    } else if (this.actionInfo.isClear) {
      this.actionType = 'clear'
    } else {
      this.actionType = 'unknown'
    }
  }

  /**
   * Выполнить изменение для маски
   *
   * @param {string} value Измененное значение поля
   *
   * @returns {boolean} Успешное или неуспешное выполнение действия
   */
  public performChange(value: string): boolean {
    const { maskedInputCore, event } = this
    let result = false
    const targetIsInput = event.target instanceof HTMLInputElement

    if (value === maskedInputCore.getValue()) {
      return result
    }

    if (this.getActionType() === 'clear' || value === '') {
      result = this._performClear()
    }

    if (targetIsInput) {
      switch (this.getActionType()) {
        case 'delete':
        case 'backspace':
          result = this._performDelete()
          break
        case 'input':
          result = this._performInput((event.nativeEvent as InputEvent).data)
          break
        default:
          result = this._performUnknown(value)
          break
      }
    }

    return result
  }

  public getActionInfo(): MaskedInputActionInfo {
    return this.actionInfo
  }

  public getActionType(): MaskedInputActionType {
    return this.actionType
  }

  /**
   * Удалить символы у маски в соответствии с положением каретки
   *
   * @returns {boolean} Успешное или неуспешное удаление символов в значении маски
   */
  private _performDelete(): boolean {
    const { maskedInputCore, event } = this
    const { isBackspace, isDelete } = this.getActionInfo()

    let result = true

    if (!isBackspace && !isDelete) {
      return result
    }

    // При операции удаления через `Backspace` учитываем то, что удаление символа в инпуте уже произошло
    // (т.к мы убрали event.preventDefault и символ уже удалился и каретка сместилась на один символ влево)
    // и нам необходимо сделать соответствующее смещение каретки в самой маске вправо, чтобы мы не
    // "перепрыгнули через символ" и не удалили из маски элемент слева от удаляемого
    const offset = isBackspace ? -1 : 0

    maskedInputCore.selection = {
      start: Number(event.target.selectionStart) - offset,
      end: isBackspace
        ? Number(event.target.selectionStart) +
          maskedInputCore.getValue().length -
          event.target.value.length
        : Number(event.target.selectionEnd),
    }

    // Если указан диапазон значений, то удаляем все символы, включая первый
    if (maskedInputCore.selection.start - maskedInputCore.selection.end !== 0) {
      maskedInputCore.selection = {
        start: maskedInputCore.selection.start + offset,
        end: maskedInputCore.selection.end,
      }
    }

    const isDeletedItemEditable =
      maskedInputCore.value[maskedInputCore.selection.start + offset] &&
      maskedInputCore.pattern.isEditableIndex(
        maskedInputCore.selection.start + offset
      )

    const deleteMethod = isBackspace
      ? maskedInputCore.backspace
      : maskedInputCore.delete

    // UIK-482 - даем возможность удалять значения маски вплоть до спецсимволов
    if (maskedInputCore.getRawValue().length > 1) {
      do {
        result = deleteMethod.apply(maskedInputCore)
      } while (
        maskedInputCore.value[maskedInputCore.selection.start + offset] &&
        !maskedInputCore.pattern.isEditableIndex(
          maskedInputCore.selection.start + offset
        )
      )

      // Если первый удаленный символ был спецсимволом,
      // то удаляем еще один раз, чтобы очистить значение,
      // следующее перед этим спецсимволом
      if (!isDeletedItemEditable) {
        result = deleteMethod.apply(maskedInputCore, [true])
      }
    } else {
      result = deleteMethod.apply(maskedInputCore)
    }

    this._setInputSelectionRangeFromMask()

    if (!result && this.isMaskValueEmpty()) {
      return true
    }

    return result
  }

  /**
   * Получить результирующее значение для поля в зависимости от значения маски
   *
   * @returns {string} Результирующее значение для поля
   */
  public getResultValue(): string {
    const { maskedInputCore } = this
    const { start, end } = maskedInputCore.selection

    if (this.isMaskValueEmpty()) {
      switch (this.getActionType()) {
        case 'input':
          return maskedInputCore.emptyValue
        case 'backspace':
          // UIK-482 - даем возможность удалять значения маски вплоть до спецсимволов
          return end + start === 0 ? '' : maskedInputCore.getValue()
        case 'clear':
        case 'delete':
          return ''
        default:
          break
      }
    }

    return maskedInputCore.getRawValue() ? maskedInputCore.getValue() : ''
  }

  /**
   * Является ли значение поля в маске пустым
   *
   * @returns {boolean} Флаг пустого значения поля
   */
  public isMaskValueEmpty(): boolean {
    const { maskedInputCore, event } = this

    return (
      maskedInputCore.getValue() === maskedInputCore.emptyValue ||
      event.target.value === maskedInputCore.emptyValue
    )
  }

  /**
   * Восстановить отмененное действие у маски
   *
   * @param {string} value Строка, у которой необходимо восстановить отмененное действие
   *
   * @returns {boolean} Успешное или неуспешное восстановление отмененного действия в значении маски
   */
  private _performRedo(): boolean {
    return false
  }

  /**
   * Отменить предыдущее действие у маски
   *
   * @param {string} value Строка, у которой необходимо отменить предыдущее действие
   *
   * @returns {boolean} Успешное или неуспешное отмена предыдущего действия в значении маски
   */
  private _performUndo(): boolean {
    return false
  }

  /**
   * Добавить новый символ в маску
   *
   * @param {string | null} char Введенный символ в поле
   *
   * @returns {boolean} Успешное или неуспешное добавление нового символа в значение маски
   */
  private _performInput(char: string | null): boolean {
    const { maskedInputCore, event } = this
    let result = false
    const selectionOffset = -1

    // Выравниваем каретку у maskedInputCore и input
    maskedInputCore.selection = {
      start: (event.target.selectionStart || 0) + selectionOffset,
      end:
        Number(event.target.selectionStart) +
        maskedInputCore.getValue().length -
        event.target.value.length,
    }

    if (!char) {
      return result
    }
    result = maskedInputCore.input(char)

    this._setInputSelectionRangeFromMask()

    return result
  }

  /**
   * Очистить значение маски
   *
   * @returns {boolean} Успешная или неуспешная очистка значения маски
   */
  private _performClear(): boolean {
    const { maskedInputCore } = this

    maskedInputCore.setValue('')
    maskedInputCore.setSelection({ start: 0, end: 0 })

    return true
  }

  /**
   * Выполнить ввод значения при неопределенном типе действия
   *
   * @param {string} value Измененное значение поля
   */
  private _performUnknown(value: string): boolean {
    const { maskedInputCore, event } = this

    maskedInputCore.setValue(value)

    maskedInputCore.selection = {
      start: Number(event.target.selectionStart),
      end: Number(event.target.selectionEnd),
    }

    this._setInputSelectionRangeFromMask()

    return true
  }

  /**
   * Определить тип изменения значения поля
   *
   * @param {InputEvent} event Инициируемое значение
   * @param {MaskedInputActionOptions} options Параметры действия
   *
   * @returns {MaskedInputActionInfo} Объект, в котором описан тип инициируемого события в формате "ключ - значение"
   */
  private static _detectActionByEvent(
    event: InputEvent,
    options: MaskedInputActionOptions
  ): MaskedInputActionInfo {
    const result: MaskedInputActionInfo = {
      isBackspace: false,
      isDelete: false,
      isInput: false,
      isClear: false,
    }
    if (options.reason === 'clear') {
      result.isClear = true

      return result
    }

    if (
      [
        'deleteContentBackward',
        'deleteHardLineBackward',
        'deleteSoftLineBackward',
      ].includes(event.inputType)
    ) {
      result.isBackspace = true
    } else if (
      [
        'deleteContentForward',
        'deleteHardLineForward',
        'deleteSoftLineForward',
      ].includes(event.inputType)
    ) {
      result.isDelete = true
    } else if (event.inputType === 'insertText') {
      result.isInput = true
    }

    return result
  }

  /**
   * Установить положение каретки для поля, соответствующему положению каретки из
   * маски
   */
  private _setInputSelectionRangeFromMask(): void {
    const {
      event,
      maskedInputCore,
      options: { maskAsPlaceholder },
    } = this

    const newValue = maskedInputCore.getValue()
    event.target.value =
      newValue === maskedInputCore.emptyValue && !maskAsPlaceholder
        ? ''
        : newValue

    const start = maskedInputCore.selection.start
    const end = maskedInputCore.selection.end
    event.target.setSelectionRange(start, end)

    /**
     * Дополнительно проверяем в макротаске, что положение каретки у поля действительно поменялось. Если
     * не поменялось, то пробуем поменять снова. В некоторых браузерах и в некоторых кейсах положение каретки
     * определяется неверно, так как значение поля не успевает попадать в `value` самого поля.
     *
     * @see https://stackoverflow.com/questions/11723420/chrome-setselectionrange-not-work-in-oninput-handler
     */
    setTimeout(() => {
      if (
        event.target.selectionStart !== start &&
        event.target.selectionEnd !== end
      ) {
        event.target.setSelectionRange(start, end)
      }
    }, 0)
  }
}
