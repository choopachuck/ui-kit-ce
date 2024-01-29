import * as React from 'react'
import {
  createUseStyles,
  useTheme,
  Bar,
  BarProps,
  BarButton,
  BarMenuItem,
  BarSearch,
  BarSelect,
  BarDropdown,
  BarDropdownItem,
  BarDivider,
  BarKinds,
  BarKindsType,
} from '@v-uik/base'
import {
  IconBurger,
  Icon,
  IconMenu,
  LogoPlatformV,
  LogoPlatformVCropped,
} from './assets'

const iconBurger = <IconBurger />
const icon = <Icon />
const iconMenu = <IconMenu />

const options = [
  { value: '', label: 'Select' },
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
]

const useStyles = createUseStyles<string, BarProps>({
  select: (props: BarProps) =>
    props.direction === 'vertical'
      ? {
          '& button': {
            '&::after': {
              borderTop: 0,
            },
          },
        }
      : {
          '& button': {
            '&::after': {
              borderLeft: 0,
            },
          },
        },
})

export const Basic = (props: BarProps): React.ReactElement => {
  const theme = useTheme()
  const classesList = useStyles(props)
  const isVertical = props.direction === 'vertical'
  const barKind = props.kind ?? BarKinds.dark

  const [selected, setSelected] = React.useState(1)
  const [selectValue, setSelectValue] = React.useState('')

  const handleChangeSelectValue = (value: string) => {
    setSelectValue(value)
  }

  const subDropdownProps = React.useMemo(() => {
    return {
      content: (
        <>
          <BarDropdownItem>Option 5</BarDropdownItem>
          <BarDropdownItem>Option 6</BarDropdownItem>
          <BarDropdownItem disabled>Option 7</BarDropdownItem>
        </>
      ),
    }
  }, [])

  const dropdownMenuProps = React.useMemo(() => {
    return {
      content: (
        <>
          <BarDropdownItem>Option 1</BarDropdownItem>
          <BarDropdownItem>Option 2</BarDropdownItem>
          <BarDropdownItem disabled dropdownProps={subDropdownProps}>
            Option 3
          </BarDropdownItem>
          <BarDropdownItem dropdownProps={subDropdownProps}>
            Option 4
          </BarDropdownItem>
        </>
      ),
    }
  }, [subDropdownProps])

  const logoColors: { [key in BarKindsType]: string } = {
    dark: theme.sys.color.inversePrimaryAlpha,
    light: theme.sys.color.primaryAlpha,
    primary: theme.sys.color.onPrimaryHigh,
  }

  const logoStyles = {
    fill: logoColors[barKind],
    padding: isVertical ? '12px 20px' : '12px 16px',
  }

  return (
    <Bar {...props}>
      <BarButton icon={iconBurger} />

      {isVertical && !props.expanded ? (
        <LogoPlatformVCropped style={logoStyles} />
      ) : (
        <LogoPlatformV style={logoStyles} />
      )}

      <BarMenuItem
        icon={icon}
        selected={selected === 1}
        onClick={() => setSelected(1)}
      >
        Menu 1
      </BarMenuItem>
      <BarMenuItem
        icon={icon}
        selected={selected === 2}
        onClick={() => setSelected(2)}
      >
        Menu 2
      </BarMenuItem>
      <BarMenuItem
        disabled
        icon={icon}
        selected={selected === 3}
        onClick={() => setSelected(3)}
      >
        Menu 3
      </BarMenuItem>

      <BarDivider />

      <BarDropdown icon={icon} dropdownMenuProps={dropdownMenuProps}>
        Menu 4
      </BarDropdown>

      <BarSearch
        style={isVertical ? { marginTop: 'auto' } : { marginLeft: 'auto' }}
        inputProps={{ placeholder: 'Search' }}
      />

      <BarSelect
        className={classesList.select}
        options={options}
        value={selectValue}
        onChange={handleChangeSelectValue}
      />

      <BarButton icon={icon} />
      <BarButton icon={iconMenu} />
    </Bar>
  )
}

export default Basic
