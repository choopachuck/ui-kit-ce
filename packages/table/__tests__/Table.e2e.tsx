import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Basic } from '../examples/Basic'
import { BorderedNoneStory } from '../examples/BorderedStory'
import { StripeStory } from '../examples/StripeStory'
import { HoverableStory } from '../examples/HoverableStory'
import { ExpandableStory } from '../examples/ExpandableStory'
import { TreeExpandableStory } from '../examples/TreeExpandableStory'
import { PaginateTable } from '../examples/PaginateTable'
import { FixedHeaderStory } from '../examples/FixedHeaderStory'
import { MultiRowHeaderWithFixedColumns } from '../examples/MultiRowHeaderWithFixedColumns'
import { FixedColumnsStory } from '../examples/FixedColumnsStory'
import { SortableStory } from '../examples/SortableStory'
import { CustomPaginateTable } from '../examples/CustomPaginateTable'
import { default as PaginationCanvas } from '../examples/PaginationCanvas'
import { AlignmentStory } from '../examples/AlignmentStory'
import { AlignmentSortableStory } from '../examples/AlignmentSortableStory'

test.describe('Table', () => {
  test('Divider', async ({ mount }) => {
    const comp = await mount(<Basic />)

    await expect(comp).toHaveScreenshot()
  })

  test('Light', async ({ mount }) => {
    const comp = await mount(<BorderedNoneStory />)

    await expect(comp).toHaveScreenshot()
  })

  test('Stripe', async ({ mount }) => {
    const comp = await mount(<StripeStory />)

    await expect(comp).toHaveScreenshot()
  })

  test.describe('Alignment', () => {
    test('Alignment default', async ({ mount }) => {
      const comp = await mount(<AlignmentStory />)

      await expect(comp).toHaveScreenshot()
    })
    test('Alignment sortable', async ({ mount }) => {
      const comp = await mount(<AlignmentSortableStory />)

      await expect(comp).toHaveScreenshot()
    })
  })

  test.describe('Interactive Row', () => {
    test('enabled', async ({ mount, page }) => {
      await mount(<HoverableStory />)

      const comp = page.locator('tbody tr').nth(0)

      await expect(comp).toHaveScreenshot()
    })
    test('hover', async ({ mount, page }) => {
      await mount(<HoverableStory />)

      const comp = page.locator('tbody tr').nth(0)
      await comp.hover()

      await expect(comp).toHaveScreenshot()
    })
  })
  test.describe('Expandable', () => {
    test('', async ({ mount }) => {
      const comp = await mount(<ExpandableStory />)

      await expect(comp).toHaveScreenshot()
    })

    test.describe('Row', () => {
      test('enabled', async ({ mount, page }) => {
        await mount(<ExpandableStory />)

        const comp = page.locator('tbody tr').nth(0)

        await expect(comp).toHaveScreenshot()
      })
      test('hover', async ({ mount, page }) => {
        await mount(<ExpandableStory />)

        const comp = page.locator('tbody tr').nth(0)
        await comp.hover()

        await expect(comp).toHaveScreenshot()
      })
      test('expanded', async ({ mount, page }) => {
        await mount(<ExpandableStory />)

        const row = page.locator('tbody tr').nth(0)
        const cell = page.locator('tbody tr:nth-child(1) td').nth(0)

        await cell.click()

        await page.keyboard.press('Tab')

        await expect(row).toHaveScreenshot()
      })
      test('focus', async ({ mount, page }) => {
        await mount(<ExpandableStory />)

        const row = page.locator('tbody tr').nth(0)
        const cell = page.locator('tbody tr:nth-child(1) td').nth(0)

        await cell.locator('button').focus()

        await expect(row).toHaveScreenshot()
      })
    })
  })

  test.describe('Tree', () => {
    test('', async ({ mount }) => {
      const comp = await mount(<TreeExpandableStory />)

      await expect(comp).toHaveScreenshot()
    })

    test.describe('Row', () => {
      test('enabled', async ({ mount, page }) => {
        await mount(<TreeExpandableStory />)

        const comp = page.locator('tbody tr', { hasText: 'UIK' })

        await expect(comp).toHaveScreenshot()
      })
      test('parent expanded', async ({ mount, page }) => {
        await mount(<TreeExpandableStory />)

        const row = page.locator('tbody tr', { hasText: 'UIK' })
        const cell = row.locator('td button')

        await cell.click()

        await expect(row).toHaveScreenshot()
      })
      test('hover', async ({ mount, page }) => {
        await mount(<TreeExpandableStory />)

        const row = page.locator('tbody tr', { hasText: 'UIK' })
        const cell = row.locator('td button')

        await cell.hover()

        await expect(row).toHaveScreenshot()
      })
      test('focus', async ({ mount, page }) => {
        await mount(<TreeExpandableStory />)

        const row = page.locator('tbody tr', { hasText: 'UIK' })
        const cell = row.locator('td button')

        await cell.focus()

        await expect(row).toHaveScreenshot()
      })
      test('row child', async ({ mount, page }) => {
        await mount(<TreeExpandableStory />)

        const row = page.locator('tbody tr', { hasText: 'UIK' })
        const cell = row.locator('td button')

        await cell.click()

        const childRow = page.locator('tbody tr', { hasText: 'Managers' })

        await expect(childRow).toHaveScreenshot()
      })
    })
  })
})

test.describe('Pagination', () => {
  test.describe('Simple', () => {
    test('Top', async ({ mount, page }) => {
      const comp = await mount(<PaginateTable />)

      await page.locator('label', { hasText: 'над таблицей' }).click()

      await expect(comp).toHaveScreenshot()
    })
    test('Bottom', async ({ mount }) => {
      const comp = await mount(<PaginateTable />)

      await expect(comp).toHaveScreenshot()
    })
  })
  test.describe('Advanced', () => {
    test('Top', async ({ mount, page }) => {
      const comp = await mount(<PaginateTable />)

      await page.locator('label', { hasText: 'над таблицей' }).click()
      await page.locator('label', { hasText: 'продвинутая' }).click()
      await page
        .locator('label', { hasText: 'Показывать абсолютные стрелки' })
        .click()

      await expect(comp).toHaveScreenshot()
    })
    test('Bottom', async ({ mount, page }) => {
      const comp = await mount(<PaginateTable />)

      await page.locator('label', { hasText: 'продвинутая' }).click()
      await page
        .locator('label', { hasText: 'Показывать абсолютные стрелки' })
        .click()

      await expect(comp).toHaveScreenshot()
    })
    test('Custom', async ({ mount }) => {
      const comp = await mount(<CustomPaginateTable />)

      await expect(comp).toHaveScreenshot()
    })
    test('Select', async ({ mount, page }) => {
      // await page.setViewportSize({ width: 1024, height: 200 })
      const comp = await mount(
        <div style={{ height: 700 }}>
          <PaginationCanvas />
        </div>
      )

      await page.locator('[aria-label="выбор страницы"]').click()

      await page
        .locator('[role="listbox"]')
        .evaluate((element) =>
          element.setAttribute(
            'style',
            'overscroll-behavior: contain;max-height: 150px;overflow-y: scroll;'
          )
        )
      await expect(comp).toHaveScreenshot()
    })
  })
})

test.describe('Fixed', () => {
  test('Header', async ({ mount, page }) => {
    const comp = await mount(<FixedHeaderStory />)

    await page.evaluate(() => {
      const tableWrapper = document.querySelector('div div')

      if (tableWrapper) {
        tableWrapper.scrollTop = 100
      }
    })

    await expect(comp).toHaveScreenshot()
  })

  test('Multi Row Header', async ({ mount, page }) => {
    const comp = await mount(<MultiRowHeaderWithFixedColumns />)

    await page.evaluate(() => {
      const tableWrapper = document.querySelector('div div')

      if (tableWrapper) {
        tableWrapper.scrollTop = 100
      }
    })

    await expect(comp).toHaveScreenshot()
  })

  test('Columns', async ({ mount, page }) => {
    const comp = await mount(<FixedColumnsStory />)

    await page.evaluate(() => {
      const tableWrapper = document.querySelector('div div')

      if (tableWrapper) {
        tableWrapper.scrollLeft = 100
      }
    })

    await expect(comp).toHaveScreenshot()
  })

  test('Columns and header', async ({ mount, page }) => {
    const comp = await mount(<FixedColumnsStory />)

    await page.evaluate(() => {
      const tableWrapper = document.querySelector('div div')

      if (tableWrapper) {
        tableWrapper.scrollLeft = 100
        tableWrapper.scrollTop = 100
      }
    })

    await expect(comp).toHaveScreenshot()
  })
})

test.describe('Sortable Header Cell', () => {
  test('', async ({ mount, page }) => {
    await mount(<SortableStory />)

    const headerCell = page.locator('th div', { hasText: 'Role' })

    await expect(headerCell).toHaveScreenshot()
  })
  test('hover', async ({ mount, page }) => {
    await mount(<SortableStory />)

    const headerCell = page.locator('th div', { hasText: 'Role' })

    await headerCell.hover()

    await expect(headerCell).toHaveScreenshot()
  })
  test('asc', async ({ mount, page }) => {
    await mount(<SortableStory />)

    const headerCell = page.locator('th div', { hasText: 'Role' })

    await headerCell.click()
    await page.mouse.move(0, 0)

    await expect(headerCell).toHaveScreenshot()
  })
  test('asc hover', async ({ mount, page }) => {
    await mount(<SortableStory />)

    const headerCell = page.locator('th div', { hasText: 'Role' })

    await headerCell.click()

    await page.mouse.move(0, 0)

    await headerCell.hover()

    await expect(headerCell).toHaveScreenshot()
  })
  test('desc', async ({ mount, page }) => {
    await mount(<SortableStory />)

    const headerCell = page.locator('th div', { hasText: 'Role' })

    await headerCell.click()
    await headerCell.click()

    await page.mouse.move(0, 0)

    await expect(headerCell).toHaveScreenshot()
  })
  test('desc hover', async ({ mount, page }) => {
    await mount(<SortableStory />)

    const headerCell = page.locator('th div', { hasText: 'Role' })

    await headerCell.click()
    await headerCell.click()

    await page.mouse.move(0, 0)

    await headerCell.hover()

    await expect(headerCell).toHaveScreenshot()
  })
})
