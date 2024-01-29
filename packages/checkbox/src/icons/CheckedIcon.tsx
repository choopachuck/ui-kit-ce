import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

// TEMPORARY COMPONENT FOR PRESENTATION PURPOSES
export const CheckedIcon = ({
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
        <polyline points="5,11 8,14 15,7" fill="none" />
      </g>
    </svg>
  )
}

CheckedIcon.displayName = 'CheckedIcon'
