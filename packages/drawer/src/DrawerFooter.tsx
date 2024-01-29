'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { defaultPadding } from './constants'

const useStyles = createUseStyles((theme) => ({
  footer: {
    flex: '0 0 auto',
    marginTop: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',

    '& > :not(:first-child)': {
      marginLeft: 16,
    },
  },

  divider: {
    margin: `24px -${defaultPadding}px 0`,
    borderColor: theme.comp.drawerFooter.dividerColorBorder,
    borderWidth: 0,
    borderTopWidth: 1,
  },
}))

export interface DrawerFooterProps extends React.ComponentPropsWithRef<'div'> {
  /**
   * Свойства элемента-разделителя
   */
  dividerProps?: React.HTMLAttributes<HTMLHRElement>
}

export const DrawerFooter = React.forwardRef(
  (
    { className, dividerProps, ...rest }: DrawerFooterProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useStyles()

    return (
      <>
        <hr
          {...dividerProps}
          className={clsx(classesList.divider, dividerProps?.className)}
        />
        <div
          {...rest}
          ref={ref}
          className={clsx(classesList.footer, className)}
        />
      </>
    )
  }
)
