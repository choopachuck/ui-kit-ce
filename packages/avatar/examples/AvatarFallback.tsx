import * as React from 'react'
import { Avatar } from '@v-uik/base'
import { UserIcon, FallbackCustomIcon } from './assets'

export const AvatarFallback = () => {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Avatar icon={<UserIcon />} src="./broken-image.png" alt="User Name 01">
        U
      </Avatar>
      <Avatar src="./broken-image.png" alt="User Name 02">
        U
      </Avatar>
      <Avatar src="./broken-image.png" alt="User Name 03" />
      <Avatar src="./broken-image.png" fallback={<FallbackCustomIcon />} />
      <Avatar src="./broken-image.png" />
    </div>
  )
}
