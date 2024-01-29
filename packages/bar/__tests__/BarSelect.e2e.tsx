import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Bar, BarKindsType, BarSelect } from '../src'

const barKinds: BarKindsType[] = ['dark', 'light', 'primary']

const options = [
  { value: '', label: 'Select' },
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
]

test.use({ viewport: { width: 500, height: 300 } })

test.describe('BarSelect', () => {
  barKinds.forEach((kind) => {
    test.describe(kind, () => {
      test('with value', async ({ mount }) => {
        const component = await mount(
          <Bar kind={kind}>
            <BarSelect value="1" options={options} />
          </Bar>
        )

        await expect(component).toHaveScreenshot()
      })

      test('hover', async ({ mount }) => {
        const component = await mount(
          <Bar kind={kind}>
            <BarSelect options={options} />
          </Bar>
        )
        await component.locator('button').hover()

        await expect(component).toHaveScreenshot()
      })

      test('focus', async ({ mount }) => {
        const component = await mount(
          <Bar kind={kind}>
            <BarSelect options={options} />
          </Bar>
        )
        await component.locator('button').focus()

        await expect(component).toHaveScreenshot()
      })

      test('list', async ({ mount, page }) => {
        const component = await mount(
          <Bar kind={kind}>
            <BarSelect options={options} />
          </Bar>
        )
        await component.locator('button').click()

        await expect(page).toHaveScreenshot()
      })
    })
  })
})
