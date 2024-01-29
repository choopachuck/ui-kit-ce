'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'

const useStyles = createUseStyles({
  body: {
    flex: '1 1 auto',
    marginTop: 24,
    minHeight: 0,
    display: 'flex',
    position: 'relative',
    overflowY: 'auto',
  },
})

export interface DrawerBodyProps extends React.ComponentPropsWithRef<'div'> {}

export const DrawerBody = React.forwardRef(
  (
    { className: classNameProp, ...rest }: DrawerBodyProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useStyles()
    const className = clsx(classNameProp, classesList.body)

    return <div {...rest} ref={ref} className={className} />
  }
)
