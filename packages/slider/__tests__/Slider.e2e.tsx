import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Basic } from '../examples/Basic'
import { WithTicks } from '../examples/WithTicks'
import { WithCustomTicks } from '../examples/WithCustomTicks'
import { Disabled } from '../examples/Disabled'

test.describe('tick', () => {
  test('off', async ({ mount }) => {
    const comp = await mount(<Basic />)

    await expect(comp).toHaveScreenshot()
  })
  test('on', async ({ mount }) => {
    const comp = await mount(<WithTicks />)

    await expect(comp).toHaveScreenshot()
  })
  test('on label', async ({ mount, page }) => {
    await mount(<WithCustomTicks />)

    await expect(page).toHaveScreenshot()
  })
})

test.describe('state', () => {
  test('enabled', async ({ mount }) => {
    const mounted = await mount(<Basic />)

    await expect(mounted).toHaveScreenshot()
  })
  test('hover', async ({ mount }) => {
    const mounted = await mount(<Basic />)

    await mounted.locator('role=slider').hover()

    await expect(mounted).toHaveScreenshot()
  })
  test('focus', async ({ mount }) => {
    const mounted = await mount(<Basic />)

    await mounted.locator('role=slider').click()

    await expect(mounted).toHaveScreenshot()
  })
  test('active', async ({ mount, page }) => {
    const mounted = await mount(<Basic />)

    const compBox = await mounted.locator('role=slider').boundingBox()

    if (!compBox) {
      throw new Error()
    }

    await page.mouse.move(
      compBox.x + compBox.width / 2,
      compBox.y + compBox.height / 2
    )
    await page.mouse.down()

    await expect(mounted).toHaveScreenshot()
  })
  test('disabled', async ({ mount }) => {
    const mounted = await mount(<Disabled />)

    await expect(mounted).toHaveScreenshot()
  })
})
