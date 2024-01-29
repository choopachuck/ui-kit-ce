import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Multi } from '../examples'

test.describe('Tooltip adaptive', () => {
  test('enabled', async ({ mount, page }) => {
    await mount(<Multi />)
    const component = page.locator('span', { hasText: 'hover me' }).first()
    await component.tap()
    await page.waitForTimeout(200)

    await expect(page).toHaveScreenshot()
  })
})
