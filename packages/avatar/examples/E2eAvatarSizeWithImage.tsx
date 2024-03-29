import { Avatar } from '@v-uik/base'
import React from 'react'
import { avatarImage01 } from './assets'

export const E2eAvatarSizeWithImage: React.FC = () => (
  <>
    <Avatar size="xs" src={avatarImage01} />
    <Avatar size="sm" src={avatarImage01} />
    <Avatar size="md" src={avatarImage01} />
    <Avatar size="lg" src={avatarImage01} />
    <Avatar size="xl" src={avatarImage01} />
  </>
)
