import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { IndeterminateProgress } from '../examples/IndeterminateProgress'
import { ControlledProgress } from '../examples/ControlledProgress'

const sizes = ['lg', 'md', 'sm']

test.describe('size', () => {
  sizes.forEach((size) => {
    test(size, async ({ page, mount }) => {
      await mount(<IndeterminateProgress />)

      const component = page
        .locator('div div', { hasText: size })
        .filter({ has: page.locator('role=progressbar') })
        .first()

      await expect(component).toHaveScreenshot()
    })
  })
})

test('without track', async ({ page, mount }) => {
  await mount(<IndeterminateProgress />)

  const component = page
    .locator('div div', { hasText: 'Sm without track' })
    .filter({ has: page.locator('role=progressbar') })
    .first()

  await expect(component).toHaveScreenshot()
})

test('determintate', async ({ page, mount }) => {
  await mount(<ControlledProgress runInterval={false} />)

  //Контролируемый прогресс-бар с процентами в линию без трека
  const component = page
    .locator('div div', {
      hasText: 'Main label 3',
    })
    .filter({ has: page.locator('role=progressbar') })

  await expect(component).toHaveScreenshot()
})

test('indeterminate', async ({ page, mount }) => {
  await mount(<IndeterminateProgress />)

  const component = page
    .locator('div div', { hasText: 'Md' })
    .filter({ has: page.locator('role=progressbar') })
    .first()

  await expect(component).toHaveScreenshot()
})
