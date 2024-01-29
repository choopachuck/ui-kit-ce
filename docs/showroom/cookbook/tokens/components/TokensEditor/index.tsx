import * as React from 'react'
import { createTheme } from '@v-uik/base'
import { TokensViewer } from '../TokensViewer'

const defaultTheme = createTheme({ comp: { backwardCompatibilityMode: false } })

/**
 * Редактор токенов. Переопределяет их значения
 *
 */
export const TokensEditor = () => {
  return <TokensViewer theme={defaultTheme} />
}
