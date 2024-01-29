import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Sizes, Interactive, Grouping } from '../examples'
import { ListItem, List } from '../src'

test.describe('List', () => {
  test('different sizes', async ({ mount }) => {
    const component = await mount(<Sizes />)

    await expect(component).toHaveScreenshot()
  })

  test('interactive and disabled', async ({ mount }) => {
    const component = await mount(<Interactive />)

    await expect(component).toHaveScreenshot()
  })

  test('grouping', async ({ mount }) => {
    const component = await mount(<Grouping />)

    await expect(component).toHaveScreenshot()
  })

  test('active', async ({ mount }) => {
    const component = await mount(
      <List interactive>
        <ListItem>Hover me</ListItem>
        <ListItem>Default</ListItem>
      </List>
    )

    await component.focus()

    await expect(component).toHaveScreenshot()
  })
})
