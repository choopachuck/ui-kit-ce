import * as React from 'react'
import { Switch } from '../src'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

it('should be rendered and when clicked become checked', () => {
  const { getByRole } = render(<Switch />)

  userEvent.click(getByRole('checkbox'))

  expect(getByRole('checkbox')).toBeChecked()
})

it('should become not checked when double clicked', () => {
  const onChange = jest.fn()

  const { getByRole } = render(<Switch onChange={onChange} />)

  const element = getByRole('checkbox')

  userEvent.dblClick(element)

  expect(onChange).toHaveBeenCalledTimes(2)
  expect(element).not.toBeChecked()
})

it('should be called onChange if enabled', () => {
  const onChange = jest.fn()

  const { getByRole } = render(<Switch onChange={onChange} />)

  const element = getByRole('checkbox')

  userEvent.click(element)

  expect(onChange).toHaveBeenCalledTimes(1)
})

it('the disabled property must be true if passed the disabled property is true', () => {
  const { getByRole } = render(<Switch disabled />)

  const element = getByRole('checkbox')

  expect(element).toHaveProperty('disabled', true)
})
