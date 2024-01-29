import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M12.75 11.25V3H11.25V11.25H3V12.75H11.25V21H12.75V12.75H21V11.25H12.75Z' // eslint-disable-line max-len

// TEMPORARY COMPONENT FOR PRESENTATION PURPOSES
export const IconAdd: React.FC<Props> = ({
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

IconAdd.displayName = 'IconAdd'
