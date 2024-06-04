import * as React from 'react'
import { AvatarGroup } from '@v-uik/base'
import {
  avatarImage01,
  avatarImage02,
  avatarImage03,
  avatarImage04,
  avatarImage05,
} from './assets'

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
]

export const AvatarGroupKind = () => {
  return (
    <div style={{ display: 'grid', gridRowGap: 16 }}>
      <AvatarGroup items={items} kind="circle" />
      <AvatarGroup items={items} kind="rounded" />
      <AvatarGroup items={items} kind="square" />
    </div>
  )
}
