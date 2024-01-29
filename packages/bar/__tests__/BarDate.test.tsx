import * as React from 'react'
import { render } from '@testing-library/react'
import { Bar, BarDate } from '../src'

it('render full date in horizontal bar', () => {
  const { getByTestId } = render(
    <Bar>
      <BarDate data-testid="testId" />
    </Bar>
  )
  const dateContainer = getByTestId('testId').firstElementChild as HTMLElement
  expect(
    (dateContainer.firstElementChild as HTMLElement).textContent?.length
  ).toBe(10)
  expect(
    (dateContainer.lastElementChild as HTMLElement).textContent?.length
  ).toBe(5)
})

it('render full date in vertical expanded bar', () => {
  const { getByTestId } = render(
    <Bar expanded direction="vertical">
      <BarDate data-testid="testId" />
    </Bar>
  )
  const dateContainer = getByTestId('testId').firstElementChild as HTMLElement
  expect(
    (dateContainer.firstElementChild as HTMLElement).textContent?.length
  ).toBe(10)
  expect(
    (dateContainer.lastElementChild as HTMLElement).textContent?.length
  ).toBe(5)
})

it('render short date in vertical collapsed bar', () => {
  const { getByTestId } = render(
    <Bar direction="vertical">
      <BarDate data-testid="testId" />
    </Bar>
  )
  const dateContainer = getByTestId('testId').firstElementChild as HTMLElement
  expect(
    (dateContainer.firstElementChild as HTMLElement).textContent?.length
  ).toBe(5)
  expect(
    (dateContainer.lastElementChild as HTMLElement).textContent?.length
  ).toBe(5)
})
