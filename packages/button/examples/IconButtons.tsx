import React from 'react'
import { Button } from '@v-uik/base'
import { Icon } from './assets/Icon'

export const IconButtons = (): JSX.Element => {
  return (
    <div style={{ display: 'flex', columnGap: 15 }}>
      <Button style={{ minWidth: 40, padding: 7 }}>
        <Icon />
      </Button>
      <Button>
        <Icon style={{ marginRight: 8 }} />
        Text after icon
      </Button>
      <Button color="secondary">
        Text before icon
        <Icon style={{ marginLeft: 8 }} />
      </Button>
    </div>
  )
}
