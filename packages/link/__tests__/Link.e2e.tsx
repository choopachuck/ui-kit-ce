import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { SimpleExample } from '../examples/SimpleExample'
import { Disabled } from '../examples/Disabled'
import { UnderlineExample } from '../examples/UnderlineExample'

test.describe('default', () => {
  test('enabled', async ({ mount, page }) => {
    await mount(<SimpleExample />)

    const comp = page.locator('a', { hasText: 'Dolore' })

    await expect(comp).toHaveScreenshot()
  })
  test('hover', async ({ mount, page }) => {
    await mount(<SimpleExample />)

    const comp = page.locator('a', { hasText: 'Dolore' })
    await comp.hover()

    await expect(comp).toHaveScreenshot()
  })
  test('active', async ({ mount, page }) => {
    await mount(<SimpleExample />)

    const comp = page.locator('a', { hasText: 'Dolore' })
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
    await mount(<SimpleExample />)

    const comp = page.locator('a', { hasText: 'Dolore' })
    await comp.focus()

    await expect(comp).toHaveScreenshot()
  })
  test('disabled', async ({ mount, page }) => {
    await mount(<Disabled />)

    const comp = page.locator('a', { hasText: 'Without underline' })

    await expect(comp).toHaveScreenshot()
  })
  //TODO: can we test visited?
  // test('visited', async ({ mount, page }) => {
  //   await mount(<SimpleExample/>)

  //   const comp = page.locator('a', { hasText: 'Dolore' })
  //   await comp.click({ modifiers: [ 'Control' ]})

  //   await page.mouse.click(0,0)

  //   await expect(comp).toHaveScreenshot()
  // })
})

test.describe('underline', () => {
  test('enabled', async ({ mount, page }) => {
    await mount(<UnderlineExample />)

    const comp = page.locator('a', { hasText: 'Link' })

    await expect(comp).toHaveScreenshot()
  })
  test('hover', async ({ mount, page }) => {
    await mount(<UnderlineExample />)

    const comp = page.locator('a', { hasText: 'Link' })
    await comp.hover()

    await expect(comp).toHaveScreenshot()
  })
  test('active', async ({ mount, page }) => {
    await mount(<UnderlineExample />)

    const comp = page.locator('a', { hasText: 'Link' })
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
    await mount(<UnderlineExample />)

    const comp = page.locator('a', { hasText: 'Link' })
    await comp.focus()

    await expect(comp).toHaveScreenshot()
  })
  test('disabled', async ({ mount, page }) => {
    await mount(<Disabled />)

    const comp = page.locator('a', { hasText: 'With underline' })

    await expect(comp).toHaveScreenshot()
  })
  //TODO: can we test visited?
  // test('visited', async ({ mount, page }) => {
  //   await mount(<UnderlineExample/>)

  //   const comp = page.locator('a', { hasText: 'Ссылка' })
  //   await comp.click({ modifiers: [ 'Control' ]})

  //   await page.mouse.click(0,0)

  //   await expect(comp).toHaveScreenshot()
  // })
})
