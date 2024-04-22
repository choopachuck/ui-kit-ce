'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { Direction, ComponentPropsWithRefFix } from '@v-uik/common'
import { BarContext } from './BarContext'
import { BarKinds, DarkColors, LightColors } from './constants'
import { BarDividerClasses as Classes } from './interfaces/classes'

const useStyles = createUseStyles((theme) => ({
  divider: {
    margin: 0,
    border: 0,
    height: 1,
  },

  vertical: {
    width: 1,
    height: 'auto',
    alignSelf: 'stretch',
  },

  major: {},

  minor: {},

  dark: {
    '&$major': {
      backgroundColor: theme.comp.barDivider.colorBackgroundDarkMajor,
    },

    '&$minor': {
      backgroundColor: theme.comp.barDivider.colorBackgroundDarkMinor,
    },
  },

  light: {
    '&$major': {
      backgroundColor: theme.comp.barDivider.colorBackgroundLightMajor,
    },

    '&$minor': {
      backgroundColor: theme.comp.barDivider.colorBackgroundLightMinor,
    },
  },

  primary: {
    '&$major': {
      backgroundColor: theme.comp.barDivider.colorBackgroundPrimaryMajor,
    },

    '&$minor': {
      backgroundColor: theme.comp.barDivider.colorBackgroundPrimaryMinor,
    },
  },
}))

export const BarDividerKinds = {
  major: 'major',
  minor: 'minor',
} as const

export type TBarDividerKinds = keyof typeof BarDividerKinds

export interface BarDividerProps extends ComponentPropsWithRefFix<'hr'> {
  /**
   * JSS-классы для стилизации
   */
  classes?: Classes
  /**
   * Тип разделителя
   */
  kind?: TBarDividerKinds
}

export const BarDivider = React.forwardRef(
  (
    {
      classes,
      className: classNameProp,
      kind = BarDividerKinds.major,
      ...rest
    }: BarDividerProps,
    ref: React.Ref<HTMLHRElement>
  ) => {
    const barContext = React.useContext(BarContext)

    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const className = clsx(classNameProp, classesMap.divider, {
      [classesMap.vertical]: barContext.direction === Direction.horizontal,
      [classesMap.major]: kind === BarDividerKinds.major,
      [classesMap.minor]: kind === BarDividerKinds.minor,
      [classesMap.dark]: DarkColors.includes(barContext.kind),
      [classesMap.light]: LightColors.includes(barContext.kind),
      [classesMap.primary]: barContext.kind === BarKinds.primary,
    })

    return <hr {...rest} ref={ref} className={className} />
  }
)
