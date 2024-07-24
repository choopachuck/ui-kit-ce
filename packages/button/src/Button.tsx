'use client'

import * as React from 'react'
import { PolymorphicButton } from '.'
import { ButtonBaseProps } from './interfaces'

export interface ButtonProps
  extends ButtonBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {}

export const Button = React.forwardRef(
  ({ ...rest }: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
    return <PolymorphicButton as="button" {...rest} ref={ref} />
  }
)
