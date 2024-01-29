import type {
  TestType,
  PlaywrightTestArgs,
  PlaywrightTestOptions,
  PlaywrightWorkerArgs,
  PlaywrightWorkerOptions,
  Locator,
  Expect,
} from '@playwright/test'
import { test as baseTest } from '@playwright/test'

interface ComponentFixtures {
  mount(component: JSX.Element): Promise<Locator>
}

const { _addRunnerPlugin } = require('@playwright/test')
const { fixtures } = require('@playwright/test/lib/mount')
const path = require('path')

_addRunnerPlugin(() => {
  const { createPlugin } = require('@playwright/test/lib/plugins/vitePlugin')
  return createPlugin(path.join(__dirname, 'registerSource.mjs'), () =>
    require('@vitejs/plugin-react')()
  )
})

export const test = baseTest.extend<ComponentFixtures>(fixtures)
export { expect, devices } from '@playwright/test'
