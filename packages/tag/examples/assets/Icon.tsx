import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M3 1C1.89543 1 1 1.89543 1 3V7H2V3C2 2.44772 2.44772 2 3 2H7V1H3ZM2 9H1V13C1 14.1046 1.89543 15 3 15H7V14H3C2.44772 14 2 13.5523 2 13V9ZM13 15H9V14H13C13.5523 14 14 13.5523 14 13V9H15V13C15 14.1046 14.1046 15 13 15ZM15 7V3C15 1.89543 14.1046 1 13 1H9V2H13C13.5523 2 14 2.44772 14 3V7H15Z' // eslint-disable-line max-len

// TEMPORARY COMPONENT FOR PRESENTATION PURPOSES
export const Icon: React.FC<Props> = ({
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

Icon.displayName = 'Icon'
