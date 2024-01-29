import * as React from 'react'
import { Textarea } from '@v-uik/base'

export const Basic = (): React.ReactElement => {
  const [text, setText] = React.useState<string>('')

  const handleAreaChange = (value: string) => {
    setText(value)
  }

  return (
    <Textarea
      label="Brief description of the area"
      helperText="Additional description of the area"
      placeholder="Ordinary district of Moscow"
      textareaProps={{
        id: 'basic-textarea',
        'aria-labelledby': 'basic-label',
        'aria-describedby': 'basic-helper',
      }}
      labelProps={{ id: 'basic-label', htmlFor: 'basic-textarea' }}
      helperTextProps={{ id: 'basic-helper' }}
      value={text}
      onChange={handleAreaChange}
    />
  )
}

export default Basic
