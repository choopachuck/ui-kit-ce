import * as React from 'react'
import { AvatarGroup, Avatar, AvatarProps, Tooltip } from '@v-uik/base'
import {
  avatarImage01,
  avatarImage02,
  avatarImage03,
  avatarImage04,
  avatarImage05,
} from './assets'

const CustomAvatar: React.FC<AvatarProps> = (props) => {
  return (
    <Tooltip dropdownProps={{ placement: 'top', content: props.alt }}>
      <Avatar {...props} />
    </Tooltip>
  )
}

export const AvatarGroupTooltip = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: 115 }}>
      <AvatarGroup
        items={[
          { src: avatarImage01, alt: 'User Name 01' },
          { src: avatarImage02, alt: 'User Name 02' },
          { src: avatarImage03, alt: 'User Name 03' },
          { src: avatarImage04, alt: 'User Name 04' },
          { src: avatarImage05, alt: 'User Name 05' },
        ]}
        components={{ Avatar: CustomAvatar }}
      />
    </div>
  )
}
