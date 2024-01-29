import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { ButtonGroup } from '../src'
import { Button } from '../../button/src'

test.describe('ButtonGroup adaptive', () => {
  test('enabled', async ({ mount, page }) => {
    await mount(
      <ButtonGroup>
        <Button name="1">long text button</Button>
        <Button name="2">very long text button</Button>
        <Button name="3">super very long text button</Button>
      </ButtonGroup>
    )

    await expect(page).toHaveScreenshot()
  })
})
