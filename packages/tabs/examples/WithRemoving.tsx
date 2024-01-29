import * as React from 'react'
import { Tabs, Tab } from '@v-uik/base'
import { IconAdd } from './assets/IconAdd'
import { IconClose } from './assets/IconClose'

export const WithRemoving = (): React.ReactElement => {
  const [tabsCount, setTabsCount] = React.useState([1, 2, 3, 4])

  const [currentTab, setCurrentTab] = React.useState(1)

  const onClickAdd = () => {
    const newTabValue = tabsCount.length
      ? tabsCount[tabsCount.length - 1] + 1
      : 1
    setCurrentTab(newTabValue)
    setTabsCount([...tabsCount, newTabValue])
  }

  const onClickDelete = (tabCount: number) => {
    const newTabsCount = tabsCount.filter((value) => value !== tabCount)
    setTabsCount(newTabsCount)
    if (tabCount === currentTab) {
      setCurrentTab(-1)
    }
  }

  return (
    <Tabs
      value={currentTab}
      onChange={(value) => setCurrentTab(value as number)}
    >
      {tabsCount.map((tabCount) => (
        <Tab
          key={tabCount}
          value={tabCount}
          header={
            <>
              {`${tabCount} tab`}
              <div
                role="button"
                style={{
                  display: 'flex',
                  marginLeft: 8,
                }}
                onClick={(event) => {
                  event.stopPropagation()
                  onClickDelete(tabCount)
                }}
              >
                <IconClose />
              </div>
            </>
          }
          onKeyDown={(event) => {
            if (event.key === 'Backspace' || event.key === 'Delete') {
              event.preventDefault()
              onClickDelete(tabCount)
            }
          }}
        >
          {`Content ${tabCount} tabs`}
        </Tab>
      ))}
      <Tab
        style={{ padding: 8 }}
        value="Add"
        header={<IconAdd />}
        onClick={onClickAdd}
      />
    </Tabs>
  )
}
