import * as React from 'react'
import { render } from '@testing-library/react'
import { ModalBody } from '../src'

it('occupies entire height and scrollable', () => {
  const { getByTestId, getByText } = render(
    <ModalBody data-testid="testId">body</ModalBody>
  )
  expect(getByTestId('testId')).toHaveStyle('flex: 1 1 auto')
  expect(getByText('body')).toHaveStyle('overflow-y: auto')
})
