import * as React from 'react'
import { Avatar, createUseStyles } from '@v-uik/base'
import { UserIcon, avatarImage01 } from './assets'

const useStyles = createUseStyles((theme) => ({
  disabled: {
    position: 'relative',
    color: theme.sys.color.disabledHigh,
    backgroundColor: theme.ref.palette.gray80,
    pointerEvents: 'none',
    '&::before': {
      content: '""',
      position: 'absolute',
      zIndex: 1,
      backgroundColor: theme.ref.palette.gray80,
      borderRadius: '100%',
      height: '100%',
      width: '100%',
      opacity: 0.4,
    },
  },
}))

export const AvatarDisabled = () => {
  const classes = useStyles()

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Avatar
        classes={{ root: classes.disabled }}
        src={avatarImage01}
        alt="User Name 01"
      />
      <Avatar classes={{ root: classes.disabled }} icon={<UserIcon />} />
      <Avatar classes={{ root: classes.disabled }}> UN </Avatar>
      <Avatar classes={{ root: classes.disabled }} />
    </div>
  )
}
