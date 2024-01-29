import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import {
  CheckboxGroupVertical,
  Disabled,
  Indeterminate,
  LabelPosition,
  WithLabel,
} from '../examples'

test.describe('CheckboxWithLabel', () => {
  test.describe('deselected', () => {
    test('enabled', async ({ mount }) => {
      const component = await mount(<WithLabel />)

      await expect(component).toHaveScreenshot()
    })

    test('hover', async ({ mount }) => {
      const component = await mount(<WithLabel />)
      await component.locator('input').hover()

      await expect(component).toHaveScreenshot()
    })

    test('active', async ({ mount, page }) => {
      const component = await mount(<WithLabel />)
      await page.mouse.move(15, 15)
      await page.mouse.down()

      await expect(component).toHaveScreenshot()
    })

    test('focus', async ({ mount }) => {
      const component = await mount(<WithLabel />)
      await component.locator('input').focus()

      await expect(component).toHaveScreenshot()
    })
  })

  test.describe('selected', () => {
    test('enabled', async ({ mount }) => {
      const component = await mount(<WithLabel initChecked />)

      await expect(component).toHaveScreenshot()
    })

    test('hover', async ({ mount }) => {
      const component = await mount(<WithLabel initChecked />)

      await expect(component).toHaveScreenshot()
    })

    test('active', async ({ mount, page }) => {
      const component = await mount(<WithLabel initChecked />)
      await page.mouse.move(15, 15)
      await page.mouse.down()

      await expect(component).toHaveScreenshot()
    })

    test('focus', async ({ mount }) => {
      const component = await mount(<WithLabel initChecked />)
      await component.locator('input').focus()

      await expect(component).toHaveScreenshot()
    })
  })

  test.describe('indeterminate', () => {
    test('enabled', async ({ mount }) => {
      const component = await mount(<Indeterminate initPayments={['debt']} />)

      await expect(component).toHaveScreenshot()
    })

    test('hover', async ({ mount }) => {
      const component = await mount(<Indeterminate initPayments={['debt']} />)
      await component.locator('label', { hasText: 'Main label' }).hover()

      await expect(component).toHaveScreenshot()
    })

    test('active', async ({ mount, page }) => {
      const component = await mount(<Indeterminate initPayments={['debt']} />)
      await page.mouse.move(15, 15)
      await page.mouse.down()

      await expect(component).toHaveScreenshot()
    })

    test('focus', async ({ mount }) => {
      const component = await mount(<Indeterminate initPayments={['debt']} />)
      await component.locator('label', { hasText: 'Main label' }).focus()

      await expect(component).toHaveScreenshot()
    })
  })

  test('disabled', async ({ mount }) => {
    const component = await mount(<Disabled />)

    await expect(component).toHaveScreenshot()
  })

  test('label position on checkbox', async ({ mount }) => {
    const component = await mount(<LabelPosition />)

    await expect(component).toHaveScreenshot()
  })

  test('checkbox group in vertical line', async ({ mount }) => {
    const component = await mount(<CheckboxGroupVertical />)

    await expect(component).toHaveScreenshot()
  })
})
