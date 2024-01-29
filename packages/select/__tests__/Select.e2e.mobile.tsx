import * as React from 'react'
import { test, expect } from '../../../playwright/fixtures/customMount'
import { Select } from '../src'

test.describe('Select adaptive', () => {
  test('enabled', async ({ mount, page }) => {
    await mount(
      <div style={{ width: 250 }}>
        <Select
          helperText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid autem debitis delectus ipsum, magnam odit officiis possimus quaerat ratione tempore."
          label="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, maxime."
          options={[
            { value: '1', label: 'Option 1', suffix: 'suffix' },
            { value: '2', label: 'very very long option 2' },
            { value: '3', label: 'Option 3' },
            {
              value: '4',
              label:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, omnis!',
            },
            { value: '5', label: 'Option 5' },
          ]}
          placeholder="Введите сюда текст"
          value="4"
        />
      </div>
    )

    await expect(page).toHaveScreenshot()
  })

  test('opened', async ({ mount, page }) => {
    const component = await mount(
      <div style={{ width: 250 }}>
        <Select
          label="Label"
          options={[
            { value: '1', label: 'Option 1', suffix: 'suffix' },
            { value: '2', label: 'very very long option 2' },
            { value: '3', label: 'Option 3' },
            {
              value: '4',
              label:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, omnis!',
            },
            { value: '5', label: 'Option 5' },
          ]}
          placeholder="Введите сюда текст"
          value=""
        />
      </div>
    )

    await component.click()
    await expect(page).toHaveScreenshot()
  })
})
