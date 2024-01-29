'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { omit } from '@v-uik/utils'

import { GridItemProps } from './GridItem'
import { GridProps } from './types'
import { useGridDynamicValues } from './hooks'

const pathsToOmit = [
  'justify',
  'alignItems',
  'nowrap',
  'spacing',
  'rowSpacing',
  'columnSpacing',
]

type StylesProps = {
  nowrap?: GridProps['nowrap']
  spacing: [number, number]
  alignItems: GridProps['alignItems']
  justify: GridProps['justify']
}

const getDynamicStyles = (props: StylesProps) => ({
  grid: {
    alignItems: props.alignItems,
    justifyContent: props.justify,
    marginTop: props.spacing[0] && -props.spacing[0],
    marginLeft: props.spacing[1] && -props.spacing[1],
  },
  item: {
    paddingTop: props.spacing[0],
    paddingLeft: props.spacing[1],
  },
})

const useStyles = createUseStyles({
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    '&$noWrap': {
      flexWrap: 'nowrap',
    },
    boxSizing: 'border-box',
  },

  noWrap: {},

  item: {},
})

export const Grid = React.forwardRef(
  (
    {
      justify = 'flex-start',
      alignItems = 'stretch',
      nowrap = false,
      ...props
    }: GridProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const { screen, columns, spacing } = useGridDynamicValues({
      columns: props.columns,
      spacing: props.spacing,
      rowSpacing: props.rowSpacing,
      columnSpacing: props.columnSpacing,
    })

    const classes = useStyles()
    const dynamicStyles = getDynamicStyles({
      ...props,
      justify,
      alignItems,
      spacing,
    } as StylesProps)
    const className = clsx(props.className, classes.grid, {
      [classes.noWrap]: nowrap,
    })

    const children = React.Children.map(props.children, (child) => {
      if (React.isValidElement<GridItemProps>(child)) {
        const className = clsx(child.props.className, classes.item)
        const style = { ...dynamicStyles.item, ...(child.props.style ?? {}) }

        return React.cloneElement(child, { className, screen, columns, style })
      }

      return null
    })

    const omittedProps = omit<GridProps>(props, pathsToOmit)

    return (
      <div
        {...omittedProps}
        ref={ref}
        style={{ ...dynamicStyles.grid, ...(omittedProps.style ?? {}) }}
        className={className}
      >
        {children}
      </div>
    )
  }
)
