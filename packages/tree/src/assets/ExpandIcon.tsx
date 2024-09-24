import React from 'react'
import { ComponentPropsWithRefFix } from '@v-uik/common/src'

export const ExpandIcon: React.FC<ComponentPropsWithRefFix<'svg'>> = (
  props
) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M9 6.00024C9 5.10024 10 4.70024 10.6 5.20024L10.7 5.30024L16.7 11.3002C17.1 11.7002 17.1 12.2002 16.8 12.6002L16.7 12.7002L10.7 18.7002L10.6 18.8002L10.5 18.9002L10.4 19.0002H10.3H10.2H10.1H10H9.9H9.8H9.7H9.6H9.5H9.4L9.3 18.9002L9.2 18.8002L9.1 18.7002L9 18.6002L8.9 18.5002L8.8 18.4002V18.3002V18.2002V18.1002V18.0002V17.9002L9 6.00024Z" />
  </svg>
)
