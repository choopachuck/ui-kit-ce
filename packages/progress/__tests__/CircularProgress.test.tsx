import * as React from 'react'
import { render } from '@testing-library/react'
import { CircularProgress } from '../src'

it('renders circular as indeterminate when no value is passed', () => {
  const { getByRole } = render(<CircularProgress />)

  const bar = getByRole('progressbar')

  expect(bar.getAttribute('aria-valuenow')).toBe(null)
  expect(bar.getAttribute('aria-valuemax')).toBe(null)
  expect(bar.getAttribute('aria-valuemin')).toBe(null)

  expect(bar.className).toMatch(/indeterminate/i)
})

it('sets aria-valuenow correctly', () => {
  const value = 42
  const { getByRole } = render(<CircularProgress value={value} />)

  const bar = getByRole('progressbar')

  expect(bar.getAttribute('aria-valuenow')).toBe(value.toString())
})

it('sets aria-valuemax correctly', () => {
  const max = 84
  const { getByRole } = render(<CircularProgress max={max} value={0} />)

  const bar = getByRole('progressbar')

  expect(bar.getAttribute('aria-valuemax')).toBe(max.toString())
})

it('render percentage inside', () => {
  const value = 77
  const { getByText } = render(
    <CircularProgress value={value} percentageInsideCircle={`${value}%`} />
  )

  expect(getByText('77%')).toBeInTheDocument()
})

it('the transmitted color is correctly set', () => {
  const color = '#11f25c'
  const { getByRole } = render(<CircularProgress color={color} />)

  const element = getByRole('img', { name: 'bar' })

  expect(element).toHaveStyle(`stroke: ${color}`)
})

it('track and bar have the same line width', () => {
  const thickness = 3
  const { getByRole } = render(<CircularProgress thickness={thickness} />)

  const track = getByRole('img', { name: 'track' })
  const bar = getByRole('img', { name: 'bar' })

  expect(track.getAttribute('stroke-width')).toBe(thickness.toString())
  expect(bar.getAttribute('stroke-width')).toBe(thickness.toString())
})
