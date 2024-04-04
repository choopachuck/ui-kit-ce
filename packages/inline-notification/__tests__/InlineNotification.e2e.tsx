import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Filled } from '../examples/Filled'
import { Outlined } from '../examples/Outlined'
import { Direction } from '../examples/Direction'
import { Elements } from '../examples/Elements'
import { LongText } from '../examples/LongText'
import { Customized } from '../examples/Customized'

test.describe('InlineNotification', () => {
  test('outlined', async ({ mount }) => {
    const component = await mount(<Outlined />)

    await expect(component).toHaveScreenshot()
  })
  test('filled', async ({ mount }) => {
    const component = await mount(<Filled />)

    await expect(component).toHaveScreenshot()
  })
  test('directions', async ({ mount }) => {
    const component = await mount(<Direction />)

    await expect(component).toHaveScreenshot()
  })
  test('elements', async ({ mount }) => {
    const component = await mount(<Elements />)

    await expect(component).toHaveScreenshot()
  })
  test('text truncate', async ({ mount }) => {
    const component = await mount(<LongText />)

    await expect(component).toHaveScreenshot()
  })
  test('custom body', async ({ mount }) => {
    const component = await mount(<Customized />)

    await expect(component).toHaveScreenshot()
  })
})
