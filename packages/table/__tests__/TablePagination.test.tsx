import * as React from 'react'
import {
  TablePaginationDirectionType,
  TablePagination,
  TablePaginationProps,
  PickerProps,
} from '../src'
import { fireEvent, render, screen } from '@testing-library/react'
import { ElementSizeType } from '@v-uik/common'
import { Input } from '@v-uik/input'

const Component = (props: Partial<TablePaginationProps>) => {
  const {
    currentPage: initialCurrentPage = 1,
    pageSize: initialPageSize = 10,
    ...rest
  } = props
  const [currentPage, setCurrentPage] = React.useState(initialCurrentPage)
  const [pageSize, setPageSize] = React.useState(initialPageSize)

  return (
    <TablePagination
      data-testid="pagination"
      currentPage={currentPage}
      pageSize={pageSize}
      totalCount={100}
      onChange={setCurrentPage}
      onPageSizeChange={setPageSize}
      {...rest}
    />
  )
}

const components = {
  PageSizer: ({ onChange, value }: PickerProps) => {
    return (
      <Input
        inputProps={{ 'aria-label': 'размер страницы' }}
        value={value}
        onChange={onChange}
      />
    )
  },
  PagePicker: ({ onChange, value }: PickerProps) => {
    return (
      <Input
        inputProps={{ 'aria-label': 'выбор страницы' }}
        value={value}
        onChange={onChange}
      />
    )
  },
}

it('render with correct props', () => {
  const { getByTestId } = render(<Component />)

  expect(getByTestId('pagination')).toMatchSnapshot()
})

it.each(['sm', 'md', 'lg'])('render pagination with size props', (size) => {
  const { getByTestId } = render(<Component size={size as ElementSizeType} />)

  expect(getByTestId('pagination').className).toMatch(size)
})

it.each(['start', 'end'])(
  'render pagination with direction props',
  (direction) => {
    const { getByTestId } = render(
      <Component direction={direction as TablePaginationDirectionType} />
    )

    expect(getByTestId('pagination').className).toMatch(direction)
  }
)

it('render without absoluteArrows', () => {
  const { getAllByRole, queryByRole } = render(
    <Component paginationType="simple" absoluteArrows={false} />
  )

  expect(getAllByRole('button')).toHaveLength(2)
  expect(getAllByRole('button')).not.toHaveLength(4)
  expect(
    queryByRole('button', { name: 'предыдущая страница' })
  ).toBeInTheDocument()
  expect(
    queryByRole('button', { name: 'следующая страница' })
  ).toBeInTheDocument()
  expect(
    queryByRole('button', { name: 'последняя страница' })
  ).not.toBeInTheDocument()
  expect(
    queryByRole('button', { name: 'последняя страница' })
  ).not.toBeInTheDocument()
})

it('render absolute arrows', () => {
  const { getAllByRole, queryByRole } = render(<Component absoluteArrows />)

  expect(getAllByRole('button')).toHaveLength(4)
  expect(getAllByRole('button')).not.toHaveLength(2)

  expect(
    queryByRole('button', { name: 'предыдущая страница' })
  ).toBeInTheDocument()
  expect(
    queryByRole('button', { name: 'следующая страница' })
  ).toBeInTheDocument()
  expect(
    queryByRole('button', { name: 'последняя страница' })
  ).toBeInTheDocument()
  expect(queryByRole('button', { name: 'первая страница' })).toBeInTheDocument()
})

it('render pageRangeText', () => {
  const { getByText } = render(
    <Component
      currentPage={2}
      totalCount={100}
      pageSize={25}
      pageRangeText={(min, max) => `${min} из ${max} листов`}
    />
  )

  expect(getByText('2 из 4 листов')).toBeInTheDocument()
})

it('render itemRangeText', () => {
  const { getByText } = render(
    <Component
      paginationType="advanced"
      currentPage={2}
      totalCount={100}
      pageSize={25}
    />
  )

  expect(getByText('26–50 из 100 элементов')).toBeInTheDocument()
})

it('divider direction', () => {
  const { getByTestId } = render(
    <Component
      test-id="pagination"
      paginationType="advanced"
      currentPage={2}
      totalCount={100}
      pageSize={25}
      divider="bottom"
    />
  )

  expect(getByTestId('pagination').className).toMatch(/dividerBottom/i)
})

it('currentPage=1 - change on page size dont trigger event onChange', () => {
  const onChange = jest.fn()

  const { getByRole } = render(
    <Component
      paginationType="advanced"
      components={components}
      onChange={onChange}
    />
  )

  fireEvent.change(getByRole('textbox', { name: 'размер страницы' }), {
    target: { value: 20 },
  })
  expect(onChange).toHaveBeenCalledTimes(0)
})

it('currentPage>1 - change on page size trigger event onChange', () => {
  const onChange = jest.fn()

  const { getByRole } = render(
    <Component
      paginationType="advanced"
      currentPage={2}
      components={components}
      onChange={onChange}
    />
  )

  fireEvent.change(getByRole('textbox', { name: 'размер страницы' }), {
    target: { value: 20 },
  })
  expect(onChange).toHaveBeenCalledTimes(1)
})

it('move to first page after change page size', async () => {
  const { getByRole, getByText, findByText } = render(
    <Component paginationType="advanced" currentPage={3} />
  )

  expect(getByText('21–30 из 100 элементов')).toBeInTheDocument()

  const pageSize = getByRole('combobox', {
    name: 'размер страницы',
  })
  fireEvent.click(pageSize)
  // Приходится искать через текст, потому что элемент селекта это не кнопка
  const pageSize_20 = await screen.findByText('20')
  fireEvent.click(pageSize_20)

  expect(await findByText('1–20 из 100 элементов')).toBeInTheDocument()
})

it('aria-label changed', () => {
  const firstPageLabel = 'search page'

  const { queryByRole } = render(
    <Component
      absoluteArrows
      paginationType="simple"
      ariaAttributes={{
        firstPageLabel,
      }}
    />
  )

  expect(queryByRole('button', { name: firstPageLabel })).toBeInTheDocument()

  // проверяем что дефолтные значения не перетираются
  expect(
    queryByRole('button', { name: 'последняя страница' })
  ).toBeInTheDocument()
})
