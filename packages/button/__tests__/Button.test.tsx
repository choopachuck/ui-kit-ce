import * as React from 'react'
import { render } from '@testing-library/react'
import { Button, PolymorphicButton } from '../src'
import { light } from '../../theme/src'

it('correctly set background & color depends on property', () => {
  const { getByRole, rerender } = render(<Button>button</Button>)
  expect(getByRole('button')).toHaveStyle({
    'background-color': light.comp.button.colorBackgroundContainedPrimary,
    color: light.comp.button.colorTextContainedPrimary,
  })
  rerender(
    <Button kind="outlined" color="secondary">
      button
    </Button>
  )
  expect(getByRole('button')).toHaveStyle({
    'background-color': 'transparent',
    color: light.comp.button.colorTextOutlinedSecondary,
  })
  rerender(
    <Button kind="ghost" color="error">
      button
    </Button>
  )
  expect(getByRole('button')).toHaveStyle({
    'background-color': 'transparent',
    color: light.comp.button.colorTextGhostError,
  })
})

it('set height depends on size property', () => {
  const { getByRole, rerender } = render(<Button>button</Button>)
  expect(getByRole('button')).toHaveStyle({
    'padding-top': '8px',
    'padding-bottom': '8px',
  })
  rerender(<Button size="sm">button</Button>)
  expect(getByRole('button')).toHaveStyle({
    'padding-top': '4px',
    'padding-bottom': '4px',
  })
  rerender(<Button size="lg">button</Button>)
  expect(getByRole('button')).toHaveStyle({
    'padding-top': '12px',
    'padding-bottom': '12px',
  })
})

it('correct handle fullWidth property', () => {
  const { getByRole } = render(<Button fullWidth>button</Button>)
  expect(getByRole('button')).toHaveStyle('width: 100%')
})

it('render custom tag', () => {
  const { getByRole } = render(
    <PolymorphicButton as="a" href="/">
      Some Link
    </PolymorphicButton>
  )

  expect(getByRole('link')).toBeInTheDocument()
})
