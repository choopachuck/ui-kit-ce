import * as React from 'react'
import { Tooltip, Button } from '@v-uik/base'

export const Accessible = (): React.ReactElement => {
  return (
    <Tooltip
      showOnChildFocus
      single
      dropdownProps={{
        id: 'tooltip-1',
        placement: 'bottom',
        content: 'Tooltip for button',
      }}
    >
      <Button aria-describedby="tooltip-1" style={{ marginRight: '1rem' }}>
        Button with tooltip
      </Button>
    </Tooltip>
  )
}

export default Accessible
