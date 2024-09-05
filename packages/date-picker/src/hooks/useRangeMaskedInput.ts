import * as React from 'react'
import { useDateLibAdapter } from './useDateLibAdapter'
import { noop } from '../utils/common'
import { DateValidationError } from '../constants/common'
import { TRangeDate, TRangeValue } from '../interfaces/range'
import { useFormat } from './useFormat'
import { ParsableDate } from '../interfaces'

interface IUseMaskedInputProps<TDate = unknown> {
  index: 0 | 1
  range: TRangeDate<TDate>
  changeDate: (range: TRangeValue<TDate> | null, index: 0 | 1) => void
  mask?: string
  format?: string
  rawValue?: [ParsableDate<TDate>, ParsableDate<TDate>] | null
  validationError?: DateValidationError | null
}

export interface IUseMaskedInputResult {
  value: string
  onChange: (value: string) => void
}

const getFormattedValue = (
  isInfinity: boolean,
  index: 0 | 1,
  formattedDate: string
): string => {
  if (isInfinity) {
    return index ? '+ ∞' : '- ∞'
  }

  return formattedDate
}

export const useRangeMaskedInput = <TDate = unknown>({
  range,
  changeDate,
  index,
  format,
  mask,
  validationError,
  rawValue = [null, null],
}: IUseMaskedInputProps<TDate>): IUseMaskedInputResult => {
  const date = range[index]
  const safetyRawValue = rawValue ?? [null, null]

  const isInfinity = date === -Infinity || date === Infinity

  const adapter = useDateLibAdapter<TDate>()
  const formattedDate = useFormat(date, format)

  const [inputValue, setInputValue] = React.useState<string>(() =>
    getFormattedValue(isInfinity, index, formattedDate)
  )

  const rawDate = safetyRawValue?.[index]

  React.useLayoutEffect(() => {
    if (rawDate !== null) {
      return
    }

    setInputValue('')
  }, [rawDate])

  React.useEffect(() => {
    const newValue = getFormattedValue(isInfinity, index, formattedDate)
    if (newValue !== inputValue) {
      if (validationError !== 'invalidDate') {
        setInputValue(newValue)
      }
    }
  }, [date, format]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (value: string) => {
    setInputValue(value)

    const newDate = value
      ? adapter.parse(value, format ?? adapter.formats?.keyboardDate)
      : null

    const newValue: TRangeDate<TDate> = range ? [...range] : [null, null]
    newValue[index] = newDate

    // TODO вероятно в системе типов не оправдано существование TDate и TRangeValue
    // так как не первое место где приходится переопределять тип
    changeDate(newDate, index)
  }

  return {
    value: inputValue,
    onChange: mask && !isInfinity ? handleChange : noop,
  }
}
