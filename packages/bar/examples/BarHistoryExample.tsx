import React from 'react'
import { ContainerMock } from './ContainerMock'
import {
  Bar,
  BarButton,
  BarDate,
  BarDivider,
  BarMenuItem,
  SubBar,
  BarSearch,
  RadioGroup,
  LabelControl,
  Radio,
} from '@v-uik/base'
import { Icon } from './assets/Icon'
import { IconMenu } from './assets/IconMenu'
import { CustomBarMenuItem } from './CustomBarMenuItem'
import { HistoryIcon } from './assets/HistoryIcon'

const MENU_ITEMS = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
  'Option 6',
  'Option 7',
  'Option 8',
  'Option 9',
  'Option 10',
  'Option 11',
]

export const BarHistoryExample = (): JSX.Element => {
  const [subBarExpanded, setSubBarExpanded] = React.useState(true)
  const [historyExpanded, setHistoryExpanded] = React.useState(false)

  const [menuItems, setMenuItems] = React.useState(MENU_ITEMS)

  const [selected, setSelected] = React.useState(0)
  const [historyStack, setHistoryStack] = React.useState<
    Array<{
      title: string
      callback(): void
    }>
  >([])

  const handleClickItem = (title: string, index: number) => {
    if (!subBarExpanded) {
      setSubBarExpanded(true)
    }

    setSelected(index)
    if (!historyStack.find((item) => item.title === title)) {
      setHistoryStack((old) => [
        {
          title,
          callback: () => {
            setSelected(index)
          },
        },
        ...old,
      ])
    }
  }

  const handleChangeSearchBar = (value: string) => {
    setMenuItems(
      MENU_ITEMS.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      )
    )
  }

  return (
    <ContainerMock style={{ height: '80vh' }}>
      <Bar
        style={{
          position: 'absolute',
          bottom: undefined,
        }}
        kind="dark"
        direction="horizontal"
        expanded={false}
      >
        <BarDate style={{ marginLeft: 'auto' }} />
        <BarDivider />

        <BarButton icon={<IconMenu />} />
      </Bar>

      <SubBar
        style={{
          position: 'absolute',
          top: 48,
          left: 0,
          bottom: -80,
        }}
        direction="vertical"
        kind="dark"
        expanded={subBarExpanded}
      >
        {menuItems.length ? (
          menuItems.map((item, index) => (
            <BarMenuItem
              key={index}
              selected={selected === index}
              icon={<Icon />}
              onClick={() => handleClickItem(`${item}`, index)}
            >
              {item}
            </BarMenuItem>
          ))
        ) : (
          <BarMenuItem disabled>Ничего не найдено</BarMenuItem>
        )}
        <BarDivider />
        <CustomBarMenuItem
          expanded={historyExpanded}
          items={
            historyStack.length ? (
              <>
                {historyStack.map((item, index) => (
                  <CustomBarMenuItem
                    key={index}
                    count={2}
                    onClick={item.callback}
                  >
                    {item.title}
                  </CustomBarMenuItem>
                ))}
              </>
            ) : null
          }
          icon={<HistoryIcon />}
          onClick={() => setHistoryExpanded((old) => !old)}
        >
          History
        </CustomBarMenuItem>

        <BarSearch
          style={{ marginTop: 'auto', marginBottom: 16 }}
          inputProps={{ placeholder: 'Search' }}
          onChange={handleChangeSearchBar}
        />
      </SubBar>

      <div
        style={{
          display: 'flex',
          paddingTop: 110,
          paddingLeft: 520,
        }}
      >
        <RadioGroup
          label="SubBar opened"
          direction="vertical"
          value={subBarExpanded.toString()}
          onChange={(value) => {
            setSubBarExpanded(value === 'true')
          }}
        >
          <LabelControl value="true" control={<Radio />} label="true" />
          <LabelControl value="false" control={<Radio />} label="false" />
        </RadioGroup>
      </div>
    </ContainerMock>
  )
}
