import { Classes } from '../classes'
import { ElementSizeType } from '@v-uik/common'
import { TextProps } from '@v-uik/typography'

export const ButtonKinds = {
  contained: 'contained',
  outlined: 'outlined',
  ghost: 'ghost',
} as const

export type TButtonKinds = keyof typeof ButtonKinds

export const ButtonColor = {
  primary: 'primary',
  secondary: 'secondary',
  error: 'error',
} as const

export type TButtonColor = keyof typeof ButtonColor

export interface ButtonBaseProps {
  /**
   * JSS-классы для стилизации
   */
  classes?: Partial<Classes>
  /**
   * Тип кнопки.
   * primary - стандартная,
   * ghost - текстовая,
   * outlined - контурная
   */
  kind?: TButtonKinds
  /**
   * Цветовая схема кнопки.
   * primary - по-умолчанию,
   * secondary - черно-белая,
   * error - предупреждающая необратимое действие
   */
  color?: TButtonColor
  /**
   * Размер кнопки
   */
  size?: ElementSizeType
  /**
   * Растянуть кнопку во всю ширину родительского контейнера
   */
  fullWidth?: boolean
  /**
   * Настраивает состояние кнопки отключено. В этом состоянии пользователь не может
   * взаимодействовать с кнопкой
   */
  disabled?: boolean
  /**
   * Свойства компонента Text
   */
  textProps?: TextProps
}
