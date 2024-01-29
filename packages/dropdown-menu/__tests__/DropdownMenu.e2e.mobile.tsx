import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Adaptivity } from '../examples'

test.describe('DropdownMenu adaptive', () => {
  test('enabled', async ({ mount, page }) => {
    const component = await mount(<Adaptivity />)

    await component.locator('button').click()
    await expect(page).toHaveScreenshot()
  })
})
