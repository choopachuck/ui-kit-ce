import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Filled } from '../examples/Filled'
import { Outlined } from '../examples/Outlined'
import { CustomColor } from '../examples/CustomColor'

test.describe('Underlay', () => {
  test('outlined', async ({ mount }) => {
    const component = await mount(<Outlined />)

    await expect(component).toHaveScreenshot()
  })
  test('filled', async ({ mount }) => {
    const component = await mount(<Filled />)

    await expect(component).toHaveScreenshot()
  })
  test('custom color', async ({ mount }) => {
    const component = await mount(<CustomColor />)

    await expect(component).toHaveScreenshot()
  })
})
