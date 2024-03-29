import { Avatar } from '@v-uik/base'
import React from 'react'
import { UserIcon } from './assets'

const avatarColor = '#027CAC'

export const E2eAvatarSizeWithIcon: React.FC = () => (
  <>
    <Avatar size="xs" color={avatarColor} icon={<UserIcon />} />
    <Avatar size="sm" color={avatarColor} icon={<UserIcon />} />
    <Avatar size="md" color={avatarColor} icon={<UserIcon />} />
    <Avatar size="lg" color={avatarColor} icon={<UserIcon />} />
    <Avatar size="xl" color={avatarColor} icon={<UserIcon />} />
  </>
)
