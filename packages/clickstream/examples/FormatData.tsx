import * as React from 'react'
import { Grid, GridItem } from '@v-uik/base'
import { ClickStreamProvider, ClickStreamEventBatch } from '@v-uik/clickstream'
import { Code } from './_Code'
import { BasicForm } from './_BasicForm'

type MyEventData = {
  time: number
  eventName: string
  tag: HTMLElement['tagName']
}

export const FormatData: React.FC = () => {
  const [batchEvents, setBatchEvents] = React.useState<
    ClickStreamEventBatch<MyEventData>
  >([])
  const [remainingEvents, setRemainingEvents] = React.useState(10)

  const handleSendEvent = (batch: ClickStreamEventBatch<MyEventData>) => {
    setBatchEvents(batch)
  }

  const handleBatch = (
    event: Event,
    data: MyEventData,
    batch: ClickStreamEventBatch<MyEventData>
  ) => {
    const newValue = 10 - batch.length - 1
    setRemainingEvents(newValue === 0 ? 10 : newValue)
  }

  const formatEventData = (event: Event, eventType: string): MyEventData => {
    return {
      time: new Date().getTime(),
      eventName: eventType,
      tag: (event.target as HTMLElement)['tagName'],
    }
  }

  return (
    <ClickStreamProvider<MyEventData>
      formatEventData={formatEventData}
      onBatch={handleBatch}
      onSendEvent={handleSendEvent}
    >
      <Grid>
        <GridItem xs={16}>
          <BasicForm description={`Remaining events: ${remainingEvents}/10`} />
        </GridItem>
        <GridItem xs={16}>
          <Code data={batchEvents} />
        </GridItem>
      </Grid>
    </ClickStreamProvider>
  )
}
