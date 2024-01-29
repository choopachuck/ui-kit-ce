import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import {
  WithTopAndBottomLabels,
  WithKeepHelperTextMinHeight,
} from '../examples'

test.describe('Labelled', () => {
  test('with label, description and helper text', async ({ mount }) => {
    const component = await mount(<WithTopAndBottomLabels />)

    await expect(component).toHaveScreenshot()
  })
  test('with label, description and helper text disabled', async ({
    mount,
  }) => {
    const component = await mount(<WithTopAndBottomLabels disabled />)

    await expect(component).toHaveScreenshot()
  })
  test('with label, description and helper text required', async ({
    mount,
  }) => {
    const component = await mount(<WithTopAndBottomLabels required />)

    await expect(component).toHaveScreenshot()
  })
  test('with label, description and helper text disabled required', async ({
    mount,
  }) => {
    const component = await mount(<WithTopAndBottomLabels required disabled />)

    await expect(component).toHaveScreenshot()
  })
  test('with label, description and helper text error', async ({ mount }) => {
    const component = await mount(<WithTopAndBottomLabels error />)

    await expect(component).toHaveScreenshot()
  })
  test('with flag keepHelperTextMinHeight = true', async ({ mount }) => {
    const component = await mount(
      <WithKeepHelperTextMinHeight keepHelperTextMinHeight />
    )

    await expect(component).toHaveScreenshot()
  })
  test('with flag keepHelperTextMinHeight = false', async ({ mount }) => {
    const component = await mount(<WithKeepHelperTextMinHeight />)

    await expect(component).toHaveScreenshot()
  })
})
