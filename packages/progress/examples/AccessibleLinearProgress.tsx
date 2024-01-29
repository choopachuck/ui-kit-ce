import * as React from 'react'
import { LinearProgress, createUseStyles, clsx, useText } from '@v-uik/base'

const useStyles = createUseStyles((theme) => ({
  label: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: theme.sys.color.onBackgroundLow,
    marginBottom: 12,
  },
}))

export const AccessibleLinearProgress = (): JSX.Element => {
  const styles = useStyles()
  const textStyles = useText()

  return (
    <>
      <label className={clsx(styles.label, textStyles.caption)} id="cp-label">
        Main label
      </label>
      <LinearProgress
        value={47}
        trackProps={{
          'aria-labelledby': 'cp-label',
        }}
      />
    </>
  )
}
