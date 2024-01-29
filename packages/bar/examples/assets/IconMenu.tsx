import * as React from 'react'

interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M1.5 1.5H6V6H1.5V1.5ZM1.5 9.75H6V14.25H1.5V9.75ZM14.25 1.5H9.75V6H14.25V1.5ZM9.75 9.75H14.25V14.25H9.75V9.75ZM22.5 1.5H18V6H22.5V1.5ZM18 9.75H22.5V14.25H18V9.75ZM6 18H1.5V22.5H6V18ZM9.75 18H14.25V22.5H9.75V18ZM22.5 18H18V22.5H22.5V18Z' // eslint-disable-line max-len

// TEMPORARY COMPONENT FOR PRESENTATION PURPOSES
export const IconMenu: React.FC<Props> = ({
  width = 24,
  height = 24,
  fill = 'currentColor',
  ...props
}) => {
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

IconMenu.displayName = 'IconMenu'
