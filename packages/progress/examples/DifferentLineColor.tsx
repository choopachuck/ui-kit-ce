import React from 'react'
import { LinearProgress, useTheme } from '@v-uik/base'

export const DifferentLineColor = (): JSX.Element => {
  const theme = useTheme()

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <LinearProgress color="purple" size="lg" />
      </div>

      <div style={{ marginBottom: 40 }}>
        <LinearProgress color="#008000" size="lg" />
      </div>

      <div style={{ marginBottom: 40 }}>
        <LinearProgress color={theme.sys.color.errorAlpha} size="lg" />
      </div>
    </div>
  )
}
