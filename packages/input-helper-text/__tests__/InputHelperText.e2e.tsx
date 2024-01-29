import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { InputHelperText } from '../src'

test.describe('InputHelperText', () => {
  test('enabled', async ({ mount }) => {
    const component = await mount(
      <InputHelperText style={{ display: 'inline-flex' }}>
        Lorem ipsum dolor sit amet.
      </InputHelperText>
    )

    await expect(component).toHaveScreenshot()
  })

  test('disabled', async ({ mount }) => {
    const component = await mount(
      <InputHelperText disabled style={{ display: 'inline-flex' }}>
        Lorem ipsum dolor sit amet.
      </InputHelperText>
    )

    await expect(component).toHaveScreenshot()
  })

  test('error', async ({ mount }) => {
    const component = await mount(
      <InputHelperText error style={{ display: 'inline-flex' }}>
        Lorem ipsum dolor sit amet.
      </InputHelperText>
    )

    await expect(component).toHaveScreenshot()
  })
})
