'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import type {
  TableSizeProp,
  TableEventType,
  ReservedDataSourceProps,
  ColumnProps,
  TableProps,
  SortOrderProp,
} from '../interfaces'
import {
  useButtonReset,
  ButtonAriaActionEventHandler,
  useButtonAriaActionProps,
  useClassList,
} from '@v-uik/hooks'
import { useTableDataContext } from '../context'
import { DefaultSortIcon } from '../assets/DefaultSortIcon'

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

export type TableHeadCellContentClasses = Partial<Record<SortOrderProp, string>>

export interface TableHeadCellContentProps<DataSource = unknown>
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'>,
    Pick<TableProps<DataSource>, 'components'> {
  /**
   * JSS-классы для стилизации
   */
  classes?: TableHeadCellContentClasses
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
  classes,
  column,
  children,
  size,
  onChange,
  components,
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
  const classesMap = useClassList(classList, classes)

  const className = clsx(classesMap.headCellContent, classesMap[size], {
    [classesMap.sortable]: sortable,
  })

  const { setColumnSortState, columnsSortState } = useTableDataContext()
  const currentSortOrder = columnsSortState[column.key] ?? column.sortOrder

  /**
   * Коллбек отрабатывающий нажатие
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

  const getSortIcon = () => {
    if (!components?.head?.sortIcon) {
      return (
        <DefaultSortIcon
          className={clsx(classesMap.sorter, classesMap[currentSortOrder])}
          classNameUpArrow={classesMap.upArrow}
          classNameDownArrow={classesMap.downArrow}
        />
      )
    }

    const Component = components.head.sortIcon[currentSortOrder]

    return <Component className={classesMap[currentSortOrder]} />
  }

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
        [classesMap.headerCellContentAlignLeft]: align === 'left',
        [classesMap.headerCellContentAlignCenter]: align === 'center',
        [classesMap.headerCellContentAlignRight]: align === 'right',
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
          className={clsx(buttonClasses.resetButton, classesMap.sortButton)}
          aria-label="Сортировка"
          tabIndex={-1}
        >
          {getSortIcon()}
        </button>
      )}
    </div>
  )
}
