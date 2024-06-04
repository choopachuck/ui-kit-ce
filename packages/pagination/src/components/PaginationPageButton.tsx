'use client'

/* eslint-disable react/prop-types */ // TODO: косячит eslint при типизации пропсов компонента через дженерики React.forwardRef

/* eslint-disable @typescript-eslint/no-unused-vars */ // TODO: отключено для того, чтобы значения по умолчанию отобразились в storybook

import * as React from 'react'
import { PaginationElementBaseProps } from './types'
import { PaginationAppearanceType } from '../hooks'

export type PaginationPageButtonProps = PaginationElementBaseProps & {
  /**
   * Флаг активности элемента
   */
  isSelected?: boolean
  /**
   * Компонент-индикатор активного элемента пагинации
   */
  indicator?: React.ReactNode
  /**
   * Тип элемента
   */
  appearance?: PaginationAppearanceType
}

export const PaginationPageButton = React.forwardRef<
  HTMLButtonElement,
  PaginationPageButtonProps
>(
  (
    {
      className,
      isSelected = false,
      children,
      indicator,
      disabled = false,
      size = 'md',
      appearance,
      onClick,
      onPageChange,
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
        className={className}
        disabled={disabled}
        onClick={handleClick}
        {...rest}
      >
        {children}
        {isSelected ? indicator : null}
      </button>
    )
  }
)
