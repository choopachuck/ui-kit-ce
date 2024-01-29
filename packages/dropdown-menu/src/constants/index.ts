import { DropdownProps } from '@v-uik/dropdown'
import { ModifierArguments, detectOverflow } from '@popperjs/core'

export const modifiers: Exclude<DropdownProps['modifiers'], undefined> = [
  {
    name: 'preventOverflow',
    enabled: false,
  },
  {
    name: 'maxWidth',
    enabled: true,
    phase: 'main' as const,
    requiresIfExists: ['offset', 'flip'],
    fn: ({
      state,
      name,
      options,
    }: ModifierArguments<Record<string, unknown>>): void => {
      const overflow = detectOverflow(state, options)
      const [basePlacement] = state.placement.split('-')
      const widthProp = basePlacement === 'left' ? 'left' : 'right'
      state.modifiersData[name] =
        state.rects.popper.width - overflow[widthProp] - 32
    },
  },
  {
    name: 'applyMaxWidth',
    enabled: true,
    phase: 'beforeWrite' as const,
    requires: ['maxWidth'],
    fn: ({ state }: ModifierArguments<Record<string, unknown>>): void => {
      state.styles.popper.maxWidth = `${
        state.modifiersData.maxWidth as number
      }px`
    },
  },
]
