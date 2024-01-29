'use client'

import * as React from 'react'
import { clsx, createUseStyles } from '@v-uik/theme'

const getDynamicStyles = (props: TickLabelProps) => ({
  tickLabel: {
    left: props.value && `${props.value}%`,
  },
})
const useStyles = createUseStyles((theme) => ({
  tickLabel: {
    bottom: -20,
    color: theme.comp.slider.tickLabelColorText,
    paddingBottom: 4,
    position: 'absolute',
    boxSizing: 'border-box',
    transform: 'translateX(-50%)',

    fontFamily: theme.comp.slider.tickLabelTypographyFontFamily,
    fontSize: theme.comp.slider.tickLabelTypographyFontSize,
    lineHeight: theme.comp.slider.tickLabelTypographyLineHeight,
    letterSpacing: theme.comp.slider.tickLabelTypographyLetterSpacing,
    fontWeight: theme.comp.slider.tickLabelTypographyFontWeight,
  },
}))

const element = 'span'

export interface TickLabelProps
  extends React.ComponentPropsWithoutRef<typeof element> {
  /**
   * Отступ слева в процентах
   */
  value?: number
}

export const TickLabel = (props: TickLabelProps): JSX.Element => {
  const { className: classNameProp, value, style, ...rest } = props

  const dynamicStyles = getDynamicStyles(props)
  const classes = useStyles()
  const className = clsx(classNameProp, classes.tickLabel)

  return (
    <span
      {...rest}
      className={className}
      style={{ ...dynamicStyles.tickLabel, ...(style ?? {}) }}
    />
  )
}
