import * as React from 'react'
import {
  test,
  expect,
} from '../../../playwright/fixtures/withDateProviderInjected'
import { setFakeDate } from './setFakeDate'
import { TimeRangePicker } from '../src/TimeRangePicker'

test.beforeEach(async ({ page }) => {
  await page.evaluate(setFakeDate)
})

const value: [Date, Date] = [
  new Date(2023, 12, 12, 4, 20),
  new Date(2023, 12, 12, 4, 30),
]
const commonProps = {
  value: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: () => {},
  startInputProps: {
    placeholder: 'hh:mm:ss',
  },
  endInputProps: {
    placeholder: 'hh:mm:ss',
  },
}

test.describe('TimeRangePicker', () => {
  test('size sm', async ({ mount, page }) => {
    await mount(<TimeRangePicker {...commonProps} size="sm" />)

    await expect(page).toHaveScreenshot()
  })
  test('size lg', async ({ mount, page }) => {
    await mount(<TimeRangePicker {...commonProps} size="lg" />)

    await expect(page).toHaveScreenshot()
  })
  test('enabled', async ({ mount, page }) => {
    await mount(<TimeRangePicker {...commonProps} />)

    await expect(page).toHaveScreenshot()
  })
  test('hover', async ({ mount, page }) => {
    const component = await mount(<TimeRangePicker {...commonProps} />)
    await component.locator('input').first().hover()

    await expect(page).toHaveScreenshot()
  })
  test('focus', async ({ mount, page }) => {
    const component = await mount(<TimeRangePicker {...commonProps} />)
    await component.locator('input').first().click()

    await expect(page).toHaveScreenshot()
  })
  test('active selected', async ({ mount, page }) => {
    const component = await mount(
      <TimeRangePicker {...commonProps} value={value} />
    )
    await component.locator('input').first().click()

    await expect(page).toHaveScreenshot()
  })
  test('filled', async ({ mount, page }) => {
    await mount(<TimeRangePicker {...commonProps} value={value} />)

    await expect(page).toHaveScreenshot()
  })
  test('divided', async ({ mount, page }) => {
    await mount(
      <TimeRangePicker {...commonProps} value={value} inputStyle="divided" />
    )

    await expect(page).toHaveScreenshot()
  })
  test('divided error', async ({ mount, page }) => {
    await mount(
      <TimeRangePicker
        {...commonProps}
        value={value}
        inputStyle="divided"
        startInputProps={{ error: true }}
        endInputProps={{ error: true }}
      />
    )

    await expect(page).toHaveScreenshot()
  })
  test('full width', async ({ mount, page }) => {
    await mount(<TimeRangePicker {...commonProps} fullWidth value={value} />)

    await expect(page).toHaveScreenshot()
  })
  test('full width error', async ({ mount, page }) => {
    await mount(
      <TimeRangePicker {...commonProps} fullWidth error value={value} />
    )

    await expect(page).toHaveScreenshot()
  })
  test('error with text', async ({ mount, page }) => {
    await mount(
      <TimeRangePicker
        {...commonProps}
        error
        label="Label"
        value={value}
        helperText="Error text"
      />
    )

    await expect(page).toHaveScreenshot()
  })
  // test('error with tooltip', async ({ mount, page }) => {
  //   const component = await mount(<TimeRangePicker
  //     {...commonProps}
  //     error
  //     label="Label"
  //     value={value}
  //     endInputProps = {{
  //       ...commonProps.endInputProps,
  //       errorIconTooltipProps: {
  //         dropdownProps: {
  //           placement: 'bottom',
  //           content: 'Field cannot be empty',
  //         },
  //       }
  //     }}
  //   />)

  //   await component
  //     .locator('svg >> nth=0')
  //     .hover()

  //   await expect(page).toHaveScreenshot()

  // })
  test('disabled', async ({ mount, page }) => {
    await mount(<TimeRangePicker {...commonProps} disabled />)

    await expect(page).toHaveScreenshot()
  })
  test('time button hover', async ({ mount, page }) => {
    const component = await mount(<TimeRangePicker {...commonProps} />)
    await component.locator('input').first().click()
    await page.locator('button', { hasText: '02' }).first().hover()

    await expect(page).toHaveScreenshot()
  })
  test('time button disabled', async ({ mount, page }) => {
    const component = await mount(
      <TimeRangePicker
        {...commonProps}
        startTimePickerProps={{
          shouldDisableTime: (_date: Date, view) => {
            if (view === 'hours') {
              return _date?.getHours() === 1
            }

            return false
          },
        }}
      />
    )
    await component.locator('input').first().click()

    await expect(page).toHaveScreenshot()
  })
  test('time button focus', async ({ mount, page }) => {
    await mount(<TimeRangePicker {...commonProps} open />)

    await page.locator('button', { hasText: '02' }).first().focus()

    await expect(page).toHaveScreenshot()
  })
  test('time button focus selected', async ({ mount, page }) => {
    await mount(<TimeRangePicker {...commonProps} open value={value} />)

    await page.locator('button', { hasText: '04' }).first().focus()

    await expect(page).toHaveScreenshot()
  })
})
