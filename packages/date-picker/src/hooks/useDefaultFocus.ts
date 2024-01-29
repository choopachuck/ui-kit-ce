'use client'

import { useCallback, useRef } from 'react'
import { useDataDateAttribute } from './useDataDateAttribute'
import { useFindElementByDate } from './useFindElementByDate'
import { CustomUtils } from '../utils/customDateLibAdapter'

type UseDefaultFocusResult<TDate> = {
  detectCalendarOpenRef: (node: HTMLElement | null) => void
  scheduleFocusDateOnOpen: (date?: TDate) => void
}

/** Хук для фокусирования даты при открытии календаря с клавиатуры */
export const useDefaultFocus = <TDate>(
  value: TDate,
  componentSystemId: string | undefined,
  adapter: CustomUtils<TDate>
): UseDefaultFocusResult<TDate> => {
  const dateToFocus = useRef<TDate | null>(null)
  const { generateDataDateAttribute } = useDataDateAttribute<TDate>(
    'keyboardDate',
    componentSystemId
  )
  const findElementByDate = useFindElementByDate(generateDataDateAttribute)

  const tryFocusDate = useCallback(() => {
    const dayButton = findElementByDate(dateToFocus.current)

    if (!dayButton) {
      return
    }

    //нельзя вызывать сразу, т.к. вызывается внутри ref функции
    setTimeout(() => {
      dayButton?.focus()
      dateToFocus.current = null
    }, 0)
  }, [findElementByDate])

  const detectCalendarOpenRef = useCallback(
    (node) => {
      if (!node) {
        return
      }

      tryFocusDate()
    },
    [tryFocusDate]
  )

  const scheduleFocusDateOnOpen = useCallback(
    (date?: TDate) => {
      const nowDate = adapter.date()

      dateToFocus.current = date ?? value ?? nowDate

      tryFocusDate()
    },
    [adapter, value, tryFocusDate]
  )

  return {
    detectCalendarOpenRef,
    scheduleFocusDateOnOpen,
  }
}
