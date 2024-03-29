'use client'

import * as React from 'react'
import { AvatarProps } from './types'

export type AvatarGroupContextProps = Pick<
  AvatarProps,
  'size' | 'kind' | 'color' | 'withBorder' | 'withShadow'
>

export const AvatarGroupContext = React.createContext<AvatarGroupContextProps>(
  {}
)

export const AvatarGroupContextProvider: React.FC<
  React.PropsWithChildren<AvatarGroupContextProps>
> = ({ size, color, kind, withBorder, withShadow, children }) => {
  const value = React.useMemo<AvatarGroupContextProps>(
    () => ({ size, color, kind, withBorder, withShadow }),
    [size, color, kind, withBorder, withShadow]
  )

  return (
    <AvatarGroupContext.Provider value={value}>
      {children}
    </AvatarGroupContext.Provider>
  )
}
