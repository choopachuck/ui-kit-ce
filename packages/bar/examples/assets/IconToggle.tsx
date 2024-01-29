import * as React from 'react'

interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M3 4.5H21V6H3V4.5ZM7.5 9H21V10.5H7.5V9ZM21 13.5H7.5V15H21V13.5ZM3 18H21V19.5H3V18ZM6 12L3 9V15L6 12Z' // eslint-disable-line max-len
const svgPathOpened =
  'M12.3333 5H17V6.5H12.3333V5ZM12.3333 9.5H17V11H12.3333V9.5ZM17 14H12.3333V15.5H17V14ZM12.3333 18.5H17V20H12.3333V18.5ZM3.05556 12.5L6.05556 9.5V15.5L3.05556 12.5Z' // eslint-disable-line max-len

// TEMPORARY COMPONENT FOR PRESENTATION PURPOSES
export const IconToggle: React.FC<Props> = ({
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

IconToggle.displayName = 'IconToggle'

export const IconToggleOpened: React.FC<Props> = ({
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
      <path d={svgPathOpened} fillRule="evenodd" />
    </svg>
  )
}

IconToggleOpened.displayName = 'IconToggleOpened'
