import * as React from 'react'
import { Textarea } from '@v-uik/base'

export const WithError = (): React.ReactElement => {
  return (
    <Textarea
      error
      label="Brief description of the area"
      helperText="Additional description of the area"
      value="Ordinary district of Moscow"
      textareaProps={{
        'aria-labelledby': 'with-error-label',
        'aria-describedby': 'with-error-helper',
        'aria-invalid': true,
      }}
      labelProps={{ id: 'with-error-label' }}
      helperTextProps={{ id: 'with-error-helper' }}
    />
  )
}
