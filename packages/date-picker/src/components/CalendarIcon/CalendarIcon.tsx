import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M7.5 1.5H4.5V4.5H3C2.17157 4.5 1.5 5.17157 1.5 6V21C1.5 21.8284 2.17157 22.5 3 22.5H21C21.8284 22.5 22.5 21.8284 22.5 21V6C22.5 5.17157 21.8284 4.5 21 4.5H19.5V1.5H16.5V4.5H7.5V1.5ZM21 10.5H3V21H21V10.5ZM16.5 16.5H19.5V19.5H16.5V16.5Z' // eslint-disable-line max-len

// TODO: replace with new icon later
export const CalendarIcon: React.FC<Props> = ({
  width = 24,
  height = 24,
  fill = 'currentColor',
  ...props
}: Props) => {
  return (
    <svg
      width={width}
      height={height}
      fill={fill}
      {...props}
      viewBox="0 0 24 24"
    >
      <path d={svgPath} fillRule="evenodd" />
    </svg>
  )
}

CalendarIcon.displayName = 'CalendarIcon'
