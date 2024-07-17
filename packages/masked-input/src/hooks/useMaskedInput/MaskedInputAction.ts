import * as React from 'react'
import { MaskedInputCore } from '../../core/MaskedInputCore'

export type MaskedInputActionType = 'delete' | 'insert'

export type MaskedInputActionInfo = {
  isBackspace: boolean
  isDelete: boolean
  isInput: boolean
}

export type MaskedInputActionOptions = {
  maskAsPlaceholder?: boolean
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
      event.nativeEvent as InputEvent
    )

    if (this.actionInfo.isBackspace || this.actionInfo.isDelete) {
      this.actionType = 'delete'
    } else {
      this.actionType = 'insert'
    }
  }

  /**
   * Выполнить изменение для маски
   */
  public performChange(): void {
    const {
      maskedInputCore,
      event,
      options: { maskAsPlaceholder },
    } = this

    if (!(event.target instanceof HTMLInputElement)) {
      return
    }

    switch (this.getActionType()) {
      case 'delete':
        this._performDelete()
        break
      default:
        break
    }

    const value = maskedInputCore.getValue()
    event.target.value =
      value === maskedInputCore.emptyValue && !maskAsPlaceholder ? '' : value

    if (value) {
      event.target.setSelectionRange(
        maskedInputCore.selection.start,
        maskedInputCore.selection.end
      )
    }
  }

  public getActionInfo(): MaskedInputActionInfo {
    return this.actionInfo
  }

  public getActionType(): MaskedInputActionType {
    return this.actionType
  }

  /**
   * Удалить символы у маски
   */
  private _performDelete(): void {
    const { maskedInputCore, event } = this
    const { isBackspace, isDelete } = this.getActionInfo()
    const maskValue = maskedInputCore.getValue()

    if (!isBackspace && !isDelete) {
      return
    }

    if (isBackspace) {
      maskedInputCore.selection = {
        start: Number(event.target.selectionStart),
        end:
          Number(event.target.selectionStart) +
          maskValue.length -
          event.target.value.length,
      }
    }
    const isDeletedItemEditable =
      maskedInputCore.value[maskedInputCore.selection.start] &&
      maskedInputCore.pattern.isEditableIndex(maskedInputCore.selection.start)

    const offset = isBackspace ? -1 : 0
    const deleteMethod = isBackspace
      ? maskedInputCore.backspace
      : maskedInputCore.delete

    do {
      deleteMethod.apply(maskedInputCore)
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
      deleteMethod.apply(maskedInputCore, [true])
    }
  }

  /**
   * Восстановить отмененное действие у маски
   *
   * @param {string} value Строка, у которой необходимо восстановить отмененное действие
   */
  private _performRedo(): void {
    return
  }

  /**
   * Отменить предыдущее действие у маски
   */

  private _performUndo(): void {
    return
  }

  /**
   * Добавить новое значение в маску
   */
  private _performInput(): void {
    return
  }

  /**
   * Определить тип изменения значения поля
   *
   * @param {InputEvent} event Инициируемое значение
   *
   * @returns {MaskedInputActionInfo} Объект, в котором описан тип инициируемого события в формате "ключ - значение"
   */
  private static _detectActionByEvent(
    event: InputEvent
  ): MaskedInputActionInfo {
    const result: MaskedInputActionInfo = {
      isBackspace: false,
      isDelete: false,
      isInput: false,
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
    } else {
      result.isInput = true
    }

    return result
  }
}
