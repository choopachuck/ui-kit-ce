import * as React from 'react'
import { createUseStyles, Tag, TagProps } from '@v-uik/base'
import { Icon } from './assets/Icon'

type CustomTagStylesProps = {
  colors: {
    mainColor: string
    mainColorHover: string
    mainColorActive: string
    onMainColor: string
  }
}

type CustomTagProps = TagProps & CustomTagStylesProps

const useStyles = createUseStyles({
  primary: {
    color: ({ colors }: CustomTagStylesProps) => colors.mainColor,

    '&::after': {
      borderColor: ({ colors }: CustomTagStylesProps) => colors.mainColor,
    },

    '&$clickable': {
      '&:focus-visible': {
        color: ({ colors }: CustomTagStylesProps) => colors.onMainColor,
        backgroundColor: ({ colors }: CustomTagStylesProps) => colors.mainColor,
      },

      '&:hover': {
        color: ({ colors }: CustomTagStylesProps) => colors.onMainColor,
        backgroundColor: ({ colors }: CustomTagStylesProps) =>
          colors.mainColorHover,
      },

      '&:active': {
        color: ({ colors }: CustomTagStylesProps) => colors.onMainColor,
        backgroundColor: ({ colors }: CustomTagStylesProps) =>
          colors.mainColorActive,
      },
    },

    '&$selected': {
      color: ({ colors }: CustomTagStylesProps) => colors.onMainColor,
      backgroundColor: ({ colors }: CustomTagStylesProps) => colors.mainColor,
    },
  },

  clickable: {},

  selected: {},
})

const CustomTag: React.FC<CustomTagProps> = ({ colors, ...rest }) => {
  const classesList = useStyles({ colors })

  return (
    <Tag
      kind="primary"
      {...rest}
      classes={{
        primary: classesList.primary,
        clickable: classesList.clickable,
        selected: classesList.selected,
      }}
    />
  )
}

type TValue = 'first' | 'second' | 'third'

export const CustomColor = (): React.ReactElement => {
  const [selected, setSelected] = React.useState<Record<TValue, boolean>>({
    first: false,
    second: false,
    third: true,
  })

  const array: Array<TValue> = ['first', 'second', 'third']

  const colors: Array<CustomTagStylesProps['colors']> = [
    {
      mainColor: '#0B8C0B',
      mainColorHover: '#077D07',
      mainColorActive: '#084008',
      onMainColor: '#FFFFFF',
    },
    {
      mainColor: '#0382A6',
      mainColorHover: '#007494',
      mainColorActive: '#073C4B',
      onMainColor: '#FFFFFF',
    },
    {
      mainColor: '#F31B31',
      mainColorHover: '#D12133',
      mainColorActive: '#6B1019',
      onMainColor: '#FFFFFF',
    },
  ]

  const handleToggle = (field: TValue) => () => {
    setSelected({ ...selected, [field]: !selected[field] })
  }

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {array.map((item, index) => (
        <CustomTag
          key={item}
          colors={colors[index]}
          selected={selected[item]}
          onDelete={selected[item] ? handleToggle(item) : undefined}
          onClick={handleToggle(item)}
        >
          <Icon style={{ marginRight: 8 }} />
          {selected[item] ? 'Delete me' : 'Click me'}
        </CustomTag>
      ))}
    </div>
  )
}
