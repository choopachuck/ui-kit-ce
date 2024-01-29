import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Example } from '../examples/Example'
import { InputNumber } from '../src'

test.describe('Input', () => {
  test('filled', async ({ mount }) => {
    const component = await mount(<Example />)

    await expect(component).toHaveScreenshot()
  })

  test('hover', async ({ mount }) => {
    const component = await mount(<Example />)
    await component.locator('input').hover()

    await expect(component).toHaveScreenshot()
  })

  test('focus', async ({ mount }) => {
    const component = await mount(<Example />)
    await component.locator('input').focus()

    await expect(component).toHaveScreenshot()
  })

  test('clear', async ({ mount }) => {
    const component = await mount(<InputNumber canClear value={100} />)

    await expect(component).toHaveScreenshot()
  })
})
