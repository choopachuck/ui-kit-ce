import * as React from 'react'
import { createUseStyles, Tag, TagProps } from '@v-uik/base'

type TagWithIndicatorStylesProps = {
  indicatorColor: string
}

type TagWithIndicatorProps = TagProps & TagWithIndicatorStylesProps

const useStyles = createUseStyles({
  indicator: {
    width: 16,
    height: 16,
    marginRight: 8,
    borderRadius: '50%',
    backgroundColor: ({ indicatorColor }: TagWithIndicatorStylesProps) =>
      indicatorColor,
  },
})

const TagWithIndicator: React.FC<TagWithIndicatorProps> = ({
  indicatorColor,
  children,
  ...rest
}) => {
  const classesList = useStyles({ indicatorColor })

  return (
    <Tag {...rest}>
      <span className={classesList.indicator} />
      {children}
    </Tag>
  )
}

type TValue = 'first' | 'second' | 'third'

export const ColorIndicator = (): React.ReactElement => {
  const [selected, setSelected] = React.useState<Record<TValue, boolean>>({
    first: false,
    second: false,
    third: true,
  })

  const array: Array<TValue> = ['first', 'second', 'third']

  const colors: string[] = ['#8459F6', '#E6C56C', '#6CAED8']

  const handleToggle = (field: TValue) => () => {
    setSelected({ ...selected, [field]: !selected[field] })
  }

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {array.map((item, index) => (
        <TagWithIndicator
          key={item}
          indicatorColor={colors[index]}
          selected={selected[item]}
          aria-label={
            selected[item]
              ? 'На нажатие Backspace элемент удалаяется'
              : undefined
          }
          onDelete={selected[item] ? handleToggle(item) : undefined}
          onClick={selected[item] ? undefined : handleToggle(item)}
        >
          {selected[item] ? 'Delete me' : 'Click me'}
        </TagWithIndicator>
      ))}
    </div>
  )
}
