import React from 'react'
import { Bar, PolymorphicButton } from '@v-uik/base'

export const ButtonWithLink = (): JSX.Element => {
  return (
    <Bar>
      <PolymorphicButton as="a" href="/">
        Home
      </PolymorphicButton>
      <PolymorphicButton as="a" href="/blog">
        Blog
      </PolymorphicButton>
    </Bar>
  )
}
