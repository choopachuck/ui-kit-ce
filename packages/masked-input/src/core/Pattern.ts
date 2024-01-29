import { FormatCharacters, NumberHashMap } from './typings'
import {
  ESCAPE_CHAR,
  DEFAULT_PLACEHOLDER_CHAR,
  DEFAULT_FORMAT_CHARACTERS,
} from './constants'

/**
 * Класс шаблона маски.
 */
export class Pattern {
  placeholderChar!: string
  placeholderString?: string[]
  formatCharacters!: FormatCharacters
  /** Шаблон с символами экранирования. */
  source!: string
  /** Шаблон после обработки символов экранирования. */
  pattern!: string[]
  /** Длина шаблона после обработки символов экранирования. */
  length!: number
  firstEditableIndex!: number
  lastEditableIndex!: number
  private readonly editableIndices: NumberHashMap<boolean> = {}

  /**
   * @param {string} source Маска.
   * @param {FormatCharacters} formatCharacters Правила обработки символов маски.
   * @param {string} placeholderChar Символ-заполнитель.
   * @param {string?} placeholderString Строка-заполнитель (имеет более высокий приоритет, чем символ).
   */
  constructor(
    source: string,
    formatCharacters: FormatCharacters = DEFAULT_FORMAT_CHARACTERS,
    placeholderChar: string = DEFAULT_PLACEHOLDER_CHAR,
    placeholderString?: string
  ) {
    if (!(this instanceof Pattern)) {
      return new Pattern(
        source,
        formatCharacters,
        placeholderChar,
        placeholderString
      )
    }

    if (placeholderString) {
      this.placeholderString = placeholderString.split('')
    }

    this.placeholderChar = placeholderChar
    this.formatCharacters = formatCharacters
    this.source = source
    this.pattern = []
    this.length = 0
    this.firstEditableIndex = -1
    this.lastEditableIndex = -1

    this.editableIndices = {}

    this.parse()
  }

  /**
   * Разбор на редактируемые и не редактируемые символы по маске.
   */
  private parse() {
    const sourceChars = this.source.split('')
    let patternIndex = 0
    const pattern: string[] = []

    for (let i = 0; i < sourceChars.length; i++) {
      let char = sourceChars[i]
      if (char === ESCAPE_CHAR) {
        if (i === sourceChars.length - 1) {
          throw new Error(
            `MaskedInputCore: pattern ends with an escape character ${ESCAPE_CHAR}`
          )
        }
        char = sourceChars[++i]
      } else if (char in this.formatCharacters) {
        if (this.firstEditableIndex === -1) {
          this.firstEditableIndex = patternIndex
        }
        this.lastEditableIndex = patternIndex
        this.editableIndices[patternIndex] = true
      }

      pattern.push(char)
      patternIndex++
    }

    if (this.firstEditableIndex === -1) {
      throw new Error(
        `MaskedInputCore: pattern "${this.source}" does not contain any editable characters.`
      )
    }

    this.pattern = pattern
    this.length = pattern.length
  }

  /**
   * Возвращает символ-заполнитель для ещё не введённых редактируемых индексов.
   */
  getPlaceholderChar(index: number): string {
    return (
      (this.placeholderString && this.placeholderString[index]) ||
      this.placeholderChar
    )
  }

  /**
   * Форматирование значения по шаблону.
   *
   * @param {string[]} value Исходное значение.
   * @return {string[]} Отформатированное значения.
   */
  formatValue(value: string[]): string[] {
    const valueBuffer = new Array<string>(this.length)
    let valueIndex = 0

    for (let i = 0; i < this.length; i++) {
      if (this.isEditableIndex(i)) {
        valueBuffer[i] =
          value.length > valueIndex && this.isValidAtIndex(value[valueIndex], i)
            ? this.transform(value[valueIndex], i)
            : this.getPlaceholderChar(i)
        valueIndex++
      } else {
        valueBuffer[i] = this.pattern[i]
        // Позволяет значению содержать статические символы из шаблона.
        if (
          value.length > valueIndex &&
          value[valueIndex] === this.pattern[i]
        ) {
          valueIndex++
        }
      }
    }

    return valueBuffer
  }

  /**
   * Является ли данный индекс редактируемым.
   *
   * @param {number} index Индекс для проверки.
   * @return {boolean} Результат проверки.
   */
  isEditableIndex(index: number): boolean {
    return this.editableIndices[index]
  }

  /**
   * Подходит ли маске данный символ в данной позиции.
   *
   * @param {string} char Символ для проверки.
   * @param {number} index Позиция символа.
   * @return {boolean} Результат проверки.
   */
  isValidAtIndex(char: string, index: number): boolean {
    return this.formatCharacters[this.pattern[index]].validate(char)
  }

  /**
   * Трансформация символа по маске.
   *
   * @param {string} char Символ для трансформации.
   * @param {number} index Позиция символа.
   * @return {boolean} Трансформированный символ.
   */
  transform(char: string, index: number): string {
    const format = this.formatCharacters[this.pattern[index]]

    return typeof format.transform === 'function'
      ? format.transform(char)
      : char
  }

  /**
   * Возвращает исходное значение по отформатированному и маске.
   */
  getRawValue(value: string[]): string {
    const rawValue: string[] = []
    for (let i = 0; i < value.length; i++) {
      if (this.isEditableIndex(i) && value[i] !== this.getPlaceholderChar(i)) {
        rawValue.push(value[i])
      }
    }

    return rawValue.join('')
  }
}
