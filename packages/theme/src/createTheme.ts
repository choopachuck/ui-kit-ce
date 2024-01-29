'use client'

import { merge } from '@v-uik/utils'
import {
  breakpoints,
  colors,
  colourway,
  palette,
  shape,
  typography,
  zIndex,
} from './parts/'
import { ThemeOptions, Theme } from './interface'
import { ref as createRef } from './ref'
import { createSys } from './sys'
import { createComp } from './comp'

// https://github.com/microsoft/TypeScript/issues/42644#issuecomment-774315112
type StringLiteral<T> = T extends string
  ? string extends T
    ? never
    : T
  : never

function createGroupTokens<N, T>(name: StringLiteral<N>, factory: T) {
  return [name, factory] as const
}

export function createTheme(customProps: ThemeOptions = {}): Theme {
  const themeWithoutLayers: Omit<Theme, 'ref' | 'sys' | 'comp'> = {
    breakpoints,
    colors: colors(palette),
    colourway,
    palette,
    shape,
    typography,
    zIndex,
  }

  const { ref, sys, comp, ...other } = customProps

  merge(themeWithoutLayers, other)

  const groupTokens = [
    createGroupTokens('ref', createRef),
    createGroupTokens('sys', createSys),
    createGroupTokens('comp', createComp),
  ]

  const theme: Theme = groupTokens.reduce((acc, groupTokens) => {
    const [name, factory] = groupTokens

    // @ts-ignore -- пнх
    acc[name] = merge(
      typeof factory === 'function' ? factory(acc, customProps) : factory,
      customProps[name]
    )

    return acc
  }, themeWithoutLayers as Theme)

  return theme
}
