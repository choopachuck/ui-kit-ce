import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { BarKindsType } from '../src/constants'
import { Basic } from '../examples/Basic'

const barKinds: Array<BarKindsType> = ['dark', 'light', 'primary']

test.use({ viewport: { width: 1200, height: 500 } })

test.describe('Bar', () => {
  barKinds.forEach((kind) => {
    test.describe(kind, () => {
      test('enabled', async ({ mount }) => {
        const component = await mount(<Basic kind={kind} />)

        await expect(component).toHaveScreenshot()
      })
    })
  })

  test('vertical', async ({ mount }) => {
    const component = await mount(<Basic direction="vertical" />)

    await expect(component).toHaveScreenshot()
  })

  test('expanded', async ({ mount }) => {
    const component = await mount(<Basic expanded direction="vertical" />)

    await expect(component).toHaveScreenshot()
  })
})
