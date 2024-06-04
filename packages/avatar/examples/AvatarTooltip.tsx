import * as React from 'react'
import { Avatar, Tooltip, Text, createUseStyles } from '@v-uik/base'
import { avatarImage02 } from './assets'

const useStyles = createUseStyles((theme) => ({
  caption: {
    color: theme.sys.color.neutralAlpha,
  },
  status: {
    color: theme.sys.color.errorAlpha,
  },
}))

export const AvatarTooltip = () => {
  const classes = useStyles()

  return (
    <div style={{ display: 'flex', gap: 8, height: 200, alignItems: 'center' }}>
      <Tooltip dropdownProps={{ placement: 'top', content: 'User Name' }}>
        <Avatar>UN</Avatar>
      </Tooltip>
      <Tooltip
        dropdownProps={{
          placement: 'top',
          content: (
            <div>
              <Text>User Name</Text>
              <Text kind="caption" className={classes.caption}>
                Administrator
              </Text>
            </div>
          ),
        }}
      >
        <Avatar src={avatarImage02} alt="User Name" />
      </Tooltip>
    </div>
  )
}
