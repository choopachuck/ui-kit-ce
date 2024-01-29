import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M22.5 12C22.5 17.799 17.799 22.5 12 22.5C6.20101 22.5 1.5 17.799 1.5 12C1.5 6.20101 6.20101 1.5 12 1.5C17.799 1.5 22.5 6.20101 22.5 12ZM13.5 10.5V18H10.5V10.5H13.5ZM13.5 9V6H10.5V9H13.5Z' // eslint-disable-line max-len

// TODO: replace with new icon later
export const ErrorIcon = React.forwardRef(
  (
    { width = 24, height = 24, fill = 'currentColor', ...props }: Props,
    ref: React.Ref<SVGSVGElement>
  ): React.ReactElement => {
    return (
      <svg
        {...props}
        ref={ref}
        viewBox="0 0 24 24"
        width={width}
        height={height}
        fill={fill}
      >
        <path d={svgPath} fillRule="evenodd" />
      </svg>
    )
  }
)

ErrorIcon.displayName = 'ErrorIcon'
