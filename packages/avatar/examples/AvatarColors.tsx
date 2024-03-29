import * as React from 'react'
import { Avatar, light } from '@v-uik/base'

export const AvatarColors = () => {
  return (
    <div style={{ display: 'grid', gridRowGap: 40 }}>
      <div style={{ display: 'flex', gap: 40 }}>
        <Avatar color={light.ref.palette.red50}>UN</Avatar>
        <Avatar color={light.ref.palette.orange50}>UN</Avatar>
        <Avatar color={light.ref.palette.herbal50}>UN</Avatar>
        <Avatar color={light.ref.palette.arctic50}>UN</Avatar>
        <Avatar color={light.ref.palette.skyBlue50}>UN</Avatar>
      </div>
      <div style={{ display: 'flex', gap: 40 }}>
        <Avatar color="rgba(28, 105, 248, 1)">UN</Avatar>
        <Avatar color="rgba(167, 51, 244, 1)">UN</Avatar>
        <Avatar color="rgba(202, 39, 175, 1)">UN</Avatar>
        <Avatar color="rgba(226, 5, 93, 1)">UN</Avatar>
        <Avatar color="rgba(114, 114, 114, 1)">UN</Avatar>
      </div>
      <div style={{ display: 'flex', gap: 40 }}>
        <Avatar color="linear-gradient(227.01deg, #053DA3 13.15%, #0796F5 84.48%)">
          UN
        </Avatar>
      </div>
    </div>
  )
}
