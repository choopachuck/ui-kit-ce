import * as React from 'react'

interface EyeIconProps extends React.SVGAttributes<SVGElement> {}

export const EyeIcon: React.FC<EyeIconProps> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.23942 11.3761L2.24816 11.3665C8.64969 4.21118 15.3503 4.21118 21.7519 11.3665L21.7606 11.3761C22.0868 11.7411 22.0756 12.282 21.7519 12.6335C15.3503 19.7888 8.64969 19.7888 2.24816 12.6335C1.92444 12.282 1.91318 11.7411 2.23942 11.3761ZM12 16.8C14.7614 16.8 17 14.651 17 12C17 9.34903 14.7614 7.2 12 7.2C9.2386 7.2 7.00003 9.34903 7.00003 12C7.00003 14.651 9.2386 16.8 12 16.8ZM14.5 12C14.5 13.3255 13.3807 14.4 12 14.4C10.6193 14.4 9.50003 13.3255 9.50003 12C9.50003 10.6745 10.6193 9.6 12 9.6C13.3807 9.6 14.5 10.6745 14.5 12Z"
        fill="black"
      />
    </svg>
  )
}
