import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { test as testWithTheme } from '../../../playwright/fixtures/withThemeProviderInjected'
import {
  CompactTags,
  Error,
  Grouping,
  MultipleSelect,
  SingleSelect,
} from '../examples'
import { ComboBox } from '../src'
import { createTheme } from '@v-uik/theme'

test.describe('ComboBox', () => {
  test('value is not selected', async ({ mount }) => {
    const component = await mount(<SingleSelect />)

    await expect(component).toHaveScreenshot()
  })

  test('open and value is not selected', async ({ page, mount }) => {
    const component = await mount(<SingleSelect />)

    await component.click()

    await expect(page).toHaveScreenshot()
  })

  test('multiple select, open and value is setted', async ({ page, mount }) => {
    const component = await mount(<MultipleSelect />)

    await component.locator('[aria-label="openPopupButton"]').click()

    await expect(page).toHaveScreenshot()
  })

  test('multiple select', async ({ mount }) => {
    const component = await mount(<MultipleSelect />)

    await expect(component).toHaveScreenshot()
  })

  test('error', async ({ mount }) => {
    const component = await mount(<Error />)

    await expect(component).toHaveScreenshot()
  })

  test('tags, compact tags, long label', async ({ mount }) => {
    const component = await mount(<CompactTags />)

    await expect(component).toHaveScreenshot()
  })

  test('open, grouping and value is not selected', async ({ page, mount }) => {
    const component = await mount(<Grouping />)

    await component.locator('[aria-label="openPopupButton"]').click()

    await expect(page).toHaveScreenshot()
  })

  test('when hideDropdownOnOutsideScroll is true it works correctly', async ({
    page,
    mount,
  }) => {
    await mount(
      <div>
        <ComboBox
          hideDropdownOnOutsideScroll
          options={[{ value: '1', label: '1' }]}
        />
        <div role="brother" style={{ height: 800 }} />
      </div>
    )

    const openButton = page.locator('[aria-label="openPopupButton"]')
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
      <ComboBox
        options={[{ value: '1', label: '1' }]}
        hideDropdownOnOutsideScroll={false}
      />
    )

    const openButton = page.locator('[aria-label="openPopupButton"]')
    const dropdown = page.locator('[role="tooltip"]')

    await openButton.click()
    await expect(dropdown).toBeVisible()
    await page.evaluate(() => (document.body.style.height = '1000px'))
    await page.evaluate(() => window.scrollTo(0, 1))
    await expect(dropdown).toBeVisible()
  })

  testWithTheme('sizes with custom typography', async ({ mountWithTheme }) => {
    const options = [{ value: '1', label: 'value' }]
    const theme = createTheme({
      comp: {
        backwardCompatibilityMode: false,
        comboBox: {
          inputTypographyFontSizeSm: '10px',
          inputTypographyLineHeightSm: '14px',
          inputTypographyFontSizeMd: '25px',
          inputTypographyLineHeightMd: '30px',
          inputTypographyFontSizeLg: '60px',
          inputTypographyLineHeightLg: '90px',
        },
      },
    })

    const component = await mountWithTheme(
      <div style={{ padding: 5 }}>
        <ComboBox
          size="sm"
          style={{ marginBottom: 30 }}
          options={options}
          value={options[0].value}
        />
        <ComboBox
          size="md"
          style={{ marginBottom: 30 }}
          options={options}
          value={options[0].value}
        />
        <ComboBox
          style={{ marginBottom: 30 }}
          options={options}
          value={options[0].value}
        />
        <ComboBox size="lg" options={options} value={options[0].value} />
      </div>,
      theme
    )

    await expect(component).toHaveScreenshot()
  })
})
