import * as React from 'react'
import { useDateLibAdapter } from './useDateLibAdapter'
import { validate } from '../utils/date'
import { DateValidationError } from '../constants/common'
import { ValidateDateProps } from '../interfaces/date'
import { useFormat } from './useFormat'

interface IUseMaskedInputProps<TDate = unknown>
  extends ValidateDateProps<TDate> {
  date: TDate | null
  changeDate: (date: TDate | null) => void
  mask?: string
  format?: string
  triggerOnChangeOnInvalid?: boolean
}

export interface IUseMaskedInputResult {
  value: string
  onChange: (value: string) => void
  validationError: DateValidationError | null
}

export const useMaskedInput = <TDate extends unknown>({
  date,
  changeDate,
  format,
  mask,
  disablePast,
  disableFuture,
  minDate,
  maxDate,
  disableDate,
  triggerOnChangeOnInvalid,
}: IUseMaskedInputProps<TDate>): IUseMaskedInputResult => {
  const adapter = useDateLibAdapter<TDate>()
  const formattedDate = useFormat(date, format)

  const validateProps: ValidateDateProps<TDate> = {
    disablePast,
    disableFuture,
    minDate,
    maxDate,
    disableDate,
  }

  const [inputValue, setInputValue] = React.useState<string>(
    () => formattedDate
  )

  const [validationError, setValidationError] =
    React.useState<DateValidationError | null>(null)

  React.useEffect(() => {
    const newValue = formattedDate
    if (newValue !== inputValue) {
      const validationError = validate<TDate>(date, adapter, validateProps)
      setValidationError(validationError)

      if (validationError !== 'invalidDate') {
        setInputValue(newValue)
      }
    }
  }, [formattedDate, date]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangeWithoutMask = (value: string) => {
    setInputValue(value)

    const newDate = value && format ? adapter.parse(value, format) : null

    const validationError = validate<TDate>(
      newDate,
      adapter,
      validateProps,
      format,
      value
    )

    setValidationError(validationError)

    if (!validationError || triggerOnChangeOnInvalid) {
      changeDate(newDate)
    }
  }

  const handleChange = (value: string) => {
    setInputValue(value)

    const newDate = value
      ? adapter.parse(value, format ?? adapter.formats?.keyboardDate)
      : null

    const validationError = validate<TDate>(newDate, adapter, validateProps)
    setValidationError(validationError)

    if (!validationError || triggerOnChangeOnInvalid) {
      changeDate(newDate)
    }
  }

  return {
    value: inputValue,
    onChange: mask ? handleChange : handleChangeWithoutMask,
    validationError,
  }
}
