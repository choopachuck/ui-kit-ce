import React from 'react'

export interface ITokensRouterContext {
  locationLevels: string[]

  pushTokenLevel: (tokenLevel: string, depth: number) => void
  pushToken: (token: string) => void
}

export const TokensRouterContext = React.createContext<
  ITokensRouterContext | undefined
>(undefined)
