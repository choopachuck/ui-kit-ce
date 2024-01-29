import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M17.5011 6.5L19 8L10.5 16.5L6 12L7.5 10.5L10.5 13.5L17.5011 6.5Z'

// TODO: replace with new icon later
export const NumberIconCompleted: React.FC<Props> = ({
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  fill = 'currentColor',
  ...props
}: Props) => {
  return (
    <svg {...props} width={width} height={height} viewBox={viewBox} fill={fill}>
      <circle
        cx="12"
        cy="12"
        r="11"
        stroke="currentColor"
        strokeWidth="2"
        fill="transparent"
      />
      <path d={svgPath} fillRule="evenodd" />
    </svg>
  )
}

NumberIconCompleted.displayName = 'NumberIconCompleted'
