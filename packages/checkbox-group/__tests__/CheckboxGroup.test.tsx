import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { CheckboxGroup, CheckboxGroupProps } from '../src'
import { Checkbox } from '../../checkbox/src'

const Component = (props: CheckboxGroupProps) => (
  <CheckboxGroup {...props}>
    <Checkbox name="first" />
    <Checkbox name="second" />
    <Checkbox name="third" />
  </CheckboxGroup>
)

it('correctly positioning children', () => {
  const { getByTestId, rerender } = render(<Component data-testid="testId" />)

  expect(
    window.getComputedStyle(
      getByTestId('testId').firstElementChild as HTMLElement
    ).flexDirection
  ).toBe('')
  rerender(<Component data-testid="testId" direction="vertical" />)
  expect(
    window.getComputedStyle(
      getByTestId('testId').firstElementChild as HTMLElement
    ).flexDirection
  ).toBe('column')
})

it('removes margin from last element', () => {
  const { getByTestId, rerender } = render(<Component data-testid="testId" />)
  expect(
    window.getComputedStyle(
      (getByTestId('testId').firstElementChild as HTMLElement)
        .childNodes[2] as HTMLElement
    ).marginRight
  ).toBe('')
  rerender(<Component data-testid="testId" direction="vertical" />)
  expect(
    window.getComputedStyle(
      (getByTestId('testId').firstElementChild as HTMLElement)
        .childNodes[2] as HTMLElement
    ).marginBottom
  ).toBe('')
})

it('render label & helper text', () => {
  const { getByText } = render(
    <Component label="label" helperText="helper text" />
  )
  expect(getByText('label')).toBeInTheDocument()
  expect(getByText('helper text')).toBeInTheDocument()
})

it('handle change correctly', () => {
  const onChange = jest.fn()
  const { getAllByRole, rerender } = render(
    <Component value={[]} onChange={onChange} />
  )
  let checkboxes = getAllByRole('checkbox')
  expect(onChange).toHaveBeenCalledTimes(0)
  fireEvent.click(checkboxes[0])
  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(expect.anything(), ['first'])
  rerender(<Component value={['first']} onChange={onChange} />)
  checkboxes = getAllByRole('checkbox')
  fireEvent.click(checkboxes[1])
  expect(onChange).toHaveBeenCalledTimes(2)
  expect(onChange).toHaveBeenCalledWith(expect.anything(), ['first', 'second'])
  rerender(<Component value={['first', 'second']} onChange={onChange} />)
  checkboxes = getAllByRole('checkbox')
  fireEvent.click(checkboxes[0])
  expect(onChange).toHaveBeenCalledTimes(3)
  expect(onChange).toHaveBeenCalledWith(expect.anything(), ['second'])
  rerender(<Component value={['second']} onChange={onChange} />)
  checkboxes = getAllByRole('checkbox')
  fireEvent.click(checkboxes[1])
  expect(onChange).toHaveBeenCalledTimes(4)
  expect(onChange).toHaveBeenCalledWith(expect.anything(), [])
})
