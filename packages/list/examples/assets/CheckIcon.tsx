import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {
  isSelected?: boolean
}

const svgPath = 'M18 6L19.4989 7.5L10.5 16.5L6 12L7.5 10.5L10.5 13.5L18 6Z'

// TODO: replace with new icon later
export const CheckIcon: React.FC<Props> = ({
  viewBox = '0 0 24 24',
  width = 24,
  height = 24,
  fill = 'currentColor',
  isSelected,
  ...props
}) => {
  return isSelected ? (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox={viewBox}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd" d={svgPath} />
    </svg>
  ) : (
    <div style={{ width: 24 }} />
  )
}
