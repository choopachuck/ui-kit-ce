import { ButtonAriaActionEventHandler } from '@v-uik/hooks'
import { CardClasses } from './classes'
import { CardKind } from './constants'
import type { ComponentPropsWithRefFix } from '@v-uik/common'

export type CardKindType = keyof typeof CardKind

export type ContainerProps = {
  kind: typeof CardKind.container
}

export type ClickableProps = {
  kind: typeof CardKind.clickable
  /**
   * обработчик onClick для button (доступен при kind='clickable')
   */
  onClick?: ButtonAriaActionEventHandler<HTMLDivElement>
  /**
   * Пропсы для контейнера  (доступны при kind='clickable')
   */
  buttonProps?: Omit<ComponentPropsWithRefFix<'div'>, 'onClick' | 'disabled'>
  /**
   * Флаг disabled
   */
  disabled?: boolean
}
export type SelectableProps = {
  kind: typeof CardKind.selectable
  /**
   * Признак выбора (доступен при kind='selectable')
   */
  checked: boolean
  /**
   * name атрибут элемента input (доступен при kind='selectable')
   */
  name?: string
  /**
   * Обработчик onChange для input (доступен при kind='selectable')
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>
  /**
   * Пропсы для элемента input (доступны при kind='selectable')
   */
  inputProps?: Omit<ComponentPropsWithRefFix<'input'>, 'onChange' | 'name'>
  disabled?: boolean
}

export type KindProps =
  | ContainerProps
  | ClickableProps
  | SelectableProps
  | ({
      /**
       * Тип карточки
       */
      kind?: undefined
    } & Omit<
      ComponentPropsWithRefFix<'div'>,
      'onChange' | 'checked' | 'onClick' | 'name' | 'disabled'
    >)

export const isSelectable = (value: KindProps): value is SelectableProps =>
  value.kind === CardKind.selectable

export const isClickable = (value: KindProps): value is ClickableProps =>
  value.kind === CardKind.clickable

export type CardProps = {
  /**
   * CSS классы компонента
   */
  classes?: Partial<CardClasses>
  /**
   * класс
   */
  className?: string
  children: React.ReactNode

  /**
   * Контент для header
   */
  header?: React.ReactNode
  /**
   * Контент для footer
   */
  footer?: React.ReactNode
  /**
   * Контент для subtitle
   */
  subtitle?: React.ReactNode
} & KindProps
