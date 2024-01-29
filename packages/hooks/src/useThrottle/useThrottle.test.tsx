import * as React from 'react'
import { render } from '@testing-library/react'
import { useThrottle, UseThrottleOptions } from './useThrottle'

let tempResult: ((...args: unknown[]) => void) | undefined

const TestComponent: React.VFC<{
  callback: (...args: unknown[]) => void
  delay?: number
  options?: UseThrottleOptions
}> = ({ callback, delay = 100, options }) => {
  tempResult = useThrottle(callback, delay, options)

  return null
}

describe('useDebounce', () => {
  jest.useFakeTimers('modern')

  afterEach(() => {
    tempResult = undefined
  })

  it('execute first callback immediately', () => {
    const callback = jest.fn()
    render(<TestComponent callback={callback} />)
    tempResult?.()
    expect(callback).toBeCalledTimes(1)
    jest.runAllTimers()
    expect(callback).toBeCalledTimes(1)
  })

  it('execute first callback after timeout if leading=false', () => {
    const callback = jest.fn()
    render(<TestComponent callback={callback} options={{ leading: false }} />)
    tempResult?.()
    expect(callback).toBeCalledTimes(0)
    jest.runAllTimers()
    expect(callback).toBeCalledTimes(1)
  })

  it('execute twice with correct params', () => {
    const callback = jest.fn()
    render(<TestComponent callback={callback} />)
    for (let i = 0; i < 10; i++) {
      tempResult?.(i)
    }
    expect(callback).toBeCalledTimes(1)
    expect(callback).toBeCalledWith(0)
    jest.runAllTimers()
    expect(callback).toBeCalledTimes(2)
    expect(callback).toBeCalledWith(9)
  })

  it('execute three times if no pending', () => {
    const callback = jest.fn()
    render(<TestComponent callback={callback} />)
    tempResult?.()
    tempResult?.()
    setTimeout(() => {
      tempResult?.()
    }, 101)
    expect(callback).toBeCalledTimes(1)
    jest.advanceTimersByTime(100)
    expect(callback).toBeCalledTimes(2)
    jest.advanceTimersByTime(1)
    expect(callback).toBeCalledTimes(3)
  })
})
