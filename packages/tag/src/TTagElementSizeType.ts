import { ElementSize, ElementSizeType } from '@v-uik/common'

/**
 * Размеры тэга.
 *
 * XS - extra small. очень маленький размер
 * SM - small. маленький размер
 * MD - medium. средний размер
 * LG - large. большой размер
 */
export const TagElementSize = {
  ...ElementSize,
  xs: 'xs',
} as const

export type TTagElementSizeType = keyof typeof TagElementSize | ElementSizeType
