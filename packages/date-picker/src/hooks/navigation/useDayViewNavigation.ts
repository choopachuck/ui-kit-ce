import {
  useDatePickerNavigation,
  BasicNavigationParams,
  BasicNavigationReturnType,
} from '../useDatePickerNavigation'
import {
  useDataDateAttribute,
  UseDataDateAttributeReturnType,
} from '../useDataDateAttribute'
import * as React from 'react'
import { DataGridNavigationDirection } from '@v-uik/hooks'
import { useDateLibAdapter } from '../useDateLibAdapter'
import { verticalDirection } from './config'

type UseDayViewNavigationReturnType<TDate> = BasicNavigationReturnType &
  Pick<UseDataDateAttributeReturnType<TDate>, 'generateDataDateAttribute'>

/**
 * Хук для навигации в DayView
 */
export const useDayViewNavigation = <TDate extends unknown>({
  onChangeDisplayedDate,
  displayedDate,
}: BasicNavigationParams<TDate>): UseDayViewNavigationReturnType<TDate> => {
  const { generateDataDateAttribute, parseDataDateAttribute } =
    useDataDateAttribute<TDate>('keyboardDate')

  const adapter = useDateLibAdapter<TDate>()

  const handleDayViewNavigation = React.useCallback(
    (dir: DataGridNavigationDirection, date: TDate): TDate => {
      let newDate = adapter.addDays(
        date,
        dir === DataGridNavigationDirection.right ? 1 : -1
      )
      if (verticalDirection.includes(dir)) {
        newDate = adapter.addDays(
          date,
          dir === DataGridNavigationDirection.bottom ? 7 : -7
        )
      }

      return newDate
    },
    [adapter]
  )

  const isSameDatePeriod = React.useCallback(
    (newDate: TDate, date: TDate) => adapter.isSameMonth(newDate, date),
    [adapter]
  )

  const { onKeyDown, buttonOnFocus } = useDatePickerNavigation<TDate>({
    generateDataDateAttribute,
    parseDataDateAttribute,
    displayedDate,
    onChangeDisplayedDate,
    onNavigate: handleDayViewNavigation,
    isSameDatePeriod,
  })

  return { onKeyDown, buttonOnFocus, generateDataDateAttribute }
}
