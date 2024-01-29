import { Pattern } from './Pattern'
import {
  FormatCharacters,
  HistoryItem,
  Config,
  Selection,
  SetPatternOptions,
} from './typings'
import {
  DEFAULT_PLACEHOLDER_CHAR,
  DEFAULT_FORMAT_CHARACTERS,
} from './constants'

export class MaskedInputCore {
  placeholderChar!: string
  formatCharacters!: FormatCharacters
  selection!: Selection
  pattern!: Pattern
  emptyValue!: string
  value!: string[]
  private history!: HistoryItem[]
  private historyIndex!: number
  private lastOperation!: HistoryItem['lastOperation']
  private lastSelection!: Selection
  private readonly keepCharPositions?: boolean
  /** Признак замены символов при вводе. */
  private readonly overtype?: boolean
  /**
   * Признак который группирует символы с одинаковой маской.
   * После этого удаление или добавление символа внутри одной группы не влияет
   * на другие. Так же не позволяет вводить новые символы, если группа полностью
   * заполнена. При вводе символа остальные символы после него сдвигаются до
   * первого пустого места.
   */
  private readonly groupCharShifting?: boolean

  constructor(config: Config) {
    if (!(this instanceof MaskedInputCore)) {
      return new MaskedInputCore(config)
    }

    this.keepCharPositions = config.keepCharPositions
    this.overtype = config.overtype
    this.groupCharShifting = config.groupCharShifting

    this.setPlaceholderChar(config.placeholderChar)
    this.setFormatCharacters(config.formatCharacters)
    this.setPattern(config.pattern, {
      value: config.value,
      selection: config.selection,
      placeholderString: config.placeholderString,
    })
  }

  /**
   * Возвращает истину в случае если редактируемые символы в значении заполнены не все.
   */
  isIncomplete(): boolean {
    if (this.value) {
      for (let i = 0; i < this.value.length; i++) {
        if (
          this.pattern.isEditableIndex(i) &&
          this.value[i] === this.pattern.getPlaceholderChar(i)
        ) {
          return true
        }
      }
    }

    return !this.value
  }

  /**
   * Применяет ввод символа, ориентируясь на текущее положение каретки.
   * @param {string} char Вводимый символ.
   * @return {boolean} Возвращает true, если ввод символа вызвал изменения в итоговом значении либо
   * положении каретки.
   */
  input(char: string): boolean {
    const { start } = this.selection
    let { end } = this.selection
    // Игнорировать ввод, если курсор стоит в конце шаблона.
    if (start === end && start === this.pattern.length) {
      return false
    }

    const selectionBefore = { start, end }
    const valueBefore = this.getValue()

    let inputIndex = start

    // Если мы вручную ввели символ шаблона, то просто сдвинемся на 1 символ вправо.
    if (
      start === end &&
      !this.pattern.isEditableIndex(inputIndex) &&
      this.value[inputIndex] === char
    ) {
      this.selection.start = this.selection.end = inputIndex + 1

      return true
    }

    if (!this.getRawValue() && start === end) {
      for (let i = 0; i < this.pattern.firstEditableIndex; i++) {
        if (char === this.pattern.pattern[i]) {
          this.selection.start = this.selection.end = i + 1

          return true
        }
      }
    }

    // Если курсор находится перед первым редактируемым символом,
    // можно быть уверенным, что любой ввод применится к нему.
    if (inputIndex < this.pattern.firstEditableIndex) {
      inputIndex = this.pattern.firstEditableIndex
    } else {
      // Пропустить все последующие статические символы.
      while (
        this.pattern.length > this.selection.start &&
        !this.pattern.isEditableIndex(this.selection.start)
      ) {
        this.selection.start++
        this.selection.end++
        inputIndex++
      }
    }

    // Отменяем либо добавляем вводимый символ.
    if (this.pattern.isEditableIndex(inputIndex)) {
      // Если у нас не режим сохранения позиций внутри отдельных групп и не режим замены,
      // но нужно сохранять позиции символов, то в занятое место мы в принципе ничего
      // ввести не можем.
      if (
        !this.groupCharShifting &&
        !this.overtype &&
        this.keepCharPositions &&
        this.value[inputIndex] !== this.pattern.getPlaceholderChar(inputIndex)
      ) {
        return false
      }

      if (!this.pattern.isValidAtIndex(char, inputIndex)) {
        return false
      }
      // Дальше нам нужна копия значения, поскольку с ним могут происходить изменения,
      // а в конце окажется, что оно невалидно.
      const value = [...this.value]
      // Если нужно сохранять позиции символов в группах, то сдвигаем вправо
      // только внутри группы с одинаковой маской до первого пустого символа,
      // и не даем вводить символы если группа заполнена
      if (this.groupCharShifting) {
        const charType = this.pattern.pattern[inputIndex]
        const firstPlaceholderIndex = value.indexOf(this.placeholderChar)
        let lastSameCharIndex = inputIndex

        for (let i = inputIndex; i < this.pattern.pattern.length; i++) {
          if (this.pattern.isEditableIndex(i)) {
            if (this.pattern.pattern[i] === charType) {
              lastSameCharIndex = i
            } else {
              break
            }
          }
        }

        if (
          firstPlaceholderIndex !== -1 &&
          firstPlaceholderIndex <= lastSameCharIndex
        ) {
          let firstEditableIndex = firstPlaceholderIndex

          for (let i = firstPlaceholderIndex; i > inputIndex; i--) {
            if (this.pattern.isEditableIndex(i - 1)) {
              value[firstEditableIndex] = value[i - 1]
              firstEditableIndex = i - 1
            }
          }
        } else {
          return false
        }

        // Если не нужно сохранять позиции символов и нет режима замены, то необходимо
        // всё введённое сдвинуть вправо.
      } else if (!this.keepCharPositions && !this.overtype) {
        let i = value.length - 1
        let lastEditableIndex = 0

        while (i >= inputIndex) {
          // Но сдвигаем только редактируемые символы, а маску оставляем на месте.
          if (this.pattern.isEditableIndex(i)) {
            if (lastEditableIndex) {
              value[lastEditableIndex] = value[i]
            }
            lastEditableIndex = i
          }
          i--
        }
      }

      value[inputIndex] = this.pattern.transform(char, inputIndex)
      this.value = value
    }

    // Если выделено несколько символов, то остальные добиваются шаблоном с заполнителем.
    end--
    while (end > inputIndex) {
      if (this.pattern.isEditableIndex(end)) {
        this.value[end] = this.pattern.getPlaceholderChar(end)
      }
      end--
    }

    // Перемещение курсора к следующему символу.
    this.selection.start = this.selection.end = inputIndex + 1

    // Пропустить все последующие статические символы.
    while (
      this.pattern.length > this.selection.start &&
      !this.pattern.isEditableIndex(this.selection.start)
    ) {
      this.selection.start++
      this.selection.end++
    }

    // История изменений.
    if (this.historyIndex !== -1) {
      // Ввёл ещё что-то после отмены, так что удаляем последующую историю.
      this.history.splice(
        this.historyIndex,
        this.history.length - this.historyIndex
      )
      this.historyIndex = -1
    }
    if (
      this.lastOperation !== 'input' ||
      selectionBefore.start !== selectionBefore.end ||
      (this.lastSelection !== null &&
        selectionBefore.start !== this.lastSelection.start)
    ) {
      this.history.push({
        value: valueBefore,
        selection: selectionBefore,
        lastOperation: this.lastOperation,
        startUndo: false,
      })
    }
    this.lastOperation = 'input'
    this.lastSelection = {
      start: this.selection.start,
      end: this.selection.end,
    }

    return true
  }

  delete(): boolean {
    // Нельзя ничего удалить в конце значения.
    if (
      this.selection.end === this.selection.start &&
      this.selection.start === this.pattern.length
    ) {
      return false
    }

    // Запоминаем состояние для истории изменений.
    const selectionBefore = {
      start: this.selection.start,
      end: this.selection.end,
    }
    const valueBefore = this.getValue()

    // Нет выделенного диапазона, потому работаем с символом после курсора.
    if (this.selection.start === this.selection.end) {
      // Сначала пропустим все шаблонные символы справа.
      let start = this.selection.start
      const n = this.value.length
      while (!this.pattern.isEditableIndex(start) && start < n) {
        start++
      }
      // Если справа есть редактируемые символы.
      if (this.pattern.isEditableIndex(start)) {
        // Перебрасываем курсор к первому редактируемому символу.
        this.selection.start = this.selection.end = start
        this.value[start] = this.pattern.getPlaceholderChar(start)
        // При отсутствии режима сохранения позиций символов необходимо сдвинуть правую часть влево,
        // добавив заполнитель справа.
        if (!this.keepCharPositions && !this.groupCharShifting) {
          let lastEditableIndex = start,
            i = start + 1
          while (i < n) {
            if (this.pattern.isEditableIndex(i)) {
              this.value[lastEditableIndex] = this.value[i]
              lastEditableIndex = i
            }
            i++
          }
          // Правый символ затирается заполнителем.
          this.value[lastEditableIndex] =
            this.pattern.getPlaceholderChar(lastEditableIndex)
        }
      }
    } else {
      let end = this.selection.end - 1
      while (end >= this.selection.start) {
        if (this.pattern.isEditableIndex(end)) {
          this.value[end] = this.pattern.getPlaceholderChar(end)
        }
        end--
      }
      this.selection.end = this.selection.start
    }

    // История.
    if (this.historyIndex !== -1) {
      // Значение изменено после отмены, так что удаляем последующую историю.
      this.history.splice(
        this.historyIndex,
        this.history.length - this.historyIndex
      )
    }
    if (
      this.lastOperation !== 'delete' ||
      selectionBefore.start !== selectionBefore.end ||
      (this.lastSelection !== null &&
        selectionBefore.start !== this.lastSelection.start)
    ) {
      this.history.push({
        value: valueBefore,
        selection: selectionBefore,
        lastOperation: this.lastOperation,
        startUndo: false,
      })
    }
    this.lastOperation = 'delete'
    this.lastSelection = {
      start: this.selection.start,
      end: this.selection.end,
    }

    return true
  }

  /**
   * Пытаемся удалить символ относительно текущей позиции курсора(выделения) для текущего значения.
   * @return {boolean} Возвращает true, если в результате значение было изменено.
   */
  backspace(): boolean {
    // Если курсор в начале значения, то ничего не делаем.
    if (this.selection.start === 0 && this.selection.end === 0) {
      return false
    }

    const selectionBefore = {
      start: this.selection.start,
      end: this.selection.end,
    }
    const valueBefore = this.getValue()

    // Нет выделенного диапазона, потому работаем с символом перед курсором.
    if (this.selection.start === this.selection.end) {
      if (this.pattern.isEditableIndex(this.selection.start - 1)) {
        this.value[this.selection.start - 1] = this.pattern.getPlaceholderChar(
          this.selection.start - 1
        )
        // При отсутствии режима сохранения позиций символов необходимо сдвинуть правую часть влево,
        // добавив заполнитель справа.
        if (!this.keepCharPositions && !this.groupCharShifting) {
          let lastEditableIndex = this.selection.start - 1,
            i = this.selection.start
          const n = this.value.length
          while (i < n) {
            if (this.pattern.isEditableIndex(i)) {
              this.value[lastEditableIndex] = this.value[i]
              lastEditableIndex = i
            }
            i++
          }
          // Правый символ затирается заполнителем.
          this.value[lastEditableIndex] =
            this.pattern.getPlaceholderChar(lastEditableIndex)
        }
      }
      this.selection.start--
      this.selection.end--
    } else {
      let end = this.selection.end - 1
      while (end >= this.selection.start) {
        if (this.pattern.isEditableIndex(end)) {
          this.value[end] = this.pattern.getPlaceholderChar(end)
        }
        end--
      }
      this.selection.end = this.selection.start
    }

    // История.
    if (this.historyIndex !== -1) {
      // Значение изменено после отмены, так сто удаляем последующую историю.
      this.history.splice(
        this.historyIndex,
        this.history.length - this.historyIndex
      )
    }
    if (
      this.lastOperation !== 'backspace' ||
      selectionBefore.start !== selectionBefore.end ||
      (this.lastSelection !== null &&
        selectionBefore.start !== this.lastSelection.start)
    ) {
      this.history.push({
        value: valueBefore,
        selection: selectionBefore,
        lastOperation: this.lastOperation,
        startUndo: false,
      })
    }
    this.lastOperation = 'backspace'
    this.lastSelection = {
      start: this.selection.start,
      end: this.selection.end,
    }

    return true
  }

  /**
   * Пробуем вставить строку в поле ввода в текущую позицию курсора, либо поверх выделения.
   * Недопустимые символы приведут к отклонению вставляемого значения.
   * @param {string} input Вставляемое значение.
   * @return {boolean} Возвращает true, если вставка удалась.
   */
  paste(input: string): boolean {
    // Запоминаем исходное состояние, для отката в случае некорректного ввода.
    const initialState = {
      value: this.value,
      selection: {
        start: this.selection.start,
        end: this.selection.end,
      },
      lastOperation: this.lastOperation,
      history: this.history.slice(),
      historyIndex: this.historyIndex,
      lastSelection: {
        start: this.lastSelection.start,
        end: this.lastSelection.end,
      },
    }

    // Если в начале маски есть статические символы, а курсор или выделение внутри них, то
    // статические символы должны соответствовать вставляемым.
    if (this.selection.start < this.pattern.firstEditableIndex) {
      // Если это не валидный символ, то возможно вставляемое значение содержит маску.
      if (
        !this.pattern.isValidAtIndex(
          input.charAt(0),
          this.pattern.firstEditableIndex
        )
      ) {
        for (
          let i = 0, l = this.pattern.firstEditableIndex - this.selection.start;
          i < l;
          i++
        ) {
          if (input.charAt(i) !== this.pattern.pattern[i]) {
            return false
          }
        }
        input = input.substring(
          this.pattern.firstEditableIndex - this.selection.start
        )
      }

      // Продолжаем, как если бы ввод начался с редактируемой части шаблона.
      this.selection.start = this.pattern.firstEditableIndex
    }

    let prevIndex = this.selection.start
    let patternIndex = prevIndex + 1 // Сохраняем последнюю позицию курсора после вводимого символа.

    for (
      let i = 0, l = input.length;
      i < l && this.selection.start <= this.pattern.lastEditableIndex;
      i++
    ) {
      const valid = this.input(input.charAt(i))

      // Позволяет статическим частям шаблона находиться во вставляемом значении.
      if (valid) {
        prevIndex = patternIndex
        patternIndex = this.selection.start + 1
      } else {
        if (this.selection.start > 0) {
          // Здесь пропускается только один статический символ.
          if (
            !this.pattern.isEditableIndex(prevIndex) &&
            input.charAt(i) === this.pattern.pattern[prevIndex]
          ) {
            prevIndex++
            continue
          }
        }

        this.value = initialState.value
        this.selection = initialState.selection
        this.lastOperation = initialState.lastOperation
        this.history = initialState.history
        this.historyIndex = initialState.historyIndex
        this.lastSelection = initialState.lastSelection

        return false
      }
    }

    return true
  }

  /**
   * Шаг назад по истории изменений.
   * @return {boolean} Удалось ли выполнить.
   */
  undo(): boolean {
    // Если история пуста, либо мы дошли до дна стека, то мы уже не можем отменить.
    if (this.history.length === 0 || this.historyIndex === 0) {
      return false
    }

    let historyItem: HistoryItem
    if (this.historyIndex === -1) {
      // Нет состояния отмены, устанавливаем инициализационное значение индекса.
      this.historyIndex = this.history.length - 1
      historyItem = this.history[this.historyIndex]
      // Добавляем новую запись истории, если с момента последнего изменения ничего не изменилось,
      // то мы, можем вернуться к исходному состоянию, из которого мы начали отменять.
      const value = this.getValue()
      if (
        historyItem.value !== value ||
        historyItem.selection.start !== this.selection.start ||
        historyItem.selection.end !== this.selection.end
      ) {
        const { start, end } = this.selection
        this.history.push({
          value,
          selection: { start, end },
          lastOperation: this.lastOperation,
          startUndo: true,
        })
      }
    } else {
      historyItem = this.history[--this.historyIndex]
    }

    this.value = historyItem.value.split('')
    this.selection = historyItem.selection
    this.lastOperation = historyItem.lastOperation

    return true
  }

  /**
   * Шаг вперёд по истории изменений.
   * @return {boolean} Удалось ли выполнить.
   */
  redo(): boolean {
    if (this.history.length === 0 || this.historyIndex === -1) {
      return false
    }
    const historyItem = this.history[++this.historyIndex]
    // If this is the last history item, we're done redoing
    if (this.historyIndex === this.history.length - 1) {
      this.historyIndex = -1
      // If the last history item was only added to start undoing, remove it
      if (historyItem.startUndo) {
        this.history.pop()
      }
    }
    this.value = historyItem.value.split('')
    this.selection = historyItem.selection
    this.lastOperation = historyItem.lastOperation

    return true
  }

  /**
   * Установка новой маски форматирования.
   * @param {string} pattern Маска.
   * @param {SetPatternOptions} options Дополнительные параметры.
   */
  setPattern(
    pattern: string,
    {
      selection = { start: 0, end: 0 },
      value = '',
      placeholderString,
    }: SetPatternOptions
  ): void {
    if (typeof pattern !== 'string') {
      throw new Error('MaskedInputCore: you must provide a pattern.')
    }
    this.pattern = new Pattern(
      pattern,
      this.formatCharacters,
      this.placeholderChar,
      placeholderString
    )
    this.setValue(value)
    this.emptyValue = this.pattern.formatValue([]).join('')
    this.selection = selection
    this.resetHistory()
  }

  /**
   * Установка нового символа - заполнителя.
   * @param {string} placeholderChar Символ - заполнитель.
   */
  setPlaceholderChar(placeholderChar: string = DEFAULT_PLACEHOLDER_CHAR): void {
    if (placeholderChar.length !== 1) {
      throw new Error(
        'InputMaskCore: placeholderChar should be a single character.'
      )
    }
    this.placeholderChar = placeholderChar
  }

  /**
   * Установка настроек маски.
   * @param {FormatCharacters} formatCharacters Конфигурация для работы с маской.
   */
  setFormatCharacters(
    formatCharacters: FormatCharacters = DEFAULT_FORMAT_CHARACTERS
  ): void {
    const merged: FormatCharacters = {
      ...DEFAULT_FORMAT_CHARACTERS,
      ...formatCharacters,
    }
    const chars = Object.keys(merged)
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i]
      if (!merged[char] || typeof merged[char].validate !== 'function') {
        delete merged[char]
      }
    }
    this.formatCharacters = merged
  }

  /**
   * Установка выделения (позиции каретки).
   * @param {Selection} selection Выделение.
   * @returns {boolean} Возвращается false в случае диапазона.
   */
  setSelection({ start, end }: Selection): boolean {
    this.selection = { start, end }
    if (start === end) {
      if (start < this.pattern.firstEditableIndex) {
        this.selection.start = this.selection.end =
          this.pattern.firstEditableIndex

        return true
      }
      if (end > this.pattern.lastEditableIndex + 1) {
        this.selection.start = this.selection.end =
          this.pattern.lastEditableIndex + 1

        return true
      }
    }

    return false
  }

  /**
   * Установка нового значения.
   * @param {string} value Новое значение.
   */
  setValue(value?: string): void {
    const valueString = value || ''
    this.value = this.pattern.formatValue(valueString.split(''))
  }

  /**
   * Получить текущее значение после обработки фильтром.
   * @returns {string} Текущее значение после обработки фильтром.
   */
  getValue(): string {
    return this.value.join('')
  }

  /**
   * Получить текущее значение без обработки по маске.
   * @returns {string} Текущее значение без обработки по маске.
   */
  getRawValue(): string {
    return this.pattern.getRawValue(this.value)
  }

  /**
   * Возвращает первую позицию, на которую можно поставить курсор для продолжения ввода.
   */
  getFirstFreePosition(): number {
    let index = this.pattern.firstEditableIndex

    while (
      index < this.pattern.length &&
      (!this.pattern.isEditableIndex(index) ||
        (this.pattern.isEditableIndex(index) &&
          this.value[index] !== this.pattern.getPlaceholderChar(index)))
    ) {
      index++
    }

    return index
  }

  /**
   * Сбросить историю изменений.
   */
  private resetHistory() {
    this.history = []
    this.historyIndex = -1
    this.lastOperation = null
    const { start, end } = this.selection
    this.lastSelection = { start, end }
  }
}
