import * as React from 'react'
import { Avatar } from '@v-uik/base'

export const AvatarKinds = () => {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Avatar kind="circle">UN</Avatar>
      <Avatar kind="rounded">UN</Avatar>
      <Avatar kind="square">UN</Avatar>
    </div>
  )
}
