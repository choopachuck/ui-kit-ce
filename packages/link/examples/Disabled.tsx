import React from 'react'
import { Link } from '@v-uik/base'

export const Disabled = (): JSX.Element => {
  return (
    <>
      <div>
        <Link disabled href="/?path=/docs/навигация-link-link--link">
          Without underline
        </Link>
      </div>
      <div>
        <Link disabled underline href="/?path=/docs/навигация-link-link--link">
          With underline
        </Link>
      </div>
    </>
  )
}
