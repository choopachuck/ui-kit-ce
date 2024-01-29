import * as React from 'react'
import {
  ComboBox,
  ComboboxEvent,
  defaultComboboxComponents,
  OptionItemProps,
  Tooltip,
} from '@v-uik/base'

type Option = {
  value: string
  label: string
}

const options: Option[] = [
  { value: '1', label: 'Опция 1' },
  { value: '2', label: 'Опция 2' },
  { value: '3', label: 'Опция 3' },
  { value: '4', label: 'Опция 4' },
  { value: '5', label: 'Опция 5' },
  {
    value: '6',
    label:
      'Длинная опция 6 самая самая самая самая самая самая самая самая длинная',
  },
  { value: '7', label: 'Опция 7' },
  { value: '8', label: 'Опция 8' },
  { value: '9', label: 'Опция 9' },
  { value: '10', label: 'Опция 10' },
  { value: '11', label: 'Опция 11' },
  {
    value: '12',
    label:
      'Длинная опция 12 самая самая самая самая самая самая самая самая длинная',
  },
  { value: '13', label: 'Опция 13' },
  { value: '14', label: 'Опция 14' },
  { value: '15', label: 'Опция 15' },
]

const { OptionItem } = defaultComboboxComponents

const element = 'li'

const CustomOptionItem = <Option, E extends React.ElementType = typeof element>(
  props: OptionItemProps<Option, E>
): React.ReactElement => {
  const ref = React.useRef<HTMLLIElement>(null)
  const [isMouseEnter, setIsMouseEnter] = React.useState(false)

  const isOverflowing = React.useMemo(() => {
    const element = ref.current
    if (!element) {
      return false
    }

    return Array.from(element.children).some(
      (node) => node.scrollWidth > node.clientWidth
    )
  }, [ref.current])

  if (props.isInfoOption || (!isOverflowing && ref.current)) {
    return <OptionItem {...props} />
  }

  const { option, getOptionLabel, getOptionValue, formatOptionLabel, active } =
    props

  const optionValue = getOptionValue(option)
  const isOptionActive = active && optionValue === getOptionValue(active)

  const label =
    formatOptionLabel?.(getOptionLabel(option), optionValue) ||
    getOptionLabel(option)

  return (
    <Tooltip
      single
      dropdownProps={{
        open: (isOptionActive || isMouseEnter) && isOverflowing,
        placement: 'right',
        disablePortal: false,
        content: <span>{label}</span>,
      }}
    >
      <div>
        <OptionItem
          {...props}
          commonOptionItemProps={{
            ref: ref,
            onMouseEnter: () => setIsMouseEnter(true),
            onMouseLeave: () => setIsMouseEnter(false),
          }}
        />
      </div>
    </Tooltip>
  )
}

export const OverflowingOptionWithTooltip = () => {
  const [value, setValue] = React.useState<Option>()

  return (
    <div style={{ width: 300 }}>
      <ComboBox
        limitByWidth
        label="ComboBox"
        controlInnerProps={{ id: 'basic-combobox' }}
        labelProps={{ htmlFor: 'basic-combobox' }}
        components={{ OptionItem: CustomOptionItem }}
        options={options}
        value={value}
        onChange={(_v: string, _e: ComboboxEvent, fullValue?: Option) =>
          setValue(fullValue)
        }
      />
    </div>
  )
}
