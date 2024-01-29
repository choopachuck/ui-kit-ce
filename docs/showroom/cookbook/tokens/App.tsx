import React from 'react'
import { withTokenRouter } from './routing'
import { TokensEditor } from './components'

export const App = withTokenRouter(() => {
  return <TokensEditor />
})
