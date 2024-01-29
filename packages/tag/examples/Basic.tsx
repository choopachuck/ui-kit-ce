import * as React from 'react'
import { Tag } from '@v-uik/base'
import { Icon } from './assets/Icon'

type TValues = 'first' | 'second' | 'third'

export const Basic = (): React.ReactElement => {
  const [selected, setSelected] = React.useState<Record<TValues, boolean>>({
    first: false,
    second: false,
    third: true,
  })

  const array: Array<TValues> = ['first', 'second', 'third']

  const kinds: {
    [key in TValues]: 'lite' | 'secondary' | 'primary'
  } = {
    first: 'lite',
    second: 'secondary',
    third: 'primary',
  }

  const handleToggle = (field: TValues) => () => {
    setSelected({ ...selected, [field]: !selected[field] })
  }

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {array.map((item) => (
        <Tag
          key={item}
          kind={kinds[item]}
          selected={selected[item]}
          aria-label={
            selected[item]
              ? 'На нажатие Backspace элемент удалаяется'
              : undefined
          }
          onDelete={selected[item] ? handleToggle(item) : undefined}
          onClick={handleToggle(item)}
        >
          <Icon style={{ marginRight: 8 }} />
          {selected[item] ? 'Delete me' : 'Click me'}
        </Tag>
      ))}
    </div>
  )
}
