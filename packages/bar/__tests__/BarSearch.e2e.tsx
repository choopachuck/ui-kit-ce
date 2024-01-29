import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Bar, BarKindsType, BarSearch } from '../src'

const barKinds: BarKindsType[] = ['dark', 'light', 'primary']

test.describe('BarSearch', () => {
  barKinds.forEach((kind) => {
    test.describe(kind, () => {
      test('hover', async ({ mount }) => {
        const component = await mount(
          <Bar kind={kind}>
            <BarSearch inputProps={{ suffix: 'A' }} />
          </Bar>
        )

        await component.locator('input').hover()

        await expect(component).toHaveScreenshot()
      })

      test('focus', async ({ mount }) => {
        const component = await mount(
          <Bar kind={kind}>
            <BarSearch inputProps={{ suffix: 'A' }} />
          </Bar>
        )

        await component.locator('input').focus()

        await expect(component).toHaveScreenshot()
      })

      test('disabled', async ({ mount }) => {
        const component = await mount(
          <Bar kind={kind}>
            <BarSearch inputProps={{ placeholder: 'Поиск', disabled: true }} />
          </Bar>
        )

        await expect(component).toHaveScreenshot()
      })

      test('disabled vertical', async ({ mount }) => {
        const component = await mount(
          <Bar expanded direction="vertical" kind={kind}>
            <BarSearch inputProps={{ placeholder: 'Поиск', disabled: true }} />
          </Bar>
        )

        await expect(component).toHaveScreenshot()
      })
    })
  })

  test('vertical', async ({ mount }) => {
    const component = await mount(
      <Bar expanded direction="vertical">
        <BarSearch inputProps={{ suffix: 'A' }} />
      </Bar>
    )

    await expect(component).toHaveScreenshot()
  })

  test('clear', async ({ mount }) => {
    const component = await mount(
      <Bar expanded direction="vertical">
        <BarSearch value="test value" inputProps={{ canClear: true }} />
      </Bar>
    )

    await expect(component).toHaveScreenshot()
  })
})
