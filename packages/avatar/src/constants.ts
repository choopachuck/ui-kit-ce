import { ElementSize } from '@v-uik/common'

/**
 * Размеры аватара.
 *
 * XS - extra small. очень маленький размер
 * SM - small. маленький размер
 * MD - medium. средний размер
 * LG - large. большой размер
 * XL - extra large. очень большой размер
 */
export const AvatarSize = {
  xs: 'xs',
  ...ElementSize,
  xl: 'xl',
} as const

/**
 * Скругления аватара.
 *
 * CIRCLE - circle. полное скругление
 * ROUNDED - rounded. небольшое скругление
 * SQUARE - square. без скругления
 */
export const AvatarKind = {
  circle: 'circle',
  rounded: 'rounded',
  square: 'square',
} as const

/**
 * Размеры группы аватара.
 *
 * XS - extra small. очень маленький размер
 * SM - small. маленький размер
 * MD - medium. средний размер
 */
export const AvatarGroupSize = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
} as const

/**
 * Тип автоматического окрашивания аватаров в группе
 *
 * NONE - none. Автоматическое окрашивание отключено
 * STATIC - static. Каждый аватар окрашивается в один и тот же цвет из палитры при каждом ререндере и перезагрузке страницы
 * RANDOM - random. Каждый аватар окрашивается в случайный цвет из палитры при каждом ререндере, но при перезагрузке страницы цвета снова будут разные
 */
export const AvatarGroupColoring = {
  none: 'none',
  static: 'static',
  random: 'random',
} as const
