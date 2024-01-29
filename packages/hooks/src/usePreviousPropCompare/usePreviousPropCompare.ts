import React from 'react'

/**
 * Хук сравнивает текущее и прошлое значения пропа;
 * Возвращает true исходя из шаблона сравнения в fn;
 *
 * @param {T} prop - рассматриваемый проп
 * @param {(x: T, prev: T) => boolean} fn - функция сравнения текущего и предыдущего значения
 *
 * @example
 * const shouldSomething = usePreviousPropCompare(value, (x, prev) => x === prev); // true, если текущий и прошлый проп равны
 * const shouldSomething = usePreviousPropCompare(value, (x, prev) => x !== prev); // true, если текущий и прошлый проп не равны
 */
export const usePreviousPropCompare = <T>(
  prop: T,
  fn: (a: T, b: T) => boolean
): boolean => {
  const previousProp = React.useRef<T>(prop)
  const shouldSomething = fn(prop, previousProp.current)

  React.useEffect(() => {
    previousProp.current = prop
  }, [prop])

  return shouldSomething
}
