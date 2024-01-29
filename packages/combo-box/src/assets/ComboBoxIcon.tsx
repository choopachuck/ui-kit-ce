import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath = 'M6 9H18L12 15L6 9Z'

// TODO: replace with new icon later
export const ComboBoxIcon: React.FC<Props> = ({
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

ComboBoxIcon.displayName = 'ComboBoxIcon'
