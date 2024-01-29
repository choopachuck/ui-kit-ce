import * as React from 'react'
import {
  test,
  expect,
} from '../../../playwright/fixtures/withDateProviderInjected'
import { setFakeDate } from './setFakeDate'
import { DateTimePicker } from '../src/DateTimePicker'

test.beforeEach(async ({ page }) => {
  await page.evaluate(setFakeDate)
})

const value = new Date(2023, 12, 12, 4, 20)
const commonProps = {
  value: null,
  format: 'dd.MM.yy HH:mm',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: () => {},
  inputProps: {
    placeholder: 'DD.MM.YYYY hh:mm:ss',
  },
}

test.describe('DateTimePicker', () => {
  test('size sm', async ({ mount, page }) => {
    await mount(<DateTimePicker {...commonProps} size="sm" />)

    await expect(page).toHaveScreenshot()
  })
  test('size lg', async ({ mount, page }) => {
    await mount(<DateTimePicker {...commonProps} size="lg" />)

    await expect(page).toHaveScreenshot()
  })
  test('enabled', async ({ mount, page }) => {
    await mount(<DateTimePicker {...commonProps} />)

    await expect(page).toHaveScreenshot()
  })
  test('hover', async ({ mount, page }) => {
    const component = await mount(<DateTimePicker {...commonProps} />)
    await component.locator('input').hover()

    await expect(page).toHaveScreenshot()
  })
  test('focus', async ({ mount, page }) => {
    const component = await mount(<DateTimePicker {...commonProps} />)
    await component.locator('input').click()

    await expect(page).toHaveScreenshot()
  })
  test('active selected', async ({ mount, page }) => {
    const component = await mount(
      <DateTimePicker {...commonProps} value={value} />
    )
    await component.locator('input').click()

    await expect(page).toHaveScreenshot()
  })
  test('filled', async ({ mount, page }) => {
    await mount(<DateTimePicker {...commonProps} value={value} />)

    await expect(page).toHaveScreenshot()
  })
  test('error with text', async ({ mount, page }) => {
    await mount(
      <DateTimePicker
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
      <DateTimePicker
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
    await mount(<DateTimePicker {...commonProps} disabled />)

    await expect(page).toHaveScreenshot()
  })
  test('milliseconds', async ({ mount, page }) => {
    const component = await mount(
      <DateTimePicker
        {...commonProps}
        timePickerProps={{
          views: ['hours', 'minutes', 'seconds', 'milliseconds'],
        }}
      />
    )
    await component.locator('input').click()

    await expect(page).toHaveScreenshot()
  })
})
