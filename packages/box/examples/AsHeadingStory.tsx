import * as React from 'react'
import { Box, PolymorphicComponentProps } from '@v-uik/base'

// Собственные свойства вашего компонента.
interface HeadingOwnProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

// Объединенные собственные свойства вашего компонента и полиморфного компонента, которые зависят от тега.
type HeadingProps<E extends React.ElementType> = PolymorphicComponentProps<
  E,
  HeadingOwnProps
>

// Тег по умолчанию.
const defaultElement = 'h2'

export function Heading<E extends React.ElementType = typeof defaultElement>(
  props: HeadingProps<E>
): JSX.Element {
  // Использует Box для создания полиморфного компонента на основании свойства `as`
  return <Box as={defaultElement} {...props} />
}
