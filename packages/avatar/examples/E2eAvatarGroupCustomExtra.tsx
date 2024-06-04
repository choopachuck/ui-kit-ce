/* eslint-disable react/prop-types */

import { Avatar, AvatarGroup } from '@v-uik/base'
import React from 'react'

export const E2eAvatarGroupCustomExtra: React.FC = () => (
  <AvatarGroup
    showExtra
    components={{
      Extra: ({ avatarProps }) => <Avatar {...avatarProps}>+</Avatar>,
    }}
    items={[
      {
        children: 'UN',
      },
      {
        children: 'UN',
      },
      {
        children: 'UN',
      },
    ]}
  />
)
