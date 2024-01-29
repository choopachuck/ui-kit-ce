export interface StringHashMap<T> {
  [key: string]: T
}

export interface NumberHashMap<T> {
  [key: number]: T
}

export interface FormatCharacterConfig {
  validate: (char: string) => boolean
  transform?: (char: string) => string
}

export interface Selection {
  start: number
  end: number
}

/**
 *  Интерфейс объекта конфигурации нового шаблона.
 */
export interface SetPatternOptions {
  selection?: Selection
  value?: string
  placeholderString?: string
}

/**
 * Интерфейс основного объекта конфигурации экземпляра класса для работы с маской.
 */
export interface Config {
  formatCharacters?: FormatCharacters
  pattern: string
  placeholderChar?: string
  selection?: Selection
  value?: string
  keepCharPositions?: boolean
  validate?: (value: string) => boolean
  /** Признак замены символов при вводе. */
  overtype?: boolean
  /** Символы для заполнения пустых редактируемых позиций в маске (например строка вида "дд.мм.гггг"). */
  placeholderString?: string
  /** Сдвигание символов внутри группы с одинаковой маской при вставке новых символов. */
  groupCharShifting?: boolean
}

export interface HistoryItem {
  value: string
  selection: Selection
  startUndo: boolean
  lastOperation: null | 'input' | 'backspace' | 'delete'
}

/**
 * Конфигурация для работы с маской
 * Здесь ключи - это символы маски, а значения - конфигурации для обработки символов.
 */
export type FormatCharacters = StringHashMap<FormatCharacterConfig>
