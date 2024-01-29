import * as React from 'react'
import { render } from '@testing-library/react'

import { usePreviousPropCompare } from './usePreviousPropCompare'

let shouldUpdate: boolean | undefined = undefined

const TestComponent: React.VFC<{
  fn: (a: number, b: number) => boolean
  cb: () => number
}> = ({ fn, cb }) => {
  const [state, setState] = React.useState(1)
  React.useEffect(() => {
    setState(cb())
  }, [cb])

  shouldUpdate = usePreviousPropCompare(state, fn)

  return null
}

describe('usePreviousPropCompare', () => {
  afterEach(() => {
    shouldUpdate = undefined
  })

  it('Should update when a === b', () => {
    const fn = (x: number, prev: number) => x === prev
    const cb = () => 1

    render(<TestComponent fn={fn} cb={cb} />)
    expect(shouldUpdate).toBe(true)
  })

  it('Should update when a !== b', () => {
    const fn = (x: number, prev: number) => x !== prev
    const cb = () => 2

    render(<TestComponent fn={fn} cb={cb} />)
    expect(shouldUpdate).toBe(true)
  })
})
