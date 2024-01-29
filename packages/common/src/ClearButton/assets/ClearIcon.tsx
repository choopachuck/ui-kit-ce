import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M18.0002 7.49673L16.5002 5.99695L11.9972 10.5012L7.49343 6.00089L5.99365 7.50089L10.4965 12.0024L6.00109 16.4991L7.49748 18.0075L11.998 13.5035L16.4958 18L18.0042 16.5036L13.4988 12.0016L18.0002 7.49673Z'

// TODO: replace with new icon later
export const ClearIcon: React.FC<Props> = ({
  viewBox = '0 0 24 24',
  width = 24,
  height = 24,
  fill = 'currentColor',
  ...props
}) => {
  return (
    <svg
      viewBox={viewBox}
      width={width}
      height={height}
      fill={fill}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd" d={svgPath} />
    </svg>
  )
}

ClearIcon.displayName = 'ClearIcon'
