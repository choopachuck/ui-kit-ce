import * as React from 'react'
import { FormatCharacters } from '../core/typings'
import { InputChangeReason } from '@v-uik/input'

export type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.KeyboardEvent<HTMLInputElement>
  | React.ClipboardEvent<HTMLInputElement>

export type MaskedInputChangeEvent = ChangeEvent

export interface CommonProps {
  /**
   * Значение поля
   */
  value?: string
  /**
   * Обработчик события изменения значения поля
   */
  onChange?: (
    value: string,
    event?: MaskedInputChangeEvent,
    reason?: InputChangeReason
  ) => void
  /**
   * Маска ввода.
   */
  mask: string
  /**
   * Конфигурация для работы с маской.
   */
  formatCharacters?: FormatCharacters
  /**
   * Символ для замены незаполненного элемента маски (по умолчанию "_").
   */
  placeholderChar?: string
  /**
   * Символы для заполнения пустых редактируемых позиций в маске (например, строка вида "дд.мм.гггг").
   */
  placeholderString?: string
  /**
   * Флаг исключения символов маски из значения
   */
  valueWithoutMask?: boolean
  /**
   * Флаг сохранения позиций символов при вводе/удалении.
   */
  keepCharPositions?: boolean
  /**
   * Флаг сохранения позиции каретки при потере фокуса.
   */
  keepCaretPositionOnFocus?: boolean
  /**
   * Флаг показа маски в качестве значения при пустом value.
   */
  maskAsPlaceholder?: boolean
  /**
   * Флаг замены символов при вводе.
   */
  overtype?: boolean
  /**
   * Флаг, который группирует символы с одинаковой маской.
   * После этого удаление или добавление символа внутри одной группы не влияет
   * на другие. Так же не позволяет вводить новые символы, если группа полностью
   * заполнена. При вводе символа остальные символы после него сдвигаются до
   * первого пустого места.
   */
  groupCharShifting?: boolean
  /**
   * Выделить весь текст при фокусе
   */
  autoSelectOnFocus?: boolean
}
