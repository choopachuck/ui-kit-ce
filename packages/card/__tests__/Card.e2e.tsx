import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Card } from '../src'

test.describe('Card', () => {
  test.describe('container', () => {
    test('enabled', async ({ mount }) => {
      const component = await mount(
        <div style={{ width: 288, padding: 16 }}>
          <Card header="Header" subtitle="Subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
            mi.
          </Card>
        </div>
      )
      await expect(component).toHaveScreenshot()
    })
  })

  test.describe('clickable', () => {
    test('enabled', async ({ mount }) => {
      const component = await mount(
        <div style={{ width: 288, padding: 16 }}>
          <Card kind="clickable" header="Header" subtitle="Subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
            mi.
          </Card>
        </div>
      )
      await expect(component).toHaveScreenshot()
    })

    test('focus', async ({ mount }) => {
      const component = await mount(
        <div style={{ width: 288, padding: 16 }}>
          <Card kind="clickable" header="Header" subtitle="Subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
            mi.
          </Card>
        </div>
      )
      await component.locator('[role=button]').focus()

      await expect(component).toHaveScreenshot()
    })

    test('hover', async ({ mount }) => {
      const component = await mount(
        <div style={{ width: 288, padding: 16 }}>
          <Card kind="clickable" header="Header" subtitle="Subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
            mi.
          </Card>
        </div>
      )
      await component.locator('[role=button]').hover()

      await expect(component).toHaveScreenshot()
    })
    test('active', async ({ mount, page }) => {
      const component = await mount(
        <div style={{ width: 288, padding: 16 }}>
          <Card kind="clickable" header="Header" subtitle="Subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
            mi.
          </Card>
        </div>
      )
      await page.mouse.move(30, 30)
      await page.mouse.down()

      await expect(component).toHaveScreenshot()
    })

    test('disabled', async ({ mount }) => {
      const component = await mount(
        <div style={{ width: 288, padding: 16 }}>
          <Card disabled kind="clickable" header="Header" subtitle="Subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
            mi.
          </Card>
        </div>
      )
      await expect(component).toHaveScreenshot()
    })
  })

  test.describe('selectable', () => {
    test.describe('unchecked', () => {
      test('enabled', async ({ mount }) => {
        const component = await mount(
          <div style={{ width: 288, padding: 16 }}>
            <Card
              kind="selectable"
              checked={false}
              header="Header"
              subtitle="Subtitle"
              onChange={() => null}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
              massa mi.
            </Card>
          </div>
        )
        await expect(component).toHaveScreenshot()
      })

      test('hover', async ({ mount }) => {
        const component = await mount(
          <div style={{ width: 288, padding: 16 }}>
            <Card
              kind="selectable"
              checked={false}
              header="Header"
              subtitle="Subtitle"
              onChange={() => null}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
              massa mi.
            </Card>
          </div>
        )
        await component.locator('input').hover()

        await expect(component).toHaveScreenshot()
      })

      test('active', async ({ mount, page }) => {
        const component = await mount(
          <div style={{ width: 288, padding: 16 }}>
            <Card
              kind="selectable"
              checked={false}
              header="Header"
              subtitle="Subtitle"
              onChange={() => null}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
              massa mi.
            </Card>
          </div>
        )
        await page.mouse.move(30, 30)
        await page.mouse.down()

        await expect(component).toHaveScreenshot()
      })

      test('focus', async ({ mount }) => {
        const component = await mount(
          <div style={{ width: 288, padding: 16 }}>
            <Card
              kind="selectable"
              checked={false}
              header="Header"
              subtitle="Subtitle"
              onChange={() => null}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
              massa mi.
            </Card>
          </div>
        )
        await component.locator('input').focus()

        await expect(component).toHaveScreenshot()
      })

      test('disabled', async ({ mount }) => {
        const component = await mount(
          <div style={{ width: 288, padding: 16 }}>
            <Card
              disabled
              kind="selectable"
              checked={false}
              subtitle="Subtitle"
              header="Header"
              onChange={() => null}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
              massa mi.
            </Card>
          </div>
        )

        await expect(component).toHaveScreenshot()
      })
    })

    test.describe('checked', () => {
      test('enabled', async ({ mount }) => {
        const component = await mount(
          <div style={{ width: 288, padding: 16 }}>
            <Card
              checked
              kind="selectable"
              header="Header"
              subtitle="Subtitle"
              onChange={() => null}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
              massa mi.
            </Card>
          </div>
        )
        await expect(component).toHaveScreenshot()
      })

      test('hover', async ({ mount }) => {
        const component = await mount(
          <div style={{ width: 288, padding: 16 }}>
            <Card
              checked
              kind="selectable"
              header="Header"
              subtitle="Subtitle"
              onChange={() => null}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
              massa mi.
            </Card>
          </div>
        )
        await component.locator('input').hover()

        await expect(component).toHaveScreenshot()
      })

      test('active', async ({ mount, page }) => {
        const component = await mount(
          <div style={{ width: 288, padding: 16 }}>
            <Card
              checked
              kind="selectable"
              header="Header"
              subtitle="Subtitle"
              onChange={() => null}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
              massa mi.
            </Card>
          </div>
        )
        await page.mouse.move(30, 30)
        await page.mouse.down()

        await expect(component).toHaveScreenshot()
      })

      test('focus', async ({ mount }) => {
        const component = await mount(
          <div style={{ width: 288, padding: 16 }}>
            <Card
              checked
              kind="selectable"
              header="Header"
              subtitle="Subtitle"
              onChange={() => null}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
              massa mi.
            </Card>
          </div>
        )
        await component.locator('input').focus()

        await expect(component).toHaveScreenshot()
      })

      test('disabled', async ({ mount }) => {
        const component = await mount(
          <div style={{ width: 288, padding: 16 }}>
            <Card
              disabled
              checked
              kind="selectable"
              header="Header"
              subtitle="Subtitle"
              onChange={() => null}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
              massa mi.
            </Card>
          </div>
        )

        await expect(component).toHaveScreenshot()
      })
    })
  })
})
