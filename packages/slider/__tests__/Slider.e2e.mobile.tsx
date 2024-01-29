import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Basic } from '../examples/Basic'

test.describe('Slider', () => {
  test('enabled', async ({ mount, page }) => {
    await mount(<Basic />)

    await expect(page).toHaveScreenshot()
  })
})
