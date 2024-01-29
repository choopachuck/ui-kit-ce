/* eslint-disable react/prop-types */
import * as React from 'react'
import {
  TableProps,
  Table,
  BodyProps,
  ReservedDataSourceProps,
  useTableBodyStyles,
  useTableCellContentStyles,
  TableSizeProp,
  useClassList,
  clsx,
  createUseStyles,
  ColumnProps,
} from '@v-uik/base'
import { VariableSizeList as List } from 'react-window'

type VirtualTableProps<DataSource> = TableProps<DataSource>

type WidthContextType = {
  width: number
}

const WidthContext = React.createContext<WidthContextType>({
  width: 0,
})

const columns = [
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Проект',
  },
  {
    key: 'count',
    dataIndex: 'count',
    title: 'Кол-во сотрудников',
    width: 300,
  },
]
const DEFAULT_COLUMN_WIDTH = 200

const dataSource = new Array(2000).fill(1).map((_val, index) => ({
  name: `Project #${index}`,
  count: index,
  key: index,
}))

const useStyles = createUseStyles(() => ({
  row: {
    display: 'table-row',
  },
  cell: {
    display: 'table-cell',
  },
}))

const CustomTable = React.forwardRef(
  <DataSource extends ReservedDataSourceProps<DataSource>>(
    props: React.ComponentPropsWithoutRef<'table'>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const { style: styleProps } = props

    const style = {
      display: 'table',

      ...(styleProps || {}),
    } as React.CSSProperties

    return <div {...props} ref={ref} style={style} />
  }
)

const CustomHeadWrapperComponent = React.forwardRef(
  (
    props: React.ComponentPropsWithoutRef<'td'>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const { style: styleProps } = props

    const style = {
      display: 'table-header-group',
      verticalAlign: 'middle',
      ...(styleProps || {}),
    } as React.CSSProperties

    return <div {...props} ref={ref} style={style} />
  }
)

const CustomHeadRowComponent = React.forwardRef(
  (
    props: React.ComponentPropsWithoutRef<'tr'>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const { style: styleProps } = props

    const style = {
      display: 'table-row',
      verticalAlign: 'inherit',
      ...(styleProps || {}),
    } as React.CSSProperties

    return <div {...props} ref={ref} style={style} />
  }
)

const CustomHeadCellComponent = React.forwardRef(
  (
    props: React.ComponentPropsWithoutRef<'th'>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const { style: styleProps } = props

    const style = {
      display: 'table-cell',
      verticalAlign: 'inherit',
      ...(styleProps || {}),
    } as React.CSSProperties

    return <div {...props} ref={ref} style={style} />
  }
)

const Row = <DataSource extends ReservedDataSourceProps<DataSource>>({
  index,
  style,
  data,
}: {
  index: number
  style: React.CSSProperties
} & { data: BodyProps<DataSource> }) => {
  const {
    hasFixedColumns,
    classes,
    dataSource,
    stripe,
    columns: mergedColumns,
    size,
  } = data

  const ownClassList = useStyles()

  const classesList = useTableBodyStyles()
  const tableCellContentStyles = useTableCellContentStyles()
  const classesMap = useClassList(classesList, classes)
  const currentDataSourceRow = dataSource[index]

  const { width: bodyWidth } = React.useContext(WidthContext)

  return (
    <div
      style={style}
      className={clsx(classesMap.bodyRow, ownClassList.row, {
        [classesMap.stripe]: stripe,
        [classesMap.hasFixedColumns]: hasFixedColumns,
      })}
    >
      {mergedColumns.map((column, index) => {
        const dataIndex = column.dataIndex as keyof Omit<
          DataSource,
          'key' | 'children'
        >

        // Обработка ширины зависит от выбранной пользователем метрической системы - проценты или пиксели
        const width = Number(column.width)
          ? column.width
          : (parseFloat(column.width as string) * bodyWidth) / 100

        return (
          <div
            key={`${dataIndex as string}-${index}`}
            style={{ width }}
            className={clsx(classesMap.bodyCell, ownClassList.cell)}
          >
            <div
              className={clsx(
                tableCellContentStyles.bodyCellContent,
                tableCellContentStyles[size as TableSizeProp]
              )}
            >
              {currentDataSourceRow[dataIndex]}
            </div>
          </div>
        )
      })}
    </div>
  )
}

const VirtualBody = <DataSource extends ReservedDataSourceProps<DataSource>>(
  props: BodyProps<DataSource>
) => {
  const { dataSource, classes, hoverable } = props

  const classesList = useTableBodyStyles()
  const classesMap = useClassList(classesList, classes)

  const className = clsx(classesList.bodyWrapperText, classesMap.body, {
    [classesMap.hoverable]: hoverable,
  })

  const resultListWidth = React.useMemo(
    () =>
      props.columns.reduce(
        (accum, column) => accum + ((column.width as number) || 0),
        0
      ),
    [props.columns]
  )

  return (
    <List<BodyProps<DataSource>>
      height={300}
      itemCount={dataSource.length}
      itemData={props}
      className={className}
      width={resultListWidth}
      itemSize={() => 50}
    >
      {Row}
    </List>
  )
}

const useVirtualizedColumns = <
  DataSource extends ReservedDataSourceProps<DataSource>
>(
  columns: ColumnProps<DataSource>[],
  tableWidth: number
): ColumnProps<DataSource>[] => {
  const withoutWidthColumnCount = React.useMemo(
    () => columns.filter(({ width }) => !width).length,
    [columns]
  )
  // Высчитывание "забронированной" ширины под колонки
  const bookedColumnWidth = React.useMemo(
    () =>
      columns.reduce((accum, columnData) => {
        let width = 0

        // Обработка ширины зависит от выбранной пользователем метрической системы - проценты или пиксели
        if (typeof columnData.width === 'string') {
          if (columnData.width[columnData.width.length - 1] === '%') {
            return 0
          }

          width = parseFloat(columnData.width)
        } else {
          width = columnData.width || width
        }

        return width ? accum + width : accum
      }, 0),
    [columns]
  )

  return React.useMemo(
    () =>
      columns.map((column) => {
        if (column.width) {
          return column
        }

        const val = Math.floor(
          (tableWidth - bookedColumnWidth) / withoutWidthColumnCount
        )

        const newValue = val < 0 ? DEFAULT_COLUMN_WIDTH : val

        return {
          ...column,
          width: newValue,
        }
      }),
    [bookedColumnWidth, withoutWidthColumnCount, columns, tableWidth]
  )
}

const VirtualTable = <DataSource extends ReservedDataSourceProps<DataSource>>({
  dataSource,
  columns,
}: VirtualTableProps<DataSource>) => {
  const [tableWidth, setTableWidth] = React.useState(0)
  const resizeRef = React.useRef<HTMLDivElement>(null)

  const newColumns = useVirtualizedColumns(columns, tableWidth)

  React.useEffect(() => {
    if (!resizeRef.current) {
      return
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          setTableWidth(entry.contentRect.width)
        }
      }
    })

    resizeObserver.observe(resizeRef.current)

    return () => {
      if (!resizeRef.current) {
        return
      }

      resizeObserver.unobserve(resizeRef.current)
    }
  }, [])

  const components = React.useMemo(
    () => ({
      body: VirtualBody,
      table: CustomTable,
      head: {
        wrapper: CustomHeadWrapperComponent,
        row: CustomHeadRowComponent,
        cell: CustomHeadCellComponent,
      },
    }),
    []
  )

  return (
    <WidthContext.Provider value={{ width: tableWidth }}>
      <Table<DataSource>
        ref={resizeRef}
        dataSource={dataSource}
        columns={newColumns}
        components={components}
        tableLayout="fixed"
      />
    </WidthContext.Provider>
  )
}

export const VirtualTableStory: React.FC = () => {
  return <VirtualTable dataSource={dataSource} columns={columns} />
}
