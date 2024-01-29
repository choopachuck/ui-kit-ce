import * as React from 'react'
import { Tabs, Tab } from '@v-uik/base'

export const Disabled = (): React.ReactElement => {
  return (
    <Tabs defaultValue="1">
      <Tab value="1" header="1 Tab">
        Content 1 tabs
      </Tab>
      <Tab value="2" header="2 Tab">
        Content 2 tabs
      </Tab>
      <Tab disabled value="3" header="3 Tab">
        Content 3 tabs
      </Tab>
      <Tab value="4" header="4 Tab">
        Content 4 tabs
      </Tab>
    </Tabs>
  )
}
