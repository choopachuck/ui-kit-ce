import React from 'react'
import { LinearProgress, useText, createUseStyles, clsx } from '@v-uik/base'

const useStyles = createUseStyles((theme) => {
  return {
    label: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
      color: theme.sys.color.onBackgroundLow,
    },

    element: {
      marginBottom: 20,

      '&:nth-child(3)': {
        marginBottom: 80,
      },
    },
  }
})

export const IndeterminateProgress = (): JSX.Element => {
  const classList = useStyles()
  const textClassList = useText()
  const labelClassName = clsx(classList.label, textClassList.caption)

  return (
    <>
      <div className={classList.element}>
        <span className={labelClassName}>Sm</span>
        <LinearProgress size="sm" />
      </div>

      <div className={classList.element}>
        <span className={labelClassName}>Md</span>

        <LinearProgress size="md" />
      </div>

      <div className={classList.element}>
        <span className={labelClassName}>Lg</span>

        <LinearProgress size="lg" />
      </div>

      <div className={classList.element}>
        <span className={labelClassName}>Sm without track</span>
        <LinearProgress hideTrack size="sm" />
      </div>

      <div className={classList.element}>
        <span className={labelClassName}>Md without track</span>

        <LinearProgress hideTrack size="md" />
      </div>

      <div className={classList.element}>
        <span className={labelClassName}>Lg without track</span>

        <LinearProgress hideTrack size="lg" />
      </div>
    </>
  )
}
