import * as React from 'react'
import { InputBase } from '@v-uik/input'
import { Labelled, LabelledProps } from '@v-uik/labelled'

export const LabelledInput = (props: LabelledProps): React.ReactElement => (
  <Labelled {...props}>
    <InputBase fullWidth disabled={props?.disabled} error={props?.error} />
  </Labelled>
)
