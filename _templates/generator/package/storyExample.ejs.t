---
to: packages/<%= h.changeCase.paramCase(name) %>/examples/Basic<%= h.changeCase.pascal(name) %>.tsx
---

import * as React from 'react'
import { <%= h.changeCase.pascal(name) %> } from '@v-uik/<%= h.changeCase.paramCase(name) %>'

export const Basic<%= h.changeCase.pascal(name) %> = (): JSX.Element => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <<%= h.changeCase.pascal(name) %> />
    </div>
  )
}
