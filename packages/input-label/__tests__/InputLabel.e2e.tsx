import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { InputLabel } from '../src'

test.describe('InputLabel', () => {
  test('enabled', async ({ mount }) => {
    const component = await mount(
      <InputLabel>Lorem ipsum dolor sit amet.</InputLabel>
    )

    await expect(component).toHaveScreenshot()
  })

  test('disabled', async ({ mount }) => {
    const component = await mount(
      <InputLabel disabled>Lorem ipsum dolor sit amet.</InputLabel>
    )

    await expect(component).toHaveScreenshot()
  })

  test('tooltip', async ({ mount }) => {
    const component = await mount(
      <InputLabel
        style={{ paddingTop: 35, paddingRight: 80 }}
        tooltipText="Подсказка"
        tooltipProps={{
          single: true,
          dropdownProps: {
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [-5, 8],
                },
              },
            ],
          },
        }}
      >
        Lorem ipsum dolor sit amet.
      </InputLabel>
    )
    await component.locator('svg').hover()

    await expect(component).toHaveScreenshot()
  })
})
