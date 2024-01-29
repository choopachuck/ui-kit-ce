import * as React from 'react'
import { CircularProgress, useText, createUseStyles, clsx } from '@v-uik/base'

const useStyles = createUseStyles((theme) => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
    },

    element: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginRight: 40,
    },

    label: {
      color: theme.sys.color.onBackgroundLow,
    },

    loader: {
      marginBottom: 8,
    },
  }
})

export const Progress: React.FC<{ action?: boolean }> = ({
  action = true,
}): JSX.Element => {
  const classList = useStyles()
  const textClassList = useText()

  const labelClassName = clsx(classList.label, textClassList.caption)

  const size = 100
  const [progress, setProgress] = React.useState(10)

  React.useEffect(() => {
    if (!action) {
      return
    }
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= size ? 0 : prevProgress + 10
      )
    }, 800)

    return () => {
      if (!action) {
        return
      }
      clearInterval(timer)
    }
  }, [])

  const percentage = Math.round((progress / size) * 100)

  return (
    <div className={classList.root}>
      <div className={classList.element}>
        <CircularProgress
          hideTrack
          className={classList.loader}
          size="xlg"
          value={progress}
          max={size}
          percentageInsideCircle={`${percentage}%`}
        />
      </div>

      <div className={classList.element}>
        <CircularProgress
          color="purple"
          className={classList.loader}
          size="lg"
          value={progress}
          max={size}
        />
        <span className={labelClassName}>Label {percentage}%</span>
      </div>

      <div className={classList.element}>
        <CircularProgress
          hideTrack
          className={classList.loader}
          size="md"
          value={progress}
          max={size}
        />
        <span className={labelClassName}>Label {percentage}%</span>
      </div>

      <div className={classList.element}>
        <CircularProgress
          className={classList.loader}
          size="sm"
          value={progress}
          max={size}
        />
        <span className={labelClassName}>Label {percentage}%</span>
      </div>
    </div>
  )
}
