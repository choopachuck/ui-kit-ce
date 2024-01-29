import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Accordion, AccordionItem } from '../src'

test.describe('Accordion', () => {
  test('enabled', async ({ mount }) => {
    const component = await mount(
      <Accordion>
        <AccordionItem header="Header">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos,
          recusandae!
        </AccordionItem>
      </Accordion>
    )

    await expect(component).toHaveScreenshot()
  })

  test('hover', async ({ mount }) => {
    const component = await mount(
      <Accordion>
        <AccordionItem header="Header">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos,
          recusandae!
        </AccordionItem>
      </Accordion>
    )
    await component.locator('button').hover()

    await expect(component).toHaveScreenshot()
  })

  test('active', async ({ mount, page }) => {
    const component = await mount(
      <Accordion>
        <AccordionItem header="Header">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos,
          recusandae!
        </AccordionItem>
      </Accordion>
    )
    await page.mouse.move(10, 10)
    await page.mouse.down()

    await expect(component).toHaveScreenshot()
  })

  test('expanded', async ({ mount }) => {
    const component = await mount(
      <Accordion>
        <AccordionItem expanded header="Header">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos,
          recusandae!
        </AccordionItem>
      </Accordion>
    )

    await expect(component).toHaveScreenshot()
  })

  test('focused', async ({ mount }) => {
    const component = await mount(
      <Accordion>
        <AccordionItem header="Header">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos,
          recusandae!
        </AccordionItem>
      </Accordion>
    )

    await component.locator('button').focus()

    await expect(component).toHaveScreenshot()
  })

  test('disabled', async ({ mount }) => {
    const component = await mount(
      <Accordion>
        <AccordionItem disabled header="Header">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos,
          recusandae!
        </AccordionItem>
      </Accordion>
    )

    await expect(component).toHaveScreenshot()
  })

  test('complex', async ({ mount }) => {
    const component = await mount(
      <Accordion>
        <AccordionItem header="Header 1">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos,
          recusandae!
        </AccordionItem>
        <AccordionItem expanded header="Header 2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos,
          recusandae!
        </AccordionItem>
        <AccordionItem disabled header="Header 3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos,
          recusandae!
        </AccordionItem>
        <AccordionItem expanded header="Header 4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos,
          recusandae!
        </AccordionItem>
      </Accordion>
    )

    await component.locator('button').first().focus()

    await expect(component).toHaveScreenshot()
  })
})
