import { fireEvent, render, waitFor } from '@testing-library/react'
import * as React from 'react'
import { Tooltip, TooltipProps } from '../src'

const Component = (props: Partial<TooltipProps>) => (
  <Tooltip {...props}>
    <button>button</button>
  </Tooltip>
)

it('show tooltip on hover', async () => {
  const { getByRole, queryByText } = render(
    <Component dropdownProps={{ content: 'content' }} />
  )
  const button = getByRole('button')
  expect(queryByText('content')).not.toBeInTheDocument()
  fireEvent.click(button)
  await waitFor(() => expect(queryByText('content')).not.toBeInTheDocument())
  fireEvent.mouseEnter(button)
  await waitFor(() => expect(queryByText('content')).toBeInTheDocument())
  fireEvent.mouseLeave(button)
  await waitFor(() => expect(queryByText('content')).not.toBeInTheDocument())
})

it('not show tooltip on hover with empty content', async () => {
  const { getByRole, queryByRole } = render(
    <Component dropdownProps={{ content: '' }} />
  )
  const button = getByRole('button')
  expect(queryByRole('tooltip')).not.toBeInTheDocument()
  fireEvent.click(button)
  await waitFor(() => expect(queryByRole('tooltip')).not.toBeInTheDocument())
  fireEvent.mouseEnter(button)
  await waitFor(() => expect(queryByRole('tooltip')).not.toBeInTheDocument())
  fireEvent.mouseLeave(button)
  await waitFor(() => expect(queryByRole('tooltip')).not.toBeInTheDocument())
})

it('show tooltip on click', async () => {
  const { getByRole, queryByText, getByText } = render(
    <>
      <div>outside</div>
      <Component dropdownProps={{ action: 'click', content: 'content' }} />
    </>
  )
  const button = getByRole('button')
  expect(queryByText('content')).not.toBeInTheDocument()
  fireEvent.mouseEnter(button)
  await waitFor(() => expect(queryByText('content')).not.toBeInTheDocument())
  fireEvent.click(button)
  await waitFor(() => expect(queryByText('content')).toBeInTheDocument())
  fireEvent.mouseDown(getByText('outside'))
  await waitFor(() => expect(queryByText('content')).not.toBeInTheDocument())
})

it('not show tooltip on click with empty content', async () => {
  const { getByRole, queryByRole, getByText } = render(
    <>
      <div>outside</div>
      <Component dropdownProps={{ action: 'click', content: '' }} />
    </>
  )
  const button = getByRole('button')
  expect(queryByRole('tooltip')).not.toBeInTheDocument()
  fireEvent.mouseEnter(button)
  await waitFor(() => expect(queryByRole('tooltip')).not.toBeInTheDocument())
  fireEvent.click(button)
  await waitFor(() => expect(queryByRole('tooltip')).not.toBeInTheDocument())
  fireEvent.mouseDown(getByText('outside'))
  await waitFor(() => expect(queryByRole('tooltip')).not.toBeInTheDocument())
})

it('shows tooltip on child focus and hover', async () => {
  const { getByRole, queryByText } = render(
    <Component showOnChildFocus dropdownProps={{ content: 'content' }} />
  )

  const button = getByRole('button')
  expect(queryByText('content')).not.toBeInTheDocument()
  fireEvent.focus(button)
  await waitFor(() => expect(queryByText('content')).toBeInTheDocument())
  fireEvent.blur(button)
  await waitFor(() => expect(queryByText('content')).not.toBeInTheDocument())

  fireEvent.mouseEnter(button)
  await waitFor(() => expect(queryByText('content')).toBeInTheDocument())
  fireEvent.mouseLeave(button)
  await waitFor(() => expect(queryByText('content')).not.toBeInTheDocument())
})

it('render indicator', async () => {
  const { getByRole, rerender } = render(
    <Component dropdownProps={{ content: 'content' }} />
  )
  const button = getByRole('button')
  fireEvent.mouseEnter(button)
  await waitFor(() => {
    expect(document.getElementsByTagName('svg')[0]).toBeUndefined()
  })
  rerender(<Component indicator dropdownProps={{ content: 'content' }} />)
  await waitFor(() => {
    const icon = document.getElementsByTagName('svg')[0]
    expect(icon).toBeInTheDocument()
    expect(icon.getAttribute('class')).toMatch(/indicator/)
  })
})

it('render one-line content', async () => {
  const { getByRole, getByText, rerender } = render(
    <Component dropdownProps={{ content: 'content' }} />
  )
  const button = getByRole('button')
  fireEvent.mouseEnter(button)
  await waitFor(() => {
    expect(getByText('content')).not.toHaveStyle('white-space: nowrap')
  })
  rerender(<Component single dropdownProps={{ content: 'content' }} />)
  await waitFor(() => {
    expect(getByText('content')).toHaveStyle('white-space: nowrap')
  })
})

it('handles interactive', async () => {
  const { getByRole, queryByText } = render(
    <Component interactive dropdownProps={{ content: 'content' }} />
  )

  const button = getByRole('button')
  expect(button).toHaveAttribute('aria-expanded', 'false')
  expect(button).toHaveAttribute('aria-controls')
  expect(queryByText('content')).not.toBeInTheDocument()

  fireEvent.mouseEnter(button)
  await waitFor(() => expect(queryByText('content')).not.toBeInTheDocument())
  fireEvent.focus(button)
  await waitFor(() => expect(queryByText('content')).not.toBeInTheDocument())
  expect(button).toHaveAttribute('aria-expanded', 'false')

  fireEvent.click(button)
  await waitFor(() => expect(queryByText('content')).toBeInTheDocument())
  expect(button).toHaveAttribute('aria-expanded', 'true')
  fireEvent.mouseLeave(button)
  await waitFor(() => expect(queryByText('content')).toBeInTheDocument())
  fireEvent.blur(button)
  await waitFor(() => expect(queryByText('content')).toBeInTheDocument())

  fireEvent.keyDown(button, { key: 'Escape' })
  await waitFor(() => expect(queryByText('content')).not.toBeInTheDocument())
  expect(button).toHaveAttribute('aria-expanded', 'false')
})
