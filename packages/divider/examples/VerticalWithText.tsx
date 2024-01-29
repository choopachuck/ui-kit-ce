import * as React from 'react'
import { Divider, Text } from '@v-uik/base'

export const VerticalWithText = (): JSX.Element => {
  const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
   Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
   Sed malesuada lobortis pretium.`

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '1200px',
      }}
    >
      <Text style={{ width: '30%' }}>{content}</Text>
      <Divider direction="vertical">VERTICAL</Divider>
      <Text style={{ width: '30%' }}>{content}</Text>
    </div>
  )
}
