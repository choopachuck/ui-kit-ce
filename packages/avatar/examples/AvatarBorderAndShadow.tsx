import * as React from 'react'
import { Avatar, Text } from '@v-uik/base'
import { avatarImage06 } from './assets'

export const AvatarBorderAndShadow = () => {
  return (
    <div style={{ display: 'grid', gridRowGap: 16 }}>
      <Text>Аватар с обводкой</Text>
      <div style={{ display: 'flex', gap: 8 }}>
        <Avatar withBorder src={avatarImage06} alt="User Nam" />
      </div>
      <Text>Аватар с тенью</Text>
      <div style={{ display: 'flex', gap: 8 }}>
        <Avatar withShadow src={avatarImage06} alt="User Name" />
      </div>
    </div>
  )
}
