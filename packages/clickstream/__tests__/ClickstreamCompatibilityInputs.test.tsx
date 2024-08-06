/*--------------------------------------------------------------------------------------------------
 * ------- Тестирование совместимости компонентов Input и Select с провайдером ClickStream ---------
 * -------------------------------------------------------------------------------------------------
 */

import * as React from 'react'
import { render, waitFor } from '@testing-library/react'
import { ClickStreamComponentsTest } from '../examples/ClickStreamComponentsTest'
import * as ClickStreamUtils from '../src/utils'
import { mockGlobals } from './helpers'
import { userEvent } from '../../../jest/utils'

jest.useFakeTimers('modern').setSystemTime(new Date('2020-01-01'))
jest
  .spyOn(ClickStreamUtils, 'getISOTime')
  .mockImplementation(() => '2020-01-01T00:00:00.078-00:00')

beforeAll(() => {
  mockGlobals()
})

it('clickstream lib components compatibility: input-text', async () => {
  const handleBatch = jest.fn()
  const handleSendEvent = jest.fn()
  const expectedBatchCalls = 2

  const { getByTitle } = render(
    <ClickStreamComponentsTest
      batchSize={expectedBatchCalls}
      onSendEvent={handleSendEvent}
      onBatch={handleBatch}
    />
  )

  const input = getByTitle('input-text')

  await waitFor(() => userEvent.click(input), { timeout: 1 })
  userEvent.keyboard('new value')
  await waitFor(() => userEvent.tab(), { timeout: 1 })

  await waitFor(() =>
    expect(handleBatch).toHaveBeenCalledTimes(expectedBatchCalls)
  )
  await waitFor(() => expect(handleSendEvent).toMatchSnapshot())
})

it('clickstream lib components compatibility: input-number', async () => {
  const handleBatch = jest.fn()
  const handleSendEvent = jest.fn()
  const expectedBatchCalls = 2

  const { getByTitle } = render(
    <ClickStreamComponentsTest
      batchSize={expectedBatchCalls}
      onSendEvent={handleSendEvent}
      onBatch={handleBatch}
    />
  )

  const input = getByTitle('input-number')

  await waitFor(() => userEvent.click(input), { timeout: 1 })
  userEvent.keyboard('15')
  await waitFor(() => userEvent.tab(), { timeout: 1 })

  await waitFor(() =>
    expect(handleBatch).toHaveBeenCalledTimes(expectedBatchCalls)
  )
  await waitFor(() => expect(handleSendEvent).toMatchSnapshot())
})

it('clickstream lib components compatibility: input-password', async () => {
  const handleBatch = jest.fn()
  const handleSendEvent = jest.fn()
  const expectedBatchCalls = 2

  const { getByTitle } = render(
    <ClickStreamComponentsTest
      batchSize={expectedBatchCalls}
      onSendEvent={handleSendEvent}
      onBatch={handleBatch}
    />
  )

  const input = getByTitle('input-password')

  await waitFor(() => userEvent.click(input), { timeout: 1 })
  userEvent.keyboard('new password')
  await waitFor(() => userEvent.tab(), { timeout: 1 })

  await waitFor(() =>
    expect(handleBatch).toHaveBeenCalledTimes(expectedBatchCalls)
  )
  await waitFor(() => expect(handleSendEvent).toMatchSnapshot())
})

it('clickstream lib components compatibility: input clear button', async () => {
  const handleBatch = jest.fn()
  const handleSendEvent = jest.fn()
  const expectedBatchCalls = 2

  const { getByTitle } = render(
    <ClickStreamComponentsTest
      batchSize={expectedBatchCalls}
      onSendEvent={handleSendEvent}
      onBatch={handleBatch}
    />
  )
  const clearButton = getByTitle('input-text-clear-button')

  await waitFor(() => userEvent.click(clearButton), { timeout: 1 })

  await waitFor(() =>
    expect(handleBatch).toHaveBeenCalledTimes(expectedBatchCalls)
  )
  expect(handleSendEvent).toMatchSnapshot()
})

it('clickstream lib components compatibility: masked-input', async () => {
  const handleBatch = jest.fn()
  const handleSendEvent = jest.fn()
  const expectedBatchCalls = 4

  const { getByTitle } = render(
    <ClickStreamComponentsTest
      batchSize={expectedBatchCalls}
      onSendEvent={handleSendEvent}
      onBatch={handleBatch}
    />
  )

  const input = getByTitle('masked-input') as HTMLInputElement

  await waitFor(() => userEvent.click(input), { timeout: 1 })

  await userEvent.typeMasked(input, '21212')

  await waitFor(() => userEvent.tab(), { timeout: 1 })

  await waitFor(() => userEvent.click(input), { timeout: 1 })

  // userEvent производит лишние манипуляции в selectionRange у инпута и перемещает каретку всегда в конец маски;
  // нужно всегда вручную указывать актуальную позицию каретки
  input.setSelectionRange(11, 11)
  await waitFor(() => userEvent.keyboard('[Backspace]'), { timeout: 1 })
  await waitFor(() => userEvent.tab(), { timeout: 1 })

  await waitFor(() =>
    expect(handleBatch).toHaveBeenCalledTimes(expectedBatchCalls)
  )
  await waitFor(() => expect(handleSendEvent).toMatchSnapshot())
})

it('clickstream lib components compatibility: switch', async () => {
  const handleBatch = jest.fn()

  const { getByTitle } = render(
    <ClickStreamComponentsTest onBatch={handleBatch} />
  )

  userEvent.click(getByTitle('switch'))

  await waitFor(() => expect(handleBatch).toHaveBeenCalledTimes(2))
  expect(handleBatch).toMatchSnapshot()
})

it('clickstream lib components compatibility: select', async () => {
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

  const select = getByTitle('select')

  await waitFor(() => userEvent.click(select), { timeout: 1 })
  const listItems = await findAllByRole('option')
  await waitFor(() => userEvent.click(listItems[1]), { timeout: 1 })

  await waitFor(() =>
    expect(handleBatch).toHaveBeenCalledTimes(expectedBatchCalls)
  )

  // Могут возникать артефакты в снепшотах теста, связанные с дата атрибутами у options в компоненте.
  // Запускайте тесты через yarn test:unit clickstream без указания названия теста
  await waitFor(() => expect(handleSendEvent).toMatchSnapshot())
})

it('clickstream lib components compatibility: checkbox', async () => {
  const handleBatch = jest.fn()
  const handleSendEvent = jest.fn()
  const expectedBatchCalls = 2

  const { getByTitle } = render(
    <ClickStreamComponentsTest
      batchSize={expectedBatchCalls}
      onSendEvent={handleSendEvent}
      onBatch={handleBatch}
    />
  )

  const input = getByTitle('checkbox') as HTMLInputElement

  await waitFor(() => userEvent.click(input), { timeout: 1 })

  await waitFor(() =>
    expect(handleBatch).toHaveBeenCalledTimes(expectedBatchCalls)
  )
  await waitFor(() => expect(handleSendEvent).toMatchSnapshot())
})

it('clickstream lib components compatibility: radio', async () => {
  const handleBatch = jest.fn()
  const handleSendEvent = jest.fn()
  const expectedBatchCalls = 2

  const { getByTitle } = render(
    <ClickStreamComponentsTest
      batchSize={expectedBatchCalls}
      onSendEvent={handleSendEvent}
      onBatch={handleBatch}
    />
  )

  const input = getByTitle('radio') as HTMLInputElement

  await waitFor(() => userEvent.click(input), { timeout: 1 })

  await waitFor(() =>
    expect(handleBatch).toHaveBeenCalledTimes(expectedBatchCalls)
  )
  await waitFor(() => expect(handleSendEvent).toMatchSnapshot())
})
