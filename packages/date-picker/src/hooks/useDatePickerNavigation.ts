import * as React from 'react'
import {
  DataGridNavigationCallback,
  DataGridNavigationDirection,
  useDataGridNavigation,
} from '@v-uik/hooks'
import { UseDataDateAttributeReturnType } from './useDataDateAttribute'
import { useFindElementByDate } from './useFindElementByDate'

/**
 * Тип для базовой навигации
 */
export type BasicNavigationParams<TDate> = {
  onChangeDisplayedDate?: (date: TDate) => void
  displayedDate?: TDate | null
}

export type BasicNavigationReturnType = {
  onKeyDown: React.KeyboardEventHandler<HTMLDivElement>
  buttonOnFocus: React.FocusEventHandler<HTMLButtonElement>
}

type UseDatePickerNavigationParams<TDate extends unknown> = {
  /**
   * Калбек, который вызывается при навигации
   * @param dir - направление навигации
   * @param date - дата
   */
  onNavigate: (dir: DataGridNavigationDirection, date: TDate) => TDate
  /**
   * Калбек, проверяющий на отображение в одном периоде
   * @param newDate
   * @param date
   */
  isSameDatePeriod: (newDate: TDate, date: TDate) => boolean
} & BasicNavigationParams<TDate> &
  UseDataDateAttributeReturnType<TDate>

/**
 * Реалиазция навигации в DatePicker. Данный хук используется
 * для хуков useDayViewNavigation, useMonthViewNavigation, useYearViewNavigation
 */
export const useDatePickerNavigation = <TDate extends unknown>({
  onChangeDisplayedDate,
  displayedDate,
  onNavigate,
  isSameDatePeriod,
  parseDataDateAttribute,
  generateDataDateAttribute,
}: UseDatePickerNavigationParams<TDate>): BasicNavigationReturnType => {
  const [focusOnRender, setFocusOnRender] = React.useState(false)
  const refInFocus = React.useRef<HTMLButtonElement | null>(null)
  const findElementByDate = useFindElementByDate(generateDataDateAttribute)

  const focusDate = React.useCallback(
    (date: TDate): void => {
      const elem = findElementByDate(date)
      if (elem) {
        elem.tabIndex = 0
        elem.focus()
      }
    },
    [findElementByDate]
  )

  const navigationCallback: DataGridNavigationCallback = React.useCallback(
    (dir) => {
      const nodeInFocus = refInFocus.current

      if (!nodeInFocus) {
        return
      }

      const date = parseDataDateAttribute(nodeInFocus.dataset['date'] as string)
      if (!date) {
        return
      }

      const newDate = onNavigate(dir, date)

      nodeInFocus.tabIndex = -1

      // Условие необходимо, когда например в календаре дней следующий день выбран в следующем месяце,
      // для этого необходимо изменить следующий месяц, перерендерить дни заново и сфокусировать на выбранном элементе
      if (!isSameDatePeriod(newDate, date) && onChangeDisplayedDate) {
        onChangeDisplayedDate(newDate)
        setFocusOnRender(true)

        return
      }

      focusDate(newDate)
    },
    [
      focusDate,
      onChangeDisplayedDate,
      isSameDatePeriod,
      parseDataDateAttribute,
      onNavigate,
    ]
  )

  const onKeyDown = useDataGridNavigation<HTMLDivElement>(navigationCallback)

  const buttonOnFocus = React.useCallback(
    (event: React.FocusEvent<HTMLButtonElement>) => {
      refInFocus.current = event.currentTarget
    },
    []
  )

  /**
   * Фокусирование элемента после отрендеревания новых элементов (коммент сверху про дни)
   */
  React.useEffect(() => {
    if (focusOnRender && displayedDate) {
      focusDate(displayedDate)
      setFocusOnRender(false)
    }
  }, [focusOnRender, displayedDate, focusDate])

  return { onKeyDown, buttonOnFocus }
}
