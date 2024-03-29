import * as React from 'react'
import { Avatar, Badge, createUseStyles, clsx } from '@v-uik/base'
import { PlusIcon, PencilIcon, CrossIcon } from './assets'

const useStyles = createUseStyles((theme) => ({
  badge: {
    opacity: 1,
    height: 16,
    width: 16,
    padding: 0,
  },
  icon: {
    display: 'flex',
    '& svg': {
      height: '100%',
      width: '100%',
    },
  },
  crossBadge: {
    boxShadow: 'none',
    maxHeight: 'none',
    maxWidth: 'none',
    height: 'auto',
    width: 'auto',
  },
  iconLight: {
    color: theme.ref.palette.white,
  },
  iconDark: {
    color: theme.ref.palette.black,
  },
}))

const AvatarIndicatorPlus = () => {
  const classes = useStyles()

  return (
    <Badge
      status="info"
      content={
        <div className={clsx(classes.icon, classes.iconLight)}>
          <PlusIcon />
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

const AvatarIndicatorPencil = () => {
  const classes = useStyles()

  return (
    <Badge
      status="disabled"
      content={
        <div className={clsx(classes.icon, classes.iconDark)}>
          <PencilIcon />
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

const AvatarIndicatorCross = () => {
  const classes = useStyles()

  return (
    <Badge
      status="disabled"
      content={
        <div className={clsx(classes.icon, classes.iconDark)}>
          <CrossIcon />
        </div>
      }
      position={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      horizontalOffset={5}
      verticalOffset={5}
      classes={{
        badge: clsx(classes.badge, classes.crossBadge),
      }}
    >
      <Avatar />
    </Badge>
  )
}

const AvatarIndicatorContent = () => {
  const classes = useStyles()

  return (
    <Badge
      status="error"
      content={1}
      position={{
        vertical: 'top',
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

export const AvatarActionIndicators = () => {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <AvatarIndicatorContent />
      <AvatarIndicatorCross />
      <AvatarIndicatorPlus />
      <AvatarIndicatorPencil />
    </div>
  )
}
