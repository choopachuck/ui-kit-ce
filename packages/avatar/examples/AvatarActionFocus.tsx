import * as React from 'react'
import { Avatar, createUseStyles } from '@v-uik/base'
import { avatarImage01, avatarImage02, avatarImage03 } from './assets'

export const useStyles = createUseStyles((theme) => ({
  root: {
    position: 'relative',
    '&::after': {
      content: '""',
    },
    '&:focus-visible': {
      boxShadow: `0 0 0 2px ${theme.comp.button.colorShadowFocus}`,
      outline: 'none',
      '&::after': {
        borderWidth: theme.shape.borderWidth,
        borderColor: theme.comp.button.colorBorderFocus,
        borderStyle: 'solid',
        height: 'calc(100% - 2px)',
        width: 'calc(100% - 2px)',
        borderRadius: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      },
    },
  },
}))

export const AvatarActionFocus = () => {
  const classes = useStyles()

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Avatar
        classes={{ root: classes.root }}
        src={avatarImage01}
        alt="User Name 01"
        tabIndex={0}
      />
      <Avatar
        classes={{ root: classes.root }}
        src={avatarImage02}
        alt="User Name 02"
        tabIndex={0}
      />
      <Avatar
        classes={{ root: classes.root }}
        src={avatarImage03}
        alt="User Name 03"
        tabIndex={0}
      />
    </div>
  )
}
