import * as React from 'react'
import { LinearProgress, useText, createUseStyles, clsx } from '@v-uik/base'

const useStyles = createUseStyles((theme) => ({
  label: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: theme.sys.color.onBackgroundLow,
  },

  element: {
    marginBottom: 20,
    '&:nth-child(2)': {
      marginBottom: 80,
    },
  },

  inlinePercentage: {
    display: 'flex',
    alignItems: 'center',
  },

  barPercentage: {
    marginLeft: 8,
    color: theme.sys.color.onBackgroundHigh,
  },

  progress: {
    flex: 1,
  },
}))

export const ControlledProgress = ({
  runInterval = true,
}: {
  runInterval?: boolean
}): JSX.Element => {
  const classList = useStyles()
  const textClasses = useText()

  const size = 728
  const [progress, setProgress] = React.useState(500)

  React.useEffect(() => {
    if (!runInterval) {
      return
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const advancement = Math.random() * 8

        if (prev + advancement > size) {
          return 0
        }

        return prev + advancement
      })
    }, 150)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const percentage = React.useMemo(() => {
    let cappedValue = progress

    if (cappedValue > size) {
      cappedValue = size
    }
    if (cappedValue < 0) {
      cappedValue = 0
    }

    return Math.ceil((cappedValue / size) * 100)
  }, [progress])

  const labelClassName = clsx(classList.label, textClasses.caption)
  const barPercentageClassName = clsx(
    classList.barPercentage,
    textClasses.body1
  )

  return (
    <>
      <div className={classList.element}>
        <div className={labelClassName} style={{ marginBottom: 12 }}>
          Main label 1<span>{percentage}%</span>
        </div>
        <LinearProgress value={progress} max={size} />
      </div>

      <div className={classList.element}>
        <div className={labelClassName} style={{ marginBottom: 8 }}>
          Main label 2
        </div>
        <div className={classList.inlinePercentage}>
          <div className={classList.progress}>
            <LinearProgress value={progress} max={size} />
          </div>
          <span className={barPercentageClassName}>{percentage}%</span>
        </div>
      </div>

      <div className={classList.element}>
        <div className={labelClassName} style={{ marginBottom: 12 }}>
          Main label 3<span>{percentage}%</span>
        </div>
        <LinearProgress hideTrack value={progress} max={size} />
      </div>

      <div className={classList.element}>
        <div className={labelClassName} style={{ marginBottom: 8 }}>
          Main label 4
        </div>
        <div className={classList.inlinePercentage}>
          <div className={classList.progress}>
            <LinearProgress hideTrack value={progress} max={size} />
          </div>
          <span className={barPercentageClassName}>{percentage}%</span>
        </div>
      </div>
    </>
  )
}
