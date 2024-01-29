import React from 'react'
import { Tag, Badge } from '@v-uik/base'

export const Tags: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxWidth: '360px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
        }}
      >
        <Badge style={{ marginRight: '12px' }} content="sm">
          <Tag kind="lite" size="sm">
            lite
          </Tag>
        </Badge>
        <Tag kind="primary" size="sm">
          primary
        </Tag>
        <Tag selected kind="primary" size="sm">
          selected
        </Tag>
        <Tag disabled kind="primary" size="sm">
          disabled
        </Tag>
        <Tag kind="secondary" size="sm">
          secondary
        </Tag>
        <Tag kind="color" color="red" size="sm">
          red
        </Tag>
        <Tag kind="color" color="yellow" size="sm">
          yellow
        </Tag>
        <Tag kind="color" color="green" size="sm">
          green
        </Tag>
        <Tag kind="color" color="azure" size="sm">
          azure
        </Tag>
        <Tag kind="color" color="blue" size="sm">
          blue
        </Tag>
        <Tag kind="color" color="violet" size="sm">
          violet
        </Tag>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          maxWidth: '360px',
        }}
      >
        <Badge style={{ marginRight: '12px' }} content="md">
          <Tag kind="lite" size="md">
            lite
          </Tag>
        </Badge>
        <Tag kind="primary" size="md">
          primary
        </Tag>
        <Tag selected kind="primary" size="md">
          selected
        </Tag>
        <Tag disabled kind="primary" size="md">
          disabled
        </Tag>
        <Tag kind="secondary" size="md">
          secondary
        </Tag>
        <Tag kind="color" color="red" size="md">
          red
        </Tag>
        <Tag kind="color" color="yellow" size="md">
          yellow
        </Tag>
        <Tag kind="color" color="green" size="md">
          green
        </Tag>
        <Tag kind="color" color="azure" size="md">
          azure
        </Tag>
        <Tag kind="color" color="blue" size="md">
          blue
        </Tag>
        <Tag kind="color" color="violet" size="md">
          violet
        </Tag>
      </div>
    </div>
  )
}
