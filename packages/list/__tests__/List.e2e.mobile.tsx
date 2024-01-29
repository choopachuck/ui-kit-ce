import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { ListItemGroup, ListItem, List } from '../src'

test.describe('List adaptive', () => {
  test('enabled', async ({ mount, page }) => {
    await mount(
      <List>
        <ListItemGroup label="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, pariatur.">
          <ListItem>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet culpa
            explicabo non quaerat quidem quos.
          </ListItem>
          <ListItem>Опция 2</ListItem>
        </ListItemGroup>
      </List>
    )

    await expect(page).toHaveScreenshot()
  })
})
