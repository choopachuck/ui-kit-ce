import React from 'react'
import { InlineNotification } from '@v-uik/base'

const description = 'Body text goes here'

export const Filled = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <InlineNotification status="error" title="Error Filled">
        {description}
      </InlineNotification>
      <InlineNotification status="warning" title="Warning Filled">
        {description}
      </InlineNotification>
      <InlineNotification status="success" title="Success Filled">
        {description}
      </InlineNotification>
      <InlineNotification status="info" title="Info Filled">
        {description}
      </InlineNotification>
      <InlineNotification status="neutral" title="Neutral Filled">
        {description}
      </InlineNotification>
    </div>
  )
}
