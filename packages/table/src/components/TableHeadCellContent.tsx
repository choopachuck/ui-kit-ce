'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import {
  TableSizeProp,
  TableEventType,
  ReservedDataSourceProps,
  ColumnProps,
} from '../interfaces'
import {
  useButtonReset,
  ButtonAriaActionEventHandler,
  useButtonAriaActionProps,
} from '@v-uik/hooks'
import { useTableDataContext } from '../context'

const useStyles = createUseStyles((theme) => ({
  headCellContent: {
    display: 'flex',
    alignItems: 'center',

    // Размеры ячеек
    '&$sm': {
      padding: [8, 16],
    },

    '&$md': {
      padding: [12, 16],
    },

    '&$lg': {
      padding: [16, 16],
    },
  },

  headerCellContentAlignLeft: {
    justifyContent: 'start',
  },

  headerCellContentAlignCenter: {
    justifyContent: 'center',
  },

  headerCellContentAlignRight: {
    flexDirection: 'row-reverse',
  },

  sm: {},

  md: {},

  lg: {},

  sortable: {
    '&:hover': {
      backgroundColor: theme.comp.table.headerCellColorBackgroundSortableHover,
      cursor: 'pointer',
    },
  },

  // Состояния стрелок сортировки
  sorter: {
    color: theme.comp.table.sorterColorBackground,

    '$headCellContent:hover &': {
      color: theme.comp.table.sorterColorBackgroundHover,
    },
  },

  sortButton: {
    display: 'flex',
    cursor: 'pointer',
  },

  upArrow: {
    '$asc &': {
      visibility: 'hidden',
    },
    '$headCellContent:hover $asc &': {
      color: theme.comp.table.sorterUpArrowColorBackgroundAscHover,
      visibility: 'visible',
    },
    '$desc &': {
      color: theme.comp.table.sorterUpArrowColorBackgroundDesc,
    },
  },
  downArrow: {
    '$asc &': {
      color: theme.comp.table.sorterDownArrowColorBackgroundAsc,
    },
    '$desc &': {
      visibility: 'hidden',
    },
    '$headCellContent:hover $desc &': {
      color: theme.comp.table.sorterUpDownColorBackgroundDescHover,
      visibility: 'visible',
    },
  },

  asc: {},

  desc: {},

  none: {},
}))

export interface TableHeadCellContentProps<DataSource = unknown>
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
  /**
   *  Объект, описывающий структуру столбца
   */
  column: ColumnProps<DataSource>
  /**
   * Определяет размер ячейки. Соответствует размеру таблицы.
   */
  size: TableSizeProp
  /**
   * Набор событий, которые могут произойти при работе со столбцом, например сортировка или фильтрация, а также любые кастомные
   * события.
   */
  onChange?(params: TableEventType<DataSource>): void
}

const nextSortOrderMap = {
  none: 'asc',
  asc: 'desc',
  desc: 'none',
} as const

/**
 * Отображает содержимое ячейки заголовки. Используется как стандартный компонент, если не передано
 * свойство `renderHeaderCellContent` в родительском компоненте Table.
 */
export const TableHeadCellContent = <
  DataSource extends ReservedDataSourceProps<DataSource>
>({
  column,
  children,
  size,
  onChange,
  ...rest
}: TableHeadCellContentProps<DataSource>): JSX.Element => {
  const {
    sortable,
    dataIndex,
    renderHeaderCellContent,
    title,
    key,
    align = 'left',
  } = column

  const buttonClasses = useButtonReset()
  const classList = useStyles()

  const className = clsx(classList.headCellContent, classList[size], {
    [classList.sortable]: sortable,
  })

  const { setColumnSortState, columnsSortState } = useTableDataContext()
  const currentSortOrder = columnsSortState[column.key] ?? column.sortOrder

  /**
   * Калбек отрабатывающий нажатие
   */
  const handleOnClick: ButtonAriaActionEventHandler<HTMLDivElement> =
    React.useCallback(
      (event) => {
        if (!sortable) {
          return
        }

        // Безопасная сортировка - не все элементы в общем контейнере должны вызывать сортировку.
        if (
          ((event as React.MouseEvent).target as Element).closest(
            '[data-save-sort]'
          )
        ) {
          return
        }
        const newSortOrder = nextSortOrderMap[currentSortOrder]

        setColumnSortState(column.key, newSortOrder)
        onChange?.({
          type: 'sort',
          sortOrder: newSortOrder,
          dataIndex,
        })
      },
      [
        onChange,
        sortable,
        currentSortOrder,
        column.key,
        dataIndex,
        setColumnSortState,
      ]
    )

  const actions = useButtonAriaActionProps(
    handleOnClick,
    rest.onKeyUp,
    rest.onKeyDown
  )

  if (renderHeaderCellContent) {
    return renderHeaderCellContent<DataSource>({
      title,
      key,
      dataIndex: dataIndex as keyof DataSource,
      originClassName: className,
    }) as JSX.Element
  }

  const actionProps = sortable
    ? actions
    : { onClick: handleOnClick as React.MouseEventHandler<HTMLDivElement> }

  return (
    <div
      {...rest}
      className={clsx(className, {
        [classList.headerCellContentAlignLeft]: align === 'left',
        [classList.headerCellContentAlignCenter]: align === 'center',
        [classList.headerCellContentAlignRight]: align === 'right',
      })}
      tabIndex={sortable ? 0 : undefined}
      role={sortable ? 'button' : undefined}
      {...actionProps}
    >
      <span>{children}</span>
      {sortable && (
        // По сути здесь не нужен элемент button, можно сделать просто div, так как клик обрабатывается на всем div
        <button
          aria-hidden
          type="button"
          // TODO подумать над содержимом aria-label
          className={clsx(buttonClasses.resetButton, classList.sortButton)}
          aria-label="Сортировка"
          tabIndex={-1}
        >
          <svg
            aria-hidden
            className={clsx(classList.sorter, classList[currentSortOrder])}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className={classList.upArrow}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 14H16L12 18L8 14Z"
              fill="currentColor"
              data-testid="ArrowUp"
            />
            <path
              className={classList.downArrow}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 10H16L12 6L8 10Z"
              fill="currentColor"
              data-testid="ArrowDown"
            />
          </svg>
        </button>
      )}
    </div>
  )
}
