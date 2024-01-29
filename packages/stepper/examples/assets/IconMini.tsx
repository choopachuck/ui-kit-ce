import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M12.75 14C13.8546 14 14.75 13.1046 14.75 12C14.75 10.8954 13.8546 10 12.75 10C11.6454 10 10.75 10.8954 10.75 12C10.75 13.1046 11.6454 14 12.75 14ZM12.75 16C14.9591 16 16.75 14.2091 16.75 12C16.75 9.79086 14.9591 8 12.75 8C10.5409 8 8.75 9.79086 8.75 12C8.75 14.2091 10.5409 16 12.75 16Z' // eslint-disable-line max-len

// TEMPORARY COMPONENT FOR PRESENTATION PURPOSES
export const IconMini: React.FC<Props> = ({
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

IconMini.displayName = 'IconMini'
