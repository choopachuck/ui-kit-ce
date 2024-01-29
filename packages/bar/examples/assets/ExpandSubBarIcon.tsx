import * as React from 'react'

interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M3 4.5H21V6H3V4.5ZM7.5 9H21V10.5H7.5V9ZM21 13.5H7.5V15H21V13.5ZM3 18H21V19.5H3V18ZM6 12L3 9V15L6 12Z'

export const ExpandSubBarIcon: React.FC<Props> = ({
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

ExpandSubBarIcon.displayName = 'ExpandSubBarIcon'
