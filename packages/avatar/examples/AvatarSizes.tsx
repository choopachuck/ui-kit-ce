import * as React from 'react'
import { Avatar } from '@v-uik/base'
import { avatarImage01, UserIcon } from './assets'

export const AvatarSizes = () => {
  return (
    <div style={{ display: 'grid', gridRowGap: 16 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Avatar src={avatarImage01} alt="User Name" size="xs" />
        <Avatar src={avatarImage01} alt="User Name" size="sm" />
        <Avatar src={avatarImage01} alt="User Name" size="md" />
        <Avatar src={avatarImage01} alt="User Name" size="lg" />
        <Avatar src={avatarImage01} alt="User Name" size="xl" />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Avatar size="xs">UN</Avatar>
        <Avatar size="sm">UN</Avatar>
        <Avatar size="md">UN</Avatar>
        <Avatar size="lg">UN</Avatar>
        <Avatar size="xl">UN</Avatar>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Avatar icon={<UserIcon />} size="xs" />
        <Avatar icon={<UserIcon />} size="sm" />
        <Avatar icon={<UserIcon />} size="md" />
        <Avatar icon={<UserIcon />} size="lg" />
        <Avatar icon={<UserIcon />} size="xl" />
      </div>
    </div>
  )
}
