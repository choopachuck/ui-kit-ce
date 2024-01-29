import * as React from 'react'
import { Box } from '../src'
import { render } from '@testing-library/react'

it('render component with default tag div and data-test attribute', () => {
  const { container } = render(<Box data-test="cool!" />)

  expect(container).toMatchSnapshot()
})

it('render component with tag h1', () => {
  const { container } = render(<Box as="h1" />)

  expect(container).toMatchSnapshot()
})

it('use ref for change input value', async () => {
  const CustomInput = () => {
    const ref = React.useRef<HTMLInputElement | null>(null)

    React.useEffect(() => {
      if (ref.current) {
        ref.current.value = 'test'
      }
    })

    return <Box ref={ref} as="input" />
  }
  const { findByRole } = render(<CustomInput />)

  const input = (await findByRole('textbox')) as HTMLInputElement

  expect(input.value).toBe('test')
})
