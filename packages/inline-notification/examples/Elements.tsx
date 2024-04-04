/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { InlineNotification, Button } from '@v-uik/base'

const body = 'Body text goes here'

export const Elements = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <InlineNotification title="Title" showIndicator={false} icon={false} />
      <InlineNotification title="Indicator + Title" icon={false} />
      <InlineNotification icon title="Indicator + Icon + Title" />
      <InlineNotification icon title="Indicator + Icon + Title">
        + Body
      </InlineNotification>
      <InlineNotification
        icon
        title="Actions"
        actions={
          <>
            <Button
              color="secondary"
              kind="outlined"
              style={{ marginRight: 16 }}
            >
              Button
            </Button>
            <Button color="secondary" kind="ghost">
              Button
            </Button>
          </>
        }
      >
        {body}
      </InlineNotification>
      <InlineNotification icon title="With close" onClose={() => {}}>
        {body}
      </InlineNotification>
    </div>
  )
}
