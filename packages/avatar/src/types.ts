import {
  AvatarKind,
  AvatarSize,
  AvatarGroupColoring,
  AvatarGroupSize,
} from './constants'
import { AvatarClasses } from './classes'

export type AvatarSizeType = keyof typeof AvatarSize

export type AvatarKindType = keyof typeof AvatarKind

export type AvatarGroupColoringType = keyof typeof AvatarGroupColoring

export type AvatarGroupSizeType = keyof typeof AvatarGroupSize

export type AvatarProps = Omit<JSX.IntrinsicElements['div'], 'ref'> & {
  /**
   * CSS классы компонента
   */
  classes?: AvatarClasses
  /**
   * Размер аватара
   */
  size?: AvatarSizeType | number
  /**
   * `svg` иконка
   */
  icon?: React.ReactNode
  /**
   * Тип скругления аватара
   */
  kind?: AvatarKindType
  /**
   * Свойство определяющее цвет аватара
   */
  color?: React.CSSProperties['color']
  /**
   * Путь до изображения
   */
  src?: string
  /**
   * Подпись для изображения
   */
  alt?: string
  /**
   * HTML свойства для элемента `img`
   */
  imgProps?: JSX.IntrinsicElements['img']
  /**
   * Заглушка, которая будет отображаться, если изображение не загрузилось и отсутствует `alt`, `icon` и `children`
   */
  fallback?: React.ReactNode
  /**
   * Флаг отображения тени вокруг аватара
   */
  withShadow?: boolean
  /**
   * Флаг отображения обводки вокруг аватара
   */
  withBorder?: boolean
  /**
   * Дочерний `JSX`
   */
  children?: string | React.ReactNode
}
