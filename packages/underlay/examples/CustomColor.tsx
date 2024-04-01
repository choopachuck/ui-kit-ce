import React from 'react'
import { Underlay, Text, useTheme } from '@v-uik/base'

export const CustomColor = () => {
  const theme = useTheme()

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <Underlay kind="filled" color={theme.ref.palette.amber90}>
        <Text>custom color filled</Text>
      </Underlay>
      <Underlay kind="outlined" color={theme.ref.palette.amber50}>
        <Text>custom color outlined</Text>
      </Underlay>
    </div>
  )
}
