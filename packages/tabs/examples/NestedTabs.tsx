import * as React from 'react'
import { Tabs, Tab, TabsProps } from '@v-uik/base'

export const NestedTabs = ({
  kind = 'default',
}: {
  kind?: TabsProps['kind']
}): React.ReactElement => {
  return (
    <Tabs defaultValue="1" direction="vertical" kind={kind}>
      <Tab value="1" header="1">
        <Tabs defaultValue="1" direction="horizontal">
          <Tab value="1" header="Tab 1">
            Inside Tab 1
          </Tab>
          <Tab value="2" header="Tab 2">
            Inside Tab 2
          </Tab>
        </Tabs>
      </Tab>
      <Tab value="2" header="2">
        Content 2
      </Tab>
      <Tab value="3" header="3">
        Content 3
      </Tab>
    </Tabs>
  )
}
