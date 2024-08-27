import * as React from 'react'
import { createUseStyles, Textarea } from '@v-uik/base'

const useStyles = createUseStyles({
  textarea: {
    maxWidth: 250,
    maxHeight: 150,
  },
})

export const TextareaUserResize = (): React.ReactElement => {
  const [text, setText] = React.useState<string>('')
  const classes = useStyles()

  return (
    <Textarea
      classes={classes}
      label="Label"
      helperText="Helper Text"
      placeholder="Resize..."
      resize="both"
      value={text}
      onChange={setText}
    />
  )
}
