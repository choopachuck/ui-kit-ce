import * as React from 'react'
import { render } from '@testing-library/react'
import { useButtonReset } from '../src'

const Component = () => {
  const buttonClasses = useButtonReset()

  return <button className={buttonClasses.resetButton}>button</button>
}

it('reset button styles', () => {
  const { getByRole } = render(<Component />)
  expect(getByRole('button')).toHaveStyle({
    border: 'none',
    margin: '0',
    padding: '0',
    background: 'transparent',
  })
})
