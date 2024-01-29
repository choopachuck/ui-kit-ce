import React from 'react'
import { Button, Badge } from '@v-uik/base'

export const Buttons: React.FC = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          maxWidth: '460px',
        }}
      >
        <Badge content="sm">
          <Button size="sm">badge</Button>
        </Badge>
        <Button size="sm" color="primary">
          primary
        </Button>
        <Button size="sm" color="secondary">
          secondary
        </Button>
        <Button size="sm" color="error">
          error
        </Button>
        <Button disabled size="sm" color="primary">
          disabled
        </Button>
        <Button size="sm" kind="outlined" color="primary">
          primary
        </Button>
        <Button size="sm" kind="outlined" color="secondary">
          secondary
        </Button>
        <Button size="sm" kind="outlined" color="error">
          error
        </Button>
        <Button size="sm" kind="ghost" color="primary">
          primary
        </Button>
        <Button size="sm" kind="ghost" color="error">
          error
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          maxWidth: '460px',
        }}
      >
        <Badge content="md">
          <Button size="md">badge</Button>
        </Badge>
        <Button size="md" color="primary">
          primary
        </Button>
        <Button size="md" color="secondary">
          secondary
        </Button>
        <Button size="md" color="error">
          error
        </Button>
        <Button disabled size="md" color="primary">
          disabled
        </Button>
        <Button size="md" kind="outlined" color="primary">
          primary
        </Button>
        <Button size="md" kind="outlined" color="secondary">
          secondary
        </Button>
        <Button size="md" kind="outlined" color="error">
          error
        </Button>
        <Button size="md" kind="ghost" color="primary">
          primary
        </Button>
        <Button size="md" kind="ghost" color="error">
          error
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          maxWidth: '460px',
        }}
      >
        <Badge content="lg">
          <Button size="lg">badge</Button>
        </Badge>
        <Button size="lg" color="primary">
          primary
        </Button>
        <Button size="lg" color="secondary">
          secondary
        </Button>
        <Button size="lg" color="error">
          error
        </Button>
        <Button disabled size="lg" color="primary">
          disabled
        </Button>
        <Button size="lg" kind="outlined" color="primary">
          primary
        </Button>
        <Button size="lg" kind="outlined" color="secondary">
          secondary
        </Button>
        <Button size="lg" kind="outlined" color="error">
          error
        </Button>
        <Button size="lg" kind="ghost" color="primary">
          primary
        </Button>
        <Button size="lg" kind="ghost" color="error">
          error
        </Button>
      </div>
    </>
  )
}
