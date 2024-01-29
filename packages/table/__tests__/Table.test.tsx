import * as React from 'react'
import { getAllByRole as domGetAllByRole } from '@testing-library/dom'
import { render, fireEvent, waitFor } from '@testing-library/react'
import {
  Table,
  TableProps,
  ColumnProps,
  CellProps,
  RecordDataSource,
  TableSize,
  TableAlignmentType,
} from '../src'

jest.mock('../src/components/TableHeadCellContent')

type DataSource = RecordDataSource<{ name: string; role: string }>

const dataSource = [
  { name: 'Вася', role: 'developer', key: 1 },
  { name: 'Слава', role: 'developer', key: 2 },
  { name: 'Антон', role: 'manager', key: 3 },
  { name: 'Артем', role: 'designer', key: 4 },
  { name: 'Фил', role: 'designer', key: 5 },
]

const columns: ColumnProps<DataSource>[] = [
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Имя',
  },
  {
    key: 'role',
    dataIndex: 'role',
    title: 'Роль',
  },
]

const Component = (props: Partial<TableProps<DataSource>>) => {
  return <Table dataSource={dataSource} columns={columns} {...props} />
}

it('render basic table', () => {
  const { getByRole, getAllByRole } = render(<Component />)

  expect(getByRole('columnheader', { name: 'Имя' })).toBeInTheDocument()
  expect(getByRole('columnheader', { name: 'Роль' })).toBeInTheDocument()

  expect(getByRole('row', { name: 'Вася developer' })).toBeInTheDocument()

  expect(getAllByRole('cell', { name: 'designer' })).toHaveLength(2)
})

it('render fixed table layout', () => {
  const { getByRole, rerender } = render(<Component />)

  const table = getByRole('table')

  expect(window.getComputedStyle(table).tableLayout).toBe('auto')

  rerender(<Component tableLayout="fixed" />)

  expect(window.getComputedStyle(table).tableLayout).toBe('fixed')
})

it('second cell of first row should span 2 and second cell of second row should hidden', () => {
  const { getAllByRole, getByRole, rerender } = render(<Component />)

  expect(getAllByRole('cell', { name: 'developer' })).toHaveLength(2)

  const columns: ColumnProps<DataSource>[] = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Имя',
    },
    {
      key: 'role',
      dataIndex: 'role',
      title: 'Роль',
      setCellProps({ cellIndex, rowIndex }) {
        const props: CellProps = {}

        if (cellIndex === 1 && rowIndex === 0) {
          props.rowSpan = 2
        }

        if (cellIndex === 1 && rowIndex === 1) {
          props.rowSpan = 0
          props.colSpan = 0
        }

        return props
      },
    },
  ]

  rerender(<Component columns={columns} />)

  expect(getByRole('cell', { name: 'developer' })).toHaveAttribute(
    'rowspan',
    '2'
  )
})

it('fire onClick event if click on header cell', () => {
  const handleHeaderCellClick = jest.fn()

  const columns: ColumnProps<DataSource>[] = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Имя',
    },
    {
      key: 'role',
      dataIndex: 'role',
      title: 'Роль',
      setCellProps() {
        return {
          onClick() {
            handleHeaderCellClick()
          },
        }
      },
    },
  ]

  const { getByRole } = render(<Component columns={columns} />)
  const cell = getByRole('cell', { name: 'manager' })

  fireEvent.click(cell)

  expect(handleHeaderCellClick).toBeCalledTimes(1)
})

it('fire onClick event if click on body cell', () => {
  const handleCellClick = jest.fn()

  const columns: ColumnProps<DataSource>[] = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Имя',
    },
    {
      key: 'role',
      dataIndex: 'role',
      title: 'Роль',
      setCellProps() {
        return {
          onClick() {
            handleCellClick()
          },
        }
      },
    },
  ]

  const { getByRole } = render(<Component columns={columns} />)
  const cell = getByRole('cell', { name: 'manager' })

  fireEvent.click(cell)

  expect(handleCellClick).toBeCalledTimes(1)
})

it('fire onClick event if click on row', () => {
  const handleRowClick = jest.fn()

  const setRowProps: TableProps<DataSource>['setRowProps'] = () => {
    return {
      onClick() {
        handleRowClick()
      },
    }
  }

  const { getByRole } = render(<Component setRowProps={setRowProps} />)
  const cell = getByRole('cell', { name: 'manager' })

  fireEvent.click(cell)

  expect(handleRowClick).toBeCalledTimes(1)
})

it('render custom cell content', () => {
  const columns: ColumnProps<DataSource>[] = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Имя',
    },
    {
      key: 'role',
      title: 'Роль',
      renderCellContent({ row }) {
        if (row.role === 'manager') {
          return <div>Sir {row.name}</div>
        }

        return row.name
      },
    },
    {
      key: 'empty',
      title: 'empty',
      renderCellContent() {
        return null
      },
    },
  ]

  const { getByRole } = render(<Component columns={columns} />)

  expect(getByRole('cell', { name: 'Sir Антон' })).toBeInTheDocument()
  expect(
    (getByRole('row', { name: 'Антон Sir Антон' }) as HTMLTableRowElement)
      .cells[2]
  ).toBeEmptyDOMElement()
})

it('render custom header cell content', () => {
  const columns: ColumnProps<DataSource>[] = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Имя',
    },
    {
      key: 'role',
      dataIndex: 'role',
      title: 'Роль',
      renderHeaderCellContent({ title }) {
        if (title === 'Роль') {
          return <div>{title} Апероль</div>
        }
      },
    },
  ]

  const { getByRole } = render(<Component columns={columns} />)

  expect(
    getByRole('columnheader', { name: 'Роль Апероль' })
  ).toBeInTheDocument()
})

it('render header cell content with correct props', () => {
  const columns: ColumnProps<DataSource>[] = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Имя',
      sortable: true,
    },
  ]

  const { getByRole } = render(
    <Component columns={columns} size={TableSize.sm} onChange={() => 'test'} />
  )

  const headerCellContent = getByRole('columnheader', { name: 'Имя' })
    .firstElementChild as HTMLElement

  expect(headerCellContent.getAttribute('data-size')).toBe('sm')
  expect(headerCellContent.getAttribute('data-sortable')).toBe('true')
  expect(headerCellContent.getAttribute('data-on-change')).toBe("() => 'test'")
  expect(headerCellContent.getAttribute('data-data-index')).toBe('name')
})

it('expandable row', async () => {
  function ExpandableTable() {
    const [expandedRows, setExpandedRows] = React.useReducer(
      (state: React.Key[], key: React.Key) => {
        const filtered = state.filter((el) => el !== key)

        return filtered.length === state.length ? state.concat(key) : filtered
      },
      []
    )

    const columns: ColumnProps<DataSource>[] = [
      {
        key: 'expand',
        kind: 'expand',
        isRowExpanded: ({ row }) => {
          if (row.key === undefined) {
            return false
          }

          return expandedRows.includes(row.key)
        },
        renderExpandableContent: () => <div>Expandable Row</div>,
      },
    ]

    return (
      <Component
        columns={columns}
        onChange={(params) => {
          if (params.type === 'expand' && params.row.key) {
            setExpandedRows(params.row.key)
          }
        }}
      />
    )
  }

  const { getAllByRole, queryByText, findByText } = render(<ExpandableTable />)

  const firstExpandableCell = getAllByRole('button', {
    name: 'Раскрыть строку',
  })[0]

  expect(firstExpandableCell).toBeInTheDocument()

  expect(queryByText('Expandable Row')).not.toBeInTheDocument()

  fireEvent.click(firstExpandableCell)

  expect(await findByText('Expandable Row')).toBeInTheDocument()
})

describe('render empty data state', () => {
  it('with default slot', () => {
    const { getByText } = render(<Component dataSource={[]} />)

    expect(getByText('Нет данных')).toBeInTheDocument()
  })

  it('with custom slot', () => {
    const { getByText } = render(
      <Component dataSource={[]} emptyData={<div>Custom slot</div>} />
    )

    expect(getByText('Custom slot')).toBeInTheDocument()
  })
})

it('render striped table', () => {
  const { getAllByRole } = render(<Component stripe />)

  getAllByRole('row')
    .slice(1)
    .forEach((el, index) => {
      if (index % 2 !== 0) {
        expect(el.className).toMatch(/stripe/i)
      }
    })
})

describe('render tree data correctly', () => {
  const TreeDataTable = () => {
    const dataSource = [
      { key: '1', name: 'First', role: '' },
      {
        key: '2',
        name: 'Second',
        role: '',
        children: [
          { key: '21', name: 'First subrow', role: '' },
          { key: '22', name: 'Second subrow', role: '' },
          {
            key: '23',
            name: 'Third subrow',
            role: '',
            children: [{ key: '31', name: 'First subsubrow', role: '' }],
          },
        ],
      },
      { key: '3', name: 'Third', role: '' },
    ]

    const [treeExpandedRows, setTreeExpandedRows] = React.useState<{
      [key in React.Key]: boolean
    }>({})

    const columns: ColumnProps<DataSource>[] = [
      {
        key: 'name',
        dataIndex: 'name',
        title: 'Имя',
        kind: 'tree',
        isRowExpanded: ({ row }) => {
          if (row.key === undefined) {
            return false
          }

          return treeExpandedRows[row.key]
        },
      },
    ]

    return (
      <Component
        dataSource={dataSource}
        columns={columns}
        onChange={(params) => {
          if (params.type === 'treeExpand') {
            const newRows = { ...treeExpandedRows }
            const key = params.row.key as string
            if (newRows[key]) {
              delete newRows[key]
            } else {
              newRows[key] = true
            }
            setTreeExpandedRows(newRows)
          }
        }}
      />
    )
  }

  it('render expand button', () => {
    const { getByLabelText } = render(<TreeDataTable />)
    expect(getByLabelText('Раскрыть строку')).toBeInTheDocument()
  })

  it('expand/collapse tree correctly', async () => {
    const { getByLabelText, getAllByLabelText } = render(<TreeDataTable />)
    expect(document.querySelectorAll('tr').length).toBe(4)
    fireEvent.click(getByLabelText('Раскрыть строку'))
    await waitFor(() => expect(document.querySelectorAll('tr').length).toBe(7))
    fireEvent.click(getByLabelText('Раскрыть строку'))
    await waitFor(() => expect(document.querySelectorAll('tr').length).toBe(8))
    fireEvent.click(getAllByLabelText('Свернуть строку')[0])
    await waitFor(() => expect(document.querySelectorAll('tr').length).toBe(4))
  })

  it('adds indents correctly', async () => {
    const { getByLabelText, getByText, findByText } = render(<TreeDataTable />)

    const firstRowHelper = getByText('First')
      .previousElementSibling as HTMLElement
    expect(window.getComputedStyle(firstRowHelper)['paddingLeft']).toBe('44px')

    const secondRowHelper = (
      getByText('Second').previousElementSibling as HTMLElement
    ).previousElementSibling as HTMLElement
    expect(window.getComputedStyle(secondRowHelper)['paddingLeft']).toBe('12px')

    fireEvent.click(getByLabelText('Раскрыть строку'))

    const firstSubRowHelper = (await findByText('First subrow'))
      .previousElementSibling as HTMLElement
    expect(window.getComputedStyle(firstSubRowHelper)['paddingLeft']).toBe(
      '76px'
    )

    const thirdSubRowHelper = (
      getByText('Third subrow').previousElementSibling as HTMLElement
    ).previousElementSibling as HTMLElement
    expect(window.getComputedStyle(thirdSubRowHelper)['paddingLeft']).toBe(
      '44px'
    )

    fireEvent.click(getByLabelText('Раскрыть строку'))

    const firstSubSubRowHelper = (await findByText('First subsubrow'))
      .previousElementSibling as HTMLElement
    expect(window.getComputedStyle(firstSubSubRowHelper)['paddingLeft']).toBe(
      '108px'
    )
  })
})

describe('render fixed elements correctly', () => {
  it('change tableLayout if fixed columns exists', () => {
    const columns: ColumnProps<DataSource>[] = [
      {
        key: 'name',
        dataIndex: 'name',
        title: 'Имя',
        fixed: 'start',
        width: 100,
      },
    ]
    const { getByRole } = render(
      <Component columns={columns} dataSource={[]} />
    )

    expect(window.getComputedStyle(getByRole('table'))['tableLayout']).toBe(
      'fixed'
    )
  })

  it('set container dimensions correctly', () => {
    const { getByTestId } = render(
      <Component data-testid="testId" width={500} height={300} />
    )
    const container = getByTestId('testId')
    expect(window.getComputedStyle(container)['width']).toBe('500px')
    expect(window.getComputedStyle(container)['height']).toBe('300px')
  })

  it('fix header correctly', () => {
    render(<Component fixedHeader columns={columns} dataSource={dataSource} />)
    const headerCell = document.querySelectorAll('th')[0]
    expect(window.getComputedStyle(headerCell)['position']).toBe('sticky')
    expect(window.getComputedStyle(headerCell)['top']).toBe('0px')
  })

  it('fix columns correctly', () => {
    const dataSource = [
      {
        key: 1,
        name: 'Вася',
        role: 'developer',
        phone: '123456789',
        city: 'Москва',
        age: 20,
      },
    ]

    const columns: ColumnProps<DataSource>[] = [
      {
        key: 'name',
        dataIndex: 'name',
        title: 'Имя',
        fixed: 'start',
        width: 100,
      },
      {
        key: 'role',
        dataIndex: 'role',
        title: 'Роль',
        fixed: 'start',
        width: 150,
      },
      { key: 'phone', dataIndex: 'phone', title: 'Телефон' },
      {
        key: 'city',
        dataIndex: 'city',
        title: 'Город',
        fixed: 'end',
        width: 100,
      },
      {
        key: 'age',
        dataIndex: 'age',
        title: 'Возраст',
        fixed: 'end',
        width: 50,
      },
    ]
    const { getByText } = render(
      <Component columns={columns} dataSource={dataSource} />
    )

    expect(
      window.getComputedStyle(getByText('Вася').parentElement as HTMLElement)[
        'position'
      ]
    ).toBe('sticky')
    expect(
      window.getComputedStyle(getByText('Вася').parentElement as HTMLElement)[
        'left'
      ]
    ).toBe('0px')

    expect(
      window.getComputedStyle(
        getByText('developer').parentElement as HTMLElement
      )['left']
    ).toBe('100px')

    expect(
      window.getComputedStyle(getByText('20').parentElement as HTMLElement)[
        'right'
      ]
    ).toBe('0px')

    expect(
      window.getComputedStyle(getByText('Москва').parentElement as HTMLElement)[
        'right'
      ]
    ).toBe('50px')
  })

  it('fix columns correctly with string width', () => {
    const dataSource = [
      {
        key: 1,
        name: 'Вася',
        surname: 'Петров',
        patronymic: 'Васильевич',
        role: 'developer',
        experience: 2,
        phone: '123456789',
        secondPhone: '1234567890',
        city: 'Москва',
        age: 20,
      },
    ]

    const columns: ColumnProps<DataSource>[] = [
      {
        key: 'name',
        dataIndex: 'name',
        title: 'Имя',
        fixed: 'start',
        width: 100,
      },
      {
        key: 'surname',
        dataIndex: 'surname',
        title: 'Фамилия',
        fixed: 'start',
        width: '250px',
      },
      {
        key: 'patronymic',
        dataIndex: 'patronymic',
        title: 'Отчество',
        fixed: 'start',
        width: '25%',
      },
      {
        key: 'role',
        dataIndex: 'role',
        title: 'Роль',
        fixed: 'start',
        width: '150px',
      },
      {
        key: 'experience',
        dataIndex: 'experience',
        title: 'Стаж',
        fixed: 'start',
        width: '10%',
      },
      {
        key: 'phone',
        dataIndex: 'phone',
        title: 'Телефон',
        fixed: 'start',
        width: 170,
      },
      {
        key: 'secondPhone',
        dataIndex: 'secondPhone',
        title: 'Второй телефон',
        width: 170,
      },
      {
        key: 'city',
        dataIndex: 'city',
        title: 'Город',
        fixed: 'end',
        width: '30%',
      },
      {
        key: 'age',
        dataIndex: 'age',
        title: 'Возраст',
        fixed: 'end',
        width: '20%',
      },
    ]
    const { getByText } = render(
      <Component columns={columns} dataSource={dataSource} />
    )

    expect(
      window.getComputedStyle(
        getByText(dataSource[0].name).parentElement as HTMLElement
      )['position']
    ).toBe('sticky')
    expect(
      window.getComputedStyle(
        getByText(dataSource[0].name).parentElement as HTMLElement
      )['left']
    ).toBe('0px')

    expect(
      window.getComputedStyle(
        getByText(dataSource[0].name).parentElement as HTMLElement
      )['left']
    ).toBe('0px')

    expect(
      window.getComputedStyle(
        getByText(dataSource[0].surname).parentElement as HTMLElement
      )['left']
    ).toBe('100px')

    expect(
      window.getComputedStyle(
        getByText(dataSource[0].patronymic).parentElement as HTMLElement
      )['left']
    ).toBe('350px')

    expect(
      window.getComputedStyle(
        getByText(dataSource[0].role).parentElement as HTMLElement
      )['left']
    ).toBe('calc(350px + 25%)')

    expect(
      window.getComputedStyle(
        getByText(dataSource[0].experience).parentElement as HTMLElement
      )['left']
    ).toBe('calc(350px + 25% + 150px)')

    expect(
      window.getComputedStyle(
        getByText(dataSource[0].phone).parentElement as HTMLElement
      )['left']
    ).toBe('calc(350px + 25% + 150px + 10%)')

    expect(
      window.getComputedStyle(
        getByText(dataSource[0].age).parentElement as HTMLElement
      )['right']
    ).toBe('0px')

    expect(
      window.getComputedStyle(
        getByText(dataSource[0].city).parentElement as HTMLElement
      )['right']
    ).toBe('calc(0px + 20%)')
  })
})

it('render multiline header correctly', () => {
  const columns: ColumnProps<DataSource>[] = [
    {
      key: 'id',
      dataIndex: 'id',
      title: '#',
    },
    {
      key: 'data',
      dataIndex: 'data',
      title: 'Пользовательские данные',
      children: [
        {
          key: 'name',
          dataIndex: 'phone',
          title: 'ФИО',
          children: [
            { key: 'lastName', dataIndex: 'lastName', title: 'фамилия' },
            { key: 'firstName', dataIndex: 'firstName', title: 'имя' },
          ],
        },
        {
          key: 'address',
          dataIndex: 'address',
          title: 'Адрес',
          children: [
            { key: 'city', dataIndex: 'city', title: 'город' },
            { key: 'street', dataIndex: 'street', title: 'улица' },
            { key: 'building', dataIndex: 'building', title: 'дом' },
          ],
        },
        { key: 'phone', dataIndex: 'phone', title: 'Телефон' },
      ],
    },
  ]

  const { getAllByRole } = render(<Component columns={columns} />)
  const header = getAllByRole('rowgroup')[0]
  expect(header.childElementCount).toBe(3)
  const headerRows = domGetAllByRole(header, 'row')

  expect(headerRows[0].childElementCount).toBe(2)
  let rowColumns = domGetAllByRole(headerRows[0], 'columnheader')
  expect(rowColumns[0]).toHaveAttribute('rowspan', '3')
  expect(rowColumns[0]).not.toHaveAttribute('colspan')
  expect(rowColumns[1]).not.toHaveAttribute('rowspan')
  expect(rowColumns[1]).toHaveAttribute('colspan', '6')

  expect(headerRows[1].childElementCount).toBe(3)
  rowColumns = domGetAllByRole(headerRows[1], 'columnheader')
  expect(rowColumns[0]).not.toHaveAttribute('rowspan')
  expect(rowColumns[0]).toHaveAttribute('colspan', '2')
  expect(rowColumns[1]).not.toHaveAttribute('rowspan')
  expect(rowColumns[1]).toHaveAttribute('colspan', '3')
  expect(rowColumns[2]).toHaveAttribute('rowspan', '2')
  expect(rowColumns[2]).not.toHaveAttribute('colspan')

  expect(headerRows[2].childElementCount).toBe(5)
  rowColumns = domGetAllByRole(headerRows[2], 'columnheader')
  expect(rowColumns[0]).not.toHaveAttribute('rowspan')
  expect(rowColumns[0]).not.toHaveAttribute('colspan')
  expect(rowColumns[1]).not.toHaveAttribute('rowspan')
  expect(rowColumns[1]).not.toHaveAttribute('colspan')
  expect(rowColumns[2]).not.toHaveAttribute('rowspan')
  expect(rowColumns[2]).not.toHaveAttribute('colspan')
  expect(rowColumns[3]).not.toHaveAttribute('rowspan')
  expect(rowColumns[3]).not.toHaveAttribute('colspan')
  expect(rowColumns[4]).not.toHaveAttribute('rowspan')
  expect(rowColumns[4]).not.toHaveAttribute('colspan')
})

test('render table cell content with alignment', () => {
  const classes: Record<TableAlignmentType, string> = {
    left: 'bodyCellContentAlignLeft',
    center: 'bodyCellContentAlignCenter',
    right: 'bodyCellContentAlignRight',
  } as const

  const dataSource = [
    { test1: 'test1', test2: 'test2', name: 'test3', role: 'test4', key: 1 },
  ]

  const { getAllByRole } = render(
    <Component
      data-testid="alignment"
      size="md"
      columns={[
        { key: 'test1', sortable: true },
        { key: 'test2', sortable: true, align: 'left' },
        { key: 'role', sortable: true, align: 'center' },
        { key: 'name', sortable: true, align: 'right' },
      ]}
      dataSource={dataSource}
    />
  )

  expect(getAllByRole('cell')[0].className).not.toMatch(
    new RegExp(`${classes.left}|${classes.center}|${classes.right}`, 'i')
  )
  expect(getAllByRole('cell')[1].className).toMatch(
    new RegExp(classes.left, 'i')
  )
  expect(getAllByRole('cell')[2].className).toMatch(
    new RegExp(classes.center, 'i')
  )
  expect(getAllByRole('cell')[3].className).toMatch(
    new RegExp(classes.right, 'i')
  )
})
