import React from 'react'
import { Button } from '@v-uik/base'

export const GhostButtons = (): JSX.Element => {
  return (
    <div style={{ display: 'flex', columnGap: 15 }}>
      <Button kind="ghost">Primary</Button>
      <Button kind="ghost" color="secondary">
        Secondary
      </Button>
      <Button kind="ghost" color="error">
        Error
      </Button>
    </div>
  )
}
