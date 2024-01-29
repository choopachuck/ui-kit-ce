import React from 'react'
import { CircularProgress, Text } from '@v-uik/base'

export const DifferentThickness = (): JSX.Element => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginRight: 40, textAlign: 'center' }}>
        <Text kind="caption">thickness xlg</Text>
        <CircularProgress thickness={7} size="xlg" />
      </div>
      <div style={{ marginRight: 40, textAlign: 'center' }}>
        <Text kind="caption">thickness lg</Text>
        <CircularProgress thickness={5} size="lg" />
      </div>

      <div style={{ marginRight: 40, textAlign: 'center' }}>
        <Text kind="caption">thickness md</Text>
        <CircularProgress thickness={3} size="md" />
      </div>

      <div style={{ marginRight: 40, textAlign: 'center' }}>
        <Text kind="caption">thickness sm</Text>
        <CircularProgress thickness={1} size="sm" />
      </div>
    </div>
  )
}
