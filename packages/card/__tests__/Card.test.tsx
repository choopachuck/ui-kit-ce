import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { Card } from '../src'
import userEvent from '@testing-library/user-event'

it('handle onChange in kind="selectable"', () => {
  const onChange = jest.fn()

  const { getByRole } = render(
    <Card
      checked
      kind="selectable"
      header="Header"
      subtitle="Subtitle"
      onChange={onChange}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
    </Card>
  )

  expect(onChange).toHaveBeenCalledTimes(0)
  fireEvent.click(getByRole('checkbox'))
  expect(onChange).toHaveBeenCalledTimes(1)
  expect(getByRole('checkbox')).toBeChecked()
})

it('handle onClick in kind="clickable"', () => {
  const onClick = jest.fn()

  const { getByRole } = render(
    <Card
      kind="clickable"
      header="Header"
      subtitle="Subtitle"
      onClick={onClick}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
    </Card>
  )

  expect(onClick).toHaveBeenCalledTimes(0)
  fireEvent.click(getByRole('button'))
  expect(onClick).toHaveBeenCalledTimes(1)
})

it("doesn't handle change callback when selectable Card disabled", () => {
  const onChange = jest.fn()

  const { getByRole } = render(
    <Card
      disabled
      checked={false}
      kind="selectable"
      header="Header"
      subtitle="Subtitle"
      onChange={onChange}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
    </Card>
  )

  expect(getByRole('checkbox')).toBeDisabled()
  expect(onChange).toHaveBeenCalledTimes(0)
  userEvent.click(getByRole('checkbox'))
  expect(onChange).toHaveBeenCalledTimes(0)
  expect(getByRole('checkbox')).not.toBeChecked()
})

it("doesn't handle click callback when clickable Card disabled", () => {
  const onClick = jest.fn()

  const { getByRole } = render(
    <Card
      disabled
      kind="clickable"
      header="Header"
      subtitle="Subtitle"
      onClick={onClick}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
    </Card>
  )

  expect(getByRole('button').getAttribute('class')).toMatch(/disabled/gi)
  expect(onClick).toHaveBeenCalledTimes(0)
  fireEvent.click(getByRole('button'))

  expect(onClick).toHaveBeenCalledTimes(0)
})
