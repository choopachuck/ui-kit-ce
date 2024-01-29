import React from 'react'
import { Button } from '@v-uik/base'
import { Icon } from './assets/Icon'
export const DifferentSizeButtons = (): JSX.Element => {
  return (
    <div style={{ display: 'flex', columnGap: 15, alignItems: 'center' }}>
      <Button size="sm">
        <Icon width={16} height={16} style={{ marginRight: 8 }} />
        Small
      </Button>
      <Button>
        <Icon style={{ marginRight: 8 }} />
        Medium (default)
      </Button>
      <Button size="lg">
        <Icon style={{ marginRight: 8 }} />
        Large
      </Button>
    </div>
  )
}
