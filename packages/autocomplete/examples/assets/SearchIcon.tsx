import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M15.5 8C15.5 12.1421 12.1421 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8ZM14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8ZM15.0983 14L14.0377 15.0607L20.4016 21.4246L21.4623 20.364L15.0983 14Z'

// TODO: replace with new icon later
export const SearchIcon: React.FC<Props> = ({
  viewBox = '0 0 24 24',
  width = 24,
  height = 24,
  fill = 'currentColor',
  ...props
}) => {
  return (
    <svg
      viewBox={viewBox}
      width={width}
      height={height}
      fill={fill}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd" d={svgPath} />
    </svg>
  )
}

SearchIcon.displayName = 'SearchIcon'
