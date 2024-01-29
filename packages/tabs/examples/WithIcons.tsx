import * as React from 'react'
import { createUseStyles, Tabs, Tab, Badge } from '@v-uik/base'
import { Icon } from './assets/Icon'

const useStyles = createUseStyles({
  badge: {
    boxShadow: 'none',
  },
})

export const WithIcons = (): React.ReactElement => {
  const [currentTab, setCurrentTab] = React.useState('1')

  const classes = useStyles()

  return (
    <Tabs
      value={currentTab}
      onChange={(value) => setCurrentTab(value as string)}
    >
      <Tab
        value="1"
        header={
          <>
            <Icon style={{ marginRight: 8 }} />1 Tab
          </>
        }
      >
        Content 1 tabs
      </Tab>
      <Tab
        value="2"
        header={
          <>
            <Icon style={{ marginRight: 8 }} />2 Tab
          </>
        }
      >
        Content 2 tabs
      </Tab>
      <Tab
        value="3"
        header={
          <>
            3 Tab
            <Badge
              classes={{ badge: classes.badge }}
              status="neutral"
              content={7}
              horizontalOffset={8}
              verticalOffset={8}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  marginLeft: 8,
                }}
              />
            </Badge>
          </>
        }
      >
        Content 3 tabs
      </Tab>
      <Tab value="4" header="4 Tab">
        Content 4 tabs
      </Tab>
    </Tabs>
  )
}
