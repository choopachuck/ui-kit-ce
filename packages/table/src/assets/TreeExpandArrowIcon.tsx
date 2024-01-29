import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath = 'M9 18V6L15 12L9 18Z'

// TODO: replace with new icon later
export const TreeExpandArrowIcon: React.FC<Props> = ({
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  fill = 'currentColor',
  ...props
}: Props) => {
  return (
    <svg {...props} width={width} height={height} viewBox={viewBox} fill={fill}>
      <path d={svgPath} fillRule="evenodd" />
    </svg>
  )
}

TreeExpandArrowIcon.displayName = 'TreeExpandArrowIcon'
