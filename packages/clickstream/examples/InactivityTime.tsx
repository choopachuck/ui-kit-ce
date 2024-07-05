import * as React from 'react'
import { Grid, GridItem } from '@v-uik/base'
import { ClickStreamProvider, ClickStreamEventBatch } from '@v-uik/clickstream'
import { Code } from './_Code'
import { BasicForm } from './_BasicForm'

const SECOND = 1000
const INACTIVITY_TIME = SECOND * 5

export const InactivityTime: React.FC = () => {
  const [batchEvents, setBatchEvents] = React.useState<ClickStreamEventBatch>(
    []
  )
  const [intervalValue, setIntervalValue] = React.useState(INACTIVITY_TIME)
  const intervalRef = React.useRef<ReturnType<typeof setInterval>>()

  const handleSendEvent = (batch: ClickStreamEventBatch) => {
    setBatchEvents(batch)
  }

  const handleBatch = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)

      setIntervalValue(INACTIVITY_TIME)
    }

    intervalRef.current = setInterval(() => {
      setIntervalValue((prev) => {
        if (prev === SECOND) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
          }

          return 0
        }

        return prev - SECOND
      })
    }, SECOND)
  }

  return (
    <ClickStreamProvider
      inactivityTime={INACTIVITY_TIME}
      onSendEvent={handleSendEvent}
      onBatch={handleBatch}
    >
      <Grid>
        <GridItem xs={16}>
          <BasicForm
            description={`Remaining time: ${intervalValue / SECOND} sec`}
          />
        </GridItem>
        <GridItem xs={16}>
          <Code data={batchEvents} />
        </GridItem>
      </Grid>
    </ClickStreamProvider>
  )
}
