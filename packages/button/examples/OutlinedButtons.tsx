import React from 'react'
import { Button } from '@v-uik/base'

export const OutlinedButtons = (): JSX.Element => {
  return (
    <div style={{ display: 'flex', columnGap: 15 }}>
      <Button kind="outlined">Primary</Button>
      <Button kind="outlined" color="secondary">
        Secondary
      </Button>
      <Button kind="outlined" color="error">
        Error
      </Button>
    </div>
  )
}
