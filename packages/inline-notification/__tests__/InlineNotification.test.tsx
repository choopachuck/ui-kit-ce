/* eslint-disable @typescript-eslint/no-empty-function */

import * as React from 'react'
import { render } from '@testing-library/react'
import { InlineNotification } from '../src'

it('set title correctly ', () => {
  const { getByRole } = render(<InlineNotification title="custom title" />)

  expect(getByRole('alert')).toHaveTextContent('custom title')
})

it('set description correctly', () => {
  const { getByRole } = render(
    <InlineNotification>description field</InlineNotification>
  )

  expect(getByRole('alert')).toHaveTextContent('description field')
})

it('has correct default view', () => {
  const { queryByRole } = render(<InlineNotification />)
  expect(
    document.querySelectorAll('div[class^="indicator"]')[0]
  ).toBeInTheDocument()
  expect(document.querySelectorAll('div[class^="icon"]')[0]).toBeInTheDocument()
  expect(queryByRole('button')).not.toBeInTheDocument()
})

it('hide indicator, icon', () => {
  render(<InlineNotification showIndicator={false} icon={false} />)
  expect(
    document.querySelectorAll('div[class^="indicator"]')[0]
  ).toBeUndefined()
  expect(document.querySelectorAll('div[class^="icon"]')[0]).toBeUndefined()
})

it('custom icon', () => {
  const { getByRole } = render(<InlineNotification icon="❤️" />)
  expect(getByRole('alert')).toHaveTextContent('❤️')
})

it('shows close button', () => {
  const { getByRole } = render(<InlineNotification onClose={() => {}} />)

  expect(getByRole('button')).toBeInTheDocument()
})

it('shows actions', () => {
  const { getByRole } = render(
    <InlineNotification actions={<button>action</button>} />
  )

  expect(getByRole('button', { name: /action/i })).toBeInTheDocument()
})
