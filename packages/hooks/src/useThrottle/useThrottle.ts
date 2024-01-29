import {
  useDebounce,
  UseDebounceOptions,
  DebouncedFunction,
} from '../useDebounce'

export type UseThrottleOptions = Omit<UseDebounceOptions, 'maxWait'>

/**
 * Хук возвращает функцию, которая не будет вызываться чаще чем один раз
 * в указанный период delay.
 *
 * @param func - функция на выполнение
 * @param {number} delay - значение задержки в миллисекундах
 * @param {Object} options - объект настроек
 * @param {boolean} options.leading - флаг вызова функции в начале таймаута
 * @param {boolean} options.trailing - флаг вызова функции в конце таймаута
 * вызовом функции
 */
export function useThrottle<T extends (...args: any[]) => ReturnType<T>>(
  func: T,
  delay: number,
  { leading = true, trailing = true }: UseThrottleOptions = {}
): DebouncedFunction<T> {
  return useDebounce(func, delay, {
    maxWait: delay,
    leading,
    trailing,
  })
}
