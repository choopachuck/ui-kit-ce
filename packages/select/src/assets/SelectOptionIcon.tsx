import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath = 'M18 6L19.4989 7.5L10.5 16.5L6 12L7.5 10.5L10.5 13.5L18 6Z'

// TODO: replace with new icon later
export const SelectOptionIcon: React.FC<Props> = ({
  viewBox = '0 0 24 24',
  width = 24,
  height = 24,
  fill = 'currentColor',
  ...props
}) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={height}
      fill={fill}
    >
      <path fillRule="evenodd" clipRule="evenodd" d={svgPath} />
    </svg>
  )
}

SelectOptionIcon.displayName = 'SelectOptionIcon'
