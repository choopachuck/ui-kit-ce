import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { MultipleCreatable, SingleCreatable } from '../examples'

test.describe('Creatable', () => {
  test('creatable for single choice', async ({ page, mount }) => {
    const component = await mount(<SingleCreatable />)
    await component.locator('input').type('новая опция')

    await expect(page).toHaveScreenshot()
  })

  test('creatable for multiple choice', async ({ page, mount }) => {
    const component = await mount(<MultipleCreatable />)
    await component.locator('input').type('новая опция')

    await expect(page).toHaveScreenshot()
  })
})
