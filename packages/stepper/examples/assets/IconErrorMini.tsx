import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath = 'M13 10H11V14H13V10ZM13 15H11V17H13V15Z'

// TEMPORARY COMPONENT FOR PRESENTATION PURPOSES
export const IconErrorMini: React.FC<Props> = ({
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  fill = 'currentColor',
  stroke = 'currentColor',
  ...props
}: Props) => {
  return (
    <svg
      {...props}
      width={width}
      viewBox={viewBox}
      height={height}
      fill={fill}
      stroke={stroke}
    >
      <path d="M5.80902 18.5L12 6.11803L18.191 18.5H5.80902Z" fill="none" />
      <path d={svgPath} fillRule="evenodd" clipRule="evenodd" stroke="none" />
    </svg>
  )
}

IconErrorMini.displayName = 'IconErrorMini'
