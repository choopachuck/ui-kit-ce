'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'

const useStyles = createUseStyles((theme) => ({
  accordion: {
    margin: 0,
    padding: 0,
    borderBottomStyle: theme.shape.borderStyle,
    borderBottomWidth: theme.shape.borderWidth,
    borderBottomColor: theme.comp.accordion.colorBorder,
    borderTopLeftRadius: theme.comp.accordion.shapeBorderRadiusTopLeft,
    borderTopRightRadius: theme.comp.accordion.shapeBorderRadiusTopRight,
    borderBottomLeftRadius: theme.comp.accordion.shapeBorderRadiusBottomLeft,
    borderBottomRightRadius: theme.comp.accordion.shapeBorderRadiusBottomRight,
  },
}))

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Accordion = React.forwardRef(
  (
    { className: classNameProp, children, ...rest }: AccordionProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useStyles()
    const className = clsx(classNameProp, classesList.accordion)

    return (
      <div {...rest} ref={ref} className={className}>
        {children}
      </div>
    )
  }
)
