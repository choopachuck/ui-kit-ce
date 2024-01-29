import React from 'react'
import { EnumControlItem } from './EnumControlItem'
import { RadioGroup, Grid, GridItem } from '@v-uik/base'

type EnumControlsProps = {
  label: string
  values: (string | number)[]
  value: string | number
  onChange: (value: string | number) => void
}

export const EnumControls = ({
  values,
  label,
  value,
  onChange,
}: EnumControlsProps): React.ReactElement => (
  <RadioGroup label={label} value={value} onChange={onChange}>
    <Grid spacing={2}>
      {values.map((value) => (
        <GridItem key={value} xs={8}>
          <EnumControlItem value={value} />
        </GridItem>
      ))}
    </Grid>
  </RadioGroup>
)
