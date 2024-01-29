import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { DropzoneExample } from './examples/DropzoneExample'

test.describe('Dropzone', () => {
  test('enabled', async ({ mount }) => {
    const component = await mount(<DropzoneExample />)

    await expect(component).toHaveScreenshot()
  })
  test('hover', async ({ mount }) => {
    const component = await mount(<DropzoneExample id="test" />)
    await component.locator('#test').hover()

    await component.locator('button').hover()

    await expect(component).toHaveScreenshot()
  })
  test('focus', async ({ mount }) => {
    const component = await mount(<DropzoneExample id="test" />)
    await component.locator('#test').focus()

    await expect(component).toHaveScreenshot()
  })
  test('error', async ({ mount }) => {
    const component = await mount(<DropzoneExample error />)

    await expect(component).toHaveScreenshot()
  })
  test('disabled', async ({ mount }) => {
    const component = await mount(<DropzoneExample disabled />)

    await expect(component).toHaveScreenshot()
  })
})
