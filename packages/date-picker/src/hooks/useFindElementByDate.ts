import { useCallback } from 'react'
import { UseDataDateAttributeReturnType } from './useDataDateAttribute'

/**
 * Поиск элементов по data-date атрибуту
 */
export const useFindElementByDate = <TDate>(
  generateDataDateAttribute: UseDataDateAttributeReturnType<TDate>['generateDataDateAttribute']
): ((date: TDate | null) => HTMLElement | null) => {
  return useCallback(
    (date) => {
      if (!date) {
        return null
      }

      return document.querySelector(
        `[data-date="${generateDataDateAttribute(date)}"]`
      )
    },
    [generateDataDateAttribute]
  )
}
