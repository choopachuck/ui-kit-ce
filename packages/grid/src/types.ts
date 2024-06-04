import * as React from 'react'
import { BreakpointsNumberValue, ComponentPropsWithRefFix } from '@v-uik/common'

export interface GridProps extends ComponentPropsWithRefFix<'div'> {
  /**
   * Коэффициент расстояния между ячейками сетки.
   */
  spacing?: BreakpointsNumberValue
  /**
   * Значение для центрирования элемента по горизонтальной оси в контейнере
   * используется свойство justify-content
   */
  justify?: React.CSSProperties['justifyContent']
  /**
   * Значение для центрирования элемента по вертикальной оси в контейнере
   * используется свойство align-items
   */
  alignItems?: React.CSSProperties['alignItems']
  /**
   * Запрет переноса ячеек GridItem на следующую строку внутри одного контейнера
   */
  nowrap?: boolean
  /**
   * Количество колонок
   */
  columns?: BreakpointsNumberValue
  /**
   * Отступы между колонками
   */
  columnSpacing?: BreakpointsNumberValue
  /**
   * Отступы между строчками
   */
  rowSpacing?: BreakpointsNumberValue
}
