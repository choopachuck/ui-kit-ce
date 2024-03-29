import * as React from 'react'
import {
  Avatar,
  AvatarGroup,
  AvatarGroupExtraProps,
  DropdownMenu,
  DropdownMenuItem,
  createUseStyles,
  clsx,
} from '@v-uik/base'
import {
  avatarImage01,
  avatarImage02,
  avatarImage03,
  avatarImage04,
  avatarImage05,
} from './assets'

const useStyles = createUseStyles((theme) => ({
  avatarExtraRoot: {
    cursor: 'pointer',
  },
  text: {
    display: 'flex',
  },
  avatarItemsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  listItem: {
    pointerEvents: 'none',
  },
  listItemVisibleLast: {
    borderBottom: `1px solid ${theme.sys.color.separationMinor}`,
  },
}))

const items = [
  {
    alt: 'User Name 01',
    src: avatarImage01,
  },
  {
    alt: 'User Name 02',
    src: avatarImage02,
  },
  {
    alt: 'User Name 03',
    src: avatarImage03,
  },
  {
    alt: 'User Name 04',
    src: avatarImage04,
  },
  {
    alt: 'User Name 05',
    src: avatarImage05,
  },
  {
    alt: 'User Name 06',
    src: avatarImage01,
  },
  {
    alt: 'User Name 07',
    src: avatarImage01,
  },
  {
    alt: 'User Name 08',
    src: avatarImage02,
  },
  {
    alt: 'User Name 09',
    src: avatarImage03,
  },
  {
    alt: 'User Name 10',
    src: avatarImage04,
  },
]

const Extra = ({
  visibleItems = [],
  hiddenItems = [],
  avatarProps,
}: AvatarGroupExtraProps) => {
  const classes = useStyles()

  const content = [...visibleItems, ...hiddenItems]?.map(
    ({ alt, src }, index) => (
      <DropdownMenuItem
        key={index}
        classes={{
          text: classes.text,
          listItem: clsx(classes.listItem, {
            [classes.listItemVisibleLast]: index === visibleItems.length - 1,
          }),
        }}
      >
        <div className={classes.avatarItemsContainer}>
          <Avatar alt={alt} src={src} size="xs" />
          <div>{alt}</div>
        </div>
      </DropdownMenuItem>
    )
  )

  return (
    <DropdownMenu content={content} action="click">
      <Avatar
        {...avatarProps}
        classes={{
          ...avatarProps?.classes,
          root: clsx(avatarProps?.classes?.root, classes.avatarExtraRoot),
        }}
      >
        +{hiddenItems?.length}
      </Avatar>
    </DropdownMenu>
  )
}

export const AvatarGroupDropdown = () => {
  return <AvatarGroup max={3} components={{ Extra }} items={items} />
}
