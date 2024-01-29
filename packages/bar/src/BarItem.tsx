'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { Direction } from '@v-uik/common'
import { useText } from '@v-uik/typography'
import { BarContext } from './BarContext'
import { BarKinds, DarkColors, LightColors } from './constants'

const useStyles = createUseStyles({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: [12, 16],
  },

  vertical: {
    padding: [12, 16, 12, 20],

    '& $icon': {
      marginRight: 20,
    },
  },

  icon: {
    display: 'inline-flex',
    flexShrink: 0,
    marginRight: 8,

    '&:last-child': {
      marginRight: 0,
    },
  },

  text: {},
})

type Classes = Partial<
  Record<
    'root' | 'vertical' | 'icon' | 'text' | 'dark' | 'light' | 'primary',
    string
  >
>

export interface BarItemProps extends React.ComponentPropsWithRef<'div'> {
  /**
   * JSS-классы для стилизации
   */
  classes?: Classes
  /**
   * Иконка с левой стороны
   */
  icon?: React.ReactNode
}

export const BarItem = React.forwardRef(
  (
    {
      classes,
      className: classNameProp,
      icon,
      children,
      ...rest
    }: BarItemProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const barContext = React.useContext(BarContext)

    const classesList = useStyles()
    const { ellipsis } = useText()
    const classesMap = useClassList(classesList, classes)
    const className = clsx(classNameProp, classesMap.root, {
      [classesMap.vertical]: barContext.direction === Direction.vertical,
      [classesMap?.dark ?? '']: DarkColors.includes(barContext.kind),
      [classesMap?.light ?? '']: LightColors.includes(barContext.kind),
      [classesMap?.primary ?? '']: barContext.kind === BarKinds.primary,
    })
    const textClassName = clsx(ellipsis, classesMap.text)

    return (
      <div {...rest} ref={ref} className={className}>
        {icon && <span className={classesMap.icon}>{icon}</span>}

        {children && <span className={textClassName}>{children}</span>}
      </div>
    )
  }
)
