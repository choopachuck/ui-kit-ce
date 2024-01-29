/* eslint-disable @typescript-eslint/no-unused-vars */

import * as React from 'react'
import { Popup } from '@v-uik/base'

export const Accessibility = (): JSX.Element => {
  const anchorRef = React.useRef(null)
  const [_, setState] = React.useState({})

  React.useEffect(() => {
    setState({})
  }, [])

  return (
    <>
      <div
        ref={anchorRef}
        aria-describedby="popup-1"
        style={{
          margin: '50px 0 50px 150px',
          backgroundColor: 'green',
          display: 'inline-flex',
          padding: 10,
          borderRadius: 4,
        }}
      >
        Anchor
      </div>
      <Popup open id="popup-1" anchor={anchorRef.current}>
        Popup available content
      </Popup>
    </>
  )
}
