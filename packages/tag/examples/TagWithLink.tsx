import React from 'react'
import { Bar, PolymorphicTag } from '@v-uik/base'

export const TagWithLink = (): JSX.Element => {
  return (
    <Bar>
      <PolymorphicTag as="a" href="/">
        Home
      </PolymorphicTag>
      <PolymorphicTag as="a" href="/blog">
        Blog
      </PolymorphicTag>
    </Bar>
  )
}
