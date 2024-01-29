---
to: packages/<%= h.changeCase.paramCase(name) %>/__tests__/<%= h.changeCase.pascal(name) %>.test.tsx
---
import * as React from 'react'
import { render } from '@testing-library/react'
import { <%= h.changeCase.pascal(name)%> } from '../src'

it('render component', () => {
  const { getByRole } = render(<<%= h.changeCase.pascal(name)%> />)
})
