'use client'

import React from 'react'
import { Avatar } from '../Avatar'
import { AvatarGroupProps } from '../AvatarGroup'
import { AvatarProps, AvatarGroupSizeType } from '../types'
import { AvatarGroupSize } from '../constants'
import { AvatarClasses } from '../classes'

export type AvatarGroupExtraProps = React.PropsWithChildren<
  Omit<AvatarGroupProps, 'components' | 'items'>
> & {
  /**
   * Массив свойств аватаров, которые были отрендерены в группе
   */
  visibleItems?: AvatarProps[]
  /**
   * Массив свойств аватаров, которые не были отрендерены в группе
   */
  hiddenItems?: AvatarProps[]
  /**
   * Свойства для компонента Avatar
   */
  avatarProps?: Pick<AvatarProps, 'size' | 'kind' | 'style'> & {
    classes?: Pick<AvatarClasses, 'root'>
  }
}

export const AvatarGroupExtra = React.memo(
  ({ children, avatarProps }: AvatarGroupExtraProps) => {
    const hasSize = avatarProps?.size
      ? !!AvatarGroupSize[avatarProps.size as AvatarGroupSizeType]
      : false

    return (
      <Avatar
        {...avatarProps}
        size={hasSize ? avatarProps?.size : AvatarGroupSize.md}
      >
        {children}
      </Avatar>
    )
  }
)
