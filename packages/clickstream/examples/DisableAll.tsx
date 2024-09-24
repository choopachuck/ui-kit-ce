import * as React from 'react'
import { Grid, GridItem, Text, Button, ButtonGroup } from '@v-uik/base'
import {
  ClickStreamProvider,
  ClickStreamEventBatch,
  ClickStreamEventData,
} from '@v-uik/clickstream'
import { Code } from './_Code'

const BATCH_SIZE = 10

export const DisableAll: React.FC = () => {
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
      disableAutoSendEvent
      onBatch={handleBatch}
      onSendEvent={handleSendEvent}
    >
      <Grid>
        <GridItem xs={16}>
          <Grid spacing={4}>
            <GridItem xs={16}>
              <Text kind="headline5">
                Remaining events: {remainingEvents}/{BATCH_SIZE}
              </Text>
            </GridItem>
            <GridItem xs={16}>
              <ButtonGroup color="primary">
                <Button>Disable Event</Button>
                <Button>Disable Event</Button>
              </ButtonGroup>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem xs={16}>
          <Code data={batchEvents} />
        </GridItem>
      </Grid>
    </ClickStreamProvider>
  )
}
