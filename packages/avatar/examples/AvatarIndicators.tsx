import * as React from 'react'
import { Avatar, Badge, createUseStyles, clsx } from '@v-uik/base'
import { LockIcon, BeachIcon } from './assets'

const useStyles = createUseStyles((theme) => ({
  badge: {
    opacity: 1,
    height: 16,
    width: 16,
    padding: 0,
  },
  icon: {
    height: 10,
    width: 10,
    display: 'flex',
    '& svg': {
      height: '100%',
      width: '100%',
    },
  },
  iconLight: {
    color: theme.ref.palette.white,
  },
  iconDark: {
    color: theme.ref.palette.black,
  },
  badgeDotOutlined: {
    '&::after': {
      content: '""',
      height: 5,
      width: 5,
      borderRadius: '100%',
      backgroundColor: theme.ref.palette.white,
      position: 'absolute',
    },
  },
  neutral: {
    backgroundColor: theme.ref.palette.black,
  },
}))

const AvatarIndicatorLock = () => {
  const classes = useStyles()

  return (
    <Badge
      status="neutral"
      content={
        <div className={classes.icon}>
          <LockIcon />
        </div>
      }
      position={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      horizontalOffset={5}
      verticalOffset={5}
      classes={{
        badge: classes.badge,
        neutral: classes.neutral,
      }}
    >
      <Avatar />
    </Badge>
  )
}

const AvatarIndicatorBeach = () => {
  const classes = useStyles()

  return (
    <Badge
      status="disabled"
      content={
        <div className={clsx(classes.icon, classes.iconDark)}>
          <BeachIcon />
        </div>
      }
      position={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      horizontalOffset={5}
      verticalOffset={5}
      classes={{
        badge: classes.badge,
      }}
    >
      <Avatar />
    </Badge>
  )
}

const AvatarIndicatorStatusContained = () => {
  return (
    <Badge
      showZero
      dot
      status="info"
      position={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      horizontalOffset={5}
      verticalOffset={5}
    >
      <Avatar />
    </Badge>
  )
}

const AvatarIndicatorStatusOutlined = () => {
  const classes = useStyles()

  return (
    <Badge
      showZero
      dot
      status="info"
      position={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      horizontalOffset={5}
      verticalOffset={5}
      classes={{
        badge: classes.badgeDotOutlined,
      }}
    >
      <Avatar />
    </Badge>
  )
}

export const AvatarIndicators = () => {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <AvatarIndicatorStatusContained />
      <AvatarIndicatorStatusOutlined />
      <AvatarIndicatorLock />
      <AvatarIndicatorBeach />
    </div>
  )
}
