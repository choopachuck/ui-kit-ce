import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Tag } from '../src'

test.describe('Tag adaptive', () => {
  test('enabled', async ({ mount, page }) => {
    await mount(
      <Tag>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
        consectetur modi molestiae molestias necessitatibus rerum similique
        soluta temporibus veniam voluptatum?
      </Tag>
    )

    await expect(page).toHaveScreenshot()
  })
})
