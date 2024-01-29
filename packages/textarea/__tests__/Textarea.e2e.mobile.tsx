import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Textarea } from '../src'

test.describe('Textarea adaptive', () => {
  test('enabled', async ({ mount, page }) => {
    await mount(
      <Textarea
        fullWidth
        label="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, rerum."
        helperText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus enim fuga laborum necessitatibus quis rem?"
        value="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam atque delectus, dicta earum eligendi excepturi explicabo harum illum incidunt nobis odit quasi quis repellendus ullam voluptatibus! Illo quibusdam ratione voluptas?"
      />
    )

    await expect(page).toHaveScreenshot()
  })
})
