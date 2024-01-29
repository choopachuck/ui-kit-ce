import * as React from 'react'

interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M22.5 4.5H1.5V6H22.5V4.5ZM22.5 9H1.5V10.5H22.5V9ZM1.5 13.5H22.5V15H1.5V13.5ZM22.5 18H1.5V19.5H22.5V18Z' // eslint-disable-line max-len

// TEMPORARY COMPONENT FOR PRESENTATION PURPOSES
export const IconBurger: React.FC<Props> = ({
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

IconBurger.displayName = 'IconBurger'
