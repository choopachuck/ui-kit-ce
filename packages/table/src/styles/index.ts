'use client'

import { createUseStyles } from '@v-uik/theme'

// общие стили для ячеек head и body
export const commonCellUseStyles = createUseStyles((theme) => ({
  fixedSide: {
    '&::after': {
      content: '""',
      position: 'absolute',
      boxSizing: 'border-box',
      top: 0,
      bottom: -1,
      width: 10,
      transition: 'box-shadow 300ms ease',
    },
  },

  fixedStartLast: {
    '&::after': {
      right: 0,
      transform: 'translate(100%)',
      boxShadow: theme.comp.table.cellElevationShadowFixedStart,
    },
  },

  fixedEndFirst: {
    '&::after': {
      left: 0,
      transform: 'translate(-100%)',
      boxShadow: theme.comp.table.cellElevationShadowFixedEnd,
    },
  },
}))
