import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Single, Multi, Placement, Interactive } from '../examples'

test.describe('Single', () => {
  test('Default', async ({ mount, page }) => {
    await mount(<Single />)

    const component = page.locator('span', { hasText: 'hover me' }).first()

    await component.hover()

    await page.waitForTimeout(200)

    await expect(page).toHaveScreenshot()
  })
  test('Indicator', async ({ mount, page }) => {
    await mount(<Single />)

    const component = page.locator('span', {
      hasText: 'hover me (with indicator)',
    })

    await component.hover()

    await page.waitForTimeout(200)

    await expect(page).toHaveScreenshot()
  })
})

test.describe('Multiple', () => {
  test('Default', async ({ mount, page }) => {
    await mount(<Multi />)

    const component = page.locator('span', { hasText: 'hover me' }).first()

    await component.hover()

    await page.waitForTimeout(200)

    await expect(page).toHaveScreenshot()
  })
  test('Indicator', async ({ mount, page }) => {
    await mount(<Multi />)

    const component = page.locator('span', {
      hasText: 'hover me (with indicator)',
    })

    await component.hover()

    await page.waitForTimeout(200)

    await expect(page).toHaveScreenshot()
  })
})

test('Highlight', async ({ mount, page }) => {
  await mount(<Interactive />)

  const component = page.locator('span', { hasText: 'click me' })

  await component.click()

  await page.waitForTimeout(200)

  await expect(page).toHaveScreenshot()
})

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
      await mount(<Placement defaultPlacement={value} />)

      const component = page.locator('div div div', { hasText: 'hover me' })

      await component.hover()

      await page.waitForTimeout(200)

      await expect(page).toHaveScreenshot()
    })
  })
})
