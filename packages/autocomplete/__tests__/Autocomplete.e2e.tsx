import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import {
  SearchAutocomplete,
  BasicAutocomplete,
  AsyncAutocomplete,
} from '../examples'

test.describe('Autocomplete', () => {
  test('basic autocomplete', async ({ page, mount }) => {
    const component = await mount(<BasicAutocomplete />)
    await component.locator('input').type('o')

    await expect(page).toHaveScreenshot()
  })

  test('autocomplete with icons', async ({ page, mount }) => {
    const component = await mount(<SearchAutocomplete />)
    await component.locator('input').type('o')

    await expect(page).toHaveScreenshot()
  })

  test('autocomplete with loading', async ({ page, mount }) => {
    const component = await mount(<AsyncAutocomplete />)
    await component.locator('input').type('dsa')

    await expect(page).toHaveScreenshot()
  })
})
