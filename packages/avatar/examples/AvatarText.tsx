import * as React from 'react'
import { Avatar } from '@v-uik/base'

export const AvatarText = () => {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Avatar alt="User Name" />
      <Avatar>U</Avatar>
      <Avatar>Text</Avatar>
    </div>
  )
}
