import * as React from 'react'
import { Avatar, Badge, createUseStyles } from '@v-uik/base'
import { avatarImage01, CameraIcon } from './assets'

const useOutlinedHoverStyles = createUseStyles((theme) => ({
  avatarContainer: {
    position: 'relative',
    display: 'flex',
    height: 40,
    width: 40,
    '&::after': {
      content: '""',
      borderRadius: '100%',
      borderWidth: 4,
      borderColor: 'transparent',
      borderStyle: 'solid',
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: -4,
      left: -4,
      cursor: 'pointer',
    },
    '&:hover::after, &:active::after': {
      borderColor: theme.sys.color.onBackgroundOverlayActive,
    },
    '&:active::after': {
      borderWidth: 6,
      top: -6,
      left: -6,
    },
  },
}))

const useContainedHoverStyles = createUseStyles((theme) => ({
  root: {
    position: 'relative',
    cursor: 'pointer',
    '&::after': {
      content: '""',
      position: 'absolute',
      height: '100%',
      width: '100%',
      borderRadius: '100%',
    },
    '&:hover::after': {
      backgroundColor: theme.sys.color.primaryAlpha,
      opacity: 0.4,
    },
    '&:active::after': {
      backgroundColor: theme.sys.color.primaryAlpha,
      opacity: 0.6,
    },
  },
}))

const useHoverWithIconStyles = createUseStyles((theme) => ({
  avatarContainer: {
    cursor: 'pointer',
    position: 'relative',
    height: 40,
    width: 40,
    color: theme.comp.avatar.colorText,
    '& $avatarIconContainer': {
      opacity: 0,
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    },
    '&:hover': {
      '& $avatarIconContainer': {
        opacity: 1,
      },
      '& $root::after': {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      },
    },
    '&:active': {
      '& $avatarIconContainer': {
        opacity: '0 !important',
      },
      '& $root::after': {
        backgroundColor: 'rgba(0, 0, 0, 0.6) !important',
      },
    },
    '& $root': {
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: '100%',
      },
    },
  },
  root: {},
  avatarIconContainer: {},
}))

const useResizeOnHoverStyles = createUseStyles({
  root: {
    cursor: 'pointer',
    overflow: 'hidden',
    '&:hover:not(:active)': {
      '& $image': {
        transform: 'scale(1.5)',
        background: 'red',
      },
    },
  },
  image: {
    transition: 'transform 0.1s ease-in-out',
  },
})

const useWithBadgeOnHoverStyles = createUseStyles(() => ({
  badgeRoot: {
    cursor: 'pointer',
    '&:hover:not(:active)': {
      '& $badge': {
        opacity: 1,
      },
    },
  },
  badge: {
    opacity: 0,
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
}))

const AvatarActionHoverOutlined = () => {
  const classes = useOutlinedHoverStyles()

  return (
    <div className={classes.avatarContainer}>
      <Avatar src={avatarImage01} alt="User Name" />
    </div>
  )
}

const AvatarActionHoverContained = () => {
  const classes = useContainedHoverStyles()

  return (
    <Avatar
      classes={{ root: classes.root }}
      src={avatarImage01}
      alt="User Name"
    />
  )
}

const AvatarActionHoverWithIcon = () => {
  const classes = useHoverWithIconStyles()

  return (
    <div className={classes.avatarContainer}>
      <Avatar
        classes={{ root: classes.root }}
        src={avatarImage01}
        alt="User Name"
      />
      <div className={classes.avatarIconContainer}>
        <CameraIcon />
      </div>
    </div>
  )
}

export const AvatarActionHoverResize = () => {
  const classes = useResizeOnHoverStyles()

  return (
    <Avatar
      classes={{
        root: classes.root,
        image: classes.image,
      }}
      src={avatarImage01}
      alt="User Name"
    />
  )
}

const AvatarActionHoverWithBadge = () => {
  const classes = useWithBadgeOnHoverStyles()

  return (
    <Badge
      status="info"
      content={
        <div className={classes.icon}>
          <CameraIcon />
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
        badgeRoot: classes.badgeRoot,
      }}
    >
      <Avatar src={avatarImage01} alt="User Name" />
    </Badge>
  )
}

export const AvatarActionHover = () => {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <AvatarActionHoverOutlined />
      <AvatarActionHoverContained />
      <AvatarActionHoverWithIcon />
      <AvatarActionHoverResize />
      <AvatarActionHoverWithBadge />
    </div>
  )
}
