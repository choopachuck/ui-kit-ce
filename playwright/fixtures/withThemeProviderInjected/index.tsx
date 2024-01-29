import * as React from 'react'
import { test as base, expect } from '../customMount'
import { Locator } from '@playwright/test'
import { Theme } from '@v-uik/theme'
import { Wrapper } from './Wrapper'

const test = base.extend<{
  mountWithTheme(component: JSX.Element, theme: Theme): Promise<Locator>
}>({
  mountWithTheme: async ({ mount: baseMount }, use) => {
    await use(async (component: JSX.Element, theme: Theme) => {
      return await baseMount(<Wrapper theme={theme}>{component}</Wrapper>)
    })
  },
})

export { test, expect }
