import * as React from 'react'

interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M22.5 12C22.5 17.799 17.799 22.5 12 22.5C6.20101 22.5 1.5 17.799 1.5 12C1.5 6.20101 6.20101 1.5 12 1.5C17.799 1.5 22.5 6.20101 22.5 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM18.7489 8.25L17.25 6.75L9.75 14.25L6.75 11.25L5.25 12.75L9.75 17.25L18.7489 8.25Z' // eslint-disable-line max-len

// TODO: replace with new icon later
export const IconSuccess: React.FC<Props> = ({
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  fill = 'currentColor',
  ...props
}) => {
  return (
    <svg {...props} width={width} height={height} viewBox={viewBox} fill={fill}>
      <path d={svgPath} fillRule="evenodd" />
    </svg>
  )
}

IconSuccess.displayName = 'IconSuccess'
