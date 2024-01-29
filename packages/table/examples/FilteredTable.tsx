import * as React from 'react'
import {
  Table,
  ColumnProps,
  RecordDataSource,
  Checkbox,
  Select,
  Input,
  DatePicker,
  useDateLibAdapter,
  Button,
} from '@v-uik/base'
import { IconSettings } from './assets/IconSettings'

type DataSource = RecordDataSource<{
  name: string
  passed: boolean
  age: number
  date: Date
}>
type FilterType = 'equals' | 'includes' | 'greaterThan' | 'lessThan' | 'none'
type FilterValue = string | number | boolean | Date
type Filter = { type: FilterType; value?: FilterValue }
type ColumnsFilter = Record<string, Filter>

const defaultValue: FilterValue = ''
const defaultType: FilterType = 'none'

// данные
const getDataSource: () => DataSource[] = () => [
  {
    name: 'Vasya',
    passed: true,
    age: 100,
    date: new Date('2022-12-01'),
    key: 1,
  },
  {
    name: 'Slava',
    passed: false,
    age: 28,
    date: new Date('2022-12-23'),
    key: 2,
  },
  {
    name: 'Anton',
    passed: true,
    age: 28,
    date: new Date('2022-11-15'),
    key: 3,
  },
  {
    name: 'Artem',
    passed: true,
    age: 55,
    date: new Date('2021-05-01'),
    key: 4,
  },
  {
    name: 'Fillip',
    passed: false,
    age: 0,
    date: new Date('2022-12-01'),
    key: 5,
  },
  {
    name: 'Denis',
    passed: true,
    age: 24,
    date: new Date('2012-12-01'),
    key: 6,
  },
  {
    name: 'Konstantin',
    passed: true,
    age: 24,
    date: new Date('2123-11-11'),
    key: 7,
  },
  {
    name: 'Pavel',
    passed: false,
    age: 24,
    date: new Date('1022-12-01'),
    key: 8,
  },
  {
    name: 'Evgeniy',
    passed: false,
    age: 24,
    date: new Date('9999-12-01'),
    key: 9,
  },
]

// колонки
const getColumns = (
  onChange: (column: string) => (filter: Filter) => void,
  columnsFilter: ColumnsFilter,
  dateAdapter: ReturnType<typeof useDateLibAdapter>
): ColumnProps<DataSource>[] => {
  return [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
      renderHeaderCellContent: ({ title, dataIndex }) => {
        return (
          <CustomColumnHeading
            title={title as string}
            field={
              <TextField
                filter={columnsFilter[dataIndex as string]}
                onChange={onChange(dataIndex as string)}
              />
            }
          />
        )
      },
    },
    {
      key: 'passed',
      dataIndex: 'passed',
      title: 'Passed',
      renderCellContent: ({ row }) => {
        return <Checkbox checked={row.passed} />
      },
      renderHeaderCellContent: ({ title, dataIndex }) => {
        return (
          <CustomColumnHeading
            title={title as string}
            field={
              <BooleanField
                filter={columnsFilter[dataIndex as string]}
                onChange={onChange(dataIndex as string)}
              />
            }
          />
        )
      },
    },
    {
      key: 'age',
      dataIndex: 'age',
      title: 'Age',
      renderHeaderCellContent: ({ title, dataIndex }) => {
        return (
          <CustomColumnHeading
            title={title as string}
            field={
              <NumberField
                filter={columnsFilter[dataIndex as string]}
                onChange={onChange(dataIndex as string)}
              />
            }
          />
        )
      },
    },
    {
      key: 'date',
      dataIndex: 'date',
      title: 'Date',
      renderCellContent: ({ cell }) => {
        return <div>{dateAdapter.format(cell, 'fullDate')}</div>
      },
      renderHeaderCellContent: ({ title, dataIndex }) => {
        return (
          <CustomColumnHeading
            title={title as string}
            field={
              <DateField
                filter={columnsFilter[dataIndex as string]}
                onChange={onChange(dataIndex as string)}
              />
            }
          />
        )
      },
    },
  ]
}

// пользовательский заголовок с фильтрацией
const CustomColumnHeading = ({
  title,
  field,
}: {
  title: string
  field: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '8px',
        }}
      >
        {title}
        <div
          style={{ display: 'flex', cursor: 'pointer' }}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <IconSettings />
        </div>
      </div>
      {isOpen && <div style={{ position: 'absolute', zIndex: 2 }}>{field}</div>}
    </>
  )
}

// таблица
export const FilteredTable = (): JSX.Element => {
  const dateAdapter = useDateLibAdapter()
  const [columnsFilter, setColumnsFilter] = React.useState<ColumnsFilter>({})

  const onChangeFilter = React.useCallback(
    (column: string) => (filter: Filter) => {
      setColumnsFilter((prev) => {
        return {
          ...prev,
          [column]: filter,
        }
      })
    },
    []
  )

  const columns = React.useMemo(() => {
    return getColumns(onChangeFilter, columnsFilter, dateAdapter)
  }, [columnsFilter, onChangeFilter])

  const filteredData = React.useMemo(
    () => getFilteredData(columnsFilter, getDataSource),
    [columnsFilter]
  )

  return (
    <Table
      dataSource={filteredData}
      columns={columns}
      style={{ minHeight: 300 }}
    />
  )
}

// функции фильтрации

function getFilteredData(
  columnsFilter: ColumnsFilter,
  getDataSource: () => DataSource[]
): DataSource[] {
  let data = getDataSource()
  for (const [column, filter] of Object.entries(columnsFilter)) {
    data = data.filter((x: DataSource) =>
      isFiltered(
        x[column as keyof Omit<DataSource, 'key'>] as FilterValue,
        filter
      )
    )
  }

  return data
}

function isFiltered(tableData: FilterValue, filter: Filter) {
  if (filter.type === 'none') {
    return true
  }

  if (filter.value === undefined) {
    throw new Error('Filter value must be defined!')
  }

  if (filter.type === 'equals') {
    return tableData === filter.value
  }
  if (filter.type === 'includes') {
    const formattedData = String(tableData).toLocaleLowerCase()
    const formattedValue = String(filter.value).toLocaleLowerCase()

    return formattedData.includes(formattedValue)
  }
  if (filter.type === 'greaterThan') {
    return tableData > filter.value
  }
  if (filter.type === 'lessThan') {
    return tableData < filter.value
  }
}

//компоненты отображения типовых фильтраций (text -> includes, boolean/number -> equals, date, etc...)

const FieldContainer = ({
  typeComponent,
  valueComponent,
  apply,
  clear,
}: {
  typeComponent?: React.ReactNode
  valueComponent?: React.ReactNode
  apply?: () => void
  clear: () => void
}) => {
  return (
    <div
      style={{
        marginTop: '5px',
        width: '130px',
        backgroundColor: '#e5e5e5',
        padding: '8px',
        borderRadius: '8px',
        boxShadow: '2px 2px 2px rgba(0,0,0,0.2)',
      }}
    >
      {typeComponent && (
        <>
          <div style={{ fontFamily: 'sans-serif' }}>Filter type</div>
          {typeComponent}
        </>
      )}
      {valueComponent && (
        <>
          <div style={{ fontFamily: 'sans-serif', marginTop: '12px' }}>
            Value
          </div>
          {valueComponent}
        </>
      )}
      <FilterControls apply={apply} clear={clear} />
    </div>
  )
}

const TextField = ({
  onChange,
  filter,
}: {
  onChange: (filter: Filter) => void
  filter: Filter
}) => {
  const type: FilterType = 'includes'
  const [value, setValue] = React.useState<FilterValue>(
    filter?.value ?? defaultValue
  )

  const apply = React.useCallback(() => {
    onChange({ type, value })
  }, [value, onChange])

  const clear = React.useCallback(() => {
    setValue(defaultValue)
    onChange({ type: 'none' })
  }, [setValue, onChange])

  return (
    <FieldContainer
      typeComponent={
        <Input fullWidth disabled value={type} style={{ maxWidth: '150px' }} />
      }
      valueComponent={
        <Input
          fullWidth
          value={value as string}
          style={{ maxWidth: '150px' }}
          onChange={setValue}
        />
      }
      apply={apply}
      clear={clear}
    />
  )
}

enum TValue {
  ON = 'on',
  OFF = 'off',
}

const BooleanField = ({
  onChange,
  filter,
}: {
  onChange: (filter: Filter) => void
  filter: Filter
}) => {
  const type: FilterType = 'equals'
  const [value, setValue] = React.useState<FilterValue>(
    filter?.value ?? defaultValue
  )

  const apply = React.useCallback(() => {
    onChange({ type, value })
  }, [value, onChange])

  const clear = React.useCallback(() => {
    setValue(defaultValue)
    onChange({ type: 'none' })
  }, [setValue, onChange])

  const handleChange = React.useCallback(
    (v: TValue) => {
      setValue(v === TValue.ON ? true : false)
    },
    [setValue]
  )

  return (
    <FieldContainer
      typeComponent={
        <Input fullWidth disabled value={type} style={{ maxWidth: '150px' }} />
      }
      valueComponent={
        <Select
          value={value ? TValue.ON : TValue.OFF}
          options={[
            { value: TValue.ON, label: TValue.ON },
            { value: TValue.OFF, label: TValue.OFF },
          ]}
          onChange={handleChange}
        />
      }
      apply={value !== '' ? apply : undefined}
      clear={clear}
    />
  )
}

const NumberField = ({
  onChange,
  filter,
}: {
  onChange: (filter: Filter) => void
  filter: Filter
}) => {
  const [type, setType] = React.useState<FilterType>(
    filter?.type ?? defaultType
  )
  const [value, setValue] = React.useState(filter?.value ?? defaultValue)

  const apply = React.useCallback(() => {
    onChange({ type, value: +value })
  }, [value, type, onChange])

  const clear = React.useCallback(() => {
    setValue(defaultValue)
    onChange({ type: 'none' })
  }, [setValue, onChange])

  return (
    <FieldContainer
      typeComponent={
        <Select
          value={type}
          options={[
            { value: 'equals', label: 'equals' },
            { value: 'greaterThan', label: 'greaterThan' },
            { value: 'lessThan', label: 'lessThan' },
          ]}
          onChange={(v: string) => setType(v as FilterType)}
        />
      }
      valueComponent={
        <Input
          fullWidth
          value={String(value)}
          style={{ maxWidth: '150px' }}
          onChange={setValue}
        />
      }
      apply={apply}
      clear={clear}
    />
  )
}

const DateField = ({
  onChange,
  filter,
}: {
  onChange: (filter: Filter) => void
  filter: Filter
}) => {
  const [type, setType] = React.useState<FilterType>(
    filter?.type ?? defaultType
  )
  const [date, setDate] = React.useState<Date | null>(
    (filter?.value as Date) ?? null
  )

  const apply = React.useCallback(() => {
    onChange({ type, value: date ? date : undefined })
  }, [date, type, onChange])

  const clear = React.useCallback(() => {
    setDate(null)
    onChange({ type: 'none' })
  }, [setDate, onChange])

  return (
    <FieldContainer
      typeComponent={
        <Select
          value={type}
          options={[
            { value: 'lessThan', label: 'before' },
            { value: 'greaterThan', label: 'after' },
          ]}
          style={{ width: '130px' }}
          onChange={(v: string) => setType(v as FilterType)}
        />
      }
      valueComponent={
        <DatePicker
          value={date}
          mask="11.11.1111"
          inputProps={{ placeholder: 'дд.мм.гггг' }}
          renderInput={({ value }) => (
            <Button style={{ width: '130px' }}>
              {value ? value : 'Change'}
            </Button>
          )}
          onChange={setDate}
        />
      }
      apply={apply}
      clear={clear}
    />
  )
}

const FilterControls = ({
  apply,
  clear,
}: {
  apply?: () => void
  clear: () => void
}) => {
  return (
    <div style={{ display: 'flex', marginTop: '8px', gap: '4px' }}>
      <Button size="sm" disabled={!apply} onClick={apply}>
        ✔
      </Button>
      <Button size="sm" color="error" onClick={clear}>
        x
      </Button>
    </div>
  )
}
