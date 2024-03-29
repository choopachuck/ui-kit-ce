import * as React from 'react'
import { Avatar } from '@v-uik/base'
import {
  avatarImage01,
  avatarImage01W640,
  avatarImage01W920,
  avatarImage01W1280,
  avatarImage02,
  avatarImage02W640,
  avatarImage02W920,
  avatarImage02W1280,
  avatarImage03,
  avatarImage03W640,
  avatarImage03W920,
  avatarImage03W1280,
} from './assets'

const srcSet01 = `${avatarImage01W640} 640w, ${avatarImage01W920} 920w, ${avatarImage01W1280} 1280w`
const sizes01 = '(max-width: 720px) 640w, (max-width: 1200px) 920w, 1280w'

const srcSet02 = `${avatarImage02W640} 640w, ${avatarImage02W920} 920w, ${avatarImage02W1280} 1280w`
const sizes02 = '(max-width: 720px) 640w, (max-width: 1200px) 920w, 1280w'

const srcSet03 = `${avatarImage03W640} 640w, ${avatarImage03W920} 920w, ${avatarImage03W1280} 1280w`
const sizes03 = '(max-width: 720px) 640w, (max-width: 1200px) 920w, 1280w'

export const AvatarSrcSet = () => {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Avatar
        src={avatarImage01}
        alt="User Name 01"
        imgProps={{ srcSet: srcSet01, sizes: sizes01 }}
      />
      <Avatar
        src={avatarImage02}
        alt="User Name 02"
        imgProps={{ srcSet: srcSet02, sizes: sizes02 }}
      />
      <Avatar
        src={avatarImage03}
        alt="User Name 03"
        imgProps={{ srcSet: srcSet03, sizes: sizes03 }}
      />
    </div>
  )
}
