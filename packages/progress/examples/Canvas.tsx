import * as React from 'react'
import { LinearProgress, CircularProgress } from '@v-uik/base'

export default () => {
  return (
    <>
      <div style={{ marginBottom: 100 }}>
        <LinearProgress />
      </div>
      <CircularProgress />
    </>
  )
}
