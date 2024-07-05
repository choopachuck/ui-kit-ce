import * as React from 'react'
import { Grid, GridItem } from '@v-uik/base'
import {
  ClickStreamProvider,
  ClickStreamEventBatch,
  ClickStreamEventData,
} from '@v-uik/clickstream'
import { Code } from './_Code'
import { BasicForm } from './_BasicForm'

const BATCH_SIZE = 3

export const BatchSize: React.FC = () => {
  const [batchEvents, setBatchEvents] = React.useState<ClickStreamEventBatch>(
    []
  )
  const [remainingEvents, setRemainingEvents] = React.useState(BATCH_SIZE)

  const handleSendEvent = (batch: ClickStreamEventBatch) => {
    setBatchEvents(batch)
  }

  const handleBatch = (
    event: Event,
    data: ClickStreamEventData,
    batch: ClickStreamEventBatch
  ) => {
    const newValue = BATCH_SIZE - batch.length - 1
    setRemainingEvents(newValue === 0 ? BATCH_SIZE : newValue)
  }

  return (
    <ClickStreamProvider
      batchSize={BATCH_SIZE}
      onBatch={handleBatch}
      onSendEvent={handleSendEvent}
    >
      <Grid>
        <GridItem xs={16}>
          <BasicForm
            description={`Remaining events: ${remainingEvents}/${BATCH_SIZE}`}
          />
        </GridItem>
        <GridItem xs={16}>
          <Code data={batchEvents} />
        </GridItem>
      </Grid>
    </ClickStreamProvider>
  )
}
