/**
 * Размеры элементов.
 *
 * SM - small. маленький размер
 * MD - medium. средний размер
 * LG - large. большой размер
 */
export const ElementSize = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
} as const

export type ElementSizeType = keyof typeof ElementSize
