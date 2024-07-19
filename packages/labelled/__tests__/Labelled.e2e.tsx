import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { test as testWithTheme } from '../../../playwright/fixtures/withThemeProviderInjected'
import {
  WithTopAndBottomLabels,
  WithKeepHelperTextMinHeight,
  LabelledInput,
} from '../examples'
import { createTheme } from '@v-uik/theme'

test.describe('Labelled', () => {
  test('with label, suffix, description and helper text', async ({ mount }) => {
    const component = await mount(<WithTopAndBottomLabels />)

    await expect(component).toHaveScreenshot()
  })
  test('with label, suffix, description and helper text disabled', async ({
    mount,
  }) => {
    const component = await mount(<WithTopAndBottomLabels disabled />)

    await expect(component).toHaveScreenshot()
  })
  test('with label, suffix, description and helper text required', async ({
    mount,
  }) => {
    const component = await mount(<WithTopAndBottomLabels required />)

    await expect(component).toHaveScreenshot()
  })
  test('with label, suffix, description and helper text disabled required', async ({
    mount,
  }) => {
    const component = await mount(<WithTopAndBottomLabels required disabled />)

    await expect(component).toHaveScreenshot()
  })
  test('with label, suffix, description and helper text error', async ({
    mount,
  }) => {
    const component = await mount(<WithTopAndBottomLabels error />)

    await expect(component).toHaveScreenshot()
  })
  test('with flag keepHelperTextMinHeight = true', async ({ mount }) => {
    const component = await mount(
      <WithKeepHelperTextMinHeight keepHelperTextMinHeight />
    )

    await expect(component).toHaveScreenshot()
  })
  test('with flag keepHelperTextMinHeight = false', async ({ mount }) => {
    const component = await mount(<WithKeepHelperTextMinHeight />)

    await expect(component).toHaveScreenshot()
  })
  testWithTheme('sizes with custom typography', async ({ mountWithTheme }) => {
    const theme = createTheme({
      comp: {
        backwardCompatibilityMode: false,
        inputLabel: {
          typographyFontSizeSm: '11px',
          typographyLineHeightSm: '1px',
          typographyFontSizeMd: '25px',
          typographyLineHeightMd: '30px',
          typographyFontSizeLg: '60px',
          typographyLineHeightLg: '90px',
          descriptionTypographyFontSizeSm: '8px',
          descriptionTypographyLineHeightSm: '15px',
          descriptionTypographyFontSizeMd: '20px',
          descriptionTypographyLineHeightMd: '25px',
          descriptionTypographyFontSizeLg: '33px',
          descriptionTypographyLineHeightLg: '50px',
        },
        inputHelperText: {
          typographyFontSizeSm: '11px',
          typographyLineHeightSm: '1px',
          typographyFontSizeMd: '25px',
          typographyLineHeightMd: '30px',
          typographyFontSizeLg: '60px',
          typographyLineHeightLg: '90px',
        },
      },
    })

    const component = await mountWithTheme(
      <div style={{ paddingTop: 10 }}>
        <div style={{ marginBottom: 10 }}>
          <LabelledInput
            label="Login"
            description="Some description"
            helperText="Some helper text"
            size="sm"
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <LabelledInput
            label="Login"
            description="Some description"
            helperText="Some helper text"
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <LabelledInput
            label="Login"
            description="Some description"
            helperText="Some helper text"
            size="md"
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <LabelledInput
            label="Login"
            description="Some description"
            helperText="Some helper text"
            size="lg"
          />
        </div>
      </div>,
      theme
    )

    await expect(component).toHaveScreenshot()
  })
})
