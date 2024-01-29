import * as React from 'react'
import { Link } from '../src'
import { render } from '@testing-library/react'

it('set text correctly', () => {
  const { getByText } = render(<Link>Some Link</Link>)

  expect(getByText('Some Link')).toBeInTheDocument()
})

it('set href correctly', () => {
  const href = 'https://test.com/'

  const { getByRole } = render(<Link href={href}>Some Link</Link>)

  expect(getByRole('link')).toHaveAttribute('href', href)
})

it('set anchor props correctly', () => {
  const href = 'https://test.com/'

  const { getByRole } = render(
    <Link target="_blank" referrer-policy="no-referrer" href={href}>
      Some Link
    </Link>
  )

  const link = getByRole('link')

  expect(link).toHaveAttribute('target', '_blank')
  expect(link).toHaveAttribute('referrer-policy', 'no-referrer')
})

it('set underline correctly', () => {
  const { getByRole } = render(
    <Link underline href="/">
      Some Link
    </Link>
  )

  expect(getByRole('link')).toHaveStyle('textDecoration: underline')
})

it('render custom tag', () => {
  const { getByRole } = render(
    <Link as="button" href="/">
      Some Link
    </Link>
  )

  expect(getByRole('button')).toBeInTheDocument()
})
