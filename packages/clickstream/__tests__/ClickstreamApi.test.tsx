/*--------------------------------------------------------------------------------------------------
 * ----------------------- Тестирование API компонента ClickStreamProvider -------------------------
 * -------------------------------------------------------------------------------------------------
 */

import * as React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import {
  ClickStreamProvider,
  ClickStreamRef,
  ClickStreamProviderProps,
} from '../src'
import * as ClickStreamUtils from '../src/utils'
import { mockGlobals } from './helpers'

jest.useFakeTimers('modern').setSystemTime(new Date('2020-01-01'))
jest
  .spyOn(ClickStreamUtils, 'getISOTime')
  .mockImplementation(() => '2020-01-01T00:00:00.078-00:00')

const ClickStreamProviderRefTest: React.FC<ClickStreamProviderProps> = (
  props
) => {
  const ref = React.useRef<ClickStreamRef>(null)

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    ref?.current?.dispatchEvent(event.nativeEvent, 'customEvent')
  }

  return (
    <ClickStreamProvider {...props} ref={ref}>
      <button onClick={handleButtonClick}>button</button>
    </ClickStreamProvider>
  )
}

beforeAll(() => {
  mockGlobals()
})

it('onInit callback works correctly', async () => {
  const handleInit = jest.fn()
  render(<ClickStreamProvider onInit={handleInit} />)

  await waitFor(() => expect(handleInit).toHaveBeenCalledTimes(1))
  expect(handleInit).toMatchSnapshot()
})

it('onSendEvent callback works correctly with generic batching', async () => {
  const actionCount = 10
  const handleSendEvent = jest.fn()
  const { getByRole } = render(
    <ClickStreamProvider onSendEvent={handleSendEvent}>
      <button id="custom-second-button" aria-label="custom button">
        0
      </button>
    </ClickStreamProvider>
  )

  const button = getByRole('button')

  for (let i = 0; i < actionCount; i++) {
    fireEvent.click(button)
  }

  await waitFor(() => expect(handleSendEvent).toHaveBeenCalledTimes(1))
  expect(handleSendEvent).toMatchSnapshot()
})

it('onSendEvent callback works correctly with custom batching', async () => {
  const batchSize = 5
  const actionCount = 10
  const handleSendEvent = jest.fn()
  const { getByRole } = render(
    <ClickStreamProvider batchSize={batchSize} onSendEvent={handleSendEvent}>
      <button id="third-button" aria-label="custom button">
        0
      </button>
    </ClickStreamProvider>
  )

  const button = getByRole('button')

  for (let i = 0; i < actionCount; i++) {
    fireEvent.click(button)
  }

  await waitFor(() => expect(handleSendEvent).toHaveBeenCalledTimes(2))
  expect(handleSendEvent).toMatchSnapshot()
})

it('onSendEvent callback works correctly at the end of the timer', async () => {
  const actionCount = 9
  const inactivityTime = 2000
  const handleSendEvent = jest.fn()
  const { getByRole } = render(
    <ClickStreamProvider
      inactivityTime={inactivityTime}
      onSendEvent={handleSendEvent}
    >
      <button id="personal-button" aria-label="custom button">
        0
      </button>
    </ClickStreamProvider>
  )

  const button = getByRole('button')

  for (let i = 0; i < actionCount; i++) {
    fireEvent.click(button)
  }

  // Добавляем небольшой разброс в 0.5 секунд, чтобы таймаут теста смог дождаться таймаута кликстрима
  await waitFor(() => expect(handleSendEvent).toHaveBeenCalledTimes(1), {
    timeout: inactivityTime + 500,
  })
  expect(handleSendEvent).toMatchSnapshot()
})

it('ref has all nessesary imperative handles', () => {
  const ref = jest.fn()
  render(<ClickStreamProvider ref={ref} />)

  expect(ref).toMatchSnapshot()
})

it('dispatch event from ref works correctly', async () => {
  const handleBatch = jest.fn()
  const { getByRole } = render(
    <ClickStreamProviderRefTest onBatch={handleBatch} />
  )

  fireEvent.click(getByRole('button'))

  await waitFor(() => expect(handleBatch).toHaveBeenCalledTimes(2))
  expect(handleBatch).toMatchSnapshot()
})

it('disableAutoSendEvent property prevents all automatic events', async () => {
  const handleSendEvent = jest.fn()
  const handleBatch = jest.fn()
  const actionCount = 10
  const { getByRole } = render(
    <ClickStreamProvider
      disableAutoSendEvent
      onSendEvent={handleSendEvent}
      onBatch={handleBatch}
    >
      <button id="secondary-button" aria-label="custom button">
        0
      </button>
    </ClickStreamProvider>
  )

  const button = getByRole('button')

  for (let i = 0; i < actionCount; i++) {
    fireEvent.click(button)
  }

  await waitFor(() => expect(handleSendEvent).toHaveBeenCalledTimes(0))
  await waitFor(() => expect(handleBatch).toHaveBeenCalledTimes(0))
})

it('data-click-stream-off property in child element prevents automatic event', async () => {
  const handleBatch = jest.fn()

  const { getByText } = render(
    <ClickStreamProvider onBatch={handleBatch}>
      <button data-click-stream-off id="local-button">
        button01
      </button>
      <button id="button02">button02</button>
    </ClickStreamProvider>
  )

  getByText('button01').click()
  getByText('button02').click()

  await waitFor(() => expect(handleBatch).toHaveBeenCalledTimes(1))
})

it('custom formatEventData works correctly', async () => {
  const formatEventData = jest.fn().mockImplementation(() => ({
    foo: '1',
    baar: '2',
  }))
  const { getByRole } = render(
    <ClickStreamProvider formatEventData={formatEventData}>
      <button id="button" aria-label="custom button">
        0
      </button>
    </ClickStreamProvider>
  )

  fireEvent.click(getByRole('button'))

  await waitFor(() => expect(formatEventData).toHaveBeenCalledTimes(1))
  expect(formatEventData).toMatchSnapshot()
})
