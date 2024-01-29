import * as React from 'react'
import { Theme } from '@v-uik/base'
import { ThemeTokens } from '../../types'

export type TokenViewContextT = {
  theme?: Theme
  themeTokens?: ThemeTokens
}

export const TokenViewContext = React.createContext<TokenViewContextT>({})
