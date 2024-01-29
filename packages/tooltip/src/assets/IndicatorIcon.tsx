import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8Z' // eslint-disable-line max-len

// TODO: replace with new icon later
export const IndicatorIcon: React.FC<Props> = ({
  width = 16,
  height = 16,
  fill = 'currentColor',
  ...props
}) => {
  return (
    <svg
      {...props}
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 16 16"
    >
      <path d={svgPath} fillRule="evenodd" />
    </svg>
  )
}

IndicatorIcon.displayName = 'IndicatorIcon'
