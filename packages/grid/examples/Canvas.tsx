import * as React from 'react'
import { Grid, GridItem, BreakpointValue } from '@v-uik/base'

const colors = ['#eee', 'coral', 'palevioletred', 'lightblue']

const getCellStyle = (color: string): React.CSSProperties => ({
  backgroundColor: color,
  padding: 20,
  borderRadius: 4,
  textAlign: 'center',
  boxShadow: `0 2px 2px ${color}`,
})

const items: {
  xs: BreakpointValue
  sm: BreakpointValue
  md: BreakpointValue
  lg: BreakpointValue
  xl: BreakpointValue
  xxl: BreakpointValue
  children: string
}[] = [
  {
    xs: 16,
    sm: 8,
    md: 6,
    lg: 4,
    xl: 3,
    xxl: 2,
    children: 'xs=16, sm=8, md=6, lg=4, xl=3, xxl=2',
  },
  {
    xs: 16,
    sm: 8,
    md: 6,
    lg: 4,
    xl: 3,
    xxl: 2,
    children: 'xs=16, sm=8, md=6, lg=4, xl=3, xxl=2',
  },
  {
    xs: 16,
    sm: 8,
    md: 6,
    lg: 4,
    xl: 3,
    xxl: 'auto',
    children: 'xs=16, sm=8, md=6, lg=4, xl=2, xxl=auto',
  },
]

export default () => {
  return (
    <Grid>
      {items.map((item, index) => {
        const { children, ...props } = item

        const color =
          index === 0 || index === 1
            ? colors[index]
            : colors[index % colors.length]

        return (
          <GridItem key={`${index}_${children}`} {...props}>
            <div style={getCellStyle(color)}>{children}</div>
          </GridItem>
        )
      })}
    </Grid>
  )
}
