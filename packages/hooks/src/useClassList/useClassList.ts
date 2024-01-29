import * as React from 'react'
import { ClassesObject, mergeClasses, Spread } from '@v-uik/utils'
import { clsx } from '@v-uik/theme'
import { ClassValue } from 'clsx'

/**
 * Утилита для удобного объединения классов из пропсы classes и классов
 * из конструктора useStyles.
 *
 * ```ts
 * const cl = useClassList(useStyles(), classes)
 * ```
 *
 * @param classes1 набор классов
 * @param classes2 набор классов
 */
export const useClassList = <T extends ClassesObject, U extends ClassesObject>(
  classes1: T,
  classes2?: U
): Spread<T, U> => {
  return React.useMemo(
    () =>
      mergeClasses<T, U, ClassValue>({
        classes1,
        classes2,
        mergeCallback: clsx,
      }),
    [classes1, classes2]
  )
}
