import * as React from 'react'
import {
  test,
  expect,
} from '../../../playwright/fixtures/withDateProviderInjected'
import { setFakeDate } from './setFakeDate'
import { TimePicker } from '../src/TimePicker'

test.beforeEach(async ({ page }) => {
  await page.evaluate(setFakeDate)
})

const value = new Date(2023, 12, 12, 4, 20)
const commonProps = {
  value: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: () => {},
  inputProps: {
    placeholder: 'hh:mm:ss',
  },
}

test.describe('TimePicker', () => {
  test('size sm', async ({ mount, page }) => {
    await mount(<TimePicker {...commonProps} size="sm" />)

    await expect(page).toHaveScreenshot()
  })
  test('size lg', async ({ mount, page }) => {
    await mount(<TimePicker {...commonProps} size="lg" />)

    await expect(page).toHaveScreenshot()
  })
  test('enabled', async ({ mount, page }) => {
    await mount(<TimePicker {...commonProps} />)

    await expect(page).toHaveScreenshot()
  })
  test('hover', async ({ mount, page }) => {
    const component = await mount(<TimePicker {...commonProps} />)
    await component.locator('input').hover()

    await expect(page).toHaveScreenshot()
  })
  test('focus', async ({ mount, page }) => {
    const component = await mount(<TimePicker {...commonProps} />)
    await component.locator('input').click()

    await expect(page).toHaveScreenshot()
  })
  test('active selected', async ({ mount, page }) => {
    const component = await mount(<TimePicker {...commonProps} value={value} />)
    await component.locator('input').click()

    await expect(page).toHaveScreenshot()
  })
  test('filled', async ({ mount, page }) => {
    await mount(<TimePicker {...commonProps} value={value} />)

    await expect(page).toHaveScreenshot()
  })
  test('error with text', async ({ mount, page }) => {
    await mount(
      <TimePicker
        {...commonProps}
        error
        label="Label"
        value={value}
        helperText="Error text"
      />
    )

    await expect(page).toHaveScreenshot()
  })
  test('error with tooltip', async ({ mount, page }) => {
    const component = await mount(
      <TimePicker
        {...commonProps}
        error
        label="Label"
        value={value}
        inputProps={{
          ...commonProps.inputProps,
          errorIconTooltipProps: {
            dropdownProps: {
              placement: 'bottom',
              content: 'Field cannot be empty',
            },
          },
        }}
      />
    )

    await component.locator('svg >> nth=0').hover()

    await expect(page).toHaveScreenshot()
  })
  test('disabled', async ({ mount, page }) => {
    await mount(<TimePicker {...commonProps} disabled />)

    await expect(page).toHaveScreenshot()
  })
  test('time button hover', async ({ mount, page }) => {
    const component = await mount(<TimePicker {...commonProps} />)
    await component.locator('input').click()
    await page.locator('button', { hasText: '02' }).first().hover()

    await expect(page).toHaveScreenshot()
  })
  test('time button disabled', async ({ mount, page }) => {
    const component = await mount(
      <TimePicker
        {...commonProps}
        baseTimePickerProps={{
          shouldDisableTime: (_date: Date, view) => {
            if (view === 'hours') {
              return _date?.getHours() === 1
            }

            return false
          },
        }}
      />
    )
    await component.locator('input').click()

    await expect(page).toHaveScreenshot()
  })
  test('time button focus', async ({ mount, page }) => {
    await mount(<TimePicker {...commonProps} open />)

    await page.waitForSelector('div[role="dialog"]')
    await page.locator('button', { hasText: '02' }).first().focus()

    await expect(page).toHaveScreenshot()
  })
  test('time button focus selected', async ({ mount, page }) => {
    await mount(<TimePicker {...commonProps} open value={value} />)

    await page.waitForSelector('div[role="dialog"]')
    await page.locator('button', { hasText: '04' }).first().focus()

    await expect(page).toHaveScreenshot()
  })
})
