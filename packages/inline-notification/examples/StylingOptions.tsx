/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react'
import { InlineNotification, Button, createUseStyles } from '@v-uik/base'

const useStyles = createUseStyles({
  root: {
    borderRadius: 0,
    justifyContent: 'center',
  },
  bodyWrapper: {
    flexGrow: 0,
  },
})

const actions = (
  <Button kind="outlined" color="secondary">
    Button
  </Button>
)

export const StylingOptions = (): React.ReactElement => {
  const styles = useStyles()

  return (
    <InlineNotification
      title="Внимание"
      status="info"
      showIndicator={false}
      kind="filled"
      actions={actions}
      classes={styles}
    >
      Одна строка основного текста для описания.
    </InlineNotification>
  )
}
