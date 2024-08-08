import * as React from 'react'

interface DefaultSortIconProps {
  className: string
  classNameUpArrow?: string
  classNameDownArrow?: string
}

export function DefaultSortIcon({
  className,
  classNameUpArrow,
  classNameDownArrow,
}: DefaultSortIconProps): React.ReactElement {
  return (
    <svg
      aria-hidden
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={classNameUpArrow}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 14H16L12 18L8 14Z"
        fill="currentColor"
        data-testid="ArrowUp"
      />
      <path
        className={classNameDownArrow}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 10H16L12 6L8 10Z"
        fill="currentColor"
        data-testid="ArrowDown"
      />
    </svg>
  )
}
