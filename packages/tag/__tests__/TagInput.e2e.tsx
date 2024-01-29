import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { TagInput } from '../src'

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
})
