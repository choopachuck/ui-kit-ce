import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Bar, BarKindsType, BarButton } from '../src'

const barKinds: BarKindsType[] = ['dark', 'light', 'primary']

test.describe('BarButton', () => {
  barKinds.forEach((kind) => {
    test.describe(kind, () => {
      test('disabled', async ({ mount }) => {
        const component = await mount(
          <Bar kind={kind}>
            <BarButton disabled>button</BarButton>
          </Bar>
        )

        await expect(component).toHaveScreenshot()
      })

      test('hover', async ({ mount }) => {
        const component = await mount(
          <Bar kind={kind}>
            <BarButton>button</BarButton>
          </Bar>
        )

        await component.locator('div', { hasText: 'button' }).hover()

        await expect(component).toHaveScreenshot()
      })

      test('active', async ({ mount, page }) => {
        const component = await mount(
          <Bar kind={kind}>
            <BarButton>button</BarButton>
          </Bar>
        )
        await page.mouse.move(20, 20)
        await page.mouse.down()

        await expect(component).toHaveScreenshot()
      })

      test('focus', async ({ mount }) => {
        const component = await mount(
          <Bar kind={kind}>
            <BarButton>button</BarButton>
          </Bar>
        )

        await component.locator('div', { hasText: 'button' }).focus()

        await expect(component).toHaveScreenshot()
      })
    })
  })
})
