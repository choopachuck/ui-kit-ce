import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath = 'M8.5 7.5V2H7.5V7.5H2V8.5H7.5V14H8.5V8.5H14V7.5H8.5Z' // eslint-disable-line max-len

// TODO: replace with new icon later
export const AddIcon: React.FC<Props> = ({
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

AddIcon.displayName = 'AddIcon'
