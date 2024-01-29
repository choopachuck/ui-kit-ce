import React from 'react'
import { Text } from '@v-uik/base'

export const Typography: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Text kind="h1">h1. Heading</Text>
      <Text gutterBottom kind="h2">
        h2. Heading
      </Text>
      <Text gutterBottom kind="h3">
        h3. Heading
      </Text>
      <Text gutterBottom kind="h4">
        h4. Heading
      </Text>
      <Text kind="h5">h5. Heading</Text>
    </div>
  )
}
