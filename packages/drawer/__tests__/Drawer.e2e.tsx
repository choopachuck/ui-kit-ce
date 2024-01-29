import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { DrawerPlacementType } from '../src/interfaces'
import { PositionsExample } from '../examples/PositionsExample'
import { NonModalExample } from '../examples/NonModalExample'

const placements: Array<DrawerPlacementType> = [
  'top',
  'bottom',
  'left',
  'right',
]

test.describe('Drawer', () => {
  placements.forEach((placement) => {
    test(placement, async ({ mount, page }) => {
      const component = await mount(<PositionsExample />)
      await component.locator('button', { hasText: placement }).click()

      await expect(page).toHaveScreenshot()
    })
  })

  test('nonModal', async ({ mount, page }) => {
    const component = await mount(
      <div>
        <NonModalExample />
      </div>
    )
    await component.locator('button').click()

    await expect(page).toHaveScreenshot()
  })
})
