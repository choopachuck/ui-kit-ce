import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { SingleSelect } from '../examples'

test.describe('ComboBox adaptive', () => {
  test('enabled', async ({ mount, page }) => {
    await mount(<SingleSelect />)

    await expect(page).toHaveScreenshot()
  })

  test('opened', async ({ mount, page }) => {
    const component = await mount(<SingleSelect />)

    await component.locator('[aria-label="openPopupButton"]').click()
    await expect(page).toHaveScreenshot()
  })
})
