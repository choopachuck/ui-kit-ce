import * as React from 'react'
import {
  test,
  expect,
} from '../../../playwright/fixtures/withThemeProviderInjected'

import { createTheme, light } from '@v-uik/theme'
import {
  ExampleComponents,
  ExampleComponentsWithResetCss,
} from '@v-uik/showroom/cookbook/tokens/components/ExampleComponents'

test.describe('Theme', () => {
  test('colors', async ({ mountWithTheme }) => {
    const theme = createTheme({
      sys: {
        color: {
          primaryAlpha: light.ref.palette.green50,
          secondaryAlpha: light.ref.palette.amber50,
          errorAlpha: light.ref.palette.blue50,
        },
      },
      comp: {
        backwardCompatibilityMode: false,
      },
    })

    const component = await mountWithTheme(
      <ExampleComponents action={false} />,
      theme
    )

    await expect(component).toHaveScreenshot()
  })

  test('shape', async ({ mountWithTheme }) => {
    const theme = createTheme({
      sys: {
        shape: {
          borderRadiusNone: 2,
          borderRadiusSm: 6,
          borderRadiusMd: 10,
          borderRadiusLg: 20,
          borderRadiusXl: 30,
          borderRadiusCircle: 50,
        },
      },
      comp: {
        backwardCompatibilityMode: false,
      },
    })

    const component = await mountWithTheme(
      <ExampleComponents action={false} />,
      theme
    )

    await expect(component).toHaveScreenshot()
  })

  test('typography', async ({ mountWithTheme }) => {
    const base =
      'SBSansText, system-ui, Segoe UI, Roboto, Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
    const theme = createTheme({
      sys: {
        typography: {
          headline1: {
            fontFamily: base,
            fontWeight: 500,
            fontSize: 18,
            lineHeight: '24px',
            letterSpacing: 0.38,
          },
          headline2: {
            fontFamily: base,
            fontWeight: 500,
            fontSize: 14,
            lineHeight: '24px',
            letterSpacing: 0.41,
          },
          headline3: {
            fontFamily: base,
            fontWeight: 500,
            fontSize: 10,
            lineHeight: '24px',
            letterSpacing: 0.41,
          },
          headline4: {
            fontFamily: base,
            fontWeight: 500,
            fontSize: 16,
            lineHeight: '32px',
            letterSpacing: -0.24,
          },
          headline5: {
            fontFamily: base,
            fontWeight: 500,
            fontSize: 8,
            lineHeight: '32px',
            letterSpacing: -0.24,
          },
          bodyMd: {
            fontFamily: base,
            fontWeight: 800,
            fontSize: 10,
            lineHeight: '20px',
            letterSpacing: -0.08,
          },
          bodySm: {
            fontFamily: base,
            fontWeight: 700,
            fontSize: 9,
            lineHeight: '18px',
            letterSpacing: 'normal',
          },
        },
      },
      comp: {
        backwardCompatibilityMode: false,
      },
    })

    const component = await mountWithTheme(
      <ExampleComponents action={false} />,
      theme
    )

    await expect(component).toHaveScreenshot()
  })
})

test.describe('Reset-CSS', () => {
  /**
   * Скриншот компонентов библиотеки @v-uik до сброса дефолтных стилей тэгов.
   */
  const screenshotNameBeforeResetUik = 'Reset-CSS-Uik-before-1.png'
  /**
   * Скриншот компонентов библиотеки @v-uik после сброса дефолтных стилей тэгов.
   */
  const screenshotNameAfterResetUik = 'Reset-CSS-Uik-after-1.png'
  /**
   * Скриншот HTML тэгов до сброса дефолтных стилей.
   */
  const screenshotNameBeforeResetNative = 'Reset-CSS-Native-before-1.png'
  /**
   * Скриншот HTML тэгов после сброса дефолтных стилей.
   */
  const screenshotNameAfterResetNative = 'Reset-CSS-Native-after-1.png'

  /**
   * Базовое использование хука useResetCss.
   */
  test('basic usage with uik components', async ({ mount }) => {
    const componentsResetCss = await mount(<ExampleComponentsWithResetCss />)

    await expect(componentsResetCss).toHaveScreenshot(
      screenshotNameAfterResetUik
    )
  })

  /**
   * Базовое использование хука useResetCss с нативным Html.
   */
  test('basic usage with native Html', async ({ mount }) => {
    const htmlResetCss = await mount(
      <ExampleComponentsWithResetCss nativeHtml />
    )

    await expect(htmlResetCss).toHaveScreenshot(screenshotNameAfterResetNative)
  })

  /**
   * Сброс дефолтных CSS стилей не должен менять внешний вид компонентов библиотеки @v-uik.
   */
  test('reset css does not affect a uik components appearance', async ({
    mount,
  }) => {
    const componentsBeforeResetCss = await mount(
      <ExampleComponentsWithResetCss noResetCss resetBodyMargin />
    )

    await expect(componentsBeforeResetCss).toHaveScreenshot(
      screenshotNameBeforeResetUik
    )
    await expect(componentsBeforeResetCss).toHaveScreenshot(
      screenshotNameAfterResetUik
    )
  })

  /**
   *  Использование хука useResetCss меняет внешний вид нативного HTML.
   */
  test('reset css changes a native html tags', async ({ mount }) => {
    const htmlBeforeResetCss = await mount(
      <ExampleComponentsWithResetCss nativeHtml noResetCss />
    )

    await expect(htmlBeforeResetCss).toHaveScreenshot(
      screenshotNameBeforeResetNative
    )
    await expect(htmlBeforeResetCss).not.toHaveScreenshot(
      screenshotNameAfterResetNative
    )
  })
})
