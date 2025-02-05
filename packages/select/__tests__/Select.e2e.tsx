import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { test as testWithTheme } from '../../../playwright/fixtures/withThemeProviderInjected'
import {
  LimitExample,
  MultiSelectExample,
  ErrorExample,
  ErrorMultiSelectExample,
  CustomIcon,
} from '../examples'
import { Select } from '../src'
import { createTheme } from '@v-uik/theme'

const options = [
  { value: '', label: 'Выберите опцию' },
  { value: '1', label: 'Опция 1' },
  { value: '2', label: 'Опция 2' },
  { value: '3', label: 'Очень длинная опция 3' },
]
const sizes: ['lg', 'md', 'sm'] = ['lg', 'md', 'sm']

test.describe('Select', () => {
  test('limit options', async ({ mount, page }) => {
    const component = await mount(<LimitExample />)

    await component.click()

    await expect(page).toHaveScreenshot()
  })

  sizes.forEach((size) => {
    test(size, async ({ mount }) => {
      const component = await mount(<Select size={size} options={options} />)

      await expect(component).toHaveScreenshot()
    })

    test(`opened-not-setted-${size}`, async ({ mount, page }) => {
      const component = await mount(<Select size={size} options={options} />)

      await component.click()

      await expect(page).toHaveScreenshot()
    })
  })

  test('multiple select', async ({ mount }) => {
    const component = await mount(<MultiSelectExample />)

    await expect(component).toHaveScreenshot()
  })

  test('error select', async ({ mount }) => {
    const component = await mount(<ErrorExample />)

    await expect(component).toHaveScreenshot()
  })

  test('error icon tooltip', async ({ mount }) => {
    const component = await mount(<ErrorExample />)

    await component
      .locator('div', { hasText: 'With icon and tooltip' })
      .locator('svg[class^="errorIcon"]')
      .hover()

    await expect(component).toHaveScreenshot()
  })

  test('error multi select', async ({ mount }) => {
    const component = await mount(<ErrorMultiSelectExample />)

    await expect(component).toHaveScreenshot()
  })

  test('when hideDropdownOnOutsideScroll is true it works correctly', async ({
    page,
    mount,
  }) => {
    await mount(
      <div>
        <Select
          hideDropdownOnOutsideScroll
          options={[{ value: '1', label: '1' }]}
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
      <Select
        options={[{ value: '1', label: '1' }]}
        hideDropdownOnOutsideScroll={false}
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

  testWithTheme('sizes with custom typography', async ({ mountWithTheme }) => {
    const theme = createTheme({
      comp: {
        backwardCompatibilityMode: false,
        select: {
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
        <Select
          size="sm"
          style={{ marginBottom: 10 }}
          options={options}
          value={options[0].value}
        />
        <Select
          size="md"
          style={{ marginBottom: 10 }}
          options={options}
          value={options[0].value}
        />
        <Select
          style={{ marginBottom: 10 }}
          options={options}
          value={options[0].value}
        />
        <Select size="lg" options={options} value={options[0].value} />
      </div>,
      theme
    )

    await expect(component).toHaveScreenshot()
  })
  test('with custom icon', async ({ mount, page }) => {
    await mount(<CustomIcon />)

    await expect(page).toHaveScreenshot()
  })
})
