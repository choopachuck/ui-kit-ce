import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { test as testWithTheme } from '../../../playwright/fixtures/withThemeProviderInjected'
import { TagInput } from '../src'
import { createTheme } from '@v-uik/theme'

test.describe('TagInput', () => {
  test('enabled', async ({ mount }) => {
    const component = await mount(<TagInput>Add tag</TagInput>)

    await expect(component).toHaveScreenshot()
  })
  test('hover', async ({ mount, page }) => {
    const component = await mount(<TagInput>Add tag</TagInput>)

    await page.locator('span', { hasText: 'Add tag' }).hover()

    await expect(component).toHaveScreenshot()
  })
  test('active', async ({ mount, page }) => {
    const component = await mount(
      <div style={{ padding: '4px', width: '100px' }}>
        <TagInput>Add tag</TagInput>
      </div>
    )

    await page.locator('button', { hasText: 'Add tag' }).click()

    await expect(component).toHaveScreenshot()
  })
  test('focus', async ({ mount, page }) => {
    const component = await mount(
      <div style={{ padding: '4px', width: '100px' }}>
        <TagInput value="Text">Add tag</TagInput>
      </div>
    )

    await page.locator('button', { hasText: 'Add tag' }).click()

    await expect(component).toHaveScreenshot()
  })
  test('disabled', async ({ mount }) => {
    const component = await mount(<TagInput disabled>Add tag</TagInput>)

    await expect(component).toHaveScreenshot()
  })

  testWithTheme('sizes with custom typography', async ({ mountWithTheme }) => {
    const theme = createTheme({
      comp: {
        backwardCompatibilityMode: false,
        tagInput: {
          typographyFontSizeXs: '7px',
          typographyLineHeightXs: '9px',
          typographyFontSizeSm: '8px',
          typographyLineHeightSm: '10px',
          typographyFontSizeMd: '25px',
          typographyLineHeightMd: '30px',
          typographyFontSizeLg: '60px',
          typographyLineHeightLg: '90px',
        },
      },
    })

    const component = await mountWithTheme(
      <div style={{ paddingTop: 10 }}>
        <div style={{ marginBottom: 10 }}>
          <TagInput size="xs" placeholder="Tag">
            Add
          </TagInput>
        </div>
        <div style={{ marginBottom: 10 }}>
          <TagInput size="sm" placeholder="Tag">
            Add
          </TagInput>
        </div>
        <div style={{ marginBottom: 10 }}>
          <TagInput placeholder="Tag">Add</TagInput>
        </div>
        <div style={{ marginBottom: 10 }}>
          <TagInput size="md" placeholder="Tag">
            Add
          </TagInput>
        </div>
        <div style={{ marginBottom: 10 }}>
          <TagInput size="lg" placeholder="Tag">
            Add
          </TagInput>
        </div>
      </div>,
      theme
    )

    await expect(component).toHaveScreenshot()
  })
})
