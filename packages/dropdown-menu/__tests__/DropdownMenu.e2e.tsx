import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Cascading } from '../examples'

const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg']

test.use({ viewport: { width: 250, height: 350 } })

test.describe('DropdownMenu', () => {
  sizes.forEach((size) => {
    test.describe(size, () => {
      test('enabled', async ({ mount, page }) => {
        const component = await mount(<Cascading />)
        await component.locator('span', { hasText: size }).click()
        await component.locator('button').click()

        await expect(page).toHaveScreenshot()
      })
    })
  })

  test('hover', async ({ mount, page }) => {
    const component = await mount(<Cascading />)
    await component.locator('button').click()

    const optionBox = await page
      .locator('li[role="menuitem"]')
      .nth(1)
      .boundingBox()
    await page.mouse.move(optionBox?.x || 0, optionBox?.y || 0)

    await expect(page).toHaveScreenshot()
  })

  test('subMenu', async ({ mount, page }) => {
    await page.setViewportSize({ width: 450, height: 400 })
    const component = await mount(<Cascading />)
    await component.locator('button').click()

    const optionBox = await page
      .locator('li[role="menuitem"]')
      .nth(3)
      .boundingBox()
    await page.mouse.move(optionBox?.x || 0, optionBox?.y || 0)
    const subOptionBox = await page
      .locator('li[role="menuitem"]')
      .nth(4)
      .boundingBox()
    await page.mouse.move(subOptionBox?.x || 0, subOptionBox?.y || 0)

    await expect(page).toHaveScreenshot()
  })
})
