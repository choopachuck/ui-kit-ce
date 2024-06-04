/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react'
import { InlineNotification, Button } from '@v-uik/base'

const description = `Jakob Nielsen's 10 general principles for interaction design. They are called "heuristics" because they are broad rules of thumb and not specific usability guidelines.`
const actions = (
  <Button color="secondary" kind="outlined">
    Button
  </Button>
)

export const LongText = (): JSX.Element => {
  return (
    <div style={{ maxWidth: 750 }}>
      <InlineNotification icon title={description} style={{ marginBottom: 16 }}>
        {description}
      </InlineNotification>
      <InlineNotification icon title="Title text" style={{ marginBottom: 16 }}>
        {description}
      </InlineNotification>
      <InlineNotification
        icon
        title="Title text"
        style={{ marginBottom: 16 }}
        onClose={() => {}}
      >
        {description}
      </InlineNotification>
      <InlineNotification
        icon
        title="Title text"
        actions={actions}
        style={{ marginBottom: 16 }}
        onClose={() => {}}
      >
        {description}
      </InlineNotification>
      <InlineNotification
        icon
        title="Title text"
        direction="vertical"
        style={{ marginBottom: 16 }}
      >
        {description}
      </InlineNotification>
    </div>
  )
}
