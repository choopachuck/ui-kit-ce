/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react'
import { InlineNotification, Button } from '@v-uik/base'

export default (): JSX.Element => {
  const actions = (
    <Button color="secondary" kind="outlined">
      Button
    </Button>
  )

  return (
    <InlineNotification
      icon
      title="Title text"
      actions={actions}
      onClose={() => {}}
    >
      InlineNotification
    </InlineNotification>
  )
}
