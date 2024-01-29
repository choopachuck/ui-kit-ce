import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'

import {
  BasicDivider,
  VerticalDivider,
  DividerWithContent,
  TokensCustom,
  VerticalWithText,
} from '../examples'

test.describe('Divider', () => {
  test('horizontal divider in list', async ({ mount }) => {
    const component = await mount(<BasicDivider />)

    await expect(component).toHaveScreenshot()
  })

  test('vertical divider', async ({ mount }) => {
    const component = await mount(<VerticalDivider />)

    await expect(component).toHaveScreenshot()
  })

  test('horizontal divider with content', async ({ mount }) => {
    const component = await mount(<DividerWithContent />)

    await expect(component).toHaveScreenshot()
  })

  test('vertical divider with content', async ({ mount }) => {
    const component = await mount(<VerticalWithText />)

    await expect(component).toHaveScreenshot()
  })

  test('with tokens override', async ({ mount }) => {
    const component = await mount(<TokensCustom />)

    await expect(component).toHaveScreenshot()
  })
})
