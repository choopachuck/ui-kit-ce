import * as React from 'react'
import { PolymorphicTag } from '../src/PolymorphicTag'
import { render } from '@testing-library/react'

it('check correct render polymorphic component', () => {
  const { container } = render(
    <PolymorphicTag
      as="a"
      classes={{ medium: 'classMedium', lite: 'classLite' }}
    />
  )

  const componentHTMLElement = container.firstElementChild as HTMLElement

  expect(componentHTMLElement.tagName).toEqual('A')
  expect(componentHTMLElement).toHaveClass('classMedium', 'classLite')
})
