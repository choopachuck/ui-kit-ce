import * as React from 'react'
import { Avatar } from '@v-uik/base'
import { avatarImage01 } from './assets'

export const AvatarCustomSize = () => {
  return (
    <div style={{ display: 'flex', gap: 20 }}>
      <Avatar src={avatarImage01} alt="User Name" size={16} />
      <Avatar src={avatarImage01} alt="User Name" size={96} />
      <Avatar src={avatarImage01} alt="User Name" size={128} />
    </div>
  )
}
