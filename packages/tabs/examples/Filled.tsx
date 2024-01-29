import * as React from 'react'
import { createUseStyles, useTheme, Tabs, Tab } from '@v-uik/base'

const useStyles = createUseStyles((theme) => ({
  filled: {
    '& $content': {
      backgroundColor: theme.sys.color.backgroundAlpha,
    },
    '&>$tabs>$tab$selected': {
      backgroundColor: theme.sys.color.backgroundAlpha,
    },
  },
  tabs: {},
  tab: {},
  content: {},
  selected: {},
}))

export const Filled = (): React.ReactElement => {
  const [firstCurrentTab, setFirstCurrentTab] = React.useState('1')
  const [secondCurrentTab, setSecondCurrentTab] = React.useState('1')

  const classes = useStyles()

  const theme = useTheme()

  const tabsClasses = {
    filled: classes.filled,
    content: classes.content,
    tabs: classes.tabs,
  }

  const tabClasses = {
    tab: classes.tab,
    selected: classes.selected,
  }

  return (
    <>
      <Tabs
        kind="filled"
        value={firstCurrentTab}
        onChange={(value) => setFirstCurrentTab(value as string)}
      >
        <Tab value="1" header="1 Tab">
          Content 1 tabs
        </Tab>
        <Tab value="2" header="2 Tab">
          Content 2 tabs
        </Tab>
        <Tab value="3" header="3 Tab">
          Content 3 tabs
        </Tab>
        <Tab value="4" header="4 Tab">
          Content 4 tabs
        </Tab>
        <Tab disabled value="5" header="5 Tab">
          Content 3 tabs
        </Tab>
      </Tabs>
      <br />
      <br />
      <div
        style={{
          margin: '-10px -20px',
          padding: '10px 20px',
          backgroundColor: theme.sys.color.backgroundBeta,
        }}
      >
        <Tabs
          classes={tabsClasses}
          kind="filled"
          value={secondCurrentTab}
          onChange={(value) => setSecondCurrentTab(value as string)}
        >
          <Tab classes={tabClasses} value="1" header="1 Tab">
            Content 1 tabs
          </Tab>
          <Tab classes={tabClasses} value="2" header="2 Tab">
            Content 2 tabs
          </Tab>
          <Tab classes={tabClasses} value="3" header="3 Tab">
            Content 3 tabs
          </Tab>
          <Tab classes={tabClasses} value="4" header="4 Tab">
            Content 4 tabs
          </Tab>
          <Tab disabled classes={tabClasses} value="5" header="5 Tab">
            Content 5 tabs
          </Tab>
        </Tabs>
      </div>
    </>
  )
}
