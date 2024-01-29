import { useDateLibAdapter } from './useDateLibAdapter'
import * as React from 'react'
import { DisableTime } from '../interfaces/time'
import { hasMaskSybmols } from '../utils/hasMaskSymbols'
import { TimeValidationError } from '../constants/common'
import { validate } from '../utils/time'

interface Props<TDate = unknown> {
  is12HoursFormat?: boolean
  date: TDate | null
  changeDate: (date: TDate | null) => void
  format: string
  shouldDisableTime?: DisableTime<TDate>
  triggerOnChangeOnInvalid?: boolean
}

const useFormat = <TDate extends unknown>(
  date: TDate,
  format: string,
  placeholder = ''
): string => {
  const adapter = useDateLibAdapter()

  try {
    return date ? adapter.formatByString(date, format) : ''
  } catch (e) {
    return placeholder
  }
}

export const useTimeInput = <TDate extends unknown>({
  date,
  changeDate,
  format,
  shouldDisableTime,
  triggerOnChangeOnInvalid,
}: Props<TDate>): {
  value: string
  onChange: (v: string) => void
  validationError: TimeValidationError | null
} => {
  const adapter = useDateLibAdapter<TDate>()
  const formattedDate = useFormat(date, format)

  const [inputValue, setInputValue] = React.useState<string>(formattedDate)
  const [validationError, setValidationError] =
    React.useState<TimeValidationError | null>(null)

  // Если date === null то обнуляем все поля так как происходит сброс
  React.useLayoutEffect(() => {
    if (date !== null) {
      return
    }
    setInputValue('')
    setValidationError(null)
  }, [date])

  React.useEffect(() => {
    if (!inputValue) {
      setValidationError(null)
    }
  }, [inputValue])

  React.useLayoutEffect(() => {
    if (formattedDate !== inputValue) {
      const validationError = validate(date, adapter, shouldDisableTime)

      // НЕ тригерим setIsValid если значение пустое
      if (formattedDate) {
        setValidationError(validationError)
      }

      if (validationError !== 'invalidTime') {
        setInputValue(formattedDate)
      }
    }
  }, [formattedDate, adapter, shouldDisableTime]) // eslint-disable-line react-hooks/exhaustive-deps

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
      }

      const validationError = validate(newDate, adapter, shouldDisableTime)
      setValidationError(validationError)

      if (!validationError || triggerOnChangeOnInvalid) {
        changeDate(newDate)
      }
    },
    [changeDate, format, adapter, shouldDisableTime, triggerOnChangeOnInvalid]
  )

  return {
    value: inputValue,
    onChange: handleChange,
    validationError,
  }
}

// function validate<TDate>(
//   date: TDate | null,
//   adapter: CustomUtils<TDate>,
//   shouldDisableTime?: DisableTime<TDate>
// ) {
//   if (!date) {
//     return false
//   }
//
//   const isValid = adapter.isValid(date)
//   if (!isValid) {
//     return false
//   }
//
//   if (!shouldDisableTime) {
//     return true
//   }
//
//   return (
//     !shouldDisableTime(date, 'hours') &&
//     !shouldDisableTime(date, 'minutes') &&
//     !shouldDisableTime(date, 'seconds') &&
//     !shouldDisableTime(date, 'milliseconds') &&
//     !shouldDisableTime(date, 'dayPart')
//   )
// }
