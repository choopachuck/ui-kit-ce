'use client'

/* eslint-disable react/prop-types */ // TODO: косячит eslint при типизации пропсов компонента через дженерики React.forwardRef

/* eslint-disable @typescript-eslint/no-unused-vars */ // TODO: отключено для того, чтобы значения по умолчанию отобразились в storybook

import * as React from 'react'
import { PaginationElementBaseProps } from './types'
import { UsePaginationReturnProps } from '../hooks'

export type PaginationNavigationButtonProps = PaginationElementBaseProps &
  Partial<Pick<UsePaginationReturnProps, 'isStart' | 'isEnd'>>

export const PaginationNavigationButton = React.forwardRef<
  HTMLButtonElement,
  PaginationNavigationButtonProps
>(
  (
    {
      disabled = false,
      size = 'md',
      onPageChange,
      onClick,
      className,
      isStart = false,
      isEnd = false,
      ...rest
    },
    ref
  ) => {
    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      onClick?.(e)
      onPageChange?.()
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={className}
        onClick={handleClick}
        {...rest}
      />
    )
  }
)
