import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Basic } from '../examples/Basic'
import { BodyOverflow } from '../examples/BodyOverflow'

test('basic', async ({ mount, page }) => {
  await mount(<Basic />)

  await page.locator('button', { hasText: 'show modal' }).click()
  await page.waitForSelector('role=dialog', { state: 'attached' })

  expect(
    await page.screenshot({ fullPage: true, animations: 'disabled' })
  ).toMatchSnapshot()
})

test('with scroll', async ({ mount, page }) => {
  await mount(<BodyOverflow />)

  await page.locator('button', { hasText: 'show modal' }).click()
  await page.waitForSelector('role=dialog', { state: 'attached' })

  expect(
    await page.screenshot({ fullPage: true, animations: 'disabled' })
  ).toMatchSnapshot()
})
