/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { InlineNotification, Button } from '@v-uik/base'

const description = 'Body text goes here'

const actions = (
  <Button color="secondary" kind="outlined">
    Button
  </Button>
)

export const Direction = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <InlineNotification
        title="Многострочное уведомление"
        direction="vertical"
        actions={actions}
        onClose={() => {}}
      >
        {description}
      </InlineNotification>
      <InlineNotification
        title="Однострочное уведомление"
        actions={actions}
        onClose={() => {}}
      >
        {description}
      </InlineNotification>
    </div>
  )
}
