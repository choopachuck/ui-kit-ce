'use client'

/* eslint-disable react/prop-types */ // TODO: косячит eslint при типизации пропсов компонента через дженерики React.forwardRef

/* eslint-disable @typescript-eslint/no-unused-vars */ // TODO: отключено для того, чтобы значения по умолчанию отобразились в storybook

import * as React from 'react'
import { PaginationElementBaseProps } from './types'
import { PaginationAppearanceType } from '../hooks'

export type PaginationOverflowButtonProps = Omit<
  PaginationElementBaseProps,
  'onPageChange'
> & {
  /**
   * Тип элемента
   */
  appearance?: PaginationAppearanceType
}

export const PaginationOverflowButton = React.forwardRef<
  HTMLButtonElement,
  PaginationOverflowButtonProps
>(({ className, size = 'md', disabled = false, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      tabIndex={-1}
      disabled={disabled}
      className={className}
      {...rest}
    />
  )
})
