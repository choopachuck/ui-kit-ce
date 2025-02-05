import * as React from 'react'
import { LabelledInput } from './LabelledInput'
import { createUseStyles } from '@v-uik/theme'

type WithTopAndBottomLabelsProps = {
  required?: boolean
  disabled?: boolean
  error?: boolean
}

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  containerItem: {
    marginBottom: 8,
  },
})

export const WithTopAndBottomLabels = (
  props: WithTopAndBottomLabelsProps
): React.ReactElement => {
  const classes = useStyles()
  const labelProps = { suffix: 'suffix text' }

  return (
    <div className={classes.container}>
      <div className={classes.containerItem}>
        <LabelledInput label="label" labelProps={labelProps} {...props} />
      </div>
      <div className={classes.containerItem}>
        <LabelledInput
          label="Login"
          labelProps={labelProps}
          description="Some description"
          {...props}
        />
      </div>
      <div className={classes.containerItem}>
        <LabelledInput
          label="Login"
          labelProps={labelProps}
          description="Some description"
          helperText="Some helper text"
          {...props}
        />
      </div>
    </div>
  )
}
