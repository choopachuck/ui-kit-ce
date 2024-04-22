import * as React from 'react'
import { PaginationProps } from '../types'
import type { ComponentPropsWithRefFix } from '@v-uik/common'

export type PaginationElementBaseProps = React.PropsWithChildren<
  Pick<PaginationProps, 'size' | 'disabled'> &
    Omit<ComponentPropsWithRefFix<'button'>, 'children' | 'className'>
> & {
  /**
   * Отображаемый контент
   */
  children?: React.ReactNode // Продублировано для отображения свойства в storybook
  /**
   * Функция обратного вызова, которая отрабатывает при изменении номера страницы
   */
  onPageChange?: () => void // Продублировано для отображения свойства в storybook
  /**
   * CSS-класс элемента
   */
  className?: string // Продублировано для отображения свойства в storybook
}
