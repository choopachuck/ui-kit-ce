import * as React from 'react'
import { List, ListItem, Divider } from '@v-uik/base'

export const BasicDivider = (): JSX.Element => {
  return (
    <List style={{ width: 250 }}>
      <ListItem>Option 1</ListItem>
      <Divider as="li" />
      <ListItem>Option 1</ListItem>
      <Divider as="li" />
      <ListItem>Option 1</ListItem>
      <Divider as="li" />
      <ListItem>Option 1</ListItem>
    </List>
  )
}

export default BasicDivider
