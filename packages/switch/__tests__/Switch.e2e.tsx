import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { SwitchesWithText } from '../examples/Examples'
import { Disabled } from '../examples/Disabled'

test.describe('Switch labeled', () => {
  test.describe('md', () => {
    test.describe('off', () => {
      test('enabled', async ({ mount }) => {
        const mounted = await mount(<SwitchesWithText />)
        const comp = mounted.locator('label', { hasText: 'MD' })

        await expect(comp).toHaveScreenshot()
      })
      test('hover', async ({ mount }) => {
        const mounted = await mount(<SwitchesWithText />)
        const comp = mounted.locator('label', { hasText: 'MD' })

        await comp.locator('input').hover()

        await expect(comp).toHaveScreenshot()
      })
      test('active', async ({ mount, page }) => {
        const mounted = await mount(<SwitchesWithText />)
        const comp = mounted.locator('label', { hasText: 'MD' })

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
        const mounted = await mount(<SwitchesWithText />)
        const comp = mounted.locator('label', { hasText: 'MD' })

        await comp.focus()

        await expect(comp).toHaveScreenshot()
      })
      test('disabled', async ({ mount }) => {
        const mounted = await mount(<Disabled />)
        const comp = mounted.locator('label', {
          hasText: 'md disabled unchecked',
        })

        await expect(comp).toHaveScreenshot()
      })
    })
    test.describe('on', () => {
      test('enabled', async ({ mount, page }) => {
        const mounted = await mount(<SwitchesWithText />)
        const comp = mounted.locator('label', { hasText: 'MD' })

        await comp.click()
        await page.mouse.click(0, 0)

        await expect(comp).toHaveScreenshot()
      })
      test('hover', async ({ mount, page }) => {
        const mounted = await mount(<SwitchesWithText />)
        const comp = mounted.locator('label', { hasText: 'MD' })
        await comp.click()
        await page.mouse.click(0, 0)

        await comp.locator('input').hover()

        await expect(comp).toHaveScreenshot()
      })
      test('active', async ({ mount, page }) => {
        const mounted = await mount(<SwitchesWithText />)
        const comp = mounted.locator('label', { hasText: 'MD' })

        await comp.click()
        await page.mouse.click(0, 0)

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
      test('focus', async ({ mount, page }) => {
        const mounted = await mount(<SwitchesWithText />)
        const comp = mounted.locator('label', { hasText: 'MD' })

        // Небольшой костыль для Playwright. Почему-то он при вызове функции focus() после click() не триггерит появление
        // псевдокласса :focus-visible в Chromium и Firefox, хотя в самих браузерах все ок.
        await comp.focus()
        await comp.click()
        await page.mouse.click(0, 0)

        await comp.focus()

        await expect(comp).toHaveScreenshot()
      })
      test('disabled', async ({ mount }) => {
        const mounted = await mount(<Disabled />)
        const comp = mounted.locator('label', {
          hasText: 'md disabled checked',
        })

        await expect(comp).toHaveScreenshot()
      })
    })
  })
  test.describe('sm', () => {
    test.describe('off', () => {
      test('enabled', async ({ mount }) => {
        const mounted = await mount(<SwitchesWithText />)
        const comp = mounted.locator('label', { hasText: 'SM' })

        await expect(comp).toHaveScreenshot()
      })
      test('hover', async ({ mount }) => {
        const mounted = await mount(<SwitchesWithText />)
        const comp = mounted.locator('label', { hasText: 'SM' })

        await comp.locator('input').hover()

        await expect(comp).toHaveScreenshot()
      })
      test('active', async ({ mount, page }) => {
        const mounted = await mount(<SwitchesWithText />)
        const comp = mounted.locator('label', { hasText: 'SM' })

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
        const mounted = await mount(<SwitchesWithText />)
        const comp = mounted.locator('label', { hasText: 'SM' })

        await comp.focus()

        await expect(comp).toHaveScreenshot()
      })
      test('disabled', async ({ mount }) => {
        const mounted = await mount(<Disabled />)
        const comp = mounted.locator('label', {
          hasText: 'sm disabled unchecked',
        })

        await expect(comp).toHaveScreenshot()
      })
    })
    test.describe('on', () => {
      test('enabled', async ({ mount, page }) => {
        const mounted = await mount(<SwitchesWithText />)
        const comp = mounted.locator('label', { hasText: 'SM' })

        await comp.click()
        await page.mouse.click(0, 0)

        await expect(comp).toHaveScreenshot()
      })
      test('hover', async ({ mount, page }) => {
        const mounted = await mount(<SwitchesWithText />)
        const comp = mounted.locator('label', { hasText: 'SM' })
        await comp.click()
        await page.mouse.click(0, 0)

        await comp.locator('input').hover()

        await expect(comp).toHaveScreenshot()
      })
      test('active', async ({ mount, page }) => {
        const mounted = await mount(<SwitchesWithText />)
        const comp = mounted.locator('label', { hasText: 'SM' })
        await comp.click()
        await page.mouse.click(0, 0)

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
      test('focus', async ({ mount, page }) => {
        const mounted = await mount(<SwitchesWithText />)
        const comp = mounted.locator('label', { hasText: 'SM' })

        // Небольшой костыль для Playwright. Почему-то он при вызове функции focus() после click() не триггерит появление
        // псевдокласса :focus-visible в Chromium и Firefox, хотя в самих браузерах все ок.
        await comp.focus()

        await comp.click()
        await page.mouse.click(0, 0)

        await comp.focus()

        await expect(comp).toHaveScreenshot()
      })
      test('disabled', async ({ mount }) => {
        const mounted = await mount(<Disabled />)
        const comp = mounted.locator('label', {
          hasText: 'sm disabled checked',
        })

        await expect(comp).toHaveScreenshot()
      })
    })
  })
})
