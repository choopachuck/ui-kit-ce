import { baseFlatten, NestedArray } from '../.internal/baseFlatten'

export const flatten = <T = unknown>(
  array: NestedArray<T> | null | undefined
): T[] => baseFlatten(array, 1) as T[]

export const flattenDepth = <T = unknown>(
  array: NestedArray<T> | null | undefined,
  depth = 1
): T[] => baseFlatten(array, depth) as T[]

export const flattenDeep = <T = unknown>(
  array: NestedArray<T> | null | undefined
): T[] => baseFlatten(array, Infinity) as T[]
