import * as React from 'react'
import { test as base, expect } from '../customMount'
import { Locator } from '@playwright/test'
import { Wrapper } from './Wrapper'

const test = base.extend<{
  mount(component: JSX.Element): Promise<Locator>
}>({
  mount: async ({ mount: baseMount }, use) => {
    await use(async (component: JSX.Element) => {
      return await baseMount(<Wrapper>{component}</Wrapper>)
    })
  },
})

export { test, expect }
