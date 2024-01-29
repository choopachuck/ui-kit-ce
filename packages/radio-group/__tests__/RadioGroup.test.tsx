import * as React from 'react'
import { RadioGroup, RadioGroupProps, useCtx } from '../src'
import { fireEvent, render } from '@testing-library/react'

const RadioMock = (props: { label: string; value: string }) => {
  const { label, value } = props

  const radioGroupContext = useCtx()

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist()
    if (radioGroupContext.onChange) {
      radioGroupContext.onChange(event.target.value, event)
    }
  }

  const checked = radioGroupContext.value === value

  return (
    <label>
      {label}
      <input checked={checked} value={value} type="radio" onChange={onChange} />
    </label>
  )
}

const Component = (props: Partial<RadioGroupProps<string>>) => {
  const { onChange: onChangeProp, value: valueProp = '' } = props
  const [value, setValue] = React.useState(valueProp)

  const onChange = (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(value)
    onChangeProp?.(value, event)
  }

  return (
    <RadioGroup
      label="Выберите способ оплаты"
      value={value}
      onChange={onChange}
    >
      <RadioMock value="1" label="Первый" />
      <RadioMock value="2" label="Второй" />
      <RadioMock value="3" label="Третий" />
    </RadioGroup>
  )
}

it('set initial value correctly', () => {
  const { getByLabelText } = render(<Component value="2" />)

  const first = getByLabelText('Первый')
  const second = getByLabelText('Второй')
  const third = getByLabelText('Третий')
  expect(first).not.toBeChecked()
  expect(second).toBeChecked()
  expect(third).not.toBeChecked()
})

it('switch active element correctly', () => {
  const onChange = jest.fn()
  const { getByLabelText } = render(<Component value="2" onChange={onChange} />)

  const first = getByLabelText('Первый')
  const second = getByLabelText('Второй')
  const third = getByLabelText('Третий')

  expect(first).not.toBeChecked()
  expect(second).toBeChecked()
  expect(third).not.toBeChecked()
  fireEvent.click(third)
  expect(onChange).toBeCalledTimes(1)
  expect(onChange).toBeCalledWith('3', expect.anything())
  expect(first).not.toBeChecked()
  expect(second).not.toBeChecked()
  expect(third).toBeChecked()
})
