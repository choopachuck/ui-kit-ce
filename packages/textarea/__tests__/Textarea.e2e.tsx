import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Basic } from '../examples/Basic'
import { WithError } from '../examples/WithError'
import { Disabled } from '../examples/Disabled'
import { FullWidth } from '../examples/FullWidth'
import { WithRows } from '../examples/WithRows'

test.describe('Textarea', () => {
  test('enabled', async ({ mount }) => {
    const component = await mount(<Basic />)

    await expect(component).toHaveScreenshot()
  })
  test('focus', async ({ mount }) => {
    const component = await mount(<Basic />)

    await component.locator('textarea').focus()

    await expect(component).toHaveScreenshot()
  })
  test('active', async ({ mount, page }) => {
    const component = await mount(<Basic />)

    await component.locator('textarea').focus()

    await page.keyboard.type('Hello World', { delay: 100 })

    await expect(component).toHaveScreenshot()
  })
  test('filled', async ({ mount, page }) => {
    const component = await mount(<Basic />)

    await component.locator('textarea').focus()

    await page.keyboard.type('Hello World', { delay: 100 })

    await page.keyboard.press('Tab')

    await expect(component).toHaveScreenshot()
  })
  test('error', async ({ mount }) => {
    const component = await mount(<WithError />)

    await expect(component).toHaveScreenshot()
  })
  test('disabled', async ({ mount }) => {
    const component = await mount(<Disabled />)

    await expect(component).toHaveScreenshot()
  })
  test('full width', async ({ mount }) => {
    const component = await mount(<FullWidth />)

    await expect(component).toHaveScreenshot()
  })
  test('rows set', async ({ mount }) => {
    const component = await mount(<WithRows />)

    await expect(component).toHaveScreenshot()
  })
})
