import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { AccordionItem, AccordionItemProps } from '../src'

const Component = (props: Partial<AccordionItemProps>) => (
  <AccordionItem header="header" {...props}>
    {props.children || 'content'}
  </AccordionItem>
)

it('renders correctly', () => {
  const { getByText, queryByText } = render(<Component />)
  expect(getByText('header')).toBeInTheDocument()
  expect(queryByText('content')).not.toBeInTheDocument()
})

it('show content when expanded', () => {
  const { queryByText, rerender } = render(<Component />)
  expect(queryByText('content')).not.toBeInTheDocument()
  rerender(<Component expanded />)
  expect(queryByText('content')).toBeInTheDocument()
})

it('handle click correctly', () => {
  const onClick = jest.fn()
  const { getByRole } = render(<Component onClick={onClick} />)
  expect(onClick).toBeCalledTimes(0)
  fireEvent.click(getByRole('button'))
  expect(onClick).toBeCalledTimes(1)
})

it("doesn't handle click when disabled", () => {
  const onClick = jest.fn()
  const { getByRole } = render(<Component disabled onClick={onClick} />)
  expect(onClick).toBeCalledTimes(0)
  fireEvent.click(getByRole('button'))
  expect(onClick).toBeCalledTimes(0)
})

it("generate id if it's not provided", () => {
  const { getByRole, getByText } = render(<Component expanded />)
  expect(getByRole('button')).toHaveAttribute('id')
  expect(getByText('content')).toHaveAttribute('id')
})

it('provide ARIA attributes correctly', () => {
  const { getByRole, getByText } = render(<Component expanded />)
  const header = getByRole('button')
  const content = getByText('content')
  expect(header.getAttribute('id')).toBe(
    content.getAttribute('aria-labelledby')
  )
  expect(content.getAttribute('id')).toBe(header.getAttribute('aria-controls'))
})
