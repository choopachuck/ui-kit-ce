import * as React from 'react'

export interface Props extends React.SVGAttributes<SVGElement> {}

const svgPath =
  'M11.1134 1.86114C11.4873 1.14456 12.5127 1.14456 12.8866 1.86114L21.5873 18.5374C21.9346 19.2032 21.4516 20 20.7007 20H3.29933C2.54839 20 2.06538 19.2032 2.41274 18.5374L11.1134 1.86114Z' // eslint-disable-line max-len
const svgPath_2 =
  'M11.0436 16.062C11.0436 15.7353 11.1323 15.4693 11.3096 15.264C11.487 15.0587 11.7856 14.956 12.2056 14.956C12.6256 14.956 12.929 15.0587 13.1156 15.264C13.3023 15.4693 13.3956 15.7353 13.3956 16.062C13.3956 16.3887 13.3023 16.6547 13.1156 16.86C12.929 17.0653 12.6256 17.168 12.2056 17.168C11.8043 17.168 11.5103 17.0653 11.3236 16.86C11.137 16.6453 11.0436 16.3793 11.0436 16.062ZM11.2676 7.2H13.1576L13.0456 13.64H11.3656L11.2676 7.2Z' // eslint-disable-line max-len

// TODO: replace with new icon later
export const ErrorIcon: React.FC<Props> = ({
  width = 24,
  height = 24,
  viewBox = '0 0 24 22',
  fill = 'currentColor',
  ...props
}: Props) => {
  return (
    <svg {...props} width={width} height={height} viewBox={viewBox} fill={fill}>
      <path
        d={svgPath}
        fillRule="evenodd"
        stroke="currentColor"
        strokeWidth={2}
        fill="none"
      />
      <path d={svgPath_2} fillRule="evenodd" />
    </svg>
  )
}

ErrorIcon.displayName = 'ErrorIcon'
