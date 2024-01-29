import * as React from 'react'

interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5C6.20101 1.5 1.5 6.20101 1.5 12C1.5 17.799 6.20101 22.5 12 22.5ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM13.5 10.5V18H10.5V10.5H13.5ZM13.5 9V6H10.5V9H13.5Z' // eslint-disable-line max-len

// TODO: replace with new icon later
export const IconInfo: React.FC<Props> = ({
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

IconInfo.displayName = 'IconInfo'
