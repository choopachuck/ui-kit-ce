import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Bar, BarKindsType, BarButton, BarDivider } from '../src'

const barKinds: BarKindsType[] = ['dark', 'light', 'primary']

test.describe('BarDivider', () => {
  barKinds.forEach((kind) => {
    test.describe(kind, () => {
      test('major', async ({ mount }) => {
        const component = await mount(
          <Bar kind={kind}>
            <BarButton>1</BarButton>
            <BarDivider />
            <BarButton>2</BarButton>
          </Bar>
        )

        await expect(component).toHaveScreenshot()
      })

      test('minor', async ({ mount }) => {
        const component = await mount(
          <Bar kind={kind}>
            <BarButton>1</BarButton>
            <BarDivider kind="minor" />
            <BarButton>2</BarButton>
          </Bar>
        )

        await expect(component).toHaveScreenshot()
      })
    })
  })
})
