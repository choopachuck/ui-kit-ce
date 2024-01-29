import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Basic } from '../examples/Basic'
import { VerticalStepper } from '../examples/VerticalStepper'
import { CustomIcons } from '../examples/CustomIcons'

test.describe('stepper', () => {
  test('horizontal', async ({ mount }) => {
    const comp = await mount(<Basic />)

    await expect(comp).toHaveScreenshot()
  })
  test('vertical', async ({ mount }) => {
    const comp = await mount(<VerticalStepper />)

    await expect(comp).toHaveScreenshot()
  })
  test('icon', async ({ mount }) => {
    const comp = await mount(<CustomIcons />)

    await expect(comp).toHaveScreenshot()
  })
})

test.describe('step', () => {
  test.describe('number', () => {
    test('enabled', async ({ mount }) => {
      const mounted = await mount(<Basic />)

      const comp = mounted.locator('button', { hasText: 'Fifth' })

      await expect(comp).toHaveScreenshot()
    })
    test('hover', async ({ mount }) => {
      const mounted = await mount(<Basic />)

      const comp = mounted.locator('button', { hasText: 'Fifth' })

      await comp.hover()

      await expect(comp).toHaveScreenshot()
    })
    test('active', async ({ mount, page }) => {
      const mounted = await mount(<Basic />)

      const comp = mounted.locator('button', { hasText: 'Fifth' })

      const compBox = await comp.boundingBox()

      if (!compBox) {
        throw new Error()
      }

      await page.mouse.move(
        compBox.x + compBox.width / 2,
        compBox.y + compBox.height / 2
      )

      await page.mouse.down()

      await expect(comp).toHaveScreenshot()
    })
    test('focus', async ({ mount }) => {
      const mounted = await mount(<Basic />)

      const comp = mounted.locator('button', { hasText: 'Fifth' })

      await comp.focus()

      await expect(comp).toHaveScreenshot()
    })
    test('disabled', async ({ mount }) => {
      const mounted = await mount(<Basic />)

      const comp = mounted.locator('button', { hasText: 'Disabled' })

      await expect(comp).toHaveScreenshot()
    })

    test('incomplete', async ({ mount }) => {
      const mounted = await mount(<Basic />)

      const comp = mounted.locator('button', { hasText: 'Fifth' })

      await expect(comp).toHaveScreenshot()
    })
    test('current', async ({ mount }) => {
      const mounted = await mount(<Basic />)

      const comp = mounted.locator('button', { hasText: 'Third' })

      await expect(comp).toHaveScreenshot()
    })
    test('complete', async ({ mount }) => {
      const mounted = await mount(<Basic />)

      const comp = mounted.locator('button', { hasText: 'Second' })

      await expect(comp).toHaveScreenshot()
    })
    test('error', async ({ mount }) => {
      const mounted = await mount(<Basic />)

      const comp = mounted.locator('button', { hasText: 'Fourth' })

      await expect(comp).toHaveScreenshot()
    })
  })
})
