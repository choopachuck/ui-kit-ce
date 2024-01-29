import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Badge } from '../src'

const children = (
  <div
    style={{
      height: '40px',
      width: '40px',
      backgroundColor: 'bisque',
    }}
  />
)

test.describe('Badge', () => {
  test('status', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'inline-flex' }}>
        <div style={{ padding: 10 }}>
          <Badge content="1" status="error" />
        </div>
        <div style={{ padding: 10 }}>
          <Badge content="1" status="info" />
        </div>
        <div style={{ padding: 10 }}>
          <Badge content="1" status="warning" />
        </div>
        <div style={{ padding: 10 }}>
          <Badge content="1" status="success" />
        </div>
        <div style={{ padding: 10 }}>
          <Badge content="1" status="neutral" />
        </div>
        <div style={{ padding: 10 }}>
          <Badge content="1" status="disabled" />
        </div>
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('position', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'inline-flex' }}>
        <Badge style={{ margin: 10 }} content="1" position="top-right">
          {children}
        </Badge>
        <Badge style={{ margin: 10 }} content="1" position="bottom-right">
          {children}
        </Badge>
        <Badge style={{ margin: 10 }} content="1" position="top-left">
          {children}
        </Badge>
        <Badge style={{ margin: 10 }} content="1" position="bottom-left">
          {children}
        </Badge>
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('dot', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'inline-flex' }}>
        <Badge dot style={{ margin: 10 }} content="1">
          {children}
        </Badge>
        <Badge dot showZero style={{ margin: 10 }}>
          {children}
        </Badge>
        <Badge dot style={{ margin: 10 }}>
          {children}
        </Badge>
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('max', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'inline-flex' }}>
        <Badge style={{ margin: 10 }} content={10} max={10}>
          {children}
        </Badge>
        <Badge style={{ margin: 10 }} content={11} max={10}>
          {children}
        </Badge>
      </div>
    )

    await expect(component).toHaveScreenshot()
  })
})
