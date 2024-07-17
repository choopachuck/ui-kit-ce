/*--------------------------------------------------------------------------------------------------
 * --------- Тестирование совместимости нативных HTML-элементов с провайдером ClickStream ----------
 * -------------------------------------------------------------------------------------------------
 */

import * as React from 'react'
import { render, waitFor } from '@testing-library/react'
import * as ClickStreamUtils from '../src/utils'
import userEvent from '@testing-library/user-event'
import { ClickStreamProvider } from '../src'
import { mockGlobals } from './helpers'

jest.useFakeTimers('modern').setSystemTime(new Date('2020-01-01'))
jest
  .spyOn(ClickStreamUtils, 'getISOTime')
  .mockImplementation(() => '2020-01-01T00:00:00.078-00:00')

beforeAll(() => {
  mockGlobals()
})

it('clickstream lib components compatibility: native HTML-elements', async () => {
  const handleBatch = jest.fn()
  const handleSendEvent = jest.fn()
  const expectedBatchCalls = 13

  const { getByText, getByTitle } = render(
    <ClickStreamProvider
      batchSize={expectedBatchCalls}
      onSendEvent={handleSendEvent}
      onBatch={handleBatch}
    >
      <button data-id="1" id="custom-button" aria-label="custom button">
        button-01
      </button>
      <button className="custom-class">button-02</button>
      <button>
        <span>button-03</span>
      </button>
      <div>
        <button style={{ color: 'red' }}>button-04</button>
      </div>
      <input
        title="input-01"
        aria-label="3"
        type="text"
        defaultValue="some value"
      />
      <div title="empty-div">
        <span>
          <p></p>
        </span>
      </div>
      {/** role="button" - необходимо указать интерактивную роль, чтобы отработал event bubbling в тесте */}
      <header role="button">header</header>
      <textarea aria-label="my awesome textarea" defaultValue="textarea" />
      <input title="text-input" type="text" placeholder="Placeholder text..." />
      <input title="radio-input" type="radio" data-foo="bar" />
      <input title="checkbox-input" type="checkbox" />
    </ClickStreamProvider>
  )
  await waitFor(() => userEvent.click(getByText('button-01')), { timeout: 1 })
  await waitFor(() => userEvent.click(getByText('button-02')), { timeout: 1 })
  await waitFor(() => userEvent.click(getByText('button-03')), { timeout: 1 })
  await waitFor(() => userEvent.click(getByText('button-04')), { timeout: 1 })
  await waitFor(() => userEvent.click(getByTitle('input-01')), { timeout: 1 })
  await waitFor(() => userEvent.click(getByTitle('empty-div')), { timeout: 1 }) // событие не происходит, так как кликстрим не ловит события с пустых тэгов
  await waitFor(() => userEvent.click(getByText('header')), { timeout: 1 })
  await waitFor(() => userEvent.click(getByText('textarea')), { timeout: 1 })

  await waitFor(() => userEvent.click(getByTitle('text-input')), { timeout: 1 })
  userEvent.keyboard('hello world')
  await waitFor(() => userEvent.tab(), { timeout: 1 })

  await waitFor(() => userEvent.click(getByTitle('radio-input')), {
    timeout: 1,
  })
  await waitFor(() => userEvent.click(getByTitle('checkbox-input')), {
    timeout: 1,
  })

  await waitFor(() =>
    expect(handleBatch).toHaveBeenCalledTimes(expectedBatchCalls)
  )
  expect(handleSendEvent).toMatchSnapshot()
})
