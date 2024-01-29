import * as React from 'react'
import { expect, test } from '../../../playwright/fixtures/customMount'
import { Link } from '../../link/src'
import { Breadcrumbs } from '../src'
import { Icon } from '../examples/assets/Icon'

test.use({ viewport: { width: 500, height: 200 } })

test.describe('Breadcrumbs', () => {
  test('enabled', async ({ mount }) => {
    const component = await mount(
      <Breadcrumbs>
        <Link href="#">
          <Icon style={{ marginRight: 8 }} />
          Breadcrumb 1
        </Link>
        <Link disabled href="#">
          <Icon style={{ marginRight: 8 }} />
          Breadcrumb 2
        </Link>
        <span>Breadcrumb 3</span>
      </Breadcrumbs>
    )

    await expect(component).toHaveScreenshot()
  })

  test('hover', async ({ mount }) => {
    const component = await mount(
      <Breadcrumbs>
        <Link href="#">
          <Icon style={{ marginRight: 8 }} />
          Breadcrumb 1
        </Link>
        <Link disabled href="#">
          <Icon style={{ marginRight: 8 }} />
          Breadcrumb 2
        </Link>
        <span>Breadcrumb 3</span>
      </Breadcrumbs>
    )
    await component.locator('a').first().hover()

    await expect(component).toHaveScreenshot()
  })

  test('active', async ({ mount, page }) => {
    const component = await mount(
      <Breadcrumbs>
        <Link href="#">
          <Icon style={{ marginRight: 8 }} />
          Breadcrumb 1
        </Link>
        <Link disabled href="#">
          <Icon style={{ marginRight: 8 }} />
          Breadcrumb 2
        </Link>
        <span>Breadcrumb 3</span>
      </Breadcrumbs>
    )
    await page.mouse.move(10, 10)
    await page.mouse.down()

    await expect(component).toHaveScreenshot()
  })

  test('focus', async ({ mount, page }) => {
    const component = await mount(
      <Breadcrumbs>
        <Link href="#">
          <Icon style={{ marginRight: 8 }} />
          Breadcrumb 1
        </Link>
        <Link disabled href="#">
          <Icon style={{ marginRight: 8 }} />
          Breadcrumb 2
        </Link>
        <span>Breadcrumb 3</span>
      </Breadcrumbs>
    )
    await component.locator('a').first().focus()

    await expect(page).toHaveScreenshot()
  })

  test('collapsed', async ({ mount, page }) => {
    const component = await mount(
      <Breadcrumbs maxItems={3}>
        <Link href="#">Breadcrumb 1</Link>
        <Link href="#">Breadcrumb 2</Link>
        <Link href="#">Breadcrumb 3</Link>
        <Link href="#">Breadcrumb 4</Link>
        <span>Breadcrumb 5</span>
      </Breadcrumbs>
    )
    await component.locator('span[role=button]').hover()

    await expect(page).toHaveScreenshot()
  })
})
