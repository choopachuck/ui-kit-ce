import React from 'react'
import { Button } from '@v-uik/base'

export const FilledButtons = (): JSX.Element => {
  return (
    <div style={{ display: 'flex', columnGap: 15 }}>
      <Button>Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="error">Error</Button>
    </div>
  )
}
