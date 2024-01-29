import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ModalHeader } from '../src'

it('render title & subtitle', () => {
  const { getByText } = render(
    <ModalHeader subtitle="subtitle">title</ModalHeader>
  )
  expect(getByText('title')).toBeInTheDocument()
  expect(getByText('subtitle')).toBeInTheDocument()
})

it('show close button depending on prop', () => {
  const { getByRole, queryByRole, rerender } = render(
    <ModalHeader>title</ModalHeader>
  )
  expect(getByRole('button')).toBeInTheDocument()
  rerender(<ModalHeader showCloseButton={false}>title</ModalHeader>)
  expect(queryByRole('button')).not.toBeInTheDocument()
})

it('handle close button click correctly', () => {
  const onClick = jest.fn()
  const { getByRole } = render(
    <ModalHeader closeButtonProps={{ onClick }}>title</ModalHeader>
  )
  expect(onClick).toBeCalledTimes(0)
  fireEvent.click(getByRole('button'))
  expect(onClick).toBeCalledTimes(1)
})
