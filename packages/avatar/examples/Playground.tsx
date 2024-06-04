import * as React from 'react'
import { Avatar, AvatarProps, AvatarSizeType } from '@v-uik/base'
import { UserIcon, avatarImage01 } from './assets'

export type PlaygroundProps = Omit<
  AvatarProps,
  'imgProps' | 'classes' | 'size' | 'ref'
> & {
  showIcon?: boolean
  showImage?: boolean
  size?: AvatarSizeType
  sizeCustom?: string
}

export const Playground = ({
  showIcon,
  showImage,
  src,
  children,
  size,
  sizeCustom,
  ...rest
}: PlaygroundProps): React.ReactElement => {
  return (
    <div style={{ minHeight: 64, display: 'flex', alignItems: 'center' }}>
      <Avatar
        {...rest}
        size={sizeCustom ? parseFloat(sizeCustom) : size}
        src={showImage ? avatarImage01 : undefined}
        icon={showIcon ? <UserIcon /> : null}
      >
        {children}
      </Avatar>
    </div>
  )
}
