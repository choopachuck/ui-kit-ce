import * as React from 'react'
import { Avatar, Badge, createUseStyles } from '@v-uik/base'
import { avatarImage01, avatarImage02 } from './assets'

const useStyles = createUseStyles({
  badge: {
    padding: 0,
  },
})

export const AvatarUnion = () => {
  const classes = useStyles()

  return (
    <Badge
      status="info"
      content={<Avatar size="sm" src={avatarImage02} alt="User Name 02" />}
      position={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      horizontalOffset={16}
      verticalOffset={16}
      classes={{ badge: classes.badge }}
    >
      <Avatar size={96} src={avatarImage01} alt="User Name 01" />
    </Badge>
  )
}
