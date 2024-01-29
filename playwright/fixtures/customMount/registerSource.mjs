import ReactDOM from 'react-dom'
import React from 'react'

const registry = new Map()

export function register(components) {
  for (const [name, value] of Object.entries(components))
    registry.set(name, value)
}

function render(component) {
  let componentFunc = registry.get(component.type)
  if (!componentFunc) {
    // Lookup by shorthand.
    for (const [name, value] of registry) {
      if (component.type.endsWith(`_${name}`)) {
        componentFunc = value
        break
      }
    }
  }

  if (!componentFunc && component.type[0].toUpperCase() === component.type[0])
    throw new Error(
      `Unregistered component: ${
        component.type
      }. Following components are registered: ${[...registry.keys()]}`
    )

  const componentFuncOrString = componentFunc || component.type

  if (component.kind !== 'jsx')
    throw new Error('Object mount notation is not supported')

  return React.createElement(
    componentFuncOrString,
    component.props,
    ...component.children
      .map((child) => {
        if (typeof child === 'string') return child
        return render(child)
      })
      .filter((child) => {
        if (typeof child === 'string') return !!child.trim()
        return true
      })
  )
}

window.playwrightMount = (component) => {
  ReactDOM.render(render(component), document.getElementById('root'))
}

import { Wrapper as _work_playwright_fixtures_withDateProviderInjected_Wrapper_tsx_Wrapper } from './../playwright/fixtures/withDateProviderInjected/Wrapper.tsx'
import { Wrapper as _work_playwright_fixtures_withThemeProviderInjected_Wrapper_tsx_Wrapper } from './../playwright/fixtures/withThemeProviderInjected/Wrapper.tsx'
register({
  _work_playwright_fixtures_withDateProviderInjected_Wrapper_tsx_Wrapper,
  _work_playwright_fixtures_withThemeProviderInjected_Wrapper_tsx_Wrapper,
})
