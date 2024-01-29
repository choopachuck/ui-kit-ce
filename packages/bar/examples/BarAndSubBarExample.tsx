import * as React from 'react'
import {
  useTheme,
  Bar,
  SubBar,
  BarButton,
  BarDate,
  BarMenuItem,
  BarDropdown,
  BarDropdownItem,
  BarDivider,
  BarKinds,
  BarKindsType,
  SubBarKinds,
  SubBarKindsType,
  Direction,
  DirectionType,
  RadioGroup,
  Radio,
  LabelControl,
} from '@v-uik/base'
import { IconMenu } from './assets/IconMenu'
import { Icon } from './assets/Icon'
import { LogoPlatformV } from './assets/LogoPlatformV'
import { LogoPlatformVCropped } from './assets/LogoPlatformVCropped'
import { ContainerMock } from './ContainerMock'

export const BarAndSubBarExample = (): JSX.Element => {
  const theme = useTheme()

  const [barDirection, setBarDirection] = React.useState<DirectionType>(
    Direction.horizontal
  )

  const [barKind, setBarKind] = React.useState<BarKindsType>(BarKinds.dark)

  const [barExpand, setBarExpand] = React.useState(false)

  const [subBarDirection, setSubBarDirection] = React.useState<DirectionType>(
    Direction.horizontal
  )

  const [subBarKind, setSubBarKind] = React.useState<SubBarKindsType>(
    SubBarKinds.dark
  )

  const [subBarExpand, setSubBarExpanded] = React.useState(false)

  const dropdownMenuProps = React.useMemo(() => {
    const subDropdownProps = {
      content: (
        <>
          <BarDropdownItem>Option 5</BarDropdownItem>
          <BarDropdownItem>Option 6</BarDropdownItem>
          <BarDropdownItem disabled>Option 7</BarDropdownItem>
        </>
      ),
    }

    return {
      content: (
        <>
          <BarDropdownItem>Option 1</BarDropdownItem>
          <BarDropdownItem>Option 2</BarDropdownItem>
          <BarDropdownItem disabled>Option 3</BarDropdownItem>
          <BarDropdownItem dropdownProps={subDropdownProps}>
            Option 4
          </BarDropdownItem>
        </>
      ),
    }
  }, [])

  const isBarVertical = barDirection === Direction.vertical
  const isSubBarVertical = subBarDirection === Direction.vertical

  const logoColors: { [key in BarKindsType]: string } = {
    dark: theme.sys.color.inversePrimaryAlpha,
    light: theme.sys.color.primaryAlpha,
    primary: theme.sys.color.onPrimaryHigh,
  }

  const logoStyles = {
    fill: logoColors[barKind],
    padding: isBarVertical ? '12px 20px' : '12px 16px',
  }

  const getLeftPosition = React.useCallback(
    (isBarVertical: boolean): number => {
      if (isBarVertical) {
        return barExpand ? 256 : 64
      }

      return 0
    },
    [barExpand]
  )

  return (
    <ContainerMock style={{ height: '80vh' }}>
      <Bar
        style={{
          position: 'absolute',
          bottom: isBarVertical ? -80 : undefined,
        }}
        direction={barDirection}
        kind={barKind}
        expanded={barExpand}
      >
        {isBarVertical && !barExpand ? (
          <LogoPlatformVCropped style={logoStyles} />
        ) : (
          <LogoPlatformV style={logoStyles} />
        )}
        <BarDate
          style={isBarVertical ? { marginTop: 'auto' } : { marginLeft: 'auto' }}
        />
        <BarDivider />
        <BarButton icon={<IconMenu />} />
      </Bar>

      <SubBar
        style={{
          position: 'absolute',
          top: isBarVertical ? 0 : 48,
          left: getLeftPosition(isBarVertical),
          bottom: isSubBarVertical ? -80 : undefined,
          transition: 'all 150ms ease-in-out',
        }}
        direction={subBarDirection}
        kind={subBarKind}
        expanded={subBarExpand}
      >
        <BarMenuItem selected icon={<Icon />}>
          Menu 1
        </BarMenuItem>
        <BarMenuItem icon={<Icon />}>Menu 2</BarMenuItem>
        <BarMenuItem icon={<Icon />}>Menu 3</BarMenuItem>
        <BarDivider />
        <BarDropdown dropdownMenuProps={dropdownMenuProps} icon={<Icon />}>
          More
        </BarDropdown>
      </SubBar>

      <div
        style={{
          display: 'flex',
          paddingTop: 110,
          paddingLeft: 520,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <RadioGroup
            label="Bar direction"
            direction="vertical"
            value={barDirection}
            onChange={(value) => {
              setBarDirection(value)
            }}
          >
            <LabelControl
              value={Direction.horizontal}
              control={<Radio />}
              label={Direction.horizontal}
            />
            <LabelControl
              value={Direction.vertical}
              control={<Radio />}
              label={Direction.vertical}
            />
          </RadioGroup>

          <RadioGroup
            label="Bar color"
            direction="vertical"
            value={barKind}
            onChange={(value) => {
              setBarKind(value)
            }}
          >
            <LabelControl
              value={BarKinds.dark}
              control={<Radio />}
              label={BarKinds.dark}
            />
            <LabelControl
              value={BarKinds.light}
              control={<Radio />}
              label={BarKinds.light}
            />
            <LabelControl
              value={BarKinds.primary}
              control={<Radio />}
              label={BarKinds.primary}
            />
          </RadioGroup>

          <RadioGroup
            label="Bar opened"
            direction="vertical"
            value={barExpand.toString()}
            onChange={(value) => {
              setBarExpand(value === 'true')
            }}
          >
            <LabelControl value="true" control={<Radio />} label="true" />
            <LabelControl value="false" control={<Radio />} label="false" />
          </RadioGroup>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <RadioGroup
            label="SubBar direction"
            direction="vertical"
            value={subBarDirection}
            onChange={(value) => {
              setSubBarDirection(value)
            }}
          >
            <LabelControl
              value={Direction.horizontal}
              control={<Radio />}
              label={Direction.horizontal}
            />
            <LabelControl
              value={Direction.vertical}
              control={<Radio />}
              label={Direction.vertical}
            />
          </RadioGroup>

          <RadioGroup
            label="SubBar color"
            direction="vertical"
            value={subBarKind}
            onChange={(value) => {
              setSubBarKind(value)
            }}
          >
            <LabelControl
              value={SubBarKinds.dark}
              control={<Radio />}
              label={SubBarKinds.dark}
            />
            <LabelControl
              value={SubBarKinds.darker}
              control={<Radio />}
              label={SubBarKinds.darker}
            />
            <LabelControl
              value={SubBarKinds.light}
              control={<Radio />}
              label={SubBarKinds.light}
            />
            <LabelControl
              value={SubBarKinds.lighter}
              control={<Radio />}
              label={SubBarKinds.lighter}
            />
          </RadioGroup>

          <RadioGroup
            label="SubBar opened"
            direction="vertical"
            value={subBarExpand.toString()}
            onChange={(value) => {
              setSubBarExpanded(value === 'true')
            }}
          >
            <LabelControl value="true" control={<Radio />} label="true" />
            <LabelControl value="false" control={<Radio />} label="false" />
          </RadioGroup>
        </div>
      </div>
    </ContainerMock>
  )
}
