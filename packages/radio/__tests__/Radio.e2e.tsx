import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Vertical } from '../examples/Vertical'
import { Horizontal } from '../examples/Horizontal'
import { DisabledRadio } from '../examples/DisabledRadio'

test.describe('radio button group', () => {
  test('vertical', async ({ mount }) => {
    const comp = await mount(<Vertical />)

    await expect(comp).toHaveScreenshot()
  })
  test('horizontal', async ({ mount }) => {
    const comp = await mount(<Horizontal />)

    await expect(comp).toHaveScreenshot()
  })
})

test.describe('radio button', () => {
  test.describe('deselected', () => {
    test('enabled', async ({ mount }) => {
      const mounted = await mount(<Horizontal />)

      const comp = mounted.locator('label', { hasText: 'Radio label 2' })

      await expect(comp).toHaveScreenshot()
    })
    test('hover', async ({ mount }) => {
      const mounted = await mount(<Horizontal />)

      const comp = mounted.locator('label', { hasText: 'Radio label 2' })

      await comp.locator('input').hover()

      await expect(comp).toHaveScreenshot()
    })
    test('focus', async ({ mount }) => {
      const mounted = await mount(<Horizontal />)

      const comp = mounted.locator('label', { hasText: 'Radio label 2' })

      await comp.locator('input').focus()

      await expect(comp).toHaveScreenshot()
    })
    test('disabled', async ({ mount }) => {
      const mounted = await mount(<DisabledRadio />)

      const comp = mounted.locator('label', { hasText: 'Disabled 2' })

      await expect(comp).toHaveScreenshot()
    })
  })
  test.describe('selected', () => {
    test('enabled', async ({ mount }) => {
      const mounted = await mount(<Horizontal />)

      const comp = mounted.locator('label', { hasText: 'Radio label 1' })

      await expect(comp).toHaveScreenshot()
    })
    test('hover', async ({ mount }) => {
      const mounted = await mount(<Horizontal />)

      const comp = mounted.locator('label', { hasText: 'Radio label 1' })

      await comp.locator('input').hover()

      await expect(comp).toHaveScreenshot()
    })
    test('focus', async ({ mount }) => {
      const mounted = await mount(<Horizontal />)

      const comp = mounted.locator('label', { hasText: 'Radio label 1' })

      await comp.locator('input').focus()

      await expect(comp).toHaveScreenshot()
    })
    test('disabled', async ({ mount }) => {
      const mounted = await mount(<DisabledRadio />)

      const comp = mounted.locator('label', { hasText: 'Disabled 1' })

      await expect(comp).toHaveScreenshot()
    })
  })
})
