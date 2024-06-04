'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { Theme } from '@v-uik/theme'
import type { ComponentPropsWithRefFix } from '@v-uik/common'

const useStyles = createUseStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    boxSizing: 'border-box',
    padding: 8,
    backgroundColor: theme.comp.rangePicker.dropdownColorBackground,
    boxShadow: theme.comp.rangePicker.dropdownElevationShadow,
    borderTopLeftRadius:
      theme.comp.rangePicker.dropdownShapeBorderRadiusTopLeft,
    borderTopRightRadius:
      theme.comp.rangePicker.dropdownShapeBorderRadiusTopRight,
    borderBottomLeftRadius:
      theme.comp.rangePicker.dropdownShapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.rangePicker.dropdownShapeBorderRadiusBottomRight,
    borderStyle: theme.shape.borderStyle,
    borderWidth: theme.shape.borderWidth,
    borderColor: theme.comp.rangePicker.dropdownColorBorder,
  },
}))

export interface Props extends ComponentPropsWithRefFix<'div'> {}

export const PanelWrapper = React.forwardRef(
  (props: Props, ref: React.Ref<HTMLDivElement>) => {
    const { className: classNameProp, children, ...rest } = props

    const classesList = useStyles()
    const className = clsx(classNameProp, classesList.root)

    return (
      <div {...rest} ref={ref} className={className}>
        {children}
      </div>
    )
  }
)

PanelWrapper.displayName = 'PanelWrapper'
