import React from 'react'
import { List, ListItem } from '@v-uik/base'
import { Icon } from './assets/Icon'

export const Sizes = (): JSX.Element => {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <List size="sm">
        <ListItem prefix={<Icon />}>Option 1</ListItem>
        <ListItem prefix={<Icon />}>Option 2</ListItem>
        <ListItem prefix={<Icon />}>Option 3</ListItem>
      </List>
      <List size="md">
        <ListItem prefix={<Icon />}>Option 1</ListItem>
        <ListItem prefix={<Icon />}>Option 2</ListItem>
        <ListItem prefix={<Icon />}>Option 3</ListItem>
      </List>
      <List size="lg">
        <ListItem prefix={<Icon />}>Option 1</ListItem>
        <ListItem prefix={<Icon />}>Option 2</ListItem>
        <ListItem prefix={<Icon />}>Option 3</ListItem>
      </List>
    </div>
  )
}
