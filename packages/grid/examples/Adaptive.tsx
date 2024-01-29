import * as React from 'react'
import { Grid, GridItem } from '@v-uik/base'

export const Adaptive = (): JSX.Element => {
  const colors = ['#eee', 'coral', 'palevioletred', 'lightblue']
  const getCellStyle = (color: string) => ({
    backgroundColor: color,
    padding: 20,
    borderRadius: 4,
    textAlign: 'center' as const,
    boxShadow: `0 2px 2px ${color}`,
  })
  const items = [
    {
      xs: 16,
      sm: 8,
      md: 6,
      lg: 4,
      xl: 4,
      xxl: 2,
      children: 'xs=16, sm=8, md=6, lg=4, xl=4, xxl=2',
    },
    {
      xs: 16,
      sm: 8,
      md: 6,
      lg: 4,
      xl: 4,
      xxl: 2,
      children: 'xs=16, sm=8, md=6, lg=4, xl=4, xxl=2',
    },
    {
      xs: 16,
      sm: 8,
      md: 6,
      lg: 4,
      xl: 'auto' as const,
      xxl: 'auto' as const,
      children: 'xs=16, sm=8, md=6, lg=4, xl=auto, xxl=auto',
    },
  ]

  return (
    <Grid spacing={2}>
      {items.map((item, index) => {
        const color =
          index === 0 || index === 1
            ? colors[index]
            : colors[index % colors.length]

        return (
          <GridItem key={`${index}_${item.children}`} {...item}>
            <div style={getCellStyle(color)}>{item.children}</div>
          </GridItem>
        )
      })}
    </Grid>
  )
}
