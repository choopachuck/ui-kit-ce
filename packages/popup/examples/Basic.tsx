/* eslint-disable @typescript-eslint/no-unused-vars */

import * as React from 'react'
import { Popup } from '@v-uik/base'

export const Basic = (): JSX.Element => {
  const anchorRef = React.useRef(null)
  const containerRef = React.useRef(null)
  const [_, setState] = React.useState({})

  React.useEffect(() => {
    setState({})
  }, [])

  return (
    <div ref={containerRef}>
      <div
        ref={anchorRef}
        style={{
          margin: '50px 0 50px 150px',
          backgroundColor: 'aqua',
          display: 'inline-flex',
          padding: 10,
          borderRadius: 4,
        }}
      >
        Anchor
      </div>
      <Popup open anchor={anchorRef.current} container={containerRef.current!}>
        Popup content
      </Popup>
    </div>
  )
}

export default Basic
