import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M8 7.49904L9.6 6L16 11.9995L9.6 18L8 16.4999L12.8 11.9995L8 7.49904Z'

// TODO: replace with new icon later
export const ChevronRightIcon: React.FC<Props> = ({
  width = 24,
  height = 24,
  fill = 'currentColor',
  ...props
}: Props) => {
  return (
    <svg
      width={width}
      height={height}
      fill={fill}
      {...props}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd" d={svgPath} />
    </svg>
  )
}

ChevronRightIcon.displayName = 'ChevronRightIcon'
