export interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> {}
export type NestedArray<T> = Array<T | RecursiveArray<T>>

export const baseFlatten = <T>(
  array: NestedArray<T> | null | undefined,
  depth = 1,
  result: NestedArray<T> = []
): NestedArray<T> => {
  if (array == null || !array.length) {
    return result
  }

  for (const item of array) {
    if (depth > 0 && Array.isArray(item)) {
      if (depth > 1) {
        baseFlatten(item, depth - 1, result)
      } else {
        result.push(...item)
      }
    } else {
      result.push(item)
    }
  }

  return result
}
