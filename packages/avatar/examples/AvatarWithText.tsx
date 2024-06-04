import * as React from 'react'
import { Avatar, Badge, Text, clsx, createUseStyles } from '@v-uik/base'

const useStyles = createUseStyles((theme) => ({
  badge: {
    padding: 0,
  },
  container: {
    display: 'flex',
  },
  containerRow: {
    flexDirection: 'row',
  },
  containerColumn: {
    flexDirection: 'column',
  },
  containerCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  textWrapperRight: {
    textAlign: 'right',
    marginRight: 8,
  },
  textWrapperLeft: {
    textAlign: 'left',
    marginLeft: 8,
  },
  textWrapperCenter: {
    textAlign: 'center',
    marginTop: 8,
  },
  captionBase: {
    color: theme.sys.color.onBackgroundMedium,
  },
  captionSuccess: {
    color: theme.sys.color.successAlpha,
  },
  containerSeparated: {
    borderLeft: `1px solid ${theme.sys.color.separationMinor}`,
    borderRight: `1px solid ${theme.sys.color.separationMinor}`,
    padding: [0, 32],
    margin: [0, 32],
  },
}))

const AvatarWithTextBase = () => {
  const classes = useStyles()

  return (
    <div className={clsx(classes.container, classes.containerRow)}>
      <div className={clsx(classes.textWrapper, classes.textWrapperRight)}>
        <Text kind="subtitle1">Username</Text>
        <Text kind="caption" className={classes.captionBase}>
          1000235
        </Text>
      </div>
      <div>
        <Avatar>UN</Avatar>
      </div>
    </div>
  )
}

const AvatarWithTextBadge = () => {
  const classes = useStyles()

  return (
    <div className={clsx(classes.container, classes.containerRow)}>
      <div>
        <Badge
          dot
          showZero
          status="success"
          position={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          horizontalOffset={5}
          verticalOffset={5}
          classes={{ badge: classes.badge }}
        >
          <Avatar>UN</Avatar>
        </Badge>
      </div>
      <div className={clsx(classes.textWrapper, classes.textWrapperLeft)}>
        <Text kind="subtitle1">Username</Text>
        <Text kind="caption" className={classes.captionSuccess}>
          online
        </Text>
      </div>
    </div>
  )
}

const AvatarWithTextBottom = () => {
  const classes = useStyles()

  return (
    <div
      className={clsx(
        classes.containerSeparated,
        classes.container,
        classes.containerColumn,
        classes.containerCenter
      )}
    >
      <div>
        <Avatar>UN</Avatar>
      </div>
      <div className={clsx(classes.textWrapper, classes.textWrapperCenter)}>
        <Text kind="subtitle1">Username</Text>
        <Text kind="caption" className={classes.captionBase}>
          Administrator
        </Text>
      </div>
    </div>
  )
}

export const AvatarWithText = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <AvatarWithTextBase />
      <AvatarWithTextBottom />
      <AvatarWithTextBadge />
    </div>
  )
}
