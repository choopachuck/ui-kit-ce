import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Adaptive } from '../examples'

test.describe('Notification adaptive', () => {
  test('enabled', async ({ mount, page }) => {
    const component = await mount(<Adaptive />)
    await component.locator('button').tap()
    await page.waitForTimeout(1000)
    expect(
      await page.screenshot({ fullPage: true, scale: 'css' })
    ).toMatchSnapshot()
  })
})
