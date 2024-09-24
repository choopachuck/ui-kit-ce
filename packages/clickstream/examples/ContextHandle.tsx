import * as React from 'react'
import { Grid, GridItem, ButtonGroup, Button, Text } from '@v-uik/base'
import {
  ClickStreamProvider,
  ClickStreamEventBatch,
  ClickStreamEventData,
  useClickStreamContext,
} from '@v-uik/clickstream'
import { Code } from './_Code'

const CustomComponent: React.FC = () => {
  const { dispatchEvent } = useClickStreamContext()

  const handleCustomEventClick = (event: React.MouseEvent) => {
    dispatchEvent(event.nativeEvent, 'myCustomEvent')
  }

  const handleCustomImmediateEventClick = (event: React.MouseEvent) => {
    dispatchEvent(event.nativeEvent, 'myCustomImmediateEvent', true)
  }

  return (
    <ButtonGroup color="primary">
      <Button>Default Event</Button>
      <Button onClick={handleCustomEventClick}>Custom Event</Button>
      <Button onClick={handleCustomImmediateEventClick}>
        Custom Immediate Event
      </Button>
    </ButtonGroup>
  )
}

export const ContextHandle: React.FC = () => {
  const [batchEvents, setBatchEvents] = React.useState<ClickStreamEventBatch>(
    []
  )
  const [remainingEvents, setRemainingEvents] = React.useState(10)

  const handleSendEvent = (batch: ClickStreamEventBatch) => {
    setBatchEvents(batch)
  }

  const handleBatch = (
    event: Event,
    data: ClickStreamEventData,
    batch: ClickStreamEventBatch,
    immediate: boolean
  ) => {
    if (immediate) {
      return
    }
    const newValue = 10 - batch.length - 1
    setRemainingEvents(newValue === 0 ? 10 : newValue)
  }

  return (
    <ClickStreamProvider onBatch={handleBatch} onSendEvent={handleSendEvent}>
      <Grid>
        <GridItem xs={16}>
          <Grid spacing={4}>
            <GridItem xs={16}>
              <Text kind="headline5">
                Remaining Events: {remainingEvents}/10
              </Text>
            </GridItem>
            <GridItem xs={16}>
              <CustomComponent />
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
