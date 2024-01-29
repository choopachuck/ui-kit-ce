import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Bar, BarDropdown, BarKindsType /*, BarDropdownItem*/ } from '../src'

const barKinds: BarKindsType[] = ['dark', 'light', 'primary']

test.describe('BarDropdown', () => {
  barKinds.forEach((kind) => {
    test.describe(kind, () => {
      test('hover', async ({ mount }) => {
        const component = await mount(
          <Bar kind={kind}>
            <BarDropdown>dropdown</BarDropdown>
          </Bar>
        )
        await component.locator('div[role=button]').hover()

        await expect(component).toHaveScreenshot()
      })

      test('active', async ({ mount, page }) => {
        const component = await mount(
          <Bar kind={kind}>
            <BarDropdown>dropdown</BarDropdown>
          </Bar>
        )
        await page.mouse.move(20, 20)
        await page.mouse.down()

        await expect(component).toHaveScreenshot()
      })
    })

    // // TODO: наблюдать за issue ниже
    // // https://github.com/microsoft/playwright/issues/14401
    // test('menu', async ({ mount }) => {
    //   const component = await mount(
    //     <Bar kind={kind}>
    //       <BarDropdown
    //         dropdownMenuProps={{
    //           disablePortal: true,
    //           action: 'click',
    //           content: (
    //             <div>
    //               <BarDropdownItem>Option 1</BarDropdownItem>
    //               <BarDropdownItem disabled>Option 2</BarDropdownItem>
    //               <BarDropdownItem>Option 3</BarDropdownItem>
    //             </div>
    //           )
    //         }}
    //       >
    //         dropdown
    //       </BarDropdown>
    //     </Bar>
    //   )
    //
    //   await component.locator('div[role=button]').click()
    //   // await component.locator('span', { hasText: 'Option 3' }).hover()
    //
    //   await expect(component).toHaveScreenshot()
    // })
  })
})
