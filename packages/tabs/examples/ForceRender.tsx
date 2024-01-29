import * as React from 'react'
import { Tabs, Tab } from '@v-uik/base'

export const ForceRender = (): React.ReactElement => {
  return (
    <div>
      <Tabs defaultValue="1">
        <Tab forceRender value="1" header="1 Tab">
          Content 1 tabs
        </Tab>
        <Tab forceRender value="2" header="2 Tab">
          Content 2 tabs
        </Tab>
        <Tab forceRender value="3" header="3 Tab">
          Content 3 tabs
        </Tab>
        <Tab forceRender value="4" header="4 Tab">
          Content 4 tabs
        </Tab>
        <Tab disabled forceRender value="5" header="5 Tab">
          Content 5 tabs
        </Tab>
      </Tabs>
    </div>
  )
}
