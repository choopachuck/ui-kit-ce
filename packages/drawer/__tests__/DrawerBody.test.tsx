import * as React from 'react'
import { render } from '@testing-library/react'
import { DrawerBody } from '../src'

it('occupies entire height and scrollable', () => {
  const { getByText } = render(<DrawerBody>body</DrawerBody>)
  expect(getByText('body')).toHaveStyle({
    flex: '1 1 auto',
    'overflow-y': 'auto',
  })
})
