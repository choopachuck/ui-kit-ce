import * as React from 'react'
import { AvatarGroup, Text } from '@v-uik/base'
import { avatarImage06 } from './assets'

export const AvatarGroupBorderAndShadow = () => {
  return (
    <div style={{ display: 'grid', gridRowGap: 16 }}>
      <Text>Аватары с обводкой</Text>
      <div style={{ display: 'flex', gap: 8 }}>
        <AvatarGroup
          withBorder
          items={[
            { src: avatarImage06, alt: 'User Name 01' },
            { src: avatarImage06, alt: 'User Name 02' },
            { src: avatarImage06, alt: 'User Name 03' },
            { src: avatarImage06, alt: 'User Name 04' },
            { src: avatarImage06, alt: 'User Name 05' },
          ]}
        />
      </div>
      <Text>Аватары с тенью</Text>
      <AvatarGroup
        withShadow
        items={[
          { src: avatarImage06, alt: 'User Name 01' },
          { src: avatarImage06, alt: 'User Name 02' },
          { src: avatarImage06, alt: 'User Name 03' },
          { src: avatarImage06, alt: 'User Name 04' },
          { src: avatarImage06, alt: 'User Name 05' },
        ]}
      />
    </div>
  )
}
