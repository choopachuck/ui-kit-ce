import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

// TEMPORARY COMPONENT FOR PRESENTATION PURPOSES
export const IndeterminateIcon = ({
  width = 20,
  height = 20,
  fill = 'currentColor',
  ...props
}: Props): React.ReactElement => {
  return (
    <svg
      width={width}
      height={height}
      fill={fill}
      {...props}
      viewBox="0 0 20 20"
    >
      <g>
        <line x1="5" y1="10" x2="15" y2="10" />
      </g>
    </svg>
  )
}

IndeterminateIcon.displayName = 'IndeterminateIcon'
