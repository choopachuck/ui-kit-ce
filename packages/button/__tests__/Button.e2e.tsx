import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Button, TButtonKinds, TButtonColor } from '../src'

const buttonKinds: Array<TButtonKinds> = ['contained', 'outlined', 'ghost']
const buttonColors: Array<TButtonColor> = ['primary', 'secondary', 'error']

test.use({ viewport: { width: 400, height: 100 } })

test.describe('Button', () => {
  buttonKinds.forEach((kind) => {
    test.describe(kind, () => {
      buttonColors.forEach((color) => {
        test.describe(color, () => {
          test('enabled', async ({ mount }) => {
            const component = await mount(
              <Button kind={kind} color={color}>
                button
              </Button>
            )

            await expect(component).toHaveScreenshot()
          })

          test('hover', async ({ mount }) => {
            const component = await mount(
              <Button kind={kind} color={color}>
                button
              </Button>
            )
            await component.hover()

            await expect(component).toHaveScreenshot()
          })

          test('active', async ({ mount, page }) => {
            const component = await mount(
              <div style={{ padding: 5 }}>
                <Button kind={kind} color={color}>
                  button
                </Button>
              </div>
            )
            await page.mouse.move(30, 30)
            await page.mouse.down()

            await expect(component).toHaveScreenshot()
          })

          test('focus', async ({ mount }) => {
            const component = await mount(
              <div style={{ padding: 5 }}>
                <Button kind={kind} color={color}>
                  button
                </Button>
              </div>
            )
            await component.locator('button').focus()

            await expect(component).toHaveScreenshot()
          })

          test('disabled', async ({ mount }) => {
            const component = await mount(
              <Button disabled kind={kind} color={color}>
                button
              </Button>
            )

            await expect(component).toHaveScreenshot()
          })
        })
      })

      test('sizes', async ({ mount }) => {
        const component = await mount(
          <div>
            <Button size="sm" kind={kind} style={{ margin: 10 }}>
              button
            </Button>
            <Button size="md" kind={kind} style={{ margin: 10 }}>
              button
            </Button>
            <Button size="lg" kind={kind} style={{ margin: 10 }}>
              button
            </Button>
          </div>
        )

        await expect(component).toHaveScreenshot()
      })

      test('fullWidth', async ({ mount }) => {
        const component = await mount(
          <Button fullWidth kind={kind}>
            button
          </Button>
        )

        await expect(component).toHaveScreenshot()
      })
    })
  })
})
