import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { TableAlignmentType, TableSizeProp } from '../src'
import { TableHeadCellContent } from '../src/components'

it('render title', () => {
  const { getByText } = render(
    <TableHeadCellContent size="md" column={{ key: 'test' }}>
      Test Title
    </TableHeadCellContent>
  )

  expect(getByText('Test Title')).toBeInTheDocument()
})

it.each<TableSizeProp>(['sm', 'md', 'lg'])(
  'render cell content with %s size prop',
  (size) => {
    const { getByTestId } = render(
      <TableHeadCellContent
        data-testid="wrapper"
        size={size}
        column={{ key: 'test' }}
      >
        Test Title
      </TableHeadCellContent>
    )

    expect(getByTestId('wrapper').className).toMatch(size)
  }
)

it('click on wrapper fire event onChange', () => {
  const handleChangeCell = jest.fn()

  const { getByText, getByRole } = render(
    <TableHeadCellContent
      size="md"
      column={{ key: 'test', sortable: true }}
      onChange={handleChangeCell}
    >
      Test Title
    </TableHeadCellContent>
  )

  fireEvent.click(getByRole('button'))
  fireEvent.click(getByText('Test Title'))

  expect(handleChangeCell).toBeCalledTimes(2)
})

describe('render cell content with sortable prop', () => {
  it('should toggle class name if change props', () => {
    const { getByTestId, rerender } = render(
      <TableHeadCellContent
        size="md"
        column={{ key: 'test', sortable: true, sortOrder: 'asc' }}
      />
    )

    expect(getByTestId('ArrowDown')).toHaveStyle({ visibility: 'visible' })
    expect(getByTestId('ArrowUp')).toHaveStyle({ visibility: 'hidden' })

    rerender(
      <TableHeadCellContent
        size="md"
        column={{ key: 'test', sortable: true, sortOrder: 'desc' }}
      />
    )

    expect(getByTestId('ArrowDown')).toHaveStyle({ visibility: 'hidden' })
    expect(getByTestId('ArrowUp')).toHaveStyle({ visibility: 'visible' })
  })
})

it.each<{ align?: TableAlignmentType; className: string }>([
  { align: undefined, className: 'headerCellContentAlignLeft' },
  { align: 'left', className: 'headerCellContentAlignLeft' },
  { align: 'center', className: 'headerCellContentAlignCenter' },
  { align: 'right', className: 'headerCellContentAlignRight' },
])('render head cell content with alignment', ({ align, className }) => {
  const { getByTestId } = render(
    <TableHeadCellContent
      data-testid="alignment"
      size="md"
      column={{ key: 'test', sortable: true, align }}
    />
  )

  expect(getByTestId('alignment').className).toMatch(new RegExp(className, 'i'))
})
