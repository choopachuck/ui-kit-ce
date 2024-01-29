import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M12 4.99778L11 3.99792L7.99799 7.00077L4.99546 4.00055L3.99561 5.00055L6.9975 8.00156L4.00056 10.9994L4.99816 12.005L7.99853 9.0023L10.9971 11.9999L12.0027 11.0024L8.99902 8.00103L12 4.99778Z' // eslint-disable-line max-len

// TODO: replace with new icon later
export const DeleteIcon: React.FC<Props> = ({
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

DeleteIcon.displayName = 'DeleteIcon'
