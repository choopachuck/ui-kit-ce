import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Accordion, AccordionItem } from '../src'

test.describe('Accordion adaptive', () => {
  test('enabled', async ({ mount, page }) => {
    await mount(
      <Accordion>
        <AccordionItem
          expanded
          header="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, recusandae!"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad
          aliquam architecto deserunt dolor ducimus, ea eius necessitatibus
          nobis nulla numquam quia quos ratione reiciendis sapiente. Accusantium
          cupiditate delectus enim iusto nulla reiciendis veniam, vitae. Commodi
          error excepturi praesentium. Deserunt dolorum eos ex facere ipsum iure
          molestiae odit quidem quos.
        </AccordionItem>
      </Accordion>
    )

    await expect(page).toHaveScreenshot()
  })
})
