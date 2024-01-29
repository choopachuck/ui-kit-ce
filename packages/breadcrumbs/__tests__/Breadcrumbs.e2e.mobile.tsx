import * as React from 'react'
import { expect, test } from '../../../playwright/fixtures/customMount'
import { Link } from '../../link/src'
import { Breadcrumbs } from '../src'

test.describe('Breadcrumbs adaptive', () => {
  test('enabled', async ({ mount, page }) => {
    await mount(
      <Breadcrumbs>
        <Link href="#">Long link text</Link>
        <Link href="#">Very long link text</Link>
        <Link href="#">Very very long link text</Link>
        <span>Current page</span>
      </Breadcrumbs>
    )

    await expect(page).toHaveScreenshot()
  })
})
