import React from 'react'
import { ComponentPropsWithRefFix } from '@v-uik/common/src'

export const FoldIcon: React.FC<ComponentPropsWithRefFix<'svg'>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12.0644 16.998C12.3074 16.9827 12.5365 16.8793 12.7087 16.7071L18.7087 10.7071L18.7847 10.6231C19.2987 9.98614 18.8537 9.00014 18.0017 9.00014L6.0017 8.9999C5.1497 8.9999 4.7047 9.9859 5.2187 10.6229L5.2947 10.7069L11.2947 16.7069C11.4669 16.8791 11.696 16.9825 11.939 16.9978C11.9599 16.9991 11.9809 17 12.0017 17C12.0226 17 12.0435 16.9993 12.0644 16.998Z" />
  </svg>
)
