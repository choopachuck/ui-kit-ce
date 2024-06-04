import { Avatar } from '@v-uik/base'
import React from 'react'
import { FallbackCustomIcon } from './assets'

export const E2eAvatarCustomCallback: React.FC = () => (
  <Avatar fallback={<FallbackCustomIcon />} />
)
