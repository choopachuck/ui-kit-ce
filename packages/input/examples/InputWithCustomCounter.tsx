import * as React from 'react'
import { createUseStyles, Input } from '@v-uik/base'

const maxLength = 100

const useStyles = createUseStyles((theme) => ({
  suffix: {
    fontFamily: theme.typography.fontFamily.text,
    fontSize: theme.typography.fontSize.code2,
    color: theme.palette.greyWarm.$40,
  },
}))

export const InputWithCustomCounter = (): JSX.Element => {
  const [value, setValue] = React.useState<string>('')

  const styles = useStyles()

  return (
    <Input
      label="Login"
      classes={{ suffix: styles.suffix }}
      suffix={`${value.length}/${maxLength}`}
      inputProps={{ maxLength }}
      value={value}
      onChange={setValue}
    />
  )
}
