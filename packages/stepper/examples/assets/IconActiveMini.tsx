import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

// TEMPORARY COMPONENT FOR PRESENTATION PURPOSES
export const IconActiveMini: React.FC<Props> = ({
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  fill = 'currentColor',
  ...props
}: Props) => {
  return (
    <svg {...props} width={width} height={height} viewBox={viewBox} fill={fill}>
      <circle cx="12" cy="12" r="6" />
    </svg>
  )
}

IconActiveMini.displayName = 'IconActiveMini'
