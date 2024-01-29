import React from 'react'
import { CircularProgress, Text } from '@v-uik/base'

export const DifferentSizes = (): JSX.Element => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginRight: 40, textAlign: 'center' }}>
        <Text kind="caption">size xlg</Text>
        <CircularProgress size="xlg" />
      </div>
      <div style={{ marginRight: 40, textAlign: 'center' }}>
        <Text kind="caption">size lg</Text>
        <CircularProgress hideTrack size="lg" />
      </div>

      <div style={{ marginRight: 40, textAlign: 'center' }}>
        <Text kind="caption">size md</Text>
        <CircularProgress size="md" />
      </div>

      <div style={{ marginRight: 40, textAlign: 'center' }}>
        <Text kind="caption">size sm</Text>
        <CircularProgress hideTrack size="sm" />
      </div>
    </div>
  )
}
