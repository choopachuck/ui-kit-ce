import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Button } from '../src'

test.describe('Button adaptive', () => {
  test('enabled', async ({ mount, page }) => {
    await mount(
      <Button>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
        consectetur modi molestiae molestias necessitatibus rerum similique
        soluta temporibus veniam voluptatum?
      </Button>
    )

    await expect(page).toHaveScreenshot()
  })
})
