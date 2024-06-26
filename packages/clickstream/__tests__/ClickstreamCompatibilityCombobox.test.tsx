/*--------------------------------------------------------------------------------------------------
 * --- Тестирование совместимости компонентов ComboBox и Autocomplete с провайдером ClickStream ----
 * -------------------------------------------------------------------------------------------------
 */

import * as React from 'react'
import { render, waitFor } from '@testing-library/react'
import { ClickStreamComponentsTest } from '../examples/ClickStreamComponentsTest'
import * as ClickStreamUtils from '../src/utils'
import userEvent from '@testing-library/user-event'
import { mockGlobals } from './helpers'

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

it('clickstream lib components compatibility: combobox::single', async () => {
  const handleBatch = jest.fn()
  const handleSendEvent = jest.fn()
  const expectedBatchCalls = 3

  const { getByTitle, findAllByRole } = render(
    <ClickStreamComponentsTest
      batchSize={expectedBatchCalls}
      onSendEvent={handleSendEvent}
      onBatch={handleBatch}
    />
  )

  const combobox = getByTitle('combobox')

  await waitFor(() => userEvent.click(combobox), { timeout: 1 })
  const foundOptions = await findAllByRole('option')

  await waitFor(() => userEvent.click(foundOptions[1]), { timeout: 1 })

  await waitFor(() =>
    expect(handleBatch).toHaveBeenCalledTimes(expectedBatchCalls)
  )
  await waitFor(() => expect(handleSendEvent).toMatchSnapshot())
})

it('clickstream lib components compatibility: combobox::multiple', async () => {
  const handleBatch = jest.fn()
  const handleSendEvent = jest.fn()
  const expectedBatchCalls = 15
  const searchValue = 'Треть'

  const { getByTitle, findAllByRole } = render(
    <ClickStreamComponentsTest
      batchSize={expectedBatchCalls}
      onSendEvent={handleSendEvent}
      onBatch={handleBatch}
    />
  )

  const combobox = getByTitle('combobox-multiple')
  const searchInput = getByTitle('combobox-multiple-search-input')

  await waitFor(() => userEvent.click(combobox), { timeout: 1 })
  let foundOptions = await findAllByRole('option')

  await waitFor(() => userEvent.click(foundOptions[1]), { timeout: 1 })
  await waitFor(() => userEvent.click(foundOptions[2]), { timeout: 1 })
  await waitFor(() => userEvent.click(foundOptions[2]), { timeout: 1 })
  await waitFor(() => userEvent.click(searchInput), { timeout: 1 })
  userEvent.keyboard(searchValue)

  foundOptions = await findAllByRole('option')

  await waitFor(() => userEvent.click(foundOptions[0]), { timeout: 1 })

  await waitFor(() => userEvent.click(combobox), { timeout: 1 })

  for (let i = 0; i <= searchValue.length; i++) {
    userEvent.keyboard('[Backspace]')
  }

  await waitFor(() => userEvent.tab(), { timeout: 1 })

  await waitFor(() => userEvent.click(combobox), { timeout: 1 })

  await waitFor(() =>
    expect(handleBatch).toHaveBeenCalledTimes(expectedBatchCalls)
  )
  await waitFor(() => expect(handleSendEvent).toMatchSnapshot())
})

it('clickstream lib components compatibility: combobox::creatable', async () => {
  const handleBatch = jest.fn()
  const handleSendEvent = jest.fn()
  const expectedBatchCalls = 4
  const newOption = 'Новая опция'

  const { getByTitle, findAllByRole } = render(
    <ClickStreamComponentsTest
      batchSize={expectedBatchCalls}
      onSendEvent={handleSendEvent}
      onBatch={handleBatch}
    />
  )

  const comboboxInput = getByTitle('combobox-creatable-input')

  await waitFor(() => userEvent.click(comboboxInput), { timeout: 1 })
  userEvent.keyboard(newOption)
  const foundOptions = await findAllByRole('option')
  await waitFor(() => userEvent.click(foundOptions[0]), { timeout: 1 })

  await waitFor(() => userEvent.tab(), { timeout: 1 })

  await waitFor(() =>
    expect(handleBatch).toHaveBeenCalledTimes(expectedBatchCalls)
  )
  await waitFor(() => expect(handleSendEvent).toMatchSnapshot())
})

it('clickstream lib components compatibility: autocomplete::keyboard', async () => {
  const handleBatch = jest.fn()
  const handleSendEvent = jest.fn()
  const expectedBatchCalls = 6

  const { getByTitle } = render(
    <ClickStreamComponentsTest
      batchSize={expectedBatchCalls}
      onSendEvent={handleSendEvent}
      onBatch={handleBatch}
    />
  )

  const searchInput = getByTitle(
    'autocomplete-search-input'
  ) as HTMLInputElement

  await waitFor(() => userEvent.click(searchInput), { timeout: 1 })

  userEvent.keyboard('о')

  await pause(100)

  userEvent.keyboard('[ArrowDown]')

  await pause(200)

  userEvent.keyboard('[ArrowDown]')

  await pause(100)

  userEvent.keyboard('[ArrowDown]')

  await pause(100)

  userEvent.keyboard('[ArrowDown]')

  await pause(100)

  userEvent.keyboard('[ArrowUp]')

  await pause(100)

  await waitFor(() =>
    expect(handleBatch).toHaveBeenCalledTimes(expectedBatchCalls)
  )
  await waitFor(() => expect(handleSendEvent).toMatchSnapshot())
})
