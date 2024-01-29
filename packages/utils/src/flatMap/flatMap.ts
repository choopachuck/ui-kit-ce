import { baseFlatten } from '../.internal/baseFlatten'

type ArrayIterator<T, R> = (value: T, index: number, array: T[]) => R

const map = <T, R>(
  array: T[] | null | undefined,
  iteratee: ArrayIterator<T, R>
): R[] => {
  let index = -1
  const length = array == null ? 0 : array.length
  const result = new Array<R>(length)

  while (++index < length) {
    result[index] = iteratee((array as T[])[index], index, array as T[])
  }

  return result
}

export const flatMap = <T = unknown, R = unknown>(
  array: T[] | null | undefined,
  iteratee: ArrayIterator<T, R>
): R[] => baseFlatten(map<T, R | R[]>(array, iteratee), 1) as R[]

export const flatMapDepth = <T = unknown, R = unknown>(
  array: T[] | null | undefined,
  iteratee: ArrayIterator<T, R>,
  depth = 1
): R[] => baseFlatten(map<T, R | R[]>(array, iteratee), depth) as R[]

export const flatMapDeep = <T = unknown, R = unknown>(
  array: T[] | null | undefined,
  iteratee: ArrayIterator<T, R>
): R[] => baseFlatten(map<T, R | R[]>(array, iteratee), Infinity) as R[]
