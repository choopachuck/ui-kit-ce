import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { BasicInputPassword } from '../examples/BasicInputPassword'
import { InputPassword } from '../src'

test('filled-hidden', async ({ mount }) => {
  const component = await mount(<BasicInputPassword />)

  await expect(component).toHaveScreenshot()
})

test('filled-shown', async ({ mount }) => {
  const component = await mount(<BasicInputPassword />)

  await component.locator('svg').click()

  await expect(component).toHaveScreenshot()
})

test('hover', async ({ mount }) => {
  const component = await mount(<BasicInputPassword />)
  await component.locator('input').hover()

  await expect(component).toHaveScreenshot()
})

test('focus', async ({ mount }) => {
  const component = await mount(<BasicInputPassword />)
  await component.locator('input').focus()

  await expect(component).toHaveScreenshot()
})

test('clear', async ({ mount }) => {
  const component = await mount(<InputPassword canClear value="testValue" />)

  await expect(component).toHaveScreenshot()
})
