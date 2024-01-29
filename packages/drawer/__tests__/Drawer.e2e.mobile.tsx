import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { BasicDrawer } from '../examples'

test.describe('Drawer adaptive', () => {
  test('enabled', async ({ mount, page }) => {
    await mount(<BasicDrawer />)

    await page.locator('button').click()
    await expect(page).toHaveScreenshot()
  })
})
