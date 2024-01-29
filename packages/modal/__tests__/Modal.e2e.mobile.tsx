import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Basic } from '../examples/Basic'

test.describe('Modal adaptive', () => {
  test('enabled', async ({ mount, page }) => {
    await mount(<Basic />)

    await page.locator('button').click()
    await expect(page).toHaveScreenshot()
  })
})
