'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import type { ComponentPropsWithRefFix } from '@v-uik/common'

const getDynamicStyles = (props: TickProps) => ({
  tick: {
    left: props.value && `${props.value}%`,
  },
})
const useStyles = createUseStyles((theme) => ({
  tick: {
    width: 2,
    height: '100%',
    background: theme.comp.slider.tickColorBackground,
    position: 'absolute',
  },
}))

export interface TickProps extends ComponentPropsWithRefFix<'span'> {
  /**
   * Оступ слева в процентах
   */
  value?: number
}

export const Tick = (props: TickProps): React.ReactElement => {
  const { className: classNameProp, value, style, ...rest } = props

  const dynamicStyles = getDynamicStyles(props)
  const classes = useStyles()
  const className = clsx(classNameProp, classes.tick)

  return (
    <span
      {...rest}
      className={className}
      style={{ ...dynamicStyles.tick, ...(style ?? {}) }}
    />
  )
}
