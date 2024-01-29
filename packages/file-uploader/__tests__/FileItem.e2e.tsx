import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { FileItemExample } from './examples/FileItemExample'
import { FileItemInfoExample } from './examples/FileItemInfoExample'
import { FileItemExtendedButtonsExample } from './examples/FileItemExetendedButtonsExample'

const sizes: string[] = ['sm', 'md', 'lg']

const statuses: string[] = ['success', 'progress', 'error']

const progressTypes: string[] = ['linear', 'circular']

test.describe('FileItem', () => {
  test('enabled', async ({ mount }) => {
    const component = await mount(<FileItemExample />)

    await expect(component).toHaveScreenshot()
  })
  test('focus exit button', async ({ mount }) => {
    const component = await mount(<FileItemExample />)

    await component.locator('button').focus()

    await expect(component).toHaveScreenshot()
  })
  test('click exit button', async ({ mount }) => {
    const component = await mount(<FileItemExample />)

    await component.locator('button').click()

    await expect(component).toHaveScreenshot()
  })
  test('active exit button', async ({ mount, page }) => {
    const component = await mount(<FileItemExample />)

    const buttonBox = (await component.locator('button').boundingBox()) as {
      x: number
      y: number
      width: number
      height: number
    }

    await page.mouse.move(
      buttonBox.x + buttonBox.width / 2,
      buttonBox.y + buttonBox.height / 2
    )
    await page.mouse.down()

    await expect(component).toHaveScreenshot()
  })
  test('hover exit button', async ({ mount }) => {
    const component = await mount(<FileItemExample />)

    await component.locator('button').hover()

    await expect(component).toHaveScreenshot()
  })
  sizes.forEach((size) => {
    test.describe('size', () => {
      test(size, async ({ mount }) => {
        // @ts-ignore
        const component = await mount(<FileItemExample size={size} />)

        await expect(component).toHaveScreenshot()
      })
    })
  })
  statuses.forEach((status) => {
    test.describe('status', () => {
      test(status, async ({ mount }) => {
        // @ts-ignore
        const component = await mount(<FileItemExample status={status} />)

        await expect(component).toHaveScreenshot()
      })
    })
  })
  progressTypes.forEach((progressType) => {
    test.describe('progressType', () => {
      test(progressType, async ({ mount }) => {
        const component = await mount(
          // @ts-ignore
          <FileItemExample status="progress" progressType={progressType} />
        )

        await expect(component).toHaveScreenshot()
      })
      test(`${progressType} with progress value`, async ({ mount }) => {
        // @ts-ignore
        const component = await mount(
          <FileItemInfoExample
            status="progress"
            // @ts-ignore
            progressType={progressType}
            progress={60}
          />
        )

        await expect(component).toHaveScreenshot()
      })
    })
  })

  test('error with text', async ({ mount }) => {
    const component = await mount(
      <FileItemExample status="error" errorText="Some error." />
    )

    await expect(component).toHaveScreenshot()
  })

  test('extended button icons', async ({ mount }) => {
    const component = await mount(<FileItemExtendedButtonsExample />)

    await expect(component).toHaveScreenshot()
  })
})
