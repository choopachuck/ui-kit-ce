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
      const innerWidth = Math.min(
        window.innerWidth,
        (window as unknown as { visualViewport: { width: number } })
          .visualViewport?.width
      )
      let maxWidth = innerWidth - 32

      //Костыль для вычесления оффсетов при первом рендере
      const isBiggerThenViewport = state.rects.popper.width > innerWidth - 32
      const overflowLeft = isBiggerThenViewport ? -16 : overflow.left
      const overflowRight = isBiggerThenViewport ? -16 : overflow.right

      if (overflowLeft > 0) {
        maxWidth -= overflow.left
      }
      if (overflowRight > 0) {
        maxWidth -= overflow.right
      }

      state.modifiersData[name] = maxWidth
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
