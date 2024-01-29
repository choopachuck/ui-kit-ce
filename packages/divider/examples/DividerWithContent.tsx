import * as React from 'react'
import { Tag, Divider, Text } from '@v-uik/base'

export const DividerWithContent = (): JSX.Element => {
  const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
   Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
   Sed malesuada lobortis pretium.`

  return (
    <div>
      <Text>{content}</Text>
      <Divider as="div">CENTER</Divider>
      <Text>{content}</Text>
      <Divider as="div" textAlign="left">
        LEFT
      </Divider>
      <Text>{content}</Text>
      <Divider as="div" textAlign="right">
        RIGHT
      </Divider>
      <Text>{content}</Text>
      <Divider as="div">
        <Tag size="sm" kind="primary">
          TAG
        </Tag>
      </Divider>
      <Text>{content}</Text>
    </div>
  )
}
