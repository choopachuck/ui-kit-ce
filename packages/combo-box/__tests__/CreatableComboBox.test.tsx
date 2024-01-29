import * as React from 'react'
import {
  render,
  fireEvent,
  ByRoleMatcher,
  ByRoleOptions,
  waitForOptions,
} from '@testing-library/react'
import { Creatable } from '../src'

const options = [
  { value: '0', label: 'Нулевое', type: 'some' },
  { value: '1', label: 'Первое', type: 'other' },
  { value: '2', label: 'Второе', type: 'some' },
  { value: '3', label: 'Третье', type: 'other' },
]

it('new option is created for single choice', async () => {
  const { getByRole, findAllByRole, queryByText } = render(
    <Creatable options={options} />
  )

  const input = getByRole('textbox')
  const newOption = 'Новая опция'
  await createOption(input, findAllByRole, newOption)

  expect(queryByText(newOption))
})

it('new options is created for multiple choice', async () => {
  const { getByRole, findAllByRole, queryByText } = render(
    <Creatable options={options} />
  )

  const input = getByRole('textbox')
  const newOption1 = 'Новая опция'
  const newOption2 = 'Еще одна опция'
  await createOption(input, findAllByRole, newOption1)
  await createOption(input, findAllByRole, newOption2)

  expect(queryByText(`Нулевое, ${newOption1}, ${newOption2}`))
})

it('new option on first position', async () => {
  const { getByRole, findAllByRole } = render(
    <Creatable newOptionPosition="first" options={options} />
  )
  const input = getByRole('textbox')
  fireEvent.change(input, { target: { value: 'Тр' } })

  const foundOptions = await findAllByRole('option')
  expect(foundOptions.length).toBe(2)
  expect(foundOptions[0].textContent === '"Тр"').toBeTruthy()
})

it('new option on last position', async () => {
  const { getByRole, findAllByRole } = render(
    <Creatable newOptionPosition="last" options={options} />
  )
  const input = getByRole('textbox')
  fireEvent.change(input, { target: { value: 'Тр' } })

  const foundOptions = await findAllByRole('option')
  expect(foundOptions.length).toBe(2)
  expect(foundOptions[1].textContent === '"Тр"').toBeTruthy()
})

async function createOption(
  input: HTMLElement,
  findAllByRole: (
    role: ByRoleMatcher,
    options?: ByRoleOptions | undefined,
    waitForElementOptions?: waitForOptions | undefined
  ) => Promise<HTMLElement[]>,
  name: string
): Promise<void> {
  fireEvent.change(input, { target: { value: name } })
  const foundOptions = await findAllByRole('option')
  expect(foundOptions.length).toBe(1)
  fireEvent.click(foundOptions[0])
}
