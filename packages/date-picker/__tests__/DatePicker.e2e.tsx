import * as React from 'react'
import {
  test,
  expect,
} from '../../../playwright/fixtures/withDateProviderInjected'
import {
  BasicStory,
  BasicRangePicker,
  MinMaxDateStory,
  RangeMinMaxDateStory,
} from '../examples'
import { setFakeDate } from './setFakeDate'
import { DatePicker, RangePicker } from '../src'

const rangePickerValueProps = {
  value: [new Date('09/12/23'), new Date('09/12/23')] as [Date, Date],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: () => {},
}

test.beforeEach(async ({ page }) => {
  await page.evaluate(setFakeDate)
})

test.describe('DatePicker', () => {
  test('enabled', async ({ mount, page }) => {
    const component = await mount(<BasicStory />)
    await component.locator('input').click()

    await expect(page).toHaveScreenshot()
  })

  test('hover', async ({ mount, page }) => {
    const component = await mount(<BasicStory />)
    await component.locator('input').click()
    await page.locator('span', { hasText: '11' }).hover()

    await expect(page).toHaveScreenshot()
  })

  test('active', async ({ mount, page }) => {
    const component = await mount(<BasicStory />)
    await component.locator('input').click()
    const compBox = await page.locator('span', { hasText: '11' }).boundingBox()
    if (!compBox) {
      throw new Error()
    }
    await page.mouse.move(
      compBox.x + compBox.width / 2,
      compBox.y + compBox.height / 2
    )
    await page.mouse.down()

    await expect(page).toHaveScreenshot()
  })

  test('selected', async ({ mount, page }) => {
    const component = await mount(<BasicStory />)
    await component.locator('input').click()
    await page.locator('span', { hasText: '11' }).click()
    await component.locator('input').click()

    await expect(page).toHaveScreenshot()
  })

  test('selected hover', async ({ mount, page }) => {
    const component = await mount(<BasicStory />)
    await component.locator('input').click()
    await page.locator('span', { hasText: '11' }).click()
    await component.locator('input').click()
    await page.locator('span', { hasText: '11' }).hover()

    await expect(page).toHaveScreenshot()
  })

  test('selected active', async ({ mount, page }) => {
    const component = await mount(<BasicStory />)
    await component.locator('input').click()
    await page.locator('span', { hasText: '11' }).click()
    await component.locator('input').click()
    const compBox = await page.locator('span', { hasText: '11' }).boundingBox()
    if (!compBox) {
      throw new Error()
    }
    await page.mouse.move(
      compBox.x + compBox.width / 2,
      compBox.y + compBox.height / 2
    )
    await page.mouse.down()

    await expect(page).toHaveScreenshot()
  })

  test('disabled', async ({ mount, page }) => {
    await mount(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      <DatePicker disabled value={new Date('09/12/23')} onChange={() => {}} />
    )

    await expect(page).toHaveScreenshot()
  })

  test('months view', async ({ mount, page }) => {
    const component = await mount(<BasicStory />)
    await component.locator('input').click()
    await page.locator('span', { hasText: '11' }).click()
    await component.locator('input').click()
    const compBox = await page
      .locator('span', { hasText: 'январь' })
      .boundingBox()
    if (!compBox) {
      throw new Error()
    }
    await page.mouse.click(
      compBox.x + compBox.width / 2,
      compBox.y + compBox.height / 2
    )

    await expect(page).toHaveScreenshot()
  })

  test('years view', async ({ mount, page }) => {
    const component = await mount(<BasicStory />)
    await component.locator('input').click()
    await page.locator('span', { hasText: '11' }).click()
    await component.locator('input').click()
    const compBox = await page
      .locator('span', { hasText: '2000' })
      .boundingBox()
    if (!compBox) {
      throw new Error()
    }
    await page.mouse.click(
      compBox.x + compBox.width / 2,
      compBox.y + compBox.height / 2
    )

    await expect(page).toHaveScreenshot()
  })

  test('day view disabled', async ({ mount, page }) => {
    const component = await mount(<MinMaxDateStory />)
    await component.locator('input').click()

    await expect(page).toHaveScreenshot()
  })

  test('month view disabled', async ({ mount, page }) => {
    const component = await mount(<MinMaxDateStory />)
    await component.locator('input').click()
    const compBox = await page
      .locator('span', { hasText: 'январь' })
      .boundingBox()
    if (!compBox) {
      throw new Error()
    }
    await page.mouse.click(
      compBox.x + compBox.width / 2,
      compBox.y + compBox.height / 2
    )

    await expect(page).toHaveScreenshot()
  })

  test('year view disabled', async ({ mount, page }) => {
    const component = await mount(<MinMaxDateStory />)
    await component.locator('input').click()
    const compBox = await page
      .locator('span', { hasText: '2000' })
      .boundingBox()
    if (!compBox) {
      throw new Error()
    }
    await page.mouse.click(
      compBox.x + compBox.width / 2,
      compBox.y + compBox.height / 2
    )

    await expect(page).toHaveScreenshot()
  })
})

test.describe('RangePicker', () => {
  test('enabled', async ({ mount, page }) => {
    const component = await mount(<BasicRangePicker />)
    await component.locator('input').first().click()

    await expect(page).toHaveScreenshot()
  })

  test('disabled', async ({ mount, page }) => {
    await mount(<RangePicker disabled {...rangePickerValueProps} />)

    await expect(page).toHaveScreenshot()
  })

  test('selected', async ({ mount, page }) => {
    const component = await mount(<BasicRangePicker />)
    await component.locator('input').nth(0).click()
    await page.locator('span', { hasText: '11' }).nth(0).click()
    await page.locator('span', { hasText: '11' }).nth(1).click()
    await component.locator('input').nth(0).click()

    await expect(page).toHaveScreenshot()
  })

  test('full width', async ({ mount, page }) => {
    await mount(<RangePicker {...rangePickerValueProps} fullWidth />)

    await expect(page).toHaveScreenshot()
  })

  test('full width error', async ({ mount, page }) => {
    await mount(<RangePicker {...rangePickerValueProps} fullWidth error />)

    await expect(page).toHaveScreenshot()
  })

  test('divided', async ({ mount, page }) => {
    await mount(<RangePicker {...rangePickerValueProps} inputStyle="divided" />)

    await expect(page).toHaveScreenshot()
  })

  test('divided error', async ({ mount, page }) => {
    await mount(
      <RangePicker
        {...rangePickerValueProps}
        inputStyle="divided"
        startInputProps={{ error: true }}
        endInputProps={{ error: true }}
      />
    )

    await expect(page).toHaveScreenshot()
  })

  test('error with text', async ({ mount, page }) => {
    await mount(
      <RangePicker {...rangePickerValueProps} error helperText="Error text" />
    )
    await expect(page).toHaveScreenshot()
  })

  test('selected hover before', async ({ mount, page }) => {
    const component = await mount(<BasicRangePicker />)
    await component.locator('input').nth(0).click()
    await page.locator('span', { hasText: '11' }).nth(0).click()
    await page.locator('span', { hasText: '11' }).nth(1).click()
    await component.locator('input').nth(0).click()
    await page.locator('span', { hasText: '5' }).first().hover()

    await expect(page).toHaveScreenshot()
  })

  test('selected hover between start', async ({ mount, page }) => {
    const component = await mount(<BasicRangePicker />)
    await component.locator('input').nth(0).click()
    await page.locator('span', { hasText: '11' }).nth(0).click()
    await page.locator('span', { hasText: '11' }).nth(1).click()
    await component.locator('input').nth(0).click()
    await page.locator('span', { hasText: '21' }).first().hover()

    await expect(page).toHaveScreenshot()
  })

  test('selected hover between end', async ({ mount, page }) => {
    const component = await mount(<BasicRangePicker />)
    await component.locator('input').nth(0).click()
    await page.locator('span', { hasText: '11' }).nth(0).click()
    await page.locator('span', { hasText: '11' }).nth(1).click()
    await component.locator('input').nth(1).click()
    await page.locator('span', { hasText: '21' }).first().hover()

    await expect(page).toHaveScreenshot()
  })

  test('selected hover after', async ({ mount, page }) => {
    const component = await mount(<BasicRangePicker />)
    await component.locator('input').nth(0).click()
    await page.locator('span', { hasText: '11' }).nth(0).click()
    await page.locator('span', { hasText: '11' }).nth(1).click()
    await component.locator('input').nth(1).click()
    await page.locator('span', { hasText: '21' }).nth(1).hover()

    await expect(page).toHaveScreenshot()
  })

  test('day view disabled', async ({ mount, page }) => {
    const component = await mount(<RangeMinMaxDateStory />)
    await component.locator('input').nth(0).click()

    await expect(page).toHaveScreenshot()
  })

  test('month view disabled', async ({ mount, page }) => {
    const component = await mount(<RangeMinMaxDateStory />)
    await component.locator('input').nth(0).click()
    const compBox = await page
      .locator('span', { hasText: 'январь' })
      .boundingBox()
    if (!compBox) {
      throw new Error()
    }
    await page.mouse.click(
      compBox.x + compBox.width / 2,
      compBox.y + compBox.height / 2
    )

    await expect(page).toHaveScreenshot()
  })

  test('year view disabled', async ({ mount, page }) => {
    const component = await mount(<RangeMinMaxDateStory />)
    await component.locator('input').nth(0).click()
    const compBox = await page
      .locator('span', { hasText: '2000' })
      .boundingBox()
    if (!compBox) {
      throw new Error()
    }
    await page.mouse.click(
      compBox.x + compBox.width / 2,
      compBox.y + compBox.height / 2
    )

    await expect(page).toHaveScreenshot()
  })

  test('when hideDropdownOnOutsideScroll is true it works correctly', async ({
    page,
    mount,
  }) => {
    await mount(
      <div>
        <DatePicker
          hideDropdownOnOutsideScroll
          value={null}
          // eslint-disable-next-line
          onChange={() => {}}
        />
        <div role="brother" style={{ height: 800 }} />
      </div>
    )

    const openButton = page.locator('[role="combobox"]')
    const dropdown = page.locator('[role="tooltip"]')
    const brother = page.locator('[role="brother"]')

    // brother scroll doesn't trigger dropdown state
    await openButton.click()
    await expect(dropdown).toBeVisible()
    await brother.evaluate((x) => x.scrollTo(0, 1))
    await expect(dropdown).toBeVisible()

    // window scroll is trigger dropdown state
    await page.evaluate(() => (document.body.style.height = '1000px'))
    await page.evaluate(() => window.scrollTo(0, 1))
    await expect(dropdown).not.toBeVisible()
  })

  test('when hideDropdownOnOutsideScroll is false it works correctly', async ({
    page,
    mount,
  }) => {
    await mount(
      <DatePicker
        value={null}
        hideDropdownOnOutsideScroll={false}
        // eslint-disable-next-line
        onChange={() => {}}
      />
    )

    const openButton = page.locator('[role="combobox"]')
    const dropdown = page.locator('[role="tooltip"]')

    await openButton.click()
    await expect(dropdown).toBeVisible()
    await page.evaluate(() => (document.body.style.height = '1000px'))
    await page.evaluate(() => window.scrollTo(0, 1))
    await expect(dropdown).toBeVisible()
  })
})
