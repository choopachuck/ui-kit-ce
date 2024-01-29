import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { DifferentThickness } from '../examples/DifferentThickness'
import { DifferentSizes } from '../examples/DifferentSizes'
import { BasicProgress } from '../examples/BasicProgress'
import { ControlledCircularProgress } from '../examples/ControlledCircularProgress'

const sizes = ['xlg', 'lg', 'md', 'sm']

test.describe('thickness', () => {
  sizes.forEach((size) => {
    test(size, async ({ page, mount }) => {
      await mount(<DifferentThickness />)

      const component = page.locator('div div div', {
        hasText: `thickness ${size}`,
      })

      await expect(component).toHaveScreenshot()
    })
  })
})

test.describe('size', () => {
  sizes.forEach((size) => {
    test(size, async ({ page, mount }) => {
      await mount(<DifferentSizes />)

      const component = page.locator('div div div', { hasText: `size ${size}` })

      await expect(component).toHaveScreenshot()
    })
  })
})

test('without track', async ({ page, mount }) => {
  await mount(<BasicProgress />)

  const component = page
    .locator('div div div', { hasText: 'Without track' })
    .filter({ has: page.locator('role=progressbar') })

  await expect(component).toHaveScreenshot()
})

test('determintate', async ({ page, mount }) => {
  await mount(<ControlledCircularProgress />)

  const component = page.locator('role=progressbar').first()

  await expect(component).toHaveScreenshot({
    animations: 'disabled',
  })
})

test('indeterminate', async ({ page, mount }) => {
  await mount(<BasicProgress />)

  const component = page
    .locator('div div div', { hasText: 'With track' })
    .filter({ has: page.locator('role=progressbar') })

  await expect(component).toHaveScreenshot()
})
