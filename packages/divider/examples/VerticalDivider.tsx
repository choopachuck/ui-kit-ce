import * as React from 'react'
import { Link, Divider } from '@v-uik/base'

export const VerticalDivider = (): JSX.Element => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Link>Link 1</Link>
      <Divider direction="vertical" />
      <Link>Link 2</Link>
      <Divider direction="vertical" />
      <Link>Link 3</Link>
    </div>
  )
}
