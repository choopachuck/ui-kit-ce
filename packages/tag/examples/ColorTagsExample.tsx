import React from 'react'
import { Tag } from '@v-uik/base'
import { Icon } from './assets/Icon'

export const ColorTagsExample = (): JSX.Element => {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <Tag kind="color" color="red">
        <Icon style={{ marginRight: 8 }} />
        red
      </Tag>
      <Tag kind="color" color="yellow">
        <Icon style={{ marginRight: 8 }} />
        yellow
      </Tag>
      <Tag kind="color" color="green">
        <Icon style={{ marginRight: 8 }} />
        green
      </Tag>
      <Tag kind="color" color="azure">
        <Icon style={{ marginRight: 8 }} />
        azure
      </Tag>
      <Tag kind="color" color="blue">
        <Icon style={{ marginRight: 8 }} />
        blue
      </Tag>
      <Tag kind="color" color="violet">
        <Icon style={{ marginRight: 8 }} />
        violet
      </Tag>
      <Tag kind="color" color="gray">
        <Icon style={{ marginRight: 8 }} />
        gray
      </Tag>
    </div>
  )
}
