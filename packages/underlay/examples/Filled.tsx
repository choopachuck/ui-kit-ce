import React from 'react'
import { Underlay, Text } from '@v-uik/base'

export const Filled = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Underlay kind="filled" status="error">
        <Text>error filled</Text>
      </Underlay>
      <Underlay kind="filled" status="warning">
        <Text>warning filled</Text>
      </Underlay>
      <Underlay kind="filled" status="success">
        <Text>success filled</Text>
      </Underlay>
      <Underlay kind="filled" status="info">
        <Text>info filled</Text>
      </Underlay>
      <Underlay kind="filled" status="neutral">
        <Text>neutral filled</Text>
      </Underlay>
    </div>
  )
}
