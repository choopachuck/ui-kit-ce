import * as React from 'react'
import { Grid, GridItem } from '@v-uik/base'

export const DifferentColumnsGrid = (): JSX.Element => {
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
      xs: 24,
      sm: 8,
      children: 'xs=24, sm=8,',
    },
    {
      xs: 24,
      sm: 8,
      children: 'xs=24, sm=8',
    },
    {
      xs: 24,
      sm: 8,
      children: 'xs=24, sm=8',
    },
  ]

  return (
    <Grid columns={24}>
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
