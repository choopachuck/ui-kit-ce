import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { SubBarKindsType, SubBar } from '../src'

const subBarKinds: SubBarKindsType[] = ['dark', 'darker', 'light', 'lighter']

test.describe('SubBar', () => {
  subBarKinds.forEach((kind) => {
    test(kind, async ({ mount }) => {
      const component = await mount(<SubBar kind={kind} />)

      await expect(component).toHaveScreenshot()
    })
  })

  test('vertical', async ({ mount }) => {
    const component = await mount(<SubBar direction="vertical" />)

    await expect(component).toHaveScreenshot()
  })
})
