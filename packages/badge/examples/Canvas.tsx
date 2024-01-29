import React from 'react'
import { Badge } from '@v-uik/base'

export default () => {
  return (
    <Badge content="1">
      <div
        style={{
          backgroundColor: 'lightgrey',
          width: 40,
          height: 40,
        }}
      />
    </Badge>
  )
}
