import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Disabled } from '../examples/Disabled'
import { Filled } from '../examples/Filled'
import { NestedTabs } from '../examples/NestedTabs'
import { Vertical } from '../examples/Vertical'

test.describe('Tabs', () => {
  test.describe('horizontal', () => {
    test('', async ({ page, mount }) => {
      const mounted = await mount(<Disabled />)

      const comp = page.locator('button', { hasText: '1 Tab' })

      await comp.click()

      await page.locator('div div div', { hasText: 'Content' }).click()

      await expect(mounted).toHaveScreenshot()
    })
    test('selected', async ({ page, mount }) => {
      await mount(<Disabled />)

      const comp = page.locator('button', { hasText: '1 Tab' })

      await comp.click()

      await page.keyboard.press('Tab')

      await expect(comp).toHaveScreenshot()
    })
    test('enabled', async ({ page, mount }) => {
      await mount(<Disabled />)

      const comp = page.locator('button', { hasText: '2 Tab' })

      await expect(comp).toHaveScreenshot()
    })
    test('hover', async ({ page, mount }) => {
      await mount(<Disabled />)

      // Хверим второй таб, потому что 1 уже выбран
      const comp = page.locator('button', { hasText: '2 Tab' })

      await comp.hover()

      await expect(comp).toHaveScreenshot()
    })
    test('focus', async ({ page, mount }) => {
      await mount(<Disabled />)

      const comp = page.locator('button', { hasText: '1 Tab' })

      await comp.focus()

      await expect(comp).toHaveScreenshot()
    })
    test('disabled', async ({ page, mount }) => {
      await mount(<Disabled />)

      const comp = page.locator('button', { hasText: '3 Tab' })

      await expect(comp).toHaveScreenshot()
    })
  })
  test.describe('vertical', () => {
    test('', async ({ page, mount }) => {
      await mount(<Vertical />)

      const container = page.locator('div div', { hasText: 'Default' })
      const comp = container.locator('button', { hasText: '1 Tab' })

      await comp.click()

      await container.click()

      await expect(container).toHaveScreenshot()
    })
    test('selected', async ({ page, mount }) => {
      await mount(<Vertical />)

      const container = page.locator('div div', { hasText: 'Default' })
      const comp = container.locator('button', { hasText: '1 Tab' })

      await comp.click()

      await page.keyboard.press('Tab')

      await expect(comp).toHaveScreenshot()
    })
    test('enabled', async ({ page, mount }) => {
      await mount(<Vertical />)

      const container = page.locator('div div', { hasText: 'Default' })

      const comp = container.locator('button', { hasText: '2 Tab' })

      await expect(comp).toHaveScreenshot()
    })
    test('hover', async ({ page, mount }) => {
      await mount(<Vertical />)

      const container = page.locator('div div', { hasText: 'Default' })

      const comp = container.locator('button', { hasText: '2 Tab' })

      await comp.hover()

      await expect(comp).toHaveScreenshot()
    })
    test('focus', async ({ page, mount }) => {
      await mount(<Vertical />)

      const container = page.locator('div div', { hasText: 'Default' })

      const comp = container.locator('button', { hasText: '1 Tab' })

      await comp.focus()

      await expect(comp).toHaveScreenshot()
    })
    test('disabled', async ({ page, mount }) => {
      await mount(<Vertical />)

      const container = page.locator('div div', { hasText: 'Default' })

      const comp = container.locator('button', { hasText: '5 Tab' })

      await expect(comp).toHaveScreenshot()
    })
  })
})
test.describe('Card Tabs', () => {
  test.describe('vertical', () => {
    test('', async ({ page, mount }) => {
      await mount(<Vertical />)

      const container = page.locator('div div', { hasText: 'Filled' })
      const comp = container.locator('button', { hasText: '1 Tab' })

      await comp.click()

      await container.click()

      await expect(container).toHaveScreenshot()
    })
    test('selected', async ({ page, mount }) => {
      await mount(<Vertical />)

      const container = page.locator('div div', { hasText: 'Filled' })
      const comp = container.locator('button', { hasText: '1 Tab' })

      await comp.click()

      await page.keyboard.press('Tab')

      await expect(comp).toHaveScreenshot()
    })
    test('enabled', async ({ page, mount }) => {
      await mount(<Vertical />)

      const container = page.locator('div div', { hasText: 'Filled' })

      const comp = container.locator('button', { hasText: '2 Tab' })

      await expect(comp).toHaveScreenshot()
    })
    test('hover', async ({ page, mount }) => {
      await mount(<Vertical />)

      const container = page.locator('div div', { hasText: 'Filled' })

      const comp = container.locator('button', { hasText: '2 Tab' })

      await comp.hover()

      await expect(comp).toHaveScreenshot()
    })
    test('focus', async ({ page, mount }) => {
      await mount(<Vertical />)

      const container = page.locator('div div', { hasText: 'Filled' })

      const comp = container.locator('button', { hasText: '1 Tab' })

      await comp.focus()

      await expect(comp).toHaveScreenshot()
    })
    test('disabled', async ({ page, mount }) => {
      await mount(<Vertical />)

      const container = page.locator('div div', { hasText: 'Filled' })

      const comp = container.locator('button', { hasText: '5 Tab' })

      await expect(comp).toHaveScreenshot()
    })
  })
  test.describe('horizontal', () => {
    test('', async ({ mount }) => {
      const mounted = await mount(<Filled />)

      await expect(mounted).toHaveScreenshot()
    })
    test('selected', async ({ page, mount }) => {
      await mount(<Filled />)

      const comp = page.locator('button', { hasText: '1 Tab' }).first()

      await expect(comp).toHaveScreenshot()
    })
    test('enabled', async ({ page, mount }) => {
      await mount(<Filled />)

      const comp = page.locator('button', { hasText: '2 Tab' }).first()

      await expect(comp).toHaveScreenshot()
    })
    test('hover', async ({ page, mount }) => {
      await mount(<Filled />)

      const comp = page.locator('button', { hasText: '2 Tab' }).first()

      await comp.hover()

      await expect(comp).toHaveScreenshot()
    })
    test('focus', async ({ page, mount }) => {
      await mount(<Filled />)

      const comp = page.locator('button', { hasText: '2 Tab' }).first()

      await comp.focus()

      await expect(comp).toHaveScreenshot()
    })
    test('disabled', async ({ page, mount }) => {
      await mount(<Filled />)

      const comp = page.locator('button', { hasText: '5 Tab' }).first()

      await expect(comp).toHaveScreenshot()
    })
  })
})

test.describe('Nested Tabs', () => {
  test('default', async ({ mount }) => {
    const mounted = await mount(<NestedTabs />)

    await expect(mounted).toHaveScreenshot()
  })

  test('filled', async ({ mount }) => {
    const mounted = await mount(<NestedTabs kind="filled" />)

    await expect(mounted).toHaveScreenshot()
  })
})
