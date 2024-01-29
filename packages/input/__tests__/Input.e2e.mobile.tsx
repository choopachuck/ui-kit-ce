import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Input } from '../src'

test.describe('Input adaptive', () => {
  test('enabled', async ({ mount, page }) => {
    await mount(
      <Input
        value="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, temporibus."
        label="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, tempore."
        helperText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. At impedit laborum, maxime nobis provident quam."
      />
    )

    await expect(page).toHaveScreenshot()
  })
})
