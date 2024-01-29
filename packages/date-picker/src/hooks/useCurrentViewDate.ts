import * as React from 'react'
import { useDateLibAdapter } from './useDateLibAdapter'
import { useNowDate } from './useNowDate'
import { parsePickerInputValue } from '../utils/date'
import { TRangeValue } from '../interfaces/range'

export interface IUseCurrentViewDateResult<TDate> {
  currentViewDate: TDate
  setCurrentViewDate: React.Dispatch<React.SetStateAction<TDate>>
}

export const useCurrentViewDate = <TDate extends unknown>(
  date?: TRangeValue<TDate> | null
): IUseCurrentViewDateResult<TDate> => {
  const adapter = useDateLibAdapter<TDate>()

  const nowDate = useNowDate<TDate>()

  const [currentViewDate, setCurrentViewDate] = React.useState(() => {
    const parsedDate =
      parsePickerInputValue(
        adapter,
        date && date !== -Infinity && date !== Infinity ? date : nowDate
      ) ?? nowDate

    return adapter.startOfMonth(parsedDate)
  })

  React.useEffect(() => {
    if (date && typeof date !== 'number') {
      const newCurrentViewDate = adapter.startOfMonth(date)
      if (!adapter.isEqual(currentViewDate, newCurrentViewDate)) {
        setCurrentViewDate(newCurrentViewDate)
      }
    }
  }, [date]) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    currentViewDate,
    setCurrentViewDate,
  }
}
