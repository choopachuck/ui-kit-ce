import React from 'react'
import { Underlay, Text } from '@v-uik/base'

export const Outlined = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Underlay kind="outlined" status="error">
        <Text>error outlined</Text>
      </Underlay>
      <Underlay kind="outlined" status="warning">
        <Text>warning outlined</Text>
      </Underlay>
      <Underlay kind="outlined" status="success">
        <Text>success outlined</Text>
      </Underlay>
      <Underlay kind="outlined" status="info">
        <Text>info outlined</Text>
      </Underlay>
      <Underlay kind="outlined" status="neutral">
        <Text>neutral outlined</Text>
      </Underlay>
    </div>
  )
}
