'use client'

import { createUseStyles } from '@v-uik/theme'

export const useListStyles = createUseStyles({
  list: {
    display: 'inline-flex',
    width: '100%',
    margin: 0,
    padding: [4, 0],
    flexDirection: 'column',
    listStyleType: 'none',

    '&:focus': {
      outline: 'none',
    },
  },
})
