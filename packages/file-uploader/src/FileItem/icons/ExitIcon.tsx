import React from 'react'
import { FileItemIconProps } from '../types'

const ExitIcon: React.FC<FileItemIconProps> = ({
  width = 24,
  height = 24,
  fill = 'none',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        // fill="#000"
        fill="currentColor"
        fillOpacity=".9"
        fillRule="evenodd"
        d="M17.996 7.498 16.497 6l-4.499 4.5-4.5-4.496L6 7.503 10.499 12l-4.492 4.493L7.503 18l4.496-4.5 4.494 4.492L18 16.497 13.498 12l4.498-4.5Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default React.memo(ExitIcon)
