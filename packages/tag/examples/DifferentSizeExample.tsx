import React from 'react'
import { Tag } from '@v-uik/base'
import { Icon } from './assets/Icon'

export const DifferentSizeExample = (): JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Tag selected size="xs" kind="lite">
          <Icon style={{ marginRight: 4 }} />
          Extra Small
        </Tag>
        <Tag selected size="sm" kind="lite">
          <Icon style={{ marginRight: 4 }} />
          Small
        </Tag>
        <Tag selected size="md" kind="lite">
          <Icon style={{ marginRight: 8 }} />
          Medium
        </Tag>
        <Tag selected size="lg" kind="lite">
          <Icon style={{ marginRight: 8 }} />
          Large
        </Tag>
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Tag selected size="xs" kind="secondary">
          <Icon style={{ marginRight: 4 }} />
          Extra Small
        </Tag>
        <Tag selected size="sm" kind="secondary">
          <Icon style={{ marginRight: 4 }} />
          Small
        </Tag>
        <Tag selected size="md" kind="secondary">
          <Icon style={{ marginRight: 8 }} />
          Medium
        </Tag>
        <Tag selected size="lg" kind="secondary">
          <Icon style={{ marginRight: 8 }} />
          Large
        </Tag>
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Tag selected size="xs" kind="primary">
          <Icon style={{ marginRight: 4 }} />
          Extra Small
        </Tag>
        <Tag selected size="sm" kind="primary">
          <Icon style={{ marginRight: 4 }} />
          Small
        </Tag>
        <Tag selected size="md" kind="primary">
          <Icon style={{ marginRight: 8 }} />
          Medium
        </Tag>
        <Tag selected size="lg" kind="primary">
          <Icon style={{ marginRight: 8 }} />
          Large
        </Tag>
      </div>
    </div>
  )
}
