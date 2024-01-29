import * as React from 'react'
import { LabelledInput } from './LabelledInput'
import { createUseStyles } from '@v-uik/theme'

type WithKeepHelperTextMinHeightProps = {
  keepHelperTextMinHeight?: boolean
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

export const WithKeepHelperTextMinHeight = ({
  keepHelperTextMinHeight,
}: WithKeepHelperTextMinHeightProps): React.ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.containerItem}>
        <LabelledInput
          error
          keepHelperTextMinHeight={keepHelperTextMinHeight}
          label="Login"
          helperText="Error"
        />
      </div>
      <div>
        <LabelledInput
          keepHelperTextMinHeight={keepHelperTextMinHeight}
          label="Login"
        />
      </div>
    </div>
  )
}
