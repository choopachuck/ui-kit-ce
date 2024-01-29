import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { DrawerHeader } from '../src'

it('render title & subtitle', () => {
  const { getByText } = render(
    <DrawerHeader subtitle="subtitle">title</DrawerHeader>
  )
  expect(getByText('title')).toBeInTheDocument()
  expect(getByText('subtitle')).toBeInTheDocument()
})

it('show close button depending on prop', () => {
  const { getByRole, queryByRole, rerender } = render(
    <DrawerHeader>title</DrawerHeader>
  )
  expect(getByRole('button')).toBeInTheDocument()
  rerender(<DrawerHeader showCloseButton={false}>title</DrawerHeader>)
  expect(queryByRole('button')).not.toBeInTheDocument()
})

it('handle onClose correctly', () => {
  const onClose = jest.fn()
  const { getByRole } = render(
    <DrawerHeader onClose={onClose}>title</DrawerHeader>
  )
  expect(onClose).toBeCalledTimes(0)
  fireEvent.click(getByRole('button'))
  expect(onClose).toBeCalledTimes(1)
})

it('position divider correctly', () => {
  const { getByRole } = render(
    <DrawerHeader dividerProps={{ role: 'presentation' }} />
  )
  expect(getByRole('presentation')).toHaveStyle('margin: 24px -24px 0')
})
