import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M16 16.501L14.4 18L8 12.0005L14.4 6L16 7.50014L11.2 12.0005L16 16.501Z'

// TODO: replace with new icon later
export const ChevronLeftIcon: React.FC<Props> = ({
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

ChevronLeftIcon.displayName = 'ChevronLeftIcon'
