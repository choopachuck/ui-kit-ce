import * as React from 'react'
import { render } from '@testing-library/react'
import { Bar } from '../src'
import { zIndex } from '../../theme/src'

it('style correctly horizontal bar', () => {
  const { getByText } = render(<Bar>text</Bar>)
  expect(getByText('text')).toHaveStyle({
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100%',
    'min-height': '48px',
    'z-index': zIndex.bar,
  })
})

it('style correctly vertical bar', () => {
  const { getByText } = render(<Bar direction="vertical">text</Bar>)
  expect(getByText('text')).toHaveStyle({
    position: 'fixed',
    top: '0px',
    left: '0px',
    bottom: '0px',
    width: '64px',
    'padding-bottom': '8px',
  })
})

it('expand vertical bar', () => {
  const { getByText } = render(
    <Bar expanded direction="vertical">
      text
    </Bar>
  )
  expect(getByText('text')).toHaveStyle('width: 256px')
})
