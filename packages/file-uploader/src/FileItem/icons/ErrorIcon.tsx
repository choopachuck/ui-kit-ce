import * as React from 'react'
import { FileItemIconProps } from '../types'

const ErrorIcon: React.FC<FileItemIconProps> = ({
  width = 24,
  height = 24,
  fill = 'none',
  viewBox = '0 0 24 24',
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
        fill="#E31607"
        fillRule="evenodd"
        d="M22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12Zm-9-1.5V18h-3v-7.5h3Zm0-1.5V6h-3v3h3Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default React.memo(ErrorIcon)
