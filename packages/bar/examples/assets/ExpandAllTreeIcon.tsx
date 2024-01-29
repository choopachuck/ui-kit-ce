import * as React from 'react'

interface Props extends React.SVGAttributes<SVGElement> {}

export const ExpandAllTreeIcon: React.FC<Props> = ({
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
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.5 19.5H15V21H19.5V19.5Z" fill="white" fillOpacity="0.87" />
      <path d="M21 13.5H15V15H21V13.5Z" fill="white" fillOpacity="0.87" />
      <path d="M22.5 7.5H15V9H22.5V7.5Z" fill="white" fillOpacity="0.87" />
      <path d="M12.75 3H11.25V21H12.75V3Z" fill="white" fillOpacity="0.87" />
      <path
        d="M7.9395 2.96926L5.25 5.43676L2.559 2.96851L1.5 4.02976L5.25 7.50001L9 4.02976L7.9395 2.96926Z"
        fill="white"
        fillOpacity="0.87"
      />
    </svg>
  )
}

ExpandAllTreeIcon.displayName = 'ExpandAllTreeIcon'
