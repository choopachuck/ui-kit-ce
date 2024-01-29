import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath = 'M8 2L7 1L3 5L1 3L0 4L3.00001 6.99999L8 2Z'

export const CompletedBadgeIcon: React.FC<Props> = ({
  width = 8,
  height = 8,
  viewBox = '0 0 8 8',
  fill = 'currentColor',
  ...props
}: Props) => {
  return (
    <svg {...props} width={width} height={height} viewBox={viewBox} fill={fill}>
      <path d={svgPath} fillRule="evenodd" />
    </svg>
  )
}

CompletedBadgeIcon.displayName = 'CompletedBadgeIcon'
