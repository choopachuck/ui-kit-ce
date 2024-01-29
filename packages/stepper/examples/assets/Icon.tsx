import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M4.5 1.5C2.84315 1.5 1.5 2.84315 1.5 4.5V10.5H3V4.5C3 3.67157 3.67157 3 4.5 3H10.5V1.5H4.5ZM3 13.5H1.5V19.5C1.5 21.1569 2.84315 22.5 4.5 22.5H10.5V21H4.5C3.67157 21 3 20.3284 3 19.5V13.5ZM19.5 22.5H13.5V21H19.5C20.3284 21 21 20.3284 21 19.5V13.5H22.5V19.5C22.5 21.1569 21.1569 22.5 19.5 22.5ZM22.5 10.5V4.5C22.5 2.84315 21.1569 1.5 19.5 1.5H13.5V3H19.5C20.3284 3 21 3.67157 21 4.5V10.5H22.5Z' // eslint-disable-line max-len

// TEMPORARY COMPONENT FOR PRESENTATION PURPOSES
export const Icon: React.FC<Props> = ({
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  fill = 'currentColor',
  ...props
}: Props) => {
  return (
    <svg {...props} width={width} height={height} fill={fill} viewBox={viewBox}>
      <path d={svgPath} fillRule="evenodd" />
    </svg>
  )
}

Icon.displayName = 'Icon'
