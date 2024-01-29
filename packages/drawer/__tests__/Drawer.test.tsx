import * as React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { Drawer } from '../src'

it('render depends on prop', async () => {
  const { getByRole, queryByRole, rerender } = render(<Drawer />)
  expect(queryByRole('dialog')).not.toBeInTheDocument()
  rerender(<Drawer open />)
  await waitFor(() => expect(getByRole('dialog')).toBeInTheDocument())
})

it('render to current dom with nonModal kind', () => {
  const { getByTestId, rerender } = render(
    <div data-testid="container">
      <Drawer open />
    </div>
  )
  expect(getByTestId('container')).toBeEmptyDOMElement()
  rerender(
    <div data-testid="container">
      <Drawer open backdrop={false} data-testid="drawer" />
    </div>
  )
  expect(getByTestId('container')).toContainElement(getByTestId('drawer'))
})

it('render to container nonModal drawer correctly', () => {
  const { getByTestId } = render(
    <div>
      <div data-testid="container" id="id" />
      <Drawer
        open
        backdrop={false}
        data-testid="drawer"
        container={() => document.getElementById('id') as HTMLElement}
      />
    </div>
  )
  expect(getByTestId('container')).toContainElement(getByTestId('drawer'))
})

it('handle backdrop click', () => {
  const onClose = jest.fn()
  const { getByRole } = render(<Drawer open onClose={onClose} />)
  expect(onClose).toBeCalledTimes(0)
  fireEvent.click(getByRole('presentation').firstElementChild as HTMLElement)
  expect(onClose).toBeCalledTimes(1)
})

it('set dimensions correctly', () => {
  const { getByRole, rerender } = render(<Drawer open />)
  let computedStyles = window.getComputedStyle(getByRole('dialog'))
  expect(computedStyles.getPropertyValue('width')).toBe('432px')
  expect(computedStyles.getPropertyValue('height')).toBe('auto')
  rerender(<Drawer open placement="top" />)
  computedStyles = window.getComputedStyle(getByRole('dialog'))
  expect(computedStyles.getPropertyValue('width')).toBe('auto')
  expect(computedStyles.getPropertyValue('height')).toBe('432px')
  rerender(<Drawer open width={300} height={500} />)
  computedStyles = window.getComputedStyle(getByRole('dialog'))
  expect(computedStyles.getPropertyValue('width')).toBe('300px')
  expect(computedStyles.getPropertyValue('height')).toBe('auto')
  rerender(<Drawer open placement="bottom" width={300} height={500} />)
  computedStyles = window.getComputedStyle(getByRole('dialog'))
  expect(computedStyles.getPropertyValue('width')).toBe('auto')
  expect(computedStyles.getPropertyValue('height')).toBe('500px')
})
