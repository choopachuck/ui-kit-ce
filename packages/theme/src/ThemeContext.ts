'use client'

import React from 'react'
import {
  createUseStyles as CssInJsCreateUseStyles,
  DefaultTheme,
  createTheming,
  Theming,
} from 'react-jss'
import { Classes, Styles, StyleSheetFactoryOptions } from 'jss'
import { light } from './themes'
import { Theme } from './interface'

interface BaseOptions<Theme = DefaultTheme> extends StyleSheetFactoryOptions {
  index?: number
  theming?: Theming<Theme>
}

interface CreateUseStylesOptions<Theme = DefaultTheme>
  extends BaseOptions<Theme> {
  name?: string
}

const ThemeContext = React.createContext<Theme>(light)

const theming = createTheming<Theme>(ThemeContext)

const { withTheme, ThemeProvider, useTheme } = theming

function createUseStyles<C extends string = string, Props = unknown>(
  styles: Styles<C, Props, Theme> | ((theme: Theme) => Styles<C, Props>),
  options?: CreateUseStylesOptions<Theme>
): (data?: Props & { theme?: Theme }) => Classes<C> {
  return CssInJsCreateUseStyles<string, Props, Theme>(styles, {
    theming,
    ...options,
  })
}

export { withTheme, ThemeProvider, useTheme, createUseStyles }
