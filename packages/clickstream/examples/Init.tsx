import * as React from 'react'
import { Grid, GridItem } from '@v-uik/base'
import {
  ClickStreamProvider,
  ClickStreamBaseData,
  ClickStreamEventMeta,
} from '@v-uik/clickstream'
import { Code } from './_Code'
import { BasicForm } from './_BasicForm'

export const Init: React.FC = () => {
  const [initData, setInitData] = React.useState<{
    data: ClickStreamBaseData
    meta: ClickStreamEventMeta
  }>()

  const handleInit = (
    data: ClickStreamBaseData,
    meta: ClickStreamEventMeta
  ) => {
    setInitData({ data, meta })
  }

  return (
    <ClickStreamProvider onInit={handleInit}>
      <Grid>
        <GridItem xs={16}>
          <BasicForm />
        </GridItem>
        <GridItem xs={16}>
          <Code data={initData} />
        </GridItem>
      </Grid>
    </ClickStreamProvider>
  )
}
