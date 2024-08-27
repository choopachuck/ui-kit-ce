import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { test as testWithTheme } from '../../../playwright/fixtures/withThemeProviderInjected'
import { WithError, WithRows, FullWidth, Disabled, Basic } from '../examples'
import { Textarea, TextareaProps } from '../src'
import { createTheme } from '@v-uik/theme'

test.describe('Textarea', () => {
  test('enabled', async ({ mount }) => {
    const component = await mount(<Basic />)

    await expect(component).toHaveScreenshot()
  })
  testWithTheme('sizes with custom typography', async ({ mountWithTheme }) => {
    const theme = createTheme({
      comp: {
        backwardCompatibilityMode: false,
        textarea: {
          typographyFontSizeSm: '9px',
          typographyLineHeightSm: '12px',
          typographyFontSizeMd: '16px',
          typographyLineHeightMd: '24px',
          typographyFontSizeLg: '36px',
          typographyLineHeightLg: '50px',
        },
      },
    })

    const component = await mountWithTheme(
      <div style={{ padding: 5 }}>
        <Textarea size="sm" style={{ marginRight: 10 }} value="value" />
        <Textarea size="md" style={{ marginRight: 10 }} value="value" />
        <Textarea style={{ marginRight: 10 }} value="value" />
        <Textarea size="lg" value="value" />
      </div>,
      theme
    )

    await expect(component).toHaveScreenshot()
  })
  test('focus', async ({ mount }) => {
    const component = await mount(<Basic />)

    await component.locator('textarea').focus()

    await expect(component).toHaveScreenshot()
  })
  test('active', async ({ mount, page }) => {
    const component = await mount(<Basic />)

    await component.locator('textarea').focus()

    await page.keyboard.type('Hello World', { delay: 100 })

    await expect(component).toHaveScreenshot()
  })
  test('filled', async ({ mount, page }) => {
    const component = await mount(<Basic />)

    await component.locator('textarea').focus()

    await page.keyboard.type('Hello World', { delay: 100 })

    await page.keyboard.press('Tab')

    await expect(component).toHaveScreenshot()
  })
  test('error', async ({ mount }) => {
    const component = await mount(<WithError />)

    await expect(component).toHaveScreenshot()
  })
  test('disabled', async ({ mount }) => {
    const component = await mount(<Disabled />)

    await expect(component).toHaveScreenshot()
  })
  test('full width', async ({ mount }) => {
    const component = await mount(<FullWidth />)

    await expect(component).toHaveScreenshot()
  })
  test('rows set', async ({ mount }) => {
    const component = await mount(<WithRows />)

    await expect(component).toHaveScreenshot()
  })
  test.describe('resize', () => {
    const resizeList: NonNullable<TextareaProps['resize']>[] = [
      'none',
      'both',
      'horizontal',
      'vertical',
    ]

    resizeList.forEach((resize) => {
      test(resize, async ({ mount, page }) => {
        const component = await mount(<Textarea resize={resize} value="text" />)
        const initialSize = await component.boundingBox()

        if (initialSize) {
          const offset = 6
          const offsetMove = 70
          const sizeX = initialSize.x + initialSize.width
          const sizeY = initialSize.y + initialSize.height

          await page.mouse.move(sizeX - offset, sizeY - offset)
          await page.mouse.down()
          await page.mouse.move(sizeX + offsetMove, sizeY + offsetMove)
          await page.mouse.up()
        }

        await expect(component).toHaveScreenshot()
      })
    })
  })
})
