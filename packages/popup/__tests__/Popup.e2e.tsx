import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Placement } from '../examples/Placement'

test.describe('Placement', () => {
  const placements = [
    { value: 'top-start', label: 'top left' },
    { value: 'top', label: 'top center' },
    { value: 'top-end', label: 'top right' },
    { value: 'right-start', label: 'right top' },
    { value: 'right', label: 'right center' },
    { value: 'right-end', label: 'right bottom' },
    { value: 'bottom-start', label: 'bottom left' },
    { value: 'bottom', label: 'bottom center' },
    { value: 'bottom-end', label: 'bottom right' },
    { value: 'left-start', label: 'left top' },
    { value: 'left', label: 'left center' },
    { value: 'left-end', label: 'left bottom' },
  ]

  placements.forEach(({ value, label }) => {
    test(label, async ({ mount, page }) => {
      const mounted = await mount(<Placement defaultPlacement={value} />)

      await page.waitForTimeout(200)

      await expect(mounted).toHaveScreenshot()
    })
  })
})
