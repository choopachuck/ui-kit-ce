import React from 'react'
import {
  Bar,
  BarButton,
  BarDate,
  BarDivider,
  BarMenuItem,
  BarSearch,
  SubBar,
  clsx,
  createUseStyles,
} from '@v-uik/base'
import { Icon } from './assets/Icon'
import { IconMenu } from './assets/IconMenu'
import { ContainerMock } from './ContainerMock'
import { CustomBarMenuItem } from './CustomBarMenuItem'
import { HistoryIcon } from './assets/HistoryIcon'
import { ExpandSubBarIcon } from './assets/ExpandSubBarIcon'
import { LogoPlatformV } from './assets/LogoPlatformV'
import { ExpandAllTreeIcon } from './assets/ExpandAllTreeIcon'

const data: NestedItem[] = [
  {
    title: 'Menu 1',
    index: 1,
  },
  {
    title: 'Menu 2',
    index: 2,
    children: [
      {
        title: 'Menu 3',
        index: 3,
        children: [
          {
            title: 'Menu 4',
            index: 4,
          },
          {
            title: 'Menu 5',
            index: 5,
            children: [
              {
                title: 'Menu 6',
                index: 16,
              },
              {
                title: 'Menu 7',
                index: 17,
              },
              {
                title: 'Menu 8',
                index: 18,
              },
            ],
          },
        ],
      },
      {
        title: 'Menu 9',
        index: 6,
      },
    ],
  },
  {
    title: 'Very very very long menu label',
    index: 15,
    children: [
      {
        title: 'Menu 11',
        index: 7,
      },
      {
        title: 'Menu 12',
        index: 8,
      },
      {
        title: 'Menu 13',
        index: 14,
        children: [
          {
            title: 'Menu 14',
            index: 9,
          },
          {
            title: 'Menu 15',
            index: 10,
            children: [
              {
                title: 'Menu 16',
                index: 11,
                children: [
                  {
                    title: 'Menu 17',
                    index: 12,
                  },
                  {
                    title: 'Menu 18',
                    index: 13,
                  },
                ],
              },
            ],
          },
          {
            title: 'Menu 19',
            index: 19,
          },
          {
            title: 'Menu 20',
            index: 20,
          },
        ],
      },
    ],
  },
  {
    title: 'Menu 21',
    index: 21,
    children: [
      {
        title: 'Menu 22',
        index: 22,
      },
    ],
  },
  {
    title: 'Menu 23',
    index: 23,
    children: [
      {
        title: 'Menu 24',
        index: 24,
      },
      {
        title: 'Menu 25',
        index: 25,
      },
    ],
  },
]

const allItemsWithChildren = [2, 3, 5, 15, 14, 10, 11, 21, 23]

type NestedItem = {
  index: number
  title: string
  children?: NestedItem[]
}

const useStyles = createUseStyles((theme) => ({
  elementWithActiveChild: {
    backgroundColor: theme.sys.color.inverseOnBackgroundOverlaySelect,
  },

  elementTextActiveChild: {
    color: theme.sys.color.inverseOnBackgroundHigh,
  },
}))

export const NestedMenuExample = (): JSX.Element => {
  const classesList = useStyles()

  const [subBarExpanded, setSubBarExpanded] = React.useState(true)
  const [historyExpanded, setHistoryExpanded] = React.useState(false)
  const [selected, setSelected] = React.useState<number | null>(null)

  const [expanded, setExpanded] = React.useState<number[]>([])

  const [historyStack, setHistoryStack] = React.useState<
    Array<{
      title: string
      callback(): void
    }>
  >([])

  const handleClickItem = (item: NestedItem) => () => {
    if (!subBarExpanded) {
      setSubBarExpanded(true)
    }

    if (!item.children && !historyStack.find((el) => el.title === item.title)) {
      setHistoryStack((old) => [
        {
          title: item.title,
          callback: () => {
            setSelected(item.index)
          },
        },
        ...old,
      ])
    }

    if (expanded.includes(item.index)) {
      setExpanded((old) => old.filter((el) => el !== item.index))
    } else {
      setExpanded((old) => [...old, item.index])
    }

    if (item.children) {
      setSelected(item.children[0].index)
    } else {
      setSelected(item.index)
    }
  }

  const recursiveFindSelectedChild = (
    items: NestedItem[] | undefined
  ): NestedItem | undefined => {
    if (!items) {
      return
    }

    return items.find((item) => {
      if (item.index === selected) {
        return true
      }

      if (item.children) {
        return recursiveFindSelectedChild(item.children)
      } else {
        return false
      }
    })
  }

  const renderMenuItems = (data: NestedItem[], index = 0) =>
    data.map((item) => {
      const elementWithActiveChild = recursiveFindSelectedChild(item.children)

      const classes = {
        menuItem: clsx(undefined, {
          [classesList.elementWithActiveChild ?? '']: !!elementWithActiveChild,
        }),
        text: clsx(undefined, {
          [classesList.elementTextActiveChild ?? '']: !!elementWithActiveChild,
        }),
      }

      const itemExpand = expanded.includes(item.index)

      return (
        <CustomBarMenuItem
          key={item.index}
          expanded={itemExpand}
          classes={classes}
          icon={index === 0 && <Icon />}
          count={index}
          selected={selected === item.index}
          items={
            item.children && renderMenuItems(item.children, Number(index + 1))
          }
          onClick={handleClickItem(item)}
        >
          {subBarExpanded && (
            <div style={{ whiteSpace: 'pre-wrap', maxWidth: 150 }}>
              {item.title}
            </div>
          )}
        </CustomBarMenuItem>
      )
    })

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
        <div
          style={{
            marginBottom: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <LogoPlatformV
            style={{
              margin: '12px 16px',
              fill: 'white',
            }}
          />

          {subBarExpanded && (
            <BarButton
              icon={<ExpandAllTreeIcon />}
              onClick={() => setExpanded(allItemsWithChildren)}
            />
          )}
        </div>

        <div style={{ overflow: 'auto' }}>
          {renderMenuItems(data)}
          <BarDivider />

          <CustomBarMenuItem
            expanded={historyExpanded}
            items={
              historyStack.length ? (
                <>
                  {historyStack.map((item, index) => (
                    <CustomBarMenuItem
                      key={index}
                      count={1}
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
        </div>

        <BarDate style={{ marginTop: 'auto' }} />
        <BarSearch
          style={{ marginBottom: 5 }}
          inputProps={{ placeholder: 'Search' }}
        />

        <BarMenuItem
          icon={<ExpandSubBarIcon />}
          style={{ marginBottom: 10 }}
          onClick={() => {
            setSubBarExpanded((old) => !old)
            setExpanded([])
          }}
        >
          Collapse
        </BarMenuItem>
      </SubBar>
    </ContainerMock>
  )
}
