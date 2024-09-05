import { useValue } from '..'
import React from 'react'

export type UseSafetyValueOptions<TCanBeNumber extends boolean = false> = {
  canBeNumber?: TCanBeNumber
}

/**
 * Хук для исключения `null` из возможных значений
 * и сужения типизации, исключая `null` из типа для `rawValue`.
 *
 * @param {string | number | null | undefined} rawValue - Значение, которое нужно обработать.
 * @param {Object | undefined} UseSafetyValueOptions  - Конфигурация для настройки обработки `rawValue`.
 * @param {boolean} UseSafetyValueOptions.canBeNumber - Опциональный параметр, определяющий, можно ли использовать значение типа `number`.
 * @default false
 *
 * @returns - Возвращаемое значение в зависимости от параметра `canBeNumber`.
 *
 *  Если `canBeNumber` `true`, возвращаемое значение может быть `number`, `string` или `undefined`.
 *
 *  Если `canBeNumber` `false` или `undefined`, возвращаемое значение будет `string` или `undefined`.
 */

export const useSafetyValue = <TCanBeNumber extends boolean = false>(
  rawValue: string | number | null | undefined,
  useSafetyValueOptions?: UseSafetyValueOptions<TCanBeNumber>
): TCanBeNumber extends true
  ? number | string | undefined
  : string | undefined => {
  const formatValueFromProp = React.useCallback(
    (value: typeof rawValue) => {
      if (
        typeof value === 'string' ||
        typeof value === 'undefined' ||
        (useSafetyValueOptions?.canBeNumber && typeof value === 'number')
      ) {
        return value
      } else if (typeof value === 'number') {
        return String(value)
      }

      return undefined
    },
    [useSafetyValueOptions?.canBeNumber]
  )

  const [safetyValue] = useValue(rawValue, { formatValueFromProp })

  return safetyValue as TCanBeNumber extends true
    ? number | string | undefined
    : string | undefined
}
