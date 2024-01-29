import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Bar, BarKindsType, BarMenuItem } from '../src'

const barKinds: BarKindsType[] = ['dark', 'light', 'primary']

test.describe('BarMenuItem', () => {
  barKinds.forEach((kind) => {
    test.describe(kind, () => {
      test('hover', async ({ mount }) => {
        const component = await mount(
          <Bar kind={kind}>
            <BarMenuItem>menu item</BarMenuItem>
          </Bar>
        )

        await component.locator('div[role=button]').hover()

        await expect(component).toHaveScreenshot()
      })

      test('active', async ({ mount, page }) => {
        const component = await mount(
          <Bar kind={kind}>
            <BarMenuItem>menu item</BarMenuItem>
          </Bar>
        )
        await page.mouse.move(20, 20)
        await page.mouse.down()

        await expect(component).toHaveScreenshot()
      })

      test('focus', async ({ mount }) => {
        const component = await mount(
          <Bar kind={kind}>
            <BarMenuItem>menu item</BarMenuItem>
          </Bar>
        )

        await component.locator('div[role=button]').focus()

        await expect(component).toHaveScreenshot()
      })
    })
  })
})
