import * as React from 'react'
import { List, ListItem } from '@v-uik/base'
import { Icon } from './assets/Icon'
import { CheckIcon } from './assets/CheckIcon'

export const Interactive = (): React.ReactElement => {
  const [selected, setSelected] = React.useState(1)

  return (
    <List interactive stripe style={{ width: 250 }}>
      <ListItem
        selected={selected === 1}
        prefix={<Icon />}
        suffix={<CheckIcon isSelected={selected === 1} />}
        onClick={() => setSelected(1)}
      >
        Option 1
      </ListItem>
      <ListItem
        selected={selected === 2}
        prefix={<Icon />}
        suffix={<CheckIcon isSelected={selected === 2} />}
        onClick={() => setSelected(2)}
      >
        Option 2
      </ListItem>
      <ListItem
        disabled
        selected={selected === 3}
        prefix={<Icon />}
        suffix={<CheckIcon isSelected={selected === 3} />}
        onClick={() => setSelected(3)}
      >
        Option 3
      </ListItem>
      <ListItem
        selected={selected === 4}
        prefix={<Icon />}
        suffix={<CheckIcon isSelected={selected === 4} />}
        onClick={() => setSelected(4)}
      >
        Option 4
      </ListItem>
    </List>
  )
}
