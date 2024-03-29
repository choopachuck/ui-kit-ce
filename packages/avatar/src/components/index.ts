import { AvatarGroupExtra, AvatarGroupExtraProps } from './AvatarGroupExtra'
import { AvatarProps } from '../types'
import { AvatarGroupAvatar } from './AvatarGroupAvatar'

export type { AvatarGroupExtraProps }

export type AvatarGroupComponents = {
  Extra: React.ComponentType<AvatarGroupExtraProps>
  Avatar: React.ComponentType<AvatarProps>
}

export type AvatarGroupComponentsConfig = Partial<AvatarGroupComponents>

export const defaultAvatarGroupComponents = {
  Extra: AvatarGroupExtra,
  Avatar: AvatarGroupAvatar,
}

export type AvatarGroupComponentsGeneric = typeof defaultAvatarGroupComponents

export const getComponents = (
  componentProp?: AvatarGroupComponentsConfig | undefined
): AvatarGroupComponentsGeneric =>
  ({
    ...defaultAvatarGroupComponents,
    ...componentProp,
  } as AvatarGroupComponentsGeneric)
