import * as React from 'react'
import {
  test,
  expect,
} from '../../../playwright/fixtures/withDateProviderInjected'
import { BasicStory, BasicRangePicker } from '../examples'

test.describe('Adaptive', () => {
  const fakeNow = new Date('January 1 2000 13:37:00').valueOf()

  // https://github.com/microsoft/playwright/issues/6347#issuecomment-1085850728
  test.beforeEach(async ({ context }) => {
    await context.addInitScript(`{
      Date = class extends Date {
        constructor(...args) {
          if (args.length === 0) {
            super(${fakeNow});
          } else {
            super(...args);
          }
        }
      }
    }`)
  })

  test('DatePicker', async ({ mount, page }) => {
    const component = await mount(<BasicStory />)

    await component.locator('input').click()
    await expect(page).toHaveScreenshot()
  })

  test('RangePicker', async ({ mount, page }) => {
    const component = await mount(<BasicRangePicker />)

    await component.locator('input').first().click()
    await expect(page).toHaveScreenshot()
  })
})
