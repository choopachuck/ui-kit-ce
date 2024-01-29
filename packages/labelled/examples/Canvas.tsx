import * as React from 'react'
import { Labelled, InputBase } from '@v-uik/base'

export default (): JSX.Element => {
  return (
    <Labelled
      keepHelperTextMinHeight
      required
      label="Label"
      description="Some label description"
      helperText="Helper text"
      labelProps={{ htmlFor: 'input' }}
      helperTextProps={{ id: 'input-helper' }}
    >
      <InputBase
        inputProps={{ id: 'input', 'aria-describedby': 'input-helper' }}
      />
    </Labelled>
  )
}
