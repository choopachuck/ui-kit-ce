import React from 'react'
import { List, ListItem, createUseStyles } from '@v-uik/base'
import { Icon } from './assets/Icon'
import { CheckIcon } from './assets/CheckIcon'

const useStyles = createUseStyles({
  multilineDisplay: {
    textOverflow: 'clip',
    whiteSpace: 'pre-line',
  },
})

export const MultilineDisplay = (): JSX.Element => {
  const classesList = useStyles()

  const [selected, setSelected] = React.useState(1)

  return (
    <List interactive stripe style={{ width: 286 }}>
      <ListItem
        classes={{
          text: classesList.multilineDisplay,
        }}
        selected={selected === 1}
        prefix={<Icon />}
        suffix={<CheckIcon isSelected={selected === 1} />}
        onClick={() => setSelected(1)}
      >
        Very very very very very very very long option 1
      </ListItem>
      <ListItem
        classes={{
          text: classesList.multilineDisplay,
        }}
        selected={selected === 2}
        prefix={<Icon />}
        suffix={<CheckIcon isSelected={selected === 2} />}
        onClick={() => setSelected(2)}
      >
        Very very very very very very very long option 2
      </ListItem>
      <ListItem
        disabled
        classes={{
          text: classesList.multilineDisplay,
        }}
        selected={selected === 3}
        prefix={<Icon />}
        suffix={<CheckIcon isSelected={selected === 3} />}
        onClick={() => setSelected(3)}
      >
        Very very very very very very very long option 3
      </ListItem>
      <ListItem
        classes={{
          text: classesList.multilineDisplay,
        }}
        selected={selected === 4}
        prefix={<Icon />}
        suffix={<CheckIcon isSelected={selected === 4} />}
        onClick={() => setSelected(4)}
      >
        Very very very very very very very long option 4
      </ListItem>
    </List>
  )
}
