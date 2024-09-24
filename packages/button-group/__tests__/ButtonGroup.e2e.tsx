import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { ButtonGroup, ButtonGroupProps } from '../src'
import { Examples } from '../examples'
import { Button } from '@v-uik/button'

const colors: Array<ButtonGroupProps['color']> = ['primary', 'secondary']

test.describe('ButtonGroup', () => {
  colors.forEach((color) => {
    test.describe(color as string, () => {
      test('enabled', async ({ mount }) => {
        const component = await mount(
          <ButtonGroup color={color} style={{ padding: 5 }}>
            <Button name="1">button 1</Button>
            <Button name="2">button 2</Button>
            <Button name="3">button 3</Button>
          </ButtonGroup>
        )

        await expect(component).toHaveScreenshot()
      })

      test('disabled', async ({ mount }) => {
        const component = await mount(
          <ButtonGroup color={color} style={{ padding: 5 }}>
            <Button disabled name="1">
              button 1
            </Button>
            <Button name="2">button 2</Button>
            <Button name="3">button 3</Button>
          </ButtonGroup>
        )

        await expect(component).toHaveScreenshot()
      })

      test('selected', async ({ mount }) => {
        const component = await mount(
          <ButtonGroup value="1" color={color} style={{ padding: 5 }}>
            <Button name="1">button 1</Button>
            <Button name="2">button 2</Button>
            <Button name="3">button 3</Button>
          </ButtonGroup>
        )

        await expect(component).toHaveScreenshot()
      })

      test('hover', async ({ mount }) => {
        const component = await mount(
          <ButtonGroup color={color} style={{ padding: 5 }}>
            <Button name="1">button 1</Button>
            <Button name="2">button 2</Button>
            <Button name="3">button 3</Button>
          </ButtonGroup>
        )
        await component.locator('button').first().hover()

        await expect(component).toHaveScreenshot()
      })

      test('active', async ({ mount, page }) => {
        const component = await mount(
          <ButtonGroup color={color} style={{ padding: 5 }}>
            <Button name="1">button 1</Button>
            <Button name="2">button 2</Button>
            <Button name="3">button 3</Button>
          </ButtonGroup>
        )
        await page.mouse.move(20, 20)
        await page.mouse.down()

        await expect(component).toHaveScreenshot()
      })

      test('focus', async ({ mount }) => {
        const component = await mount(
          <ButtonGroup color={color} style={{ padding: 5 }}>
            <Button name="1">button 1</Button>
            <Button name="2">button 2</Button>
            <Button name="3">button 3</Button>
          </ButtonGroup>
        )
        await component.locator('button').first().focus()

        await expect(component).toHaveScreenshot()
      })
    })
  })

  test('sizes', async ({ mount }) => {
    const component = await mount(
      <div>
        <Examples />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('single', async ({ mount }) => {
    const component = await mount(
      <ButtonGroup style={{ padding: 5 }}>
        <Button name="1">button 1</Button>
      </ButtonGroup>
    )

    await expect(component).toHaveScreenshot()
  })
})
