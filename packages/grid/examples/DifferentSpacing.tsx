import * as React from 'react'
import { Grid, GridItem } from '@v-uik/base'

export const DifferentSpacing = (): JSX.Element => {
  return (
    <Grid columnSpacing={{ lg: 2, md: 3, sm: 4 }} rowSpacing={{ xs: 5, sm: 3 }}>
      <GridItem xs={16} sm={4} md={3}>
        <div style={{ backgroundColor: 'red' }}>1 column</div>
      </GridItem>
      <GridItem xs={16} sm={4} md={3}>
        <div style={{ backgroundColor: 'blue' }}>2 column</div>
      </GridItem>
      <GridItem xs={16} sm={4} md={3}>
        <div style={{ backgroundColor: 'purple' }}>3 column</div>
      </GridItem>
      <GridItem xs={16} sm={4} md={3}>
        <div style={{ backgroundColor: 'aliceblue' }}>4 column</div>
      </GridItem>
    </Grid>
  )
}
