import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M17.0962 9.93936L15.682 8.52515L11.4393 12.7678L9.31802 10.6465L7.90381 12.0607L11.4393 15.5962L17.0962 9.93936Z' // eslint-disable-line max-len

// TEMPORARY COMPONENT FOR PRESENTATION PURPOSES
export const IconCompletedMini: React.FC<Props> = ({
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

IconCompletedMini.displayName = 'IconCompletedMini'
