import React from 'react'
import { CircularProgress, Text } from '@v-uik/base'

export const AccessibleCircularProgress = (): JSX.Element => {
  return (
    <>
      <Text gutterBottom id="circular-label">
        Main label
      </Text>
      <CircularProgress size="xlg" aria-labelledby="circular-label" />
    </>
  )
}
