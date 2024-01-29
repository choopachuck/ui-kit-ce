import * as React from 'react'
import { render } from '@testing-library/react'
import { SubBar } from '../src'
import { zIndex } from '../../theme/src'

it('style correctly horizontal subbar', () => {
  const { getByText } = render(<SubBar>text</SubBar>)
  expect(getByText('text')).toHaveStyle({
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100%',
    'min-height': '48px',
    'z-index': zIndex.bar - 1,
  })
})

it('style correctly vertical subbar', () => {
  const { getByText } = render(<SubBar direction="vertical">text</SubBar>)
  expect(getByText('text')).toHaveStyle({
    position: 'fixed',
    top: '0px',
    left: '0px',
    bottom: '0px',
    width: '64px',
    'padding-bottom': '8px',
  })
})

it('expand vertical subbar', () => {
  const { getByText } = render(
    <SubBar expanded direction="vertical">
      text
    </SubBar>
  )
  expect(getByText('text')).toHaveStyle('width: 256px')
})
