import * as React from 'react'
import { FileItemIconProps } from '../types'

const SuccessIcon: React.FC<FileItemIconProps> = ({
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  fill = 'none',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      fill={fill}
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 22.5c5.799 0 10.5-4.701 10.5-10.5S17.799 1.5 12 1.5 1.5 6.201 1.5 12 6.201 22.5 12 22.5ZM18 9l-1.5-1.5-6 6-2.25-2.25-1.5 1.5 3.75 3.75L18 9Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default React.memo(SuccessIcon)
