import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Example } from '../examples/Example'
import { MaskedInput } from '../src'

test.describe('Input', () => {
  test('enabled', async ({ mount }) => {
    const component = await mount(<Example />)

    await expect(component).toHaveScreenshot()
  })

  test('filled', async ({ mount, page }) => {
    const component = await mount(<Example />)

    await component.locator('input').click()

    await page.keyboard.type('71111111111', { delay: 100 })

    await expect(component).toHaveScreenshot()
  })

  test('hover', async ({ mount }) => {
    const component = await mount(<Example />)
    await component.locator('input').hover()

    await expect(component).toHaveScreenshot()
  })

  test('focus', async ({ mount }) => {
    const component = await mount(<Example />)
    await component.locator('input').focus()

    await expect(component).toHaveScreenshot()
  })

  test('clear', async ({ mount }) => {
    const component = await mount(
      <MaskedInput canClear mask="****" value="test" />
    )

    await expect(component).toHaveScreenshot()
  })
})
