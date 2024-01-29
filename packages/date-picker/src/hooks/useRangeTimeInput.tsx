import * as React from 'react'
import { TRangeDate } from '../interfaces'
import { hasMaskSybmols } from '../utils/hasMaskSymbols'
import { useFormat } from './useFormat'
import { useDateLibAdapter } from './useDateLibAdapter'
import { TimeValidationError } from '../constants/common'

type Props<TDate = unknown> = {
  index: 0 | 1
  range: TRangeDate<TDate>
  changeDate: (date: TDate | null) => void
  format: string
  validationError: TimeValidationError | null
}

export const useRangeTimeInput = <TDate extends unknown>({
  index,
  range,
  format,
  changeDate,
  validationError,
}: Props<TDate>): {
  value: string
  onChange: (v: string) => void
} => {
  const date = range ? range[index] : null

  const adapter = useDateLibAdapter<TDate>()
  const formattedDate = useFormat(date, format)

  const [inputValue, setInputValue] = React.useState<string>(formattedDate)

  React.useLayoutEffect(() => {
    if (date !== null) {
      return
    }
    setInputValue('')
  }, [date])

  React.useLayoutEffect(() => {
    if (formattedDate !== inputValue && validationError !== 'invalidTime') {
      setInputValue(formattedDate || inputValue)
    }
  }, [formattedDate])

  const handleChange = React.useCallback(
    (value: string) => {
      setInputValue(value)
      let newDate = null

      // TODO rewrite
      if (value) {
        // hasMaskSymbols - костыль для dayjs, т.к. неверно работает parse
        newDate = hasMaskSybmols(value, format)
          ? adapter.parse('Invalid Date', format)
          : adapter.parse(value, format) ?? null
      } else {
        changeDate(null)

        return
      }

      changeDate(newDate)
    },
    [changeDate, format, adapter, range, index]
  )

  return {
    value: inputValue,
    onChange: handleChange,
  }
}
