import * as React from 'react'
import { render } from '@testing-library/react'
import { ModalFooter } from '../src'

it('margin items correctly', () => {
  const { getAllByRole } = render(
    <ModalFooter>
      <button>1</button>
      <button>2</button>
    </ModalFooter>
  )
  const buttons = getAllByRole('button')
  expect(buttons[0]).not.toHaveStyle('margin-left: 16px')
  expect(buttons[1]).toHaveStyle('margin-left: 16px')
})
