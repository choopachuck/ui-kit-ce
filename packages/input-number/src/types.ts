import { Item } from './utils'
import { InputChangeEvent, InputChangeReason } from '@v-uik/input'

export type StringValue<TCanClear extends boolean = boolean> = {
  /**
   * Тип возвращаемого и передавемого значения
   */
  valueType?: 'string'
  /**
   * Значение поля ввода
   */
  value?: string | null
  /**
   * Обработчик события изменения. <br/>
   *
   * @param `value` измененное значение. <br/>
   * @param `event` - инициатор события из обработчика. Имеет или тип `React.ChangeEvent<HTMLInputElement>`, если флаг `canClear` равен `false` <br/>
   * или тип `InputChangeEvent`, если флаг `canClear` равен `true` <br/>
   * @param `reason` тип изменения значения поля: `input` - пользовательский ввод, `clear` - очищение поля с помощью кнопки очистки
   */
  onChange?: TCanClear extends true
    ? (
        value: string | null,
        event: InputChangeEvent,
        reason?: InputChangeReason
      ) => void
    : (
        value: string | null,
        event: React.ChangeEvent<HTMLInputElement>,
        reason?: InputChangeReason
      ) => void
}

export type NumberValue<TCanClear extends boolean = boolean> = {
  /**
   * Тип возвращаемого и передавемого значения
   */
  valueType?: 'number'
  /**
   * Значение поля ввода
   */
  value?: number | null
  /**
   * Обработчик события изменения. <br/>
   *
   * @param `value` измененное значение. <br/>
   * @param `event` - инициатор события из обработчика. Имеет или тип `React.ChangeEvent<HTMLInputElement>`, если флаг `canClear` равен `false` <br/>
   * или тип `InputChangeEvent`, если флаг `canClear` равен `true` <br/>
   * @param `reason` тип изменения значения поля: `input` - пользовательский ввод, `clear` - очищение поля с помощью кнопки очистки
   */
  onChange?: TCanClear extends true
    ? (
        value: number | null,
        event: InputChangeEvent,
        reason?: InputChangeReason
      ) => void
    : (
        value: number | null,
        event: React.ChangeEvent<HTMLInputElement>,
        reason?: InputChangeReason
      ) => void
}

export type ValueType<TCanClear extends boolean = boolean> =
  | NumberValue<TCanClear>
  | (StringValue<TCanClear> & { valueType?: string })

export interface ISelection {
  caretPosition: number
  newInputValue?: string
}

export interface IParts {
  negativeSign: Item | null
  integer: Item[]
  fraction: Item[]
  separator: Item | null
}
