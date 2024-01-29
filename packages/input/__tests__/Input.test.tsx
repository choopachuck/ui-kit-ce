import * as React from 'react'
import { render } from '@testing-library/react'
import { Input } from '../src'

it('render label', () => {
  const { getByText } = render(<Input label="label" />)
  expect(getByText('label')).toBeInTheDocument()
})

it('render helper text', () => {
  const { getByText } = render(<Input helperText="helper text" />)
  expect(getByText('helper text')).toBeInTheDocument()
})

it('stretch to full width', () => {
  const { getByTestId } = render(<Input fullWidth data-testid="testId" />)
  expect(getByTestId('testId')).toHaveStyle('width: 100%')
})
