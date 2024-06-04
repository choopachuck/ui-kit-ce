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
import { createTheme } from './createTheme'

interface BaseOptions<Theme = DefaultTheme> extends StyleSheetFactoryOptions {
  index?: number
  theming?: Theming<Theme>
}

interface CreateUseStylesOptions<Theme = DefaultTheme>
  extends BaseOptions<Theme> {
  name?: string
}

//#region Перезапись дефолтной темы с помощью глобальной переменной DEFAULT_UIK_THEME (только для команды ЕДС, в остальных случаях не рекомендуется к использованию!!!)

let defaultTheme = light

if (
  globalThis.DEFAULT_UIK_THEME &&
  typeof globalThis.DEFAULT_UIK_THEME === 'object'
) {
  defaultTheme = createTheme(globalThis.DEFAULT_UIK_THEME)
}

//#endregion

const ThemeContext = React.createContext<Theme>(defaultTheme)

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
