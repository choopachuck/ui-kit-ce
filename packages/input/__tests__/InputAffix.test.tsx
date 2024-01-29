import * as React from 'react'
import { render } from '@testing-library/react'
import { InputAffix } from '../src/InputAffix'
import { light } from '@v-uik/theme'

it('correctly styled for prefix type', () => {
  const { getByText } = render(<InputAffix>text</InputAffix>)
  expect(getByText('text')).toHaveStyle({
    color: light.comp.input.prefixColorText,
    'margin-right': '8px',
  })
})

it('correctly styled for suffix type', () => {
  const { getByText } = render(<InputAffix type="suffix">text</InputAffix>)
  expect(getByText('text')).toHaveStyle({
    color: light.comp.input.suffixColorText,
    'margin-left': '8px',
  })
})
