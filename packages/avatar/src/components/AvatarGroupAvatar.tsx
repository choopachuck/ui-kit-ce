import React from 'react'
import { Avatar } from '../Avatar'
import { AvatarProps } from '../types'

const _AvatarGroupAvatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (props, ref) => {
    return <Avatar {...props} ref={ref} />
  }
)

export const AvatarGroupAvatar = React.memo(_AvatarGroupAvatar)
