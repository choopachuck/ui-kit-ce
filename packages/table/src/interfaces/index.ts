import * as React from 'react'
import { TableClasses as Classes } from './classes'
import { UseColumnsResult } from '../hooks/useColumns'
import { UseScrollResult } from '../hooks/useScroll'
import type { ComponentPropsWithRefFix } from '@v-uik/common'

export * from './classes'

export const TableSize = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
} as const

export type TableSizeProp = keyof typeof TableSize

export const TableBordered = {
  none: 'none',
  rows: 'rows',
  'rows-columns': 'rows-columns',
} as const

export type TableBorderedProp = keyof typeof TableBordered

export type SortOrderProp = 'asc' | 'desc' | 'none'

export type TableAlignmentType = 'left' | 'center' | 'right'

export const TablePaginationDirection = {
  start: 'start',
  end: 'end',
} as const

export type TablePaginationDirectionType = keyof typeof TablePaginationDirection

export const TablePaginationType = {
  simple: 'simple',
  advanced: 'advanced',
} as const

export type PaginationType = keyof typeof TablePaginationType

export const TablePaginationDivider = {
  top: 'top',
  bottom: 'bottom',
} as const

export type PaginationDividerType = keyof typeof TablePaginationDivider

/**
 * Эвент типа sort
 */
export type SortTableEventType = {
  type: 'sort'
  sortOrder: SortOrderProp
  dataIndex?: string
}

export type TableEventType<DataSource> =
  | SortTableEventType
  | { type: 'expand'; row: DataSource; rowIndex: number }
  | { type: 'treeExpand'; row: DataSource; rowIndex: number }

export type Key = React.Key

export const TableColumnKind = {
  default: 'default',
  expand: 'expand',
  tree: 'tree',
}

export type AriaAttributes = {
  prevPageLabel?: string
  nextPageLabel?: string
  lastPageLabel?: string
  firstPageLabel?: string
  pageSizeLabel?: string
  currentPagePickerLabel?: string
}

export type TableColumnKindType = keyof typeof TableColumnKind

// Необходимые для внутреннего использования свойства интерфейса DataSource
export interface ReservedDataSourceProps<DataSource> {
  /**
   * Уникальный идентификатор для каждой ячейки внутри строки тела таблицы.
   */
  key: Key
  /**
   * Массив потомков элемента дерева
   */
  children?: Array<DataSource & ReservedDataSourceProps<DataSource>>
}

export type RecordDataSource<T> = { key?: Key } & Omit<
  ReservedDataSourceProps<T>,
  'key'
> &
  T

// Тип нужен для валидного использования кастомных компонентов в таблице
type Component<P> =
  | React.ComponentType<P>
  | React.ForwardRefExoticComponent<P>
  | keyof React.ReactHTML

/* eslint-disable  @typescript-eslint/no-explicit-any */
export type CustomizeComponent = Component<any>

type BodyClasses = Partial<Record<'body' | 'bodyRow' | 'bodyCell', string>>

export type BodyProps<DataSource = unknown> = Pick<
  TableProps<DataSource>,
  | 'dataSource'
  | 'columns'
  | 'components'
  | 'setRowProps'
  | 'emptyData'
  | 'stripe'
  | 'hoverable'
  | 'size'
  | 'onChange'
  | 'rowKey'
> &
  Omit<UseColumnsResult<DataSource>, 'flattenColumns'> &
  Pick<UseScrollResult, 'scrollLeaveStartSide' | 'scrollLeaveEndSide'> & {
    /**
     * JSS-классы для стилизации
     */
    classes?: BodyClasses
  }

export interface TableComponents<DataSource = unknown> {
  tableWrapper?: CustomizeComponent
  table?: CustomizeComponent
  head?: {
    wrapper?: CustomizeComponent
    row?: CustomizeComponent
    cell?: CustomizeComponent
  }
  body?:
    | {
        wrapper?: CustomizeComponent
        row?: CustomizeComponent
        cell?: CustomizeComponent
      }
    | React.ComponentType<BodyProps<DataSource>>
}

export interface CellProps extends React.ComponentPropsWithoutRef<'td'> {}
export interface HeaderCellProps extends React.ComponentPropsWithoutRef<'th'> {}
export interface RowProps extends React.ComponentPropsWithoutRef<'tr'> {}

export type ColumnTitle = string

/**
 * Тип ширины колонки
 */
export type ColumnWidth = string | number

// Описывает структуру столбца таблицы.
type BaseColumnProps<DataSource> = {
  /**
   * Текст для заголовка таблицы.
   */
  title?: ColumnTitle
  /**
   * Уникальный идентификатор для каждой ячейки заголовка таблицы.
   */
  key: Key
  /**
   * Тип ячеек столбца
   */
  kind?: TableColumnKindType
  /**
   * Определяет по какому ключу из DataSource получать значение для текущего столбца.
   */
  dataIndex?: string
  /**
   * Положение контента в столбце
   */
  align?: TableAlignmentType
  /**
   * Устанавливает свойства для конкретной ячейки.
   *
   * Например можно установить colSpan и rowSpan.
   */
  setCellProps?(params: {
    cell: unknown
    cellIndex: number
    row: DataSource
    rowIndex: number
  }): CellProps
  /**
   * Отображает содержимое (контент) для конкретной ячейки. Не заменяет тег `<td>`, только его содержимое.
   */
  renderCellContent?(params: {
    cell: unknown
    cellIndex: number
    row: DataSource
    rowIndex: number
    originClassName: string
    indentLevel?: number
  }): React.ReactNode
  /**
   * Устанавливает свойства для ячеек в шапке таблицы.
   */
  setHeaderCellProps?(params: {
    title: ColumnTitle | undefined
    key: Key
  }): HeaderCellProps
  /**
   * Отображает содержимое (контент) для конкретной ячейки заголовка. Не заменяет тег `<th>`, только его содержимое.
   */
  renderHeaderCellContent?<T>(params: {
    title: ColumnTitle | undefined
    key: Key
    dataIndex?: keyof T
    originClassName: string
  }): React.ReactNode
  /**
   *  Определяет порядок сортировки для столбца.
   *
   * @default 'none'
   */
  sortOrder?: 'asc' | 'desc' | 'none'
  /**
   * Управляет отображением элементов сортировки. Если требуется установить начальное значение сортировки,
   * можете использовать свойство `sortOrder`.
   */
  sortable?: boolean
  /**
   * Обработчик состояния раскрытия строки для kind = "expand" | "tree""
   * (чтобы "раскрыть" строку верните `true`, чтобы "свернуть" - `false`).
   */
  isRowExpanded?:
    | ((params: { row: DataSource; rowIndex: number }) => boolean)
    | null
  /**
   * Отображает содержимое (контент) для расширяемой строки.
   */
  renderExpandableContent?(params: {
    row: DataSource
    rowIndex: number
  }): React.ReactNode
}

type FixedColumnProps =
  | {
      /**
       * Позиция фиксации ячейки при горизонтальном скролле
       */
      fixed: 'start' | 'end'
      /**
       * Ширина ячейки в пикселях или в процентах
       */
      width: ColumnWidth
    }
  | {
      fixed?: undefined
      /**
       * Ширина ячейки в пикселях или в процентах
       */
      width?: ColumnWidth
    }

export type ColumnProps<DataSource> = BaseColumnProps<DataSource> &
  FixedColumnProps & {
    children?: Array<ColumnProps<DataSource>>
  }

export type HeaderColumnProps<DataSource> = {
  column: ColumnProps<DataSource>
  colSpan?: number
  rowSpan?: number
  isLastColumn?: boolean
}

export type ColumnsOffsets = { [key in React.Key]: number | string }

/**
 * Тип функции для rowKey
 */
export type RowKeyFunction<DataSource> = (record: DataSource) => Key

export interface TableProps<DataSource>
  extends Omit<ComponentPropsWithRefFix<'div'>, 'onChange'> {
  /**
   * JSS-классы для стилизации
   */
  classes?: Classes
  /**
   * Массив данных, который будет использоваться для отрисовки таблицы.
   */
  dataSource: RecordDataSource<DataSource>[]
  /**
   * Описывает структуру столбца таблицы — заголовок, ключи, события.
   */
  columns: ColumnProps<DataSource>[]
  /**
   * Устанавливает алгоритм, используемый для размещения ячеек, строк и столбцов таблицы.
   * В случае, когда есть фиксированные колонки, всегда будет 'fixed'.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout
   *
   * @default 'auto'
   */
  tableLayout?: React.CSSProperties['tableLayout']
  /**
   * Ширина таблицы
   */
  width?: number | string
  /**
   * Высота таблицы
   */
  height?: number | string
  /**
   * Устанавливает свойства для строки таблицы.
   */
  setRowProps?(params: { row: DataSource; rowIndex: number }): RowProps
  /**
   * Определяет размер таблицы.
   *
   * @default TableSize.md
   */
  size?: TableSizeProp
  /**
   * Используется как шина событий, которые как-либо меняют отображение состояния таблицы — сортировка, фильтрация,
   * раскрытие расширяемых строк и т.п.
   */
  onChange?(params: TableEventType<DataSource>): void
  /**
   * Превью, которое отображается когда данных нет.
   */
  emptyData?: React.ReactNode
  /**
   * Свойство включения hover-эффекта для строк.
   */
  hoverable?: boolean
  /**
   * Добавление границ ячейкам
   */
  bordered?: TableBorderedProp
  /**
   * Полосатая таблица, где выделяется каждая четная строка.
   */
  stripe?: boolean
  /**
   * Свойство для переопределения элементов таблицы
   */
  components?: TableComponents<DataSource>
  /**
   * Зафиксировать шапку таблицы при скролле
   */
  fixedHeader?: boolean

  /**
   * Уникальный ключ строки может быть строкой или функцией, которая возвращает React.Key.
   */
  rowKey?: string | RowKeyFunction<DataSource>
}
