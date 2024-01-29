import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M9,7 L9,12 L7,12 L7,7 L9,7 Z M9,4 L9,6 L7,6 L7,4 L9,4 Z' // eslint-disable-line max-len

// TEMPORARY COMPONENT FOR PRESENTATION PURPOSES
export const InfoIcon = React.forwardRef(
  (
    { width = 20, height = 20, fill = 'currentColor', ...props }: Props,
    ref: React.Ref<SVGSVGElement>
  ): React.ReactElement => {
    return (
      <svg
        width={width}
        height={height}
        fill={fill}
        {...props}
        ref={ref}
        viewBox="0 0 16 16"
      >
        <path d={svgPath} fillRule="evenodd" />
      </svg>
    )
  }
)

InfoIcon.displayName = 'InfoIcon'
