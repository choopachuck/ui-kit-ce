import * as React from 'react'
import { render } from '@testing-library/react'
import { DrawerFooter } from '../src'

it('position divider correctly', () => {
  const { getByRole } = render(
    <DrawerFooter dividerProps={{ role: 'presentation' }} />
  )
  expect(getByRole('presentation')).toHaveStyle('margin: 24px -24px 0')
})

it('margin items correctly', () => {
  const { getAllByRole } = render(
    <DrawerFooter>
      <button>1</button>
      <button>2</button>
    </DrawerFooter>
  )
  const buttons = getAllByRole('button')
  expect(buttons[0]).not.toHaveStyle('margin-left: 16px')
  expect(buttons[1]).toHaveStyle('margin-left: 16px')
})
