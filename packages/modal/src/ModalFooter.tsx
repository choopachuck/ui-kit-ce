'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import type { ComponentPropsWithRefFix } from '@v-uik/common'

const useStyles = createUseStyles({
  actions: {
    flex: '0 0 auto',
    marginTop: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',

    '& > :not(:first-child)': {
      marginLeft: 16,
    },
  },
})

export interface ModalFooterProps extends ComponentPropsWithRefFix<'div'> {}

export const ModalFooter = React.forwardRef(
  (
    { className: classNameProp, ...rest }: ModalFooterProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useStyles()
    const className = clsx(classNameProp, classesList.actions)

    return <div {...rest} ref={ref} className={className} />
  }
)
