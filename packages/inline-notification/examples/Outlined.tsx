import React from 'react'
import { InlineNotification } from '@v-uik/base'

const description = 'Body text goes here'

export const Outlined = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <InlineNotification kind="outlined" status="error" title="Error Outlined">
        {description}
      </InlineNotification>
      <InlineNotification
        kind="outlined"
        status="warning"
        title="Warning Outlined"
      >
        {description}
      </InlineNotification>
      <InlineNotification
        kind="outlined"
        status="success"
        title="Success Outlined"
      >
        {description}
      </InlineNotification>
      <InlineNotification kind="outlined" status="info" title="Info Outlined">
        {description}
      </InlineNotification>
      <InlineNotification
        kind="outlined"
        status="neutral"
        title="Neutral Outlined"
      >
        {description}
      </InlineNotification>
    </div>
  )
}
