import React from 'react'
import { CircularProgress, useTheme } from '@v-uik/base'

export const DifferentCircularLineColor = (): JSX.Element => {
  const theme = useTheme()

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: 40 }}>
        <CircularProgress color="purple" />
      </div>

      <div style={{ marginRight: 40 }}>
        <CircularProgress color="#008000" />
      </div>

      <div style={{ marginRight: 40 }}>
        <CircularProgress color={theme.sys.color.errorAlpha} />
      </div>
    </div>
  )
}
