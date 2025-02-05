import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M17.996 7.49846L16.4973 6L11.9983 10.5003L7.49846 6.00394L6 7.50261L10.4989 12.0002L6.00743 16.4929L7.50251 18L11.9991 13.4999L16.4929 17.9925L18 16.4974L13.4985 11.9994L17.996 7.49846Z' // eslint-disable-line max-len

// TEMPORARY COMPONENT FOR PRESENTATION PURPOSES
export const IconClose: React.FC<Props> = ({
  width = 24,
  height = 24,
  fill = 'currentColor',
  ...props
}) => {
  return (
    <svg
      {...props}
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 24 24"
    >
      <path d={svgPath} fillRule="evenodd" />
    </svg>
  )
}

IconClose.displayName = 'IconClose'
