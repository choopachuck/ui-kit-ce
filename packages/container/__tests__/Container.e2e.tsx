import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { breakpoints } from '@v-uik/theme'
import { BasicContainer } from '../examples'

test.describe('Container', () => {
  test('xs', async ({ mount, page }) => {
    await page.setViewportSize({
      width: breakpoints.sm - 100,
      height: 250,
    })
    const component = await mount(<BasicContainer />)

    await expect(component).toHaveScreenshot()
  })

  test('sm', async ({ mount, page }) => {
    await page.setViewportSize({ width: breakpoints.sm, height: 250 })
    const component = await mount(<BasicContainer />)

    await expect(component).toHaveScreenshot()
  })

  test('md', async ({ mount, page }) => {
    await page.setViewportSize({ width: breakpoints.md, height: 250 })
    const component = await mount(<BasicContainer />)

    await expect(component).toHaveScreenshot()
  })

  test('lg', async ({ mount, page }) => {
    await page.setViewportSize({ width: breakpoints.lg, height: 250 })
    const component = await mount(<BasicContainer />)

    await expect(component).toHaveScreenshot()
  })

  test('xl', async ({ mount, page }) => {
    await page.setViewportSize({ width: breakpoints.xl, height: 250 })
    const component = await mount(<BasicContainer />)

    await expect(component).toHaveScreenshot()
  })

  test('xxl', async ({ mount, page }) => {
    await page.setViewportSize({ width: breakpoints.xxl, height: 250 })
    const component = await mount(<BasicContainer />)

    await expect(component).toHaveScreenshot()
  })
})
