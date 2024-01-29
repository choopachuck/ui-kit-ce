import * as React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Stepper, Step, StepperProps } from '../src'

const Component = ({
  onChange,
  errorIndex,
  ...rest
}: Partial<StepperProps & { errorIndex: number }>) => {
  const handleChangeActive = (index: number) => {
    onChange?.(index)
  }

  return (
    <Stepper onChange={handleChangeActive} {...rest} data-testid="stepper">
      {['First', 'Second', 'Third', 'Fourth', 'Fifth'].map((step, index) => (
        <Step
          key={index}
          data-testid={step}
          index={index}
          description={`${step} description`}
          error={errorIndex === index}
          onClick={() => handleChangeActive(index)}
        >
          {step}
        </Step>
      ))}
    </Stepper>
  )
}

it('set direction correctly', () => {
  const { getByTestId, rerender } = render(<Component />)

  let computedStyle = window.getComputedStyle(getByTestId('stepper'))
  expect(computedStyle.getPropertyValue('display')).toBe('flex')
  expect(computedStyle.getPropertyValue('flex-direction')).not.toBe('column')
  rerender(<Component direction="vertical" />)

  computedStyle = window.getComputedStyle(getByTestId('stepper'))

  expect(computedStyle.getPropertyValue('display')).toBe('flex')
  expect(computedStyle.getPropertyValue('flex-direction')).toBe('column')
})

it('set description correctly', () => {
  const { getByText } = render(<Component />)

  expect(getByText('First description'))
  expect(getByText('Second description'))
  expect(getByText('Third description'))
  expect(getByText('Fourth description'))
  expect(getByText('Fifth description'))
})

it('handle change active element correctly', () => {
  const onChange = jest.fn()
  const { getByTestId, rerender } = render(<Component onChange={onChange} />)

  const secondStep = getByTestId('Second')
  const fifthStep = getByTestId('Fifth')

  fireEvent.click(secondStep)
  expect(onChange).toBeCalledTimes(0)

  rerender(<Component clickable onChange={onChange} />)
  fireEvent.click(secondStep)
  expect(onChange).toBeCalledWith(1)
  fireEvent.click(fifthStep)
  expect(onChange).toBeCalledWith(4)
})

it('set error step correctly', () => {
  const { getByTestId, rerender } = render(
    <Component clickable errorIndex={1} />
  )

  const secondStep = getByTestId('Second')
  expect(secondStep.className).toMatch(/error/i)
  rerender(<Component clickable errorIndex={1} activeStep={1} />)
  // проверяем что активный элемент перекрывает ошибку
  expect(secondStep.className).not.toMatch(/error/i)
  expect(secondStep.className).toMatch(/active/i)
})
