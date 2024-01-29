import * as React from 'react'
import { Textarea } from '@v-uik/base'
import { default as CustomTextarea } from 'react-textarea-autosize'

export const TextareaAutosize = () => {
  const [text, setText] = React.useState<string>('')

  return (
    <Textarea
      label="Label"
      helperText="Helper Text"
      placeholder="Autosize..."
      components={{ Textarea: CustomTextarea }}
      textareaProps={{ minRows: 1, maxRows: 3 }}
      value={text}
      onChange={setText}
    />
  )
}
