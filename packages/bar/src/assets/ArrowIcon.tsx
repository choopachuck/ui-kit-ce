import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M16.501 8L18 9.6L12.0005 16L6 9.6L7.50014 8L12.0005 12.8L16.501 8Z'

// TODO: replace with new icon later
export const ArrowIcon: React.FC<Props> = ({
  width = 24,
  height = 24,
  fill = 'currentColor',
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill={fill}
      {...props}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd" d={svgPath} />
    </svg>
  )
}

ArrowIcon.displayName = 'ArrowIcon'
