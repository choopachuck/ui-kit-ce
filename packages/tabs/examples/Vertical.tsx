import * as React from 'react'
import { Tabs, Tab, Text } from '@v-uik/base'

export const Vertical = (): React.ReactElement => {
  return (
    <>
      <div>
        <Text gutterBottom kind="h6">
          Default
        </Text>
        <Tabs direction="vertical" defaultValue="1">
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
            Content 5 tabs
          </Tab>
        </Tabs>
      </div>
      <div>
        <Text gutterBottom kind="h6">
          Filled
        </Text>
        <Tabs direction="vertical" kind="filled" defaultValue="1">
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
            Content 5 tabs
          </Tab>
        </Tabs>
      </div>
    </>
  )
}
