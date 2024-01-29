import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { BasicExample } from '../examples/BasicExample'
import { BasicExampleV2 } from '../examples/BasicExampleV2'

test.describe('Text', () => {
  test('Display Lg', async ({ page, mount }) => {
    await mount(<BasicExampleV2 />)

    const component = page.locator('p', { hasText: 'displayLg' })

    await expect(component).toHaveScreenshot()
  })
  test('Display Md', async ({ page, mount }) => {
    await mount(<BasicExampleV2 />)

    const component = page.locator('p', { hasText: 'displayMd' })

    await expect(component).toHaveScreenshot()
  })
  test('Display Sm', async ({ page, mount }) => {
    await mount(<BasicExampleV2 />)

    const component = page.locator('p', { hasText: 'displaySm' })

    await expect(component).toHaveScreenshot()
  })
  test('Headline 1', async ({ page, mount }) => {
    await mount(<BasicExampleV2 />)

    const component = page.locator('h1')

    await expect(component).toHaveScreenshot()
  })
  test('Headline 2', async ({ page, mount }) => {
    await mount(<BasicExampleV2 />)

    const component = page.locator('h2')

    await expect(component).toHaveScreenshot()
  })
  test('Headline 3', async ({ page, mount }) => {
    await mount(<BasicExampleV2 />)

    const component = page.locator('h3')

    await expect(component).toHaveScreenshot()
  })
  test('Headline 4', async ({ page, mount }) => {
    await mount(<BasicExampleV2 />)

    const component = page.locator('h4')

    await expect(component).toHaveScreenshot()
  })
  test('Headline 5', async ({ page, mount }) => {
    await mount(<BasicExampleV2 />)

    const component = page.locator('h5')

    await expect(component).toHaveScreenshot()
  })
  test('Title Lg', async ({ page, mount }) => {
    await mount(<BasicExampleV2 />)

    const component = page.locator('h6')

    await expect(component).toHaveScreenshot()
  })
  test('Title Md', async ({ page, mount }) => {
    await mount(<BasicExampleV2 />)

    const component = page.locator('p', { hasText: 'titleMd' })

    await expect(component).toHaveScreenshot()
  })
  test('Title Sm', async ({ page, mount }) => {
    await mount(<BasicExampleV2 />)

    const component = page.locator('p', { hasText: 'titleSm' })

    await expect(component).toHaveScreenshot()
  })
  test('Body Xl', async ({ page, mount }) => {
    await mount(<BasicExampleV2 />)

    const component = page.locator('div div', { hasText: 'bodyXl' })

    await expect(component).toHaveScreenshot()
  })
  test('Body Lg', async ({ page, mount }) => {
    await mount(<BasicExampleV2 />)

    const component = page.locator('div div', { hasText: 'bodyLg' })

    await expect(component).toHaveScreenshot()
  })
  test('Body Md', async ({ page, mount }) => {
    await mount(<BasicExampleV2 />)

    const component = page.locator('div div', { hasText: 'bodyMd' })

    await expect(component).toHaveScreenshot()
  })
  test('Body Sm', async ({ page, mount }) => {
    await mount(<BasicExampleV2 />)

    const component = page.locator('div div', { hasText: 'bodySm' })

    await expect(component).toHaveScreenshot()
  })
  test('UI Text Lg', async ({ page, mount }) => {
    await mount(<BasicExampleV2 />)

    const component = page.locator('span', { hasText: 'uiTextLg' })

    await expect(component).toHaveScreenshot()
  })
  test('UI Text Md', async ({ page, mount }) => {
    await mount(<BasicExampleV2 />)

    const component = page.locator('span', { hasText: 'uiTextMd' })

    await expect(component).toHaveScreenshot()
  })
  test('UI Text Sm', async ({ page, mount }) => {
    await mount(<BasicExampleV2 />)

    const component = page.locator('span', { hasText: 'uiTextSm' })

    await expect(component).toHaveScreenshot()
  })
  test('Code Lg', async ({ page, mount }) => {
    await mount(<BasicExampleV2 />)

    const component = page.locator('pre', { hasText: 'codeLg' })

    await expect(component).toHaveScreenshot()
  })
  test('Code Md', async ({ page, mount }) => {
    await mount(<BasicExampleV2 />)

    const component = page.locator('pre', { hasText: 'codeMd' })

    await expect(component).toHaveScreenshot()
  })
  test('Code Sm', async ({ page, mount }) => {
    await mount(<BasicExampleV2 />)

    const component = page.locator('pre', { hasText: 'codeSm' })

    await expect(component).toHaveScreenshot()
  })

  //legacy
  test('H1', async ({ page, mount }) => {
    await mount(<BasicExample />)

    const component = page.locator('h1')

    await expect(component).toHaveScreenshot()
  })
  test('H2', async ({ page, mount }) => {
    await mount(<BasicExample />)

    const component = page.locator('h2')

    await expect(component).toHaveScreenshot()
  })
  test('H3', async ({ page, mount }) => {
    await mount(<BasicExample />)

    const component = page.locator('h3')

    await expect(component).toHaveScreenshot()
  })
  test('H4', async ({ page, mount }) => {
    await mount(<BasicExample />)

    const component = page.locator('h4')

    await expect(component).toHaveScreenshot()
  })
  test('H5', async ({ page, mount }) => {
    await mount(<BasicExample />)

    const component = page.locator('h5')

    await expect(component).toHaveScreenshot()
  })
  test('H6', async ({ page, mount }) => {
    await mount(<BasicExample />)

    const component = page.locator('h6')

    await expect(component).toHaveScreenshot()
  })
  test('Subtitle 1', async ({ page, mount }) => {
    await mount(<BasicExample />)

    const component = page.locator('p', { hasText: 'subtitle1' })

    await expect(component).toHaveScreenshot()
  })
  test('Subtitle 2', async ({ page, mount }) => {
    await mount(<BasicExample />)

    const component = page.locator('p', { hasText: 'subtitle2' })

    await expect(component).toHaveScreenshot()
  })
  test('Body 1', async ({ page, mount }) => {
    await mount(<BasicExample />)

    const component = page.locator('div div', { hasText: 'body1.' })

    await expect(component).toHaveScreenshot()
  })
  test('Body 2', async ({ page, mount }) => {
    await mount(<BasicExample />)

    const component = page.locator('div div', { hasText: 'body2.' })

    await expect(component).toHaveScreenshot()
  })
  test('Button', async ({ page, mount }) => {
    await mount(<BasicExample />)

    const component = page.locator('div div', { hasText: 'button.' })

    await expect(component).toHaveScreenshot()
  })
  test('Caption', async ({ page, mount }) => {
    await mount(<BasicExample />)

    const component = page.locator('div div', { hasText: 'caption.' })

    await expect(component).toHaveScreenshot()
  })
  test('Overline', async ({ page, mount }) => {
    await mount(<BasicExample />)

    const component = page.locator('div div', { hasText: 'overline.' })

    await expect(component).toHaveScreenshot()
  })
  test('Code 1', async ({ page, mount }) => {
    await mount(<BasicExample />)

    const component = page.locator('pre', { hasText: 'code1' })

    await expect(component).toHaveScreenshot()
  })
  test('Code 2', async ({ page, mount }) => {
    await mount(<BasicExample />)

    const component = page.locator('pre', { hasText: 'code2' })

    await expect(component).toHaveScreenshot()
  })
})
