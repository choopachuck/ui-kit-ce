import * as React from 'react'
import { List, ListItem } from '@v-uik/base'

const items = [
  { children: 'первый элемент списка' },
  { children: 'второй элемент списка' },
  { children: 'третий элемент списка' },
]

export default () => {
  return (
    <List>
      {items.map((item, index) => (
        <ListItem key={`item_${index}`} {...item} />
      ))}
    </List>
  )
}
