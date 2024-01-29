import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M1.75 4.5C1.75 2.84315 3.09315 1.5 4.75 1.5H10.75V3H4.75C3.92157 3 3.25 3.67157 3.25 4.5V10.5H1.75V4.5ZM1.75 13.5H3.25V19.5C3.25 20.3284 3.92157 21 4.75 21H10.75V22.5H4.75C3.09315 22.5 1.75 21.1569 1.75 19.5V13.5ZM13.75 21V22.5H19.75C21.4069 22.5 22.75 21.1569 22.75 19.5V13.5H21.25V19.5C21.25 20.3284 20.5784 21 19.75 21H13.75ZM22.75 4.5V10.5H21.25V4.5C21.25 3.67157 20.5784 3 19.75 3H13.75V1.5H19.75C21.4069 1.5 22.75 2.84315 22.75 4.5ZM7.75 6C6.92157 6 6.25 6.67157 6.25 7.5V16.5C6.25 17.3284 6.92157 18 7.75 18H16.75C17.5784 18 18.25 17.3284 18.25 16.5V7.5C18.25 6.67157 17.5784 6 16.75 6H7.75Z' // eslint-disable-line max-len

// TEMPORARY COMPONENT FOR PRESENTATION PURPOSES
export const IconActive: React.FC<Props> = ({
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  fill = 'currentColor',
  ...props
}: Props) => {
  return (
    <svg {...props} width={width} height={height} viewBox={viewBox} fill={fill}>
      <path d={svgPath} fillRule="evenodd" />
    </svg>
  )
}

IconActive.displayName = 'IconActive'
