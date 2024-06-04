import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { test as testWithTheme } from '../../../playwright/fixtures/withThemeProviderInjected'
import { Tag, TTagKinds, TTagColor } from '../src'
import { createTheme } from '@v-uik/theme'

const kinds: Exclude<TTagKinds, 'color'>[] = ['lite', 'primary', 'secondary']

test.describe('Tag', () => {
  kinds.forEach((kind) => {
    test.describe(kind, () => {
      test.describe('sm', () => {
        test('text', async ({ mount }) => {
          const component = await mount(
            <Tag kind={kind} size="sm">
              Text
            </Tag>
          )

          await expect(component).toHaveScreenshot()
        })
        test('close', async ({ mount }) => {
          const component = await mount(
            <Tag kind={kind} size="sm" onDelete={() => null}>
              Text
            </Tag>
          )

          await expect(component).toHaveScreenshot()
        })
      })
      test.describe('md', () => {
        test('text', async ({ mount }) => {
          const component = await mount(
            <Tag kind={kind} size="md">
              Text
            </Tag>
          )

          await expect(component).toHaveScreenshot()
        })
        test('close', async ({ mount }) => {
          const component = await mount(
            <Tag kind={kind} size="md" onDelete={() => null}>
              Text
            </Tag>
          )

          await expect(component).toHaveScreenshot()
        })
      })

      const states = ['Fill', 'Outline']

      states.forEach((state) => {
        const selected = state === 'Fill'

        test.describe(state, () => {
          test('enabled', async ({ mount }) => {
            const component = await mount(
              <Tag kind={kind} selected={selected}>
                Text
              </Tag>
            )

            await expect(component).toHaveScreenshot()
          })
          test('hover', async ({ mount, page }) => {
            const component = await mount(
              <Tag kind={kind} selected={selected} onClick={() => null}>
                Text
              </Tag>
            )

            await page.locator('span', { hasText: 'Text' }).hover()

            await expect(component).toHaveScreenshot()
          })
          test('focus', async ({ mount, page }) => {
            const component = await mount(
              <div style={{ padding: '4px', width: '60px' }}>
                <Tag kind={kind} selected={selected} onClick={() => null}>
                  Text
                </Tag>
              </div>
            )

            await page.locator('button', { hasText: 'Text' }).focus()

            await expect(component).toHaveScreenshot()
          })
          test('disabled', async ({ mount }) => {
            const component = await mount(
              <Tag disabled kind={kind} selected={selected}>
                Text
              </Tag>
            )

            await expect(component).toHaveScreenshot()
          })
          test('dragged', async ({ mount }) => {
            const component = await mount(
              <div style={{ padding: '4px', width: '60px' }}>
                <Tag dragged kind={kind} selected={selected}>
                  Text
                </Tag>
              </div>
            )

            await expect(component).toHaveScreenshot()
          })
        })
      })
    })
  })

  test.describe('color', () => {
    const colors: TTagColor[] = [
      'red',
      'yellow',
      'green',
      'azure',
      'blue',
      'violet',
      'gray',
    ]

    colors.forEach((color) => {
      test(color, async ({ mount }) => {
        const component = await mount(
          <Tag kind="color" color={color}>
            Text
          </Tag>
        )

        await expect(component).toHaveScreenshot()
      })
    })
  })

  testWithTheme('sizes with custom typography', async ({ mountWithTheme }) => {
    const theme = createTheme({
      comp: {
        backwardCompatibilityMode: false,
        tag: {
          typographyFontSizeXs: '7px',
          typographyLineHeightXs: '9px',
          typographyFontSizeSm: '8px',
          typographyLineHeightSm: '10px',
          typographyFontSizeMd: '25px',
          typographyLineHeightMd: '30px',
          typographyFontSizeLg: '60px',
          typographyLineHeightLg: '90px',
        },
      },
    })

    const component = await mountWithTheme(
      <div style={{ paddingTop: 10 }}>
        <div style={{ marginBottom: 10 }}>
          <Tag size="xs">Tag</Tag>
        </div>
        <div style={{ marginBottom: 10 }}>
          <Tag size="sm">Tag</Tag>
        </div>
        <div style={{ marginBottom: 10 }}>
          <Tag>Add</Tag>
        </div>
        <div style={{ marginBottom: 10 }}>
          <Tag size="md">Add</Tag>
        </div>
        <div style={{ marginBottom: 10 }}>
          <Tag size="lg">Add</Tag>
        </div>
      </div>,
      theme
    )

    await expect(component).toHaveScreenshot()
  })
})
