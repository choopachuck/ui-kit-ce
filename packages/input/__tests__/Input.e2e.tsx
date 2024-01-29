import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Input } from '../src'
import { ErrorIndication } from '../examples/ErrorIndication'

test.describe('Input', () => {
  test('enabled', async ({ mount }) => {
    const component = await mount(
      <Input
        label="Название поля"
        helperText="Описание поля"
        placeholder="введите текст"
        prefix="A"
        suffix="B"
      />
    )

    await expect(component).toHaveScreenshot()
  })

  test('filled', async ({ mount }) => {
    const component = await mount(
      <Input
        value="содержимое поля"
        label="Название поля"
        helperText="Описание поля"
        placeholder="введите текст"
        prefix="A"
        suffix="B"
      />
    )

    await expect(component).toHaveScreenshot()
  })

  test('hover', async ({ mount }) => {
    const component = await mount(
      <Input
        label="Название поля"
        helperText="Описание поля"
        placeholder="введите текст"
        prefix="A"
        suffix="B"
      />
    )
    await component.locator('input').hover()

    await expect(component).toHaveScreenshot()
  })

  test('focus', async ({ mount }) => {
    const component = await mount(
      <Input
        label="Название поля"
        helperText="Описание поля"
        placeholder="введите текст"
        prefix="A"
        suffix="B"
      />
    )
    await component.locator('input').focus()

    await expect(component).toHaveScreenshot()
  })

  test('disabled', async ({ mount }) => {
    const component = await mount(
      <Input
        disabled
        label="Название поля"
        helperText="Описание поля"
        placeholder="введите текст"
        prefix="A"
        suffix="B"
      />
    )

    await expect(component).toHaveScreenshot()
  })

  test('error', async ({ mount }) => {
    const component = await mount(
      <Input
        error
        showErrorIcon
        label="Название поля"
        helperText="Описание поля"
        placeholder="введите текст"
        prefix="A"
        suffix="B"
      />
    )

    await expect(component).toHaveScreenshot()
  })

  test('tooltip', async ({ mount }) => {
    const component = await mount(
      <Input
        style={{ padding: '35px 5px 5px 5px' }}
        label="Название поля"
        labelProps={{
          tooltipText: 'Дополнительная подсказка',
          tooltipProps: {
            single: true,
            dropdownProps: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [-5, 8],
                  },
                },
              ],
            },
          },
        }}
      />
    )
    await component.locator('label').locator('svg').hover()

    await expect(component).toHaveScreenshot()
  })

  test('error tooltip', async ({ mount }) => {
    const component = await mount(<ErrorIndication />)
    await component
      .locator('div div', { hasText: 'With icon tooltip' })
      .locator('svg')
      .hover()

    await expect(component).toHaveScreenshot()
  })

  test('sizes', async ({ mount }) => {
    const component = await mount(
      <div style={{ padding: 5 }}>
        <Input size="sm" style={{ marginRight: 10 }} />
        <Input size="md" style={{ marginRight: 10 }} />
        <Input size="lg" />
      </div>
    )

    await expect(component).toHaveScreenshot()
  })

  test('required', async ({ mount }) => {
    const component = await mount(<Input required label="Название поля" />)

    await expect(component).toHaveScreenshot()
  })

  test('with description', async ({ mount }) => {
    const component = await mount(
      <Input label="Название поля" description="Описание поля" />
    )

    await expect(component).toHaveScreenshot()
  })

  test('clear', async ({ mount }) => {
    const component = await mount(<Input canClear value="testValue" />)

    await expect(component).toHaveScreenshot()
  })
})
