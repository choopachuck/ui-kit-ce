import * as React from 'react'
import { Avatar, Badge, createUseStyles, clsx } from '@v-uik/base'
import {
  avatarImage01,
  avatarImage02,
  avatarImage03,
  CheckIconFilled,
  RadioCheckedIcon,
  RadioIcon,
} from './assets'

const useStyles = createUseStyles((theme) => ({
  avatarContainer: {
    cursor: 'pointer',
    position: 'relative',
    height: 40,
    width: 40,
    borderRadius: '100%',
    '&::after': {
      content: '""',
    },
    '&:not($avatarContainerSelected) $badge:not($badgeVisible)': {
      opacity: 0,
    },
    '&:focus-visible, &$avatarContainerSelected': {
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
    '& $root': {
      position: 'relative',
    },
    '&:hover $avatar': {
      '&::after': {
        content: '""',
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: '100%',
      },
    },
    '&:hover $avatar::after': {
      backgroundColor: theme.sys.color.primaryAlpha,
      opacity: 0.4,
    },
    '&:active $avatar::after': {
      backgroundColor: theme.sys.color.primaryAlpha,
      opacity: 0.6,
    },
  },
  avatarContainerSelected: {
    '& $badge': {
      opacity: 1,
    },
  },
  badge: {
    height: 16,
    width: 16,
    padding: 0,
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
  icon: {
    display: 'flex',
    '& svg': {
      height: '100%',
      width: '100%',
    },
  },
  root: {},
  avatarIconContainer: {},
  badgeVisible: {},
}))

const avatarItemsCheckbox = [
  {
    id: 1,
    src: avatarImage01,
    alt: 'User Name 01',
  },
  {
    id: 2,
    src: avatarImage02,
    alt: 'User Name 02',
  },
  {
    id: 3,
    src: avatarImage03,
    alt: 'User Name 03',
  },
]

const avatarItemsRadio = [
  {
    id: 1,
    src: avatarImage01,
    alt: 'User Name 01',
  },
  {
    id: 2,
    src: avatarImage02,
    alt: 'User Name 02',
  },
  {
    id: 3,
    src: avatarImage03,
    alt: 'User Name 03',
  },
]

type AvatarActionSelectBaseProps = {
  onClick: () => void
  isSelected: boolean
  src: string
  alt: string
  icon?: React.ReactNode
  showBadge?: boolean
}

const AvatarActionSelectBase = ({
  isSelected,
  onClick,
  src,
  alt,
  icon = <CheckIconFilled />,
  showBadge,
}: AvatarActionSelectBaseProps) => {
  const classes = useStyles()

  return (
    <div
      className={clsx(classes.avatarContainer, {
        [classes.avatarContainerSelected]: isSelected,
      })}
      tabIndex={0}
      onClick={onClick}
    >
      <Badge
        status="info"
        content={<div className={classes.icon}>{icon}</div>}
        position={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        horizontalOffset={5}
        verticalOffset={5}
        classes={{
          badge: clsx(classes.badge, { [classes.badgeVisible]: showBadge }),
        }}
      >
        <Avatar classes={{ root: classes.root }} src={src} alt={alt} />
      </Badge>
    </div>
  )
}

const AvatarActionSelectRadio = ({
  isSelected,
  ...rest
}: AvatarActionSelectBaseProps) => {
  return (
    <AvatarActionSelectBase
      {...rest}
      showBadge
      isSelected={isSelected}
      icon={isSelected ? <RadioCheckedIcon /> : <RadioIcon />}
    />
  )
}

export const AvatarActionSelect = () => {
  const [selectedAvatar, setSelectedAvatar] = React.useState(1)
  const [checkedAvatar, setCheckedAvatar] = React.useState<number[]>([1, 2])

  const makeHandleSetSelectedAvatar = (id: number) => () => {
    setSelectedAvatar(id)
  }

  const makeHandleCheckAvatar = (id: number) => () => {
    if (checkedAvatar.includes(id)) {
      setCheckedAvatar((prev) => prev.filter((v) => v !== id))
    } else {
      setCheckedAvatar((prev) => [...prev, id])
    }
  }

  return (
    <div style={{ display: 'grid', gridRowGap: 16 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {avatarItemsCheckbox.map(({ id, alt, src }) => (
          <AvatarActionSelectBase
            key={id}
            alt={alt}
            src={src}
            isSelected={checkedAvatar.includes(id)}
            onClick={makeHandleCheckAvatar(id)}
          />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {avatarItemsRadio.map(({ id, alt, src }) => (
          <AvatarActionSelectRadio
            key={id}
            alt={alt}
            src={src}
            isSelected={id === selectedAvatar}
            onClick={makeHandleSetSelectedAvatar(id)}
          />
        ))}
      </div>
    </div>
  )
}
