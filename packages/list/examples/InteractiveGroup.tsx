import * as React from 'react'
import { List, ListItem, ListItemGroup } from '@v-uik/base'

import { CheckIcon } from './assets/CheckIcon'

export const InteractiveGroup = (): JSX.Element => {
  const [selected, setSelected] = React.useState(1)

  return (
    <List interactive>
      <ListItemGroup label="Group 1">
        <ListItem
          selected={selected === 1}
          suffix={<CheckIcon isSelected={selected === 1} />}
          onClick={() => setSelected(1)}
        >
          Option 1
        </ListItem>
        <ListItem
          selected={selected === 2}
          suffix={<CheckIcon isSelected={selected === 2} />}
          onClick={() => setSelected(2)}
        >
          Option 2
        </ListItem>
      </ListItemGroup>
      <ListItemGroup label="Group 2">
        <ListItem
          selected={selected === 3}
          suffix={<CheckIcon isSelected={selected === 3} />}
          onClick={() => setSelected(3)}
        >
          Option 3
        </ListItem>
        <ListItem
          selected={selected === 4}
          suffix={<CheckIcon isSelected={selected === 4} />}
          onClick={() => setSelected(4)}
        >
          Option 4
        </ListItem>
      </ListItemGroup>
    </List>
  )
}
