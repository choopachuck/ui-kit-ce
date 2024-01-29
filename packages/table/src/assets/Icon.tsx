import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {
  direction: 'prev' | 'next' | 'lastPage' | 'firstPage'
}

export const Icon: React.FC<Props> = ({
  direction,
  width = 40,
  height = 40,
  fill = 'currentColor',
  ...rest
}) => {
  return (
    <svg
      {...rest}
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 40 40"
    >
      {direction === 'prev' && (
        <>
          <rect width="40" height="40" fill="white" fillOpacity="0.01" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 15.499L22.4 14L16 19.9995L22.4 26L24 24.4999L19.2 19.9995L24 15.499Z"
            fill="black"
          />
        </>
      )}

      {direction === 'lastPage' && (
        <>
          <rect width="40" height="40" fill="white" fillOpacity="0.01" />
          <path
            d="M15.6 14L14 15.499L18.8 19.9995L14 24.4999L15.6 26L22 19.9995L15.6 14Z"
            fill="#363636"
          />
          <path d="M26 14H23.75V26H26V14Z" fill="#363636" />
        </>
      )}

      {direction === 'next' && (
        <>
          <rect width="40" height="40" fill="white" fillOpacity="0.01" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 15.499L17.6 14L24 19.9995L17.6 26L16 24.4999L20.8 19.9995L16 15.499Z"
            fill="black"
          />
        </>
      )}

      {direction === 'firstPage' && (
        <>
          <rect width="40" height="40" fill="white" fillOpacity="0.01" />
          <path
            d="M24.4 26L26 24.501L21.2 20.0006L26 15.5001L24.4 14L18 20.0006L24.4 26Z"
            fill="black"
          />
          <path d="M14 26H16.25L16.25 14L14 14L14 26Z" fill="black" />
        </>
      )}
    </svg>
  )
}

Icon.displayName = 'Icon'
