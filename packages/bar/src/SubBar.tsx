'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { Direction } from '@v-uik/common'
import { BarContext, BarContextValue } from './BarContext'
import { SubBarKinds } from './constants'
import { SubBarProps } from './interfaces'

const horizontalHeight = 48
const verticalWidth = 64
const verticalWidthExpanded = 256

const useStyles = createUseStyles((theme) => ({
  subBar: {
    boxSizing: 'border-box',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    minHeight: horizontalHeight,
    display: 'flex',
    flexWrap: 'wrap',
    zIndex: theme.zIndex.bar - 1,
    borderTopLeftRadius: theme.comp.subBar.shapeBorderRadiusTopLeftHorizontal,
    borderTopRightRadius: theme.comp.subBar.shapeBorderRadiusTopRightHorizontal,
    borderBottomLeftRadius:
      theme.comp.subBar.shapeBorderRadiusBottomLeftHorizontal,
    borderBottomRightRadius:
      theme.comp.subBar.shapeBorderRadiusBottomRightHorizontal,
  },

  vertical: {
    bottom: 0,
    paddingBottom: 8,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    overflowX: 'hidden',
    overflowY: 'auto',
    width: verticalWidth,
    transition: 'width 150ms ease-in-out',
    willChange: 'width',
    borderTopLeftRadius: theme.comp.subBar.shapeBorderRadiusTopLeftVertical,
    borderTopRightRadius: theme.comp.subBar.shapeBorderRadiusTopRightVertical,
    borderBottomLeftRadius:
      theme.comp.subBar.shapeBorderRadiusBottomLeftVertical,
    borderBottomRightRadius:
      theme.comp.subBar.shapeBorderRadiusBottomRightVertical,

    '&$expanded': {
      width: verticalWidthExpanded,
    },
  },

  expanded: {},

  dark: {
    backgroundColor: theme.comp.subBar.colorBackgroundDark,
    boxShadow: `inset 0 -1px 0 0 ${theme.comp.subBar.colorBorderShadowDark}`,

    '&$vertical': {
      boxShadow: `inset -1px 0 0 0 ${theme.comp.subBar.colorBorderShadowDark}`,
    },
  },

  darker: {
    backgroundColor: theme.comp.subBar.colorBackgroundDarker,
    boxShadow: `inset 0 -1px 0 0 ${theme.comp.subBar.colorBorderShadowDarker}`,

    '&$vertical': {
      boxShadow: `inset -1px 0 0 0 ${theme.comp.subBar.colorBorderShadowDarker}`,
    },
  },

  light: {
    backgroundColor: theme.comp.subBar.colorBackgroundLight,
    boxShadow: `inset 0 -1px 0 0 ${theme.comp.subBar.colorBorderShadowLight}`,

    '&$vertical': {
      boxShadow: `inset -1px 0 0 0 ${theme.comp.subBar.colorBorderShadowLight}`,
    },
  },

  lighter: {
    backgroundColor: theme.comp.subBar.colorBackgroundLighter,
    boxShadow: `inset 0 -1px 0 0 ${theme.comp.subBar.colorBorderShadowLighter}`,

    '&$vertical': {
      boxShadow: `inset -1px 0 0 0 ${theme.comp.subBar.colorBorderShadowLighter}`,
    },
  },
}))

export const SubBar = React.forwardRef(
  (
    {
      classes,
      className: classNameProp,
      direction = Direction.horizontal,
      kind = SubBarKinds.dark,
      expanded,
      children,
      ...rest
    }: SubBarProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const barContext: BarContextValue = { direction, expanded, kind }

    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const className = clsx(classNameProp, classesMap.subBar, {
      [classesMap.vertical]: direction === Direction.vertical,
      [classesMap.expanded]: direction === Direction.vertical && expanded,
      [classesMap.dark]: kind === SubBarKinds.dark,
      [classesMap.darker]: kind === SubBarKinds.darker,
      [classesMap.light]: kind === SubBarKinds.light,
      [classesMap.lighter]: kind === SubBarKinds.lighter,
    })

    return (
      <div {...rest} ref={ref} className={className}>
        <BarContext.Provider value={barContext}>{children}</BarContext.Provider>
      </div>
    )
  }
)
