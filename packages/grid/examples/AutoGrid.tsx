import * as React from 'react'
import { Grid, GridItem } from '@v-uik/base'

export const AutoGrid = (): JSX.Element => {
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
      children: '1 column',
      xs: 'auto' as const,
      md: 'auto' as const,
    },
    {
      children: '2 column',
      xs: 4,
      md: 'auto' as const,
    },
    {
      children: '3 column',
      xs: 3,
      md: 'auto' as const,
      lg: 'auto' as const,
    },
  ]

  return (
    <Grid
      spacing={{ xs: 0.5 }}
      columnSpacing={{ lg: 5 }}
      rowSpacing={{ md: 1 }}
      columns={{ xs: 4, sm: 8, lg: 12 }}
    >
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
