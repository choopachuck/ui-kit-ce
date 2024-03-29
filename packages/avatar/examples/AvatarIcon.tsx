import * as React from 'react'
import { Avatar } from '@v-uik/base'
import { UserIcon, GearIcon } from './assets'

export const AvatarIcon = () => {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Avatar>
        <UserIcon />
      </Avatar>
      <Avatar icon={<GearIcon />} />
    </div>
  )
}
