import * as React from 'react'
import { Textarea } from '@v-uik/base'

export const WithMaxLength = (): React.ReactElement => {
  const [value, setValue] = React.useState<string>('')

  return (
    <Textarea
      showCount
      label="Label"
      helperText="Helper Text"
      textareaProps={{
        maxLength: 100,
      }}
      value={value}
      onChange={setValue}
    />
  )
}
