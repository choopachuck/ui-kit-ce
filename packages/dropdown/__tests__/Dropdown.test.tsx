import * as React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Dropdown } from '../src'
import { Button } from '../../button/src'

it('show content on click', () => {
  const onStateChange = jest.fn()
  const { queryByText, getByRole } = render(
    <Dropdown content="content" onStateChange={onStateChange}>
      <Button>button</Button>
    </Dropdown>
  )
  expect(queryByText('content')).not.toBeInTheDocument()
  expect(onStateChange).toHaveBeenCalledTimes(0)
  fireEvent.mouseEnter(getByRole('button'))
  expect(queryByText('content')).not.toBeInTheDocument()
  expect(onStateChange).toHaveBeenCalledTimes(0)
  fireEvent.contextMenu(getByRole('button'))
  expect(queryByText('content')).not.toBeInTheDocument()
  expect(onStateChange).toHaveBeenCalledTimes(0)
  fireEvent.click(getByRole('button'))
  expect(onStateChange).toHaveBeenCalledTimes(1)
  expect(onStateChange).toHaveBeenCalledWith(true)
  expect(queryByText('content')).toBeInTheDocument()
})

it('show content on hover', async () => {
  const onStateChange = jest.fn()
  const { queryByText, getByRole } = render(
    <Dropdown action="hover" content="content" onStateChange={onStateChange}>
      <Button>button</Button>
    </Dropdown>
  )
  expect(queryByText('content')).not.toBeInTheDocument()
  expect(onStateChange).toHaveBeenCalledTimes(0)
  fireEvent.click(getByRole('button'))
  expect(queryByText('content')).not.toBeInTheDocument()
  expect(onStateChange).toHaveBeenCalledTimes(0)
  fireEvent.contextMenu(getByRole('button'))
  expect(queryByText('content')).not.toBeInTheDocument()
  expect(onStateChange).toHaveBeenCalledTimes(0)
  fireEvent.mouseEnter(getByRole('button'))
  await waitFor(() => {
    expect(onStateChange).toHaveBeenCalledTimes(1)
    expect(onStateChange).toHaveBeenCalledWith(true)
    expect(queryByText('content')).toBeInTheDocument()
  })
})

it('show content on right click', async () => {
  const onStateChange = jest.fn()
  const { queryByText, getByRole } = render(
    <Dropdown action="hover" content="content" onStateChange={onStateChange}>
      <Button>button</Button>
    </Dropdown>
  )
  expect(queryByText('content')).not.toBeInTheDocument()
  expect(onStateChange).toHaveBeenCalledTimes(0)
  fireEvent.click(getByRole('button'))
  expect(queryByText('content')).not.toBeInTheDocument()
  expect(onStateChange).toHaveBeenCalledTimes(0)
  fireEvent.mouseEnter(getByRole('button'))
  expect(queryByText('content')).not.toBeInTheDocument()
  expect(onStateChange).toHaveBeenCalledTimes(0)
  fireEvent.contextMenu(getByRole('button'))
  await waitFor(() => {
    expect(onStateChange).toHaveBeenCalledTimes(1)
    expect(onStateChange).toHaveBeenCalledWith(true)
    expect(queryByText('content')).toBeInTheDocument()
  })
})

it('show content when navigating from keyboard', () => {
  const onStateChange = jest.fn()
  const { queryByText, getByRole } = render(
    <Dropdown action="hover" content="content" onStateChange={onStateChange}>
      <Button>button</Button>
    </Dropdown>
  )
  expect(queryByText('content')).not.toBeInTheDocument()
  expect(onStateChange).toHaveBeenCalledTimes(0)
  fireEvent.keyDown(getByRole('button'), { key: 'Enter' })
  expect(onStateChange).toHaveBeenCalledTimes(1)
  expect(onStateChange).toHaveBeenCalledWith(true)
  expect(queryByText('content')).toBeInTheDocument()
  fireEvent.keyDown(getByRole('button'), { key: 'Escape' })
  expect(onStateChange).toHaveBeenCalledTimes(2)
  expect(onStateChange).toHaveBeenCalledWith(false)
  expect(queryByText('content')).not.toBeInTheDocument()
})

it('close dropdown when click outside', () => {
  const onStateChange = jest.fn()
  const { queryByText, getByRole, getByText } = render(
    <>
      <Dropdown content="content" onStateChange={onStateChange}>
        <Button>button</Button>
      </Dropdown>
      <div>outside</div>
    </>
  )
  fireEvent.click(getByRole('button'))
  expect(queryByText('content')).toBeInTheDocument()
  expect(onStateChange).toHaveBeenCalledTimes(1)
  fireEvent.mouseDown(getByText('outside'))
  expect(onStateChange).toHaveBeenCalledTimes(2)
  expect(onStateChange).toHaveBeenCalledWith(false)
  expect(queryByText('content')).not.toBeInTheDocument()
})
