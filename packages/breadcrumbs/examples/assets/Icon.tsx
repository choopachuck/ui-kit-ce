import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M1 7.45993C1 7.16801 1.12756 6.89066 1.34921 6.70068L8 1L14.6508 6.70068C14.8724 6.89066 15 7.16801 15 7.45993V14C15 14.5523 14.5523 15 14 15H2C1.44772 15 1 14.5523 1 14V7.45993ZM6 9H10V15H6V9Z' // eslint-disable-line max-len

// TEMPORARY COMPONENT FOR PRESENTATION PURPOSES
export const Icon: React.FC<Props> = ({
  width = 16,
  height = 16,
  fill = 'currentColor',
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill={fill}
      {...props}
      viewBox="0 0 16 16"
    >
      <path d={svgPath} fillRule="evenodd" />
    </svg>
  )
}

Icon.displayName = 'Icon'
