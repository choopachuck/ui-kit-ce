import * as React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Breadcrumbs, BreadcrumbsProps } from '../src'

const Component = ({ children, ...rest }: BreadcrumbsProps<'ul'>) => (
  <Breadcrumbs {...rest}>
    {children || [
      <span key="1">1</span>,
      <span key="2">2</span>,
      <span key="3">3</span>,
      <span key="4">4</span>,
      <span key="5">5</span>,
    ]}
  </Breadcrumbs>
)

it("doesn't collapse if maxItems larger than children", () => {
  const { getAllByRole } = render(<Component maxItems={5} />)
  expect(getAllByRole('listitem').length).toBe(5)
})

it('collapse items correctly', () => {
  const { getByText, queryByText, rerender } = render(
    <Component maxItems={3} />
  )
  expect(getByText('1')).toBeInTheDocument()
  expect(queryByText('2')).not.toBeInTheDocument()
  expect(queryByText('3')).not.toBeInTheDocument()
  expect(queryByText('4')).not.toBeInTheDocument()
  expect(getByText('5')).toBeInTheDocument()
  rerender(
    <Component maxItems={5} itemsBeforeCollapse={3} itemsAfterCollapse={2}>
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
      <span>6</span>
      <span>7</span>
    </Component>
  )
  expect(getByText('1')).toBeInTheDocument()
  expect(queryByText('2')).toBeInTheDocument()
  expect(queryByText('3')).toBeInTheDocument()
  expect(queryByText('4')).not.toBeInTheDocument()
  expect(queryByText('5')).not.toBeInTheDocument()
  expect(getByText('6')).toBeInTheDocument()
  expect(getByText('7')).toBeInTheDocument()
})

it('shows collapsed items on hover', async () => {
  const { getByText, queryByText } = render(<Component maxItems={3} />)
  expect(queryByText('2')).not.toBeInTheDocument()
  expect(queryByText('3')).not.toBeInTheDocument()
  expect(queryByText('4')).not.toBeInTheDocument()
  fireEvent.mouseEnter(getByText('...'))
  await waitFor(() => {
    expect(getByText('2')).toBeInTheDocument()
    expect(getByText('3')).toBeInTheDocument()
    expect(getByText('4')).toBeInTheDocument()
  })
})
