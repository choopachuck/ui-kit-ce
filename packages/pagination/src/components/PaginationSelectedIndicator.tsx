'use client'

import * as React from 'react'
import { PaginationProps } from '../types'

/* eslint-disable react/prop-types */ // TODO: косячит eslint при типизации пропсов компонента через дженерики React.forwardRef

/* eslint-disable @typescript-eslint/no-unused-vars */ // TODO: отключено для того, чтобы значения по умолчанию отобразились в storybook

export type PaginationSelectedIndicatorProps = Pick<
  PaginationProps,
  'disabled' | 'size'
> & {
  /**
   * CSS-класс элемента
   */
  className?: string
}

export const PaginationSelectedIndicator = React.forwardRef<
  HTMLSpanElement,
  PaginationSelectedIndicatorProps
>(({ className, disabled = false, size = 'md' }, ref) => (
  <span ref={ref} className={className} />
))
