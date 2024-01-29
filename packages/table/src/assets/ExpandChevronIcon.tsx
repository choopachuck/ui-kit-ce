import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M16.501 8L18 9.6L12.0005 16L6 9.6L7.50014 8L12.0005 12.8L16.501 8Z'

// TODO: replace with new icon later
export const ExpandChevronIcon: React.FC<Props> = ({
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  fill = 'currentColor',
  ...props
}: Props) => {
  return (
    <svg {...props} width={width} viewBox={viewBox} fill={fill} height={height}>
      <path d={svgPath} fillRule="evenodd" />
    </svg>
  )
}

ExpandChevronIcon.displayName = 'ExpandChevronIcon'
