import React from 'react'
import { Tag } from '@v-uik/base'
import { Icon } from './assets/Icon'

export const TagTypesExample = (): JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', gap: 16 }}>
        <Tag kind="lite">
          <Icon style={{ marginRight: 8 }} />
          Lite
        </Tag>
        <Tag kind="secondary">
          <Icon style={{ marginRight: 8 }} />
          Secondary
        </Tag>
        <Tag kind="primary">
          <Icon style={{ marginRight: 8 }} />
          Primary
        </Tag>
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <Tag selected kind="lite">
          <Icon style={{ marginRight: 8 }} />
          Lite
        </Tag>
        <Tag selected kind="secondary">
          <Icon style={{ marginRight: 8 }} />
          Secondary
        </Tag>
        <Tag selected kind="primary">
          <Icon style={{ marginRight: 8 }} />
          Primary
        </Tag>
        <Tag kind="color" color="green">
          <Icon style={{ marginRight: 8 }} />
          Color
        </Tag>
      </div>
    </div>
  )
}
