import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { test as testWithTheme } from '../../../playwright/fixtures/withThemeProviderInjected'
import { Pagination } from '../src'
import { createTheme } from '@v-uik/theme'

const PAGINATION_OVERFLOW_PAGES = '...'

const defaultTheme = createTheme()

const customTheme = createTheme({
  comp: {
    backwardCompatibilityMode: false,
    pagination: {
      colorText: 'red',
      colorTextHover: 'blue',
      colorTextActive: 'orange',
      colorTextDisabled: 'green',

      colorBackground: 'cornsilk',
      colorBackgroundHover: 'red',
      colorBackgroundActive: 'purple',
      colorBackgroundDisabled: 'grey',

      colorBorder: 'black',
      colorBorderHover: 'deepSkyBlue',
      colorBorderActive: 'fuchsia',
      colorBorderDisabled: 'red',

      colorTextSelected: 'purple',
      colorTextSelectedHover: 'green',
      colorTextSelectedActive: 'cyan',
      colorTextSelectedDisabled: 'red',

      colorBackgroundSelected: 'cyan',
      colorBackgroundSelectedHover: 'pink',
      colorBackgroundSelectedActive: 'brown',
      colorBackgroundSelectedDisabled: 'coral',

      colorBorderSelected: 'red',
      colorBorderSelectedHover: 'black',
      colorBorderSelectedActive: 'red',
      colorBorderSelectedDisabled: 'purple',

      overflowColorText: 'cyan',
      overflowColorTextHover: 'red',
      overflowColorTextActive: 'green',
      overflowColorTextDisabled: 'orange',

      overflowColorBackground: 'blueViolet',
      overflowColorBackgroundHover: 'green',
      overflowColorBackgroundActive: 'crimson',
      overflowColorBackgroundDisabled: 'white',

      overflowColorBorder: 'blueViolet',
      overflowColorBorderHover: 'white',
      overflowColorBorderActive: 'crimson',
      overflowColorBorderDisabled: 'white',

      selectedIndicatorColorBackground: 'orange',
      selectedIndicatorColorBackgroundDisabled: 'green',
    },
  },
})

const themes = [
  {
    name: 'defaultTheme',
    theme: defaultTheme,
  },
  {
    name: 'customTheme',
    theme: customTheme,
  },
]

test.describe('Pagination', () => {
  test('size', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'flex', flexDirection: 'column', gridRowGap: 16 }}>
        <Pagination totalPageCount={10} currentPage={1} size="sm" />
        <Pagination totalPageCount={10} currentPage={1} size="md" />
        <Pagination totalPageCount={10} currentPage={1} />
        <Pagination totalPageCount={10} currentPage={1} size="lg" />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })
  test.describe('hover', () => {
    themes.forEach(({ name, theme }) => {
      testWithTheme(name, async ({ page, mountWithTheme }) => {
        const component = await mountWithTheme(
          <Pagination totalPageCount={10} currentPage={1} />,
          theme
        )
        const item = page.locator('button', { hasText: '2' })

        await item.hover()

        await expect(component).toHaveScreenshot()
      })
    })
  })
  test.describe('hover overflow', () => {
    themes.forEach(({ name, theme }) => {
      testWithTheme(name, async ({ page, mountWithTheme }) => {
        const component = await mountWithTheme(
          <Pagination totalPageCount={10} currentPage={1} />,
          theme
        )
        const item = page.locator('button', {
          hasText: PAGINATION_OVERFLOW_PAGES,
        })

        await item.hover()

        await expect(component).toHaveScreenshot()
      })
    })
  })
  test.describe('hover selected', () => {
    themes.forEach(({ name, theme }) => {
      testWithTheme(name, async ({ page, mountWithTheme }) => {
        const component = await mountWithTheme(
          <Pagination
            totalPageCount={10}
            currentPage={1}
            classes={{ itemSelected: 'selected' }}
          />,
          theme
        )
        const item = page.locator('.selected')

        await item.hover()

        await expect(component).toHaveScreenshot()
      })
    })
  })
  test.describe('active', () => {
    themes.forEach(({ name, theme }) => {
      testWithTheme(name, async ({ page, mountWithTheme }) => {
        const component = await mountWithTheme(
          <Pagination totalPageCount={10} currentPage={1} />,
          theme
        )
        const item = page.locator('button', { hasText: '2' })
        const itemBox = await item.boundingBox()

        await page.mouse.move(
          (itemBox?.x as number) + (itemBox?.width as number) / 2,
          (itemBox?.y as number) + (itemBox?.height as number) / 2
        )
        await page.mouse.down()

        await expect(component).toHaveScreenshot()
      })
    })
  })
  test.describe('active overflow', () => {
    themes.forEach(({ name, theme }) => {
      testWithTheme(name, async ({ page, mountWithTheme }) => {
        const component = await mountWithTheme(
          <Pagination totalPageCount={10} currentPage={1} />,
          theme
        )
        const item = page.locator('button', {
          hasText: PAGINATION_OVERFLOW_PAGES,
        })
        const itemBox = await item.boundingBox()

        await page.mouse.move(
          (itemBox?.x as number) + (itemBox?.width as number) / 2,
          (itemBox?.y as number) + (itemBox?.height as number) / 2
        )
        await page.mouse.down()

        await expect(component).toHaveScreenshot()
      })
    })
  })
  test.describe('active selected', () => {
    themes.forEach(({ name, theme }) => {
      testWithTheme(name, async ({ page, mountWithTheme }) => {
        const component = await mountWithTheme(
          <Pagination
            totalPageCount={10}
            currentPage={1}
            classes={{ itemSelected: 'selected' }}
          />,
          theme
        )
        const item = page.locator('.selected')
        const itemBox = await item.boundingBox()

        await page.mouse.move(
          (itemBox?.x as number) + (itemBox?.width as number) / 2,
          (itemBox?.y as number) + (itemBox?.height as number) / 2
        )
        await page.mouse.down()

        await expect(component).toHaveScreenshot()
      })
    })
  })
  test.describe('disabled', () => {
    themes.forEach(({ name, theme }) => {
      testWithTheme(name, async ({ mountWithTheme }) => {
        const component = await mountWithTheme(
          <Pagination disabled totalPageCount={10} currentPage={1} />,
          theme
        )

        await expect(component).toHaveScreenshot()
      })
    })
  })

  test('focus', async ({ page, mount }) => {
    const component = await mount(
      <Pagination totalPageCount={10} currentPage={1} />
    )
    const item = page.locator('button', { hasText: '2' })

    await item.focus()

    await expect(component).toHaveScreenshot()
  })

  test('with all navigation buttons', async ({ mount }) => {
    const component = await mount(
      <Pagination
        showNavigationFirst
        showNavigationLast
        totalPageCount={10}
        currentPage={1}
      />
    )

    await expect(component).toHaveScreenshot()
  })

  test('stack', async ({ mount }) => {
    const component = await mount(
      <div style={{ width: '100px' }}>
        <Pagination totalPageCount={10} currentPage={1} />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })
})
