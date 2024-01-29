'use client'

import { createUseStyles } from '@v-uik/theme'

export const useButtonReset = createUseStyles({
  resetButton: {
    border: 'none',
    margin: 0,
    padding: 0,
    outline: 'none',
    width: 'auto',
    overflow: 'visible',

    background: 'transparent',

    /* inherit font & color from ancestor */
    color: 'inherit',
    font: 'inherit',

    /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */
    lineHeight: 'normal',

    /* Corrects font smoothing for webkit */
    '-webkit-font-smoothing': 'inherit',
    '-moz-osx-font-smoothing': 'inherit',

    /* Corrects inability to style clickable `input` types in iOS */
    appearance: 'none',
  },
})
