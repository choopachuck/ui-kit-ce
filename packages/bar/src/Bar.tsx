'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { Direction } from '@v-uik/common'
import { BarContext, BarContextValue } from './BarContext'
import { BarKinds } from './constants'
import { BarProps } from './interfaces'

const horizontalHeight = 48
const verticalWidth = 64
const verticalWidthExpanded = 256

const useStyles = createUseStyles((theme) => ({
  bar: {
    boxSizing: 'border-box',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    minHeight: horizontalHeight,
    display: 'flex',
    flexWrap: 'wrap',
    zIndex: theme.zIndex.bar,
    borderTopLeftRadius: theme.comp.bar.shapeBorderRadiusTopLeftHorizontal,
    borderTopRightRadius: theme.comp.bar.shapeBorderRadiusTopRightHorizontal,
    borderBottomLeftRadius:
      theme.comp.bar.shapeBorderRadiusBottomLeftHorizontal,
    borderBottomRightRadius:
      theme.comp.bar.shapeBorderRadiusBottomRightHorizontal,
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
    borderTopLeftRadius: theme.comp.bar.shapeBorderRadiusTopLeftVertical,
    borderTopRightRadius: theme.comp.bar.shapeBorderRadiusTopRightVertical,
    borderBottomLeftRadius: theme.comp.bar.shapeBorderRadiusBottomLeftVertical,
    borderBottomRightRadius:
      theme.comp.bar.shapeBorderRadiusBottomRightVertical,

    '&$expanded': {
      width: verticalWidthExpanded,
    },
  },

  expanded: {},

  dark: {
    backgroundColor: theme.comp.bar.colorBackgroundDark,
    boxShadow: `inset 0 -1px 0 0 ${theme.comp.bar.colorBorderShadowDark}`,

    '&$vertical': {
      boxShadow: `inset -1px 0 0 0 ${theme.comp.bar.colorBorderShadowDark}`,
    },
  },

  light: {
    backgroundColor: theme.comp.bar.colorBackgroundLight,
    boxShadow: `inset 0 -1px 0 0 ${theme.comp.bar.colorBorderShadowLight}`,

    '&$vertical': {
      boxShadow: `inset -1px 0 0 0 ${theme.comp.bar.colorBorderShadowLight}`,
    },
  },

  primary: {
    backgroundColor: theme.comp.bar.colorBackgroundPrimary,
    boxShadow: `inset 0 -1px 0 0 ${theme.comp.bar.colorBorderShadowPrimary}`,

    '&$vertical': {
      boxShadow: `inset -1px 0 0 0 ${theme.comp.bar.colorBorderShadowPrimary}`,
    },
  },
}))

export const Bar = React.forwardRef(
  (
    {
      classes,
      className: classNameProp,
      direction = Direction.horizontal,
      kind = BarKinds.dark,
      expanded,
      children,
      ...rest
    }: BarProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const barContext: BarContextValue = { direction, expanded, kind }

    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const className = clsx(classNameProp, classesMap.bar, {
      [classesMap.vertical]: direction === Direction.vertical,
      [classesMap.expanded]: direction === Direction.vertical && expanded,
      [classesMap.dark]: kind === BarKinds.dark,
      [classesMap.light]: kind === BarKinds.light,
      [classesMap.primary]: kind === BarKinds.primary,
    })

    return (
      <div {...rest} ref={ref} className={className}>
        <BarContext.Provider value={barContext}>{children}</BarContext.Provider>
      </div>
    )
  }
)
