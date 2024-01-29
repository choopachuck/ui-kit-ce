import React from 'react'
import { CircularProgress } from '@v-uik/base'

export const ControlledCircularProgress = (): JSX.Element => {
  const [progress, setProgress] = React.useState(40)

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: 20 }}>
          <CircularProgress size="xlg" value={progress} max={100} />
        </div>

        <div style={{ marginRight: 20 }}>
          <CircularProgress size="lg" value={progress} max={100} />
        </div>

        <div style={{ marginRight: 20 }}>
          <CircularProgress size="md" value={progress} max={100} />
        </div>

        <div style={{ marginRight: 20 }}>
          <CircularProgress size="sm" value={progress} max={100} />
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <label>
          percent:
          <input
            style={{ marginLeft: 5 }}
            type="number"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
          />
        </label>
      </div>
    </>
  )
}
