import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Filled } from '../examples/Filled'

test.describe('Tabs adaptive', () => {
  test('enabled', async ({ mount, page }) => {
    await mount(<Filled />)

    await expect(page).toHaveScreenshot()
  })
})
