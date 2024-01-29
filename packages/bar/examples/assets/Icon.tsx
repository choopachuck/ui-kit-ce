import * as React from 'react'

interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M20,2 C21.6568542,2 23,3.34314575 23,5 L23,20 C23,21.6568542 21.6568542,23 20,23 L5,23 C3.34314575,23 2,21.6568542 2,20 L2,5 C2,3.34314575 3.34314575,2 5,2 L20,2 Z M20,3.5 L5,3.5 C4.17157288,3.5 3.5,4.17157288 3.5,5 L3.5,5 L3.5,20 C3.5,20.8284271 4.17157288,21.5 5,21.5 L5,21.5 L20,21.5 C20.8284271,21.5 21.5,20.8284271 21.5,20 L21.5,20 L21.5,5 C21.5,4.17157288 20.8284271,3.5 20,3.5 L20,3.5 Z M11,2 L14,2 L14,3.5 L11,3.5 L11,2 Z M2,11 L3.5,11 L3.5,14 L2,14 L2,11 Z M11,21.5 L14,21.5 L14,23 L11,23 L11,21.5 Z M21.5,11 L23,11 L23,14 L21.5,14 L21.5,11 Z' // eslint-disable-line max-len

// TEMPORARY COMPONENT FOR PRESENTATION PURPOSES
export const Icon: React.FC<Props> = ({
  width = 24,
  height = 24,
  fill = 'currentColor',
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill={fill}
      {...props}
      viewBox="0 0 25 25"
    >
      <path d={svgPath} fillRule="evenodd" />
    </svg>
  )
}

Icon.displayName = 'Icon'
