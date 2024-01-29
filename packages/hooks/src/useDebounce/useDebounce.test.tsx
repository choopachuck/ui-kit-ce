import * as React from 'react'
import { render } from '@testing-library/react'
import {
  useDebounce,
  UseDebounceOptions,
  DebouncedFunction,
} from './useDebounce'

let tempResult: DebouncedFunction<(...args: unknown[]) => void> | undefined

const TestComponent: React.VFC<{
  callback: (...args: unknown[]) => void
  delay?: number
  options?: UseDebounceOptions
}> = ({ callback, delay = 100, options }) => {
  tempResult = useDebounce(callback, delay, options)

  return null
}

describe('useDebounce', () => {
  jest.useFakeTimers('modern')

  afterEach(() => {
    tempResult = undefined
  })

  it('executed only after delay', () => {
    const callback = jest.fn()
    render(<TestComponent callback={callback} />)
    tempResult?.()
    expect(callback).toBeCalledTimes(0)
    jest.advanceTimersByTime(100)
    expect(callback).toBeCalledTimes(1)
  })

  it('executed just once with correct params', () => {
    const callback = jest.fn()
    render(<TestComponent callback={callback} />)
    for (let i = 0; i < 10; i++) {
      tempResult?.(i)
    }
    jest.runAllTimers()
    expect(callback).toBeCalledTimes(1)
    expect(callback).toBeCalledWith(9)
  })

  it('execute callback immediately if trailing=false', () => {
    const callback = jest.fn()
    render(
      <TestComponent
        callback={callback}
        options={{ leading: true, trailing: false }}
      />
    )
    tempResult?.()
    expect(callback).toBeCalledTimes(1)
    jest.runAllTimers()
    expect(callback).toBeCalledTimes(1)
  })

  it('execute twice if leading=true', () => {
    const callback = jest.fn()
    render(<TestComponent callback={callback} options={{ leading: true }} />)
    tempResult?.()
    tempResult?.()
    expect(callback).toBeCalledTimes(1)
    jest.runAllTimers()
    expect(callback).toBeCalledTimes(2)
  })

  it('executed three times if no pending', () => {
    const callback = jest.fn()
    render(<TestComponent callback={callback} options={{ leading: true }} />)
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

  it('execute once if leading and trailing set to true for 1 function call', () => {
    const callback = jest.fn()
    render(<TestComponent callback={callback} options={{ leading: true }} />)
    tempResult?.()
    expect(callback).toBeCalledTimes(1)
    jest.runAllTimers()
    expect(callback).toBeCalledTimes(1)
  })

  it('execute twice if leading and trailing set to true for more than one function call', () => {
    const callback = jest.fn()
    render(<TestComponent callback={callback} options={{ leading: true }} />)
    tempResult?.()
    tempResult?.()
    expect(callback).toBeCalledTimes(1)
    jest.runAllTimers()
    expect(callback).toBeCalledTimes(2)
  })

  it.each`
    options                                              | _0   | _90  | _100 | _110 | _300
    ${{ leading: true, trailing: true }}                 | ${1} | ${1} | ${1} | ${1} | ${2}
    ${{ leading: true, trailing: false }}                | ${1} | ${1} | ${1} | ${1} | ${1}
    ${{ leading: false, trailing: true }}                | ${0} | ${0} | ${0} | ${0} | ${1}
    ${{ leading: false, trailing: false }}               | ${0} | ${0} | ${0} | ${0} | ${0}
    ${{ leading: true, trailing: true, maxWait: 90 }}    | ${1} | ${1} | ${2} | ${2} | ${3}
    ${{ leading: true, trailing: false, maxWait: 90 }}   | ${1} | ${1} | ${1} | ${2} | ${2}
    ${{ leading: false, trailing: true, maxWait: 90 }}   | ${0} | ${0} | ${1} | ${1} | ${2}
    ${{ leading: true, trailing: true, maxWait: 100 }}   | ${1} | ${1} | ${2} | ${2} | ${3}
    ${{ leading: true, trailing: false, maxWait: 100 }}  | ${1} | ${1} | ${1} | ${2} | ${2}
    ${{ leading: false, trailing: true, maxWait: 100 }}  | ${0} | ${0} | ${1} | ${1} | ${2}
    ${{ leading: false, trailing: false, maxWait: 100 }} | ${0} | ${0} | ${0} | ${0} | ${0}
    ${{ leading: true, trailing: true, maxWait: 110 }}   | ${1} | ${1} | ${1} | ${2} | ${3}
    ${{ leading: true, trailing: false, maxWait: 110 }}  | ${1} | ${1} | ${1} | ${1} | ${2}
    ${{ leading: false, trailing: true, maxWait: 110 }}  | ${0} | ${0} | ${0} | ${1} | ${2}
  `(
    'handle options correctly ($options)',
    ({ options, _0, _90, _100, _110, _300 }) => {
      const callback = jest.fn()
      render(
        <TestComponent
          callback={callback}
          options={options as UseDebounceOptions}
        />
      )
      tempResult?.()
      expect(callback).toBeCalledTimes(_0)

      setTimeout(() => {
        expect(callback).toBeCalledTimes(_90)
        tempResult?.()
      }, 91)

      setTimeout(() => {
        expect(callback).toBeCalledTimes(_100)
        tempResult?.()
      }, 101)

      setTimeout(() => {
        expect(callback).toBeCalledTimes(_110)
        tempResult?.()
      }, 111)

      setTimeout(() => {
        expect(callback).toBeCalledTimes(_300)
      }, 300)

      jest.runAllTimers()
    }
  )

  it('cancel callback when corresponding method called', () => {
    const callback = jest.fn()
    render(<TestComponent callback={callback} />)
    tempResult?.()
    setTimeout(() => tempResult?.cancel(), 50)
    jest.runAllTimers()
    expect(callback).toBeCalledTimes(0)
  })

  it('execute right function if callback changed', () => {
    const callback = jest.fn()
    const newCallback = jest.fn()
    const { rerender } = render(<TestComponent callback={callback} />)
    rerender(<TestComponent callback={newCallback} />)
    tempResult?.()
    jest.runAllTimers()
    expect(callback).toBeCalledTimes(0)
    expect(newCallback).toBeCalledTimes(1)
  })

  it('execute if maxWait exceeded', () => {
    const callback = jest.fn()
    render(<TestComponent callback={callback} options={{ maxWait: 150 }} />)
    tempResult?.()
    setTimeout(() => {
      tempResult?.()
    }, 90)
    jest.advanceTimersByTime(100)
    expect(callback).toBeCalledTimes(0)
    jest.advanceTimersByTime(50)
    expect(callback).toBeCalledTimes(1)
    jest.advanceTimersByTime(50)
    expect(callback).toBeCalledTimes(1)
  })

  it('will cancel callback if maxWait exceed and cancel method called', () => {
    const callback = jest.fn()
    render(<TestComponent callback={callback} options={{ maxWait: 150 }} />)
    tempResult?.()
    setTimeout(() => {
      tempResult?.()
    }, 90)
    setTimeout(() => {
      tempResult?.cancel()
    }, 120)
    jest.advanceTimersByTime(100)
    expect(callback).toBeCalledTimes(0)
    jest.advanceTimersByTime(150)
    expect(callback).toBeCalledTimes(0)
  })

  it('call pending callback when flush method called', () => {
    const callback = jest.fn()
    render(<TestComponent callback={callback} />)
    tempResult?.()
    expect(callback).toBeCalledTimes(0)
    tempResult?.flush()
    expect(callback).toBeCalledTimes(1)
  })

  it('will not execute by flush if no callbacks in queue', () => {
    const callback = jest.fn()
    render(<TestComponent callback={callback} />)
    tempResult?.flush()
    expect(callback).toBeCalledTimes(0)
  })

  it('will not execute by flush if cancelled', () => {
    const callback = jest.fn()
    render(<TestComponent callback={callback} />)
    tempResult?.()
    tempResult?.cancel()
    tempResult?.flush()
    expect(callback).toBeCalledTimes(0)
    jest.runAllTimers()
    expect(callback).toBeCalledTimes(0)
  })

  it('will not execute on unmount', () => {
    const callback = jest.fn()
    const { unmount } = render(<TestComponent callback={callback} />)
    tempResult?.()
    unmount()
    jest.runAllTimers()
    expect(callback).toBeCalledTimes(0)
  })

  it('memoize debounced callback', () => {
    const callback = jest.fn()
    const { rerender } = render(<TestComponent callback={callback} />)
    const cachedCallback = tempResult
    rerender(<TestComponent callback={callback} />)
    expect(cachedCallback).toBe(tempResult)
  })

  it('return new callback when parameter changed', () => {
    const callback = jest.fn()
    const { rerender } = render(<TestComponent callback={callback} />)
    const cachedCallback = tempResult
    rerender(<TestComponent callback={callback} delay={200} />)
    expect(cachedCallback).not.toBe(tempResult)
  })

  it('handle isPending correctly', () => {
    const callback = jest.fn()
    render(<TestComponent callback={callback} />)
    expect(tempResult?.isPending()).toBeFalsy()
    tempResult?.()
    expect(tempResult?.isPending()).toBeTruthy()
    tempResult?.flush()
    expect(tempResult?.isPending()).toBeFalsy()
  })
})
