import * as React from 'react'
import { Avatar } from '@v-uik/base'
import { avatarImage01, avatarImage02, avatarImage03 } from './assets'

export const AvatarBase = () => {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Avatar src={avatarImage01} alt="User Name 01" />
      <Avatar src={avatarImage02} alt="User Name 02" />
      <Avatar src={avatarImage03} alt="User Name 03" />
    </div>
  )
}
