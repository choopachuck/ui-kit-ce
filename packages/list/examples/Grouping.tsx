import * as React from 'react'
import { List, ListItem, ListItemGroup } from '@v-uik/base'

export const Grouping = (): JSX.Element => {
  return (
    <List>
      <ListItemGroup label="Group 1">
        <ListItem>Option 1</ListItem>
        <ListItem>Option 2</ListItem>
      </ListItemGroup>
      <ListItemGroup label="Group 2">
        <ListItem>Option 1</ListItem>
        <ListItem>Option 2</ListItem>
      </ListItemGroup>
    </List>
  )
}
