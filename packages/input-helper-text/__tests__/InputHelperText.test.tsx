import * as React from 'react'
import { render } from '@testing-library/react'
import { InputHelperText } from '../src'

it('apply disabled styles', () => {
  const { getByText, rerender } = render(
    <InputHelperText>text</InputHelperText>
  )
  expect(getByText('text').className).not.toMatch(/disabled/i)
  rerender(<InputHelperText disabled>text</InputHelperText>)
  expect(getByText('text').className).toMatch(/disabled/i)
})

it('apply error styles', () => {
  const { getByText, rerender } = render(
    <InputHelperText>text</InputHelperText>
  )
  expect(getByText('text').className).not.toMatch(/error/i)
  rerender(<InputHelperText error>text</InputHelperText>)
  expect(getByText('text').className).toMatch(/error/i)
})
