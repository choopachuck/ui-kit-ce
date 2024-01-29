import React from 'react'
import { CircularProgress, Text } from '@v-uik/base'

export const BasicProgress = (): JSX.Element => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginRight: 40, textAlign: 'center' }}>
        <Text gutterBottom>With track</Text>
        <CircularProgress size="xlg" />
      </div>
      <div style={{ marginRight: 40, textAlign: 'center' }}>
        <Text gutterBottom>Without track</Text>
        <CircularProgress hideTrack size="xlg" />
      </div>
    </div>
  )
}
