import React from 'react'
import { Button, Dropdown } from '@v-uik/base'

export const Basic = (): JSX.Element => {
  const anchor = React.useRef(null)

  return (
    <Dropdown
      anchor={anchor.current}
      content={
        <div
          id="dropdown-id"
          style={{ padding: 10, backgroundColor: '#ccc', borderRadius: 4 }}
        >
          Dropdown content
        </div>
      }
    >
      <Button ref={anchor} aria-describedby="dropdown-id">
        Click me
      </Button>
    </Dropdown>
  )
}

export default Basic
