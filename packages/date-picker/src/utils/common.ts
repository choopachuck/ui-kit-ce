export const splitArrayIntoChunks = <T = unknown>(
  array: Array<T>,
  chunkSize = 0
): Array<Array<T>> => {
  const result: Array<Array<T>> = []

  if (chunkSize > 0) {
    while (array.length) {
      result.push(array.splice(0, chunkSize))
    }
  }

  return result
}

export const noop = (): void => {} // eslint-disable-line @typescript-eslint/no-empty-function
