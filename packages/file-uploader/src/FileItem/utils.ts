import { ElementSizeType } from '@v-uik/common'

export const getIconSize = (size: ElementSizeType) => ({
  width: size === 'sm' ? 16 : 24,
  height: size === 'sm' ? 16 : 24,
})
