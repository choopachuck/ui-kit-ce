/*--------------------------------------------------------------------------------------------------
 * ----- Тестирование совместимости компонентов пакета date-picker с провайдером ClickStream -------
 * -------------------------------------------------------------------------------------------------
 */

import * as React from 'react'
import { render, waitFor } from '@testing-library/react'
import { ClickStreamComponentsTest } from '../examples/ClickStreamComponentsTest'
import * as ClickStreamUtils from '../src/utils'
import userEvent from '@testing-library/user-event'
import { getTimeButton } from '../examples/helpers'
import { mockGlobals } from './helpers'

// eslint-disable-next-line @typescript-eslint/no-empty-function
window.HTMLElement.prototype.scroll = function () {}

jest.useFakeTimers('modern').setSystemTime(new Date('2020-01-01'))
jest
  .spyOn(ClickStreamUtils, 'getISOTime')
  .mockImplementation(() => '2020-01-01T00:00:00.078-00:00')

const pause = async (ms: number) => {
  jest.advanceTimersByTime(ms)
  await Promise.resolve()
}

beforeAll(() => {
  mockGlobals()
})

it('clickstream lib components compatibility: date-time-picker::keyboard', async () => {
  const handleBatch = jest.fn()
  const handleSendEvent = jest.fn()
  const expectedBatchCalls = 7

  const { getByTitle } = render(
    <ClickStreamComponentsTest
      batchSize={expectedBatchCalls}
      onSendEvent={handleSendEvent}
      onBatch={handleBatch}
    />
  )

  const input = getByTitle('date-time-picker')

  await waitFor(() => userEvent.click(input), { timeout: 1 })

  expect(input).toHaveFocus()

  userEvent.keyboard('[ArrowDown]')

  await pause(200)

  userEvent.keyboard('[Enter]')

  await pause(200)

  userEvent.keyboard('[ArrowDown]')

  userEvent.keyboard('[Enter]')

  await pause(200)

  userEvent.keyboard('[ArrowDown]')

  userEvent.keyboard('[Enter]')

  await waitFor(() =>
    expect(handleBatch).toHaveBeenCalledTimes(expectedBatchCalls)
  )
  await waitFor(() => expect(handleSendEvent).toMatchSnapshot())
})

it('clickstream lib components compatibility: date-time-picker::mouseclick', async () => {
  const handleBatch = jest.fn()
  const handleSendEvent = jest.fn()
  const expectedBatchCalls = 5

  const { getByTitle, getByRole } = render(
    <ClickStreamComponentsTest
      batchSize={expectedBatchCalls}
      onSendEvent={handleSendEvent}
      onBatch={handleBatch}
    />
  )

  const input = getByTitle('date-time-picker')

  await waitFor(() => userEvent.click(input), { timeout: 1 })

  const container = getByRole('tooltip')
  let optionFirst = getTimeButton(container, 1, 1)

  await waitFor(() => userEvent.click(optionFirst), { timeout: 1 })

  await pause(1)

  optionFirst = getTimeButton(container, 2, 1)

  await waitFor(() => userEvent.click(optionFirst), { timeout: 1 })

  await waitFor(() =>
    expect(handleBatch).toHaveBeenCalledTimes(expectedBatchCalls)
  )
  await waitFor(() => expect(handleSendEvent).toMatchSnapshot())
})

it('clickstream lib components compatibility: time-picker::mouseclick', async () => {
  const handleBatch = jest.fn()
  const handleSendEvent = jest.fn()
  const expectedBatchCalls = 7

  const { getByTitle, findByRole } = render(
    <ClickStreamComponentsTest
      batchSize={expectedBatchCalls}
      onSendEvent={handleSendEvent}
      onBatch={handleBatch}
    />
  )

  const input = getByTitle('time-picker')
  const time = 4

  await waitFor(() => userEvent.click(input), { timeout: 1 })

  const dialog = await findByRole('dialog')
  const hourButton = getTimeButton(dialog, 1, time)

  await waitFor(() => userEvent.click(hourButton), { timeout: 1 })

  const minButton = getTimeButton(dialog, 2, time)

  await pause(1)

  await waitFor(() => userEvent.click(minButton), { timeout: 1 })

  const secButton = getTimeButton(dialog, 3, time)

  await pause(1)

  await waitFor(() => userEvent.click(secButton), { timeout: 1 })

  await waitFor(() =>
    expect(handleBatch).toHaveBeenCalledTimes(expectedBatchCalls)
  )
  await waitFor(() => expect(handleSendEvent).toMatchSnapshot())
})

it('clickstream lib components compatibility: time-range-picker::keyboard', async () => {
  const handleBatch = jest.fn()
  const handleSendEvent = jest.fn()
  const expectedBatchCalls = 13

  const { getByTitle } = render(
    <ClickStreamComponentsTest
      batchSize={expectedBatchCalls}
      onSendEvent={handleSendEvent}
      onBatch={handleBatch}
    />
  )

  const startInput = getByTitle('time-range-picker-start')

  // Выбор периода в первое поле

  await waitFor(() => userEvent.click(startInput), { timeout: 1 })

  userEvent.keyboard('[ArrowDown]')

  await pause(200)

  userEvent.keyboard('[ArrowDown]')

  await pause(200)

  userEvent.keyboard('[Enter]')

  await pause(200)

  userEvent.keyboard('[ArrowDown]')

  await pause(200)

  userEvent.keyboard('[Enter]')

  await pause(200)

  userEvent.keyboard('[ArrowDown]')

  await pause(200)

  userEvent.keyboard('[Enter]')

  await pause(200)

  // Переход на второе поле через Enter

  userEvent.keyboard('[Enter]')

  await pause(200)

  // Выбор периода во второе поле

  userEvent.keyboard('[ArrowDown]')

  await pause(200)

  userEvent.keyboard('[ArrowDown]')

  await pause(200)

  userEvent.keyboard('[Enter]')

  await pause(200)

  userEvent.keyboard('[ArrowDown]')

  await pause(200)

  userEvent.keyboard('[Enter]')

  await pause(200)

  userEvent.keyboard('[ArrowDown]')

  await pause(200)

  userEvent.keyboard('[Enter]')

  await pause(200)

  userEvent.keyboard('[Enter]')

  await pause(200)

  await waitFor(() =>
    expect(handleBatch).toHaveBeenCalledTimes(expectedBatchCalls)
  )
  await waitFor(() => expect(handleSendEvent).toMatchSnapshot())
})
