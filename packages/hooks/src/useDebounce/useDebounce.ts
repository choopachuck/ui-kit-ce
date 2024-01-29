// основан на https://github.com/xnimorz/use-debounce
import * as React from 'react'

export interface UseDebounceOptions {
  leading?: boolean
  trailing?: boolean
  maxWait?: number
}

export interface UseDebounceControlFunctions {
  cancel: () => void
  flush: () => void
  isPending: () => boolean
}

export interface DebouncedFunction<T extends (...args: any[]) => ReturnType<T>>
  extends UseDebounceControlFunctions {
  (...args: Parameters<T>): ReturnType<T> | undefined
}

/**
 * Хук возвращает функцию, которая будет задерживать свое повторное выполнение
 * на период delay с момента последнего вызова.
 *
 * @param func - функция на выполнение
 * @param {number} delay - значение задержки в миллисекундах, если отсутствует
 * будет использоваться `requestAnimationFrame` (если доступен, иначе `setTimeout(..., 0)`)
 * @param {Object} options - объект настроек
 * @param {boolean} options.leading - флаг вызова функции в начале таймаута
 * @param {boolean} options.trailing - флаг вызова функции в конце таймаута
 * @param {number} options.maxWait - максимальное значение задержки перед принудительным
 * вызовом функции
 */
export function useDebounce<T extends (...args: any[]) => ReturnType<T>>(
  func: T,
  delay?: number,
  options: UseDebounceOptions = {}
): DebouncedFunction<T> {
  const lastCallTime = React.useRef(0)
  const lastInvokeTime = React.useRef(0)
  const timerId = React.useRef(0)
  const lastArgs = React.useRef<unknown[] | null>([])
  const lastThis = React.useRef<unknown>()
  const result = React.useRef<ReturnType<T>>()
  const funcRef = React.useRef(func)
  const mounted = React.useRef(true)

  React.useEffect(() => {
    funcRef.current = func
  }, [func])

  // используем requestAnimationFrame, когда явно не указан delay
  const useRAF = !delay && delay !== 0 && typeof window !== 'undefined'

  const wait = delay ?? 0
  const leading = !!options.leading
  const trailing = options.trailing ?? true
  const maxing = 'maxWait' in options
  const maxWait = maxing ? Math.max(options.maxWait ?? 0, wait) : null

  React.useEffect(() => {
    mounted.current = true

    return () => {
      mounted.current = false
    }
  }, [])

  return React.useMemo(() => {
    const invokeFunc = (time: number) => {
      const args = lastArgs.current
      const thisArg = lastThis.current

      lastArgs.current = null
      lastThis.current = null
      lastInvokeTime.current = time
      result.current = funcRef.current.apply(thisArg, args as unknown[])

      return result.current
    }

    const startTimer = (pendingFunc: () => void, wait: number) => {
      if (useRAF) {
        cancelAnimationFrame(timerId.current)
      }
      timerId.current = useRAF
        ? requestAnimationFrame(pendingFunc)
        : (setTimeout(pendingFunc, wait) as unknown as number)
    }

    const shouldInvoke = (time: number) => {
      if (!mounted.current) {
        return false
      }

      const timeSinceLastCall = time - lastCallTime.current
      const timeSinceLastInvoke = time - lastInvokeTime.current

      return (
        !lastCallTime.current ||
        timeSinceLastCall >= wait ||
        timeSinceLastCall < 0 ||
        (maxing && timeSinceLastInvoke >= (maxWait ?? 0))
      )
    }

    const trailingEdge = (time: number) => {
      timerId.current = 0
      if (trailing && lastArgs.current) {
        return invokeFunc(time)
      }
      lastArgs.current = null
      lastThis.current = null

      return result.current
    }

    const timerExpired = () => {
      const time = Date.now()
      if (shouldInvoke(time)) {
        return trailingEdge(time)
      }
      if (!mounted.current) {
        return
      }

      const timeSinceLastCall = time - lastCallTime.current
      const timeSinceLastInvoke = time - lastInvokeTime.current
      const timeWaiting = wait - timeSinceLastCall
      const remainingWait = maxing
        ? Math.min(timeWaiting, (maxWait ?? 0) - timeSinceLastInvoke)
        : timeWaiting

      startTimer(timerExpired, remainingWait)
    }

    const func: DebouncedFunction<T> = (
      ...args: Parameters<T>
    ): ReturnType<T> | undefined => {
      const time = Date.now()
      const isInvoking = shouldInvoke(time)

      lastArgs.current = args
      // @ts-ignore
      lastThis.current = this
      lastCallTime.current = time

      if (isInvoking) {
        if (!timerId.current && mounted.current) {
          lastInvokeTime.current = lastCallTime.current
          startTimer(timerExpired, wait)

          return leading ? invokeFunc(lastCallTime.current) : result.current
        }

        if (maxing) {
          startTimer(timerExpired, wait)

          return invokeFunc(lastCallTime.current)
        }
      }

      if (!timerId.current) {
        startTimer(timerExpired, wait)
      }

      return result.current
    }

    func.cancel = () => {
      if (timerId.current) {
        useRAF
          ? cancelAnimationFrame(timerId.current)
          : clearTimeout(timerId.current)
      }
      lastInvokeTime.current = 0
      lastArgs.current = null
      lastCallTime.current = 0
      lastThis.current = null
      timerId.current = 0
    }

    func.isPending = () => {
      return !!timerId.current
    }

    func.flush = () => {
      return !timerId.current ? result.current : trailingEdge(Date.now())
    }

    return func
  }, [wait, leading, trailing, maxing, maxWait, useRAF])
}
