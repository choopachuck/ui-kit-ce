import { CustomUtils } from '../utils/customDateLibAdapter'
import { ValidateDateProps } from '../interfaces/date'
import { DateValidationError } from '../constants/common'
import { TRangeDate, TRangeValue } from '../interfaces/range'
import { ParsableDate } from '../interfaces/common'
import { isMatchYears } from './isMatchYears'

export const parsePickerInputValue = <TDate = unknown>(
  adapter: CustomUtils<TDate>,
  value: ParsableDate<TDate>
): TDate | null => {
  const parsedValue = adapter.date(value)

  return adapter.isValid(parsedValue) ? parsedValue : null
}

export const isInvalid = <TDate = unknown>(
  value: TDate | null | number,
  adapter: CustomUtils<TDate>
): DateValidationError.invalidDate | null => {
  if (!value || typeof value === 'number') {
    return null
  }

  return adapter.isValid(value) ? null : DateValidationError.invalidDate
}

export const validate = <TDate = unknown>(
  value: TDate | null,
  adapter: CustomUtils<TDate>,
  {
    minDate,
    maxDate,
    disablePast,
    disableFuture,
    disableDate,
  }: ValidateDateProps<TDate>,
  format?: string,
  inputValue?: string
):
  | DateValidationError.invalidDate
  | DateValidationError.notAllowedDate
  | null => {
  if (!value) {
    return null
  }

  const isInvalidDate = isInvalid(value, adapter)

  if (
    isInvalidDate ||
    (inputValue && format && !isMatchYears(inputValue, format))
  ) {
    return isInvalidDate || DateValidationError.invalidDate
  }

  const nowDate = adapter.date() as TDate

  if (
    (minDate && adapter.isBeforeDay(value, minDate)) ||
    (maxDate && adapter.isAfterDay(value, maxDate)) ||
    (disablePast && adapter.isBeforeDay(value, nowDate)) ||
    (disableFuture && adapter.isAfterDay(value, nowDate)) ||
    (disableDate && disableDate(value))
  ) {
    return DateValidationError.notAllowedDate
  }

  return null
}

export const isWrongDirection = <TDate = unknown>(
  range: TRangeDate<TDate>,
  index: 0 | 1,
  adapter: CustomUtils<TDate>
): DateValidationError | null => {
  const value = range[index]

  if (!value || typeof value === 'number') {
    return null
  }

  if (
    index === 0 &&
    range[1] &&
    typeof range[1] !== 'number' &&
    adapter.isAfterDay(value, range[1])
  ) {
    return DateValidationError.isAfterEndDate
  }

  if (
    index === 1 &&
    range[0] &&
    typeof range[0] !== 'number' &&
    adapter.isBeforeDay(value, range[0])
  ) {
    return DateValidationError.isBeforeStartDate
  }

  return null
}

export const validateRange = <TDate = unknown>(
  range: TRangeDate<TDate>,
  index: 0 | 1,
  adapter: CustomUtils<TDate>,
  validateProps: ValidateDateProps<TDate>
): [DateValidationError | null, DateValidationError | null] => {
  //check that both are valid
  const validStartError = isInvalid(range[0], adapter)
  const validEndError = isInvalid(range[1], adapter)

  if (validStartError || validEndError) {
    return [validStartError, validEndError]
  }

  const validationResult = isWrongDirection(range, index, adapter)

  if (validationResult) {
    const result: [DateValidationError | null, DateValidationError | null] = [
      null,
      null,
    ]

    result[index] = validationResult

    return result
  }

  //common valid
  const commonErrorStart =
    typeof range[0] !== 'number'
      ? validate<TDate>(range[0], adapter, validateProps)
      : null
  const commonErrorEnd =
    typeof range[1] !== 'number'
      ? validate<TDate>(range[1], adapter, validateProps)
      : null

  return [commonErrorStart, commonErrorEnd]
}

export function getTDate<TDate>(value?: TRangeValue<TDate>): TDate | null {
  return !!value && typeof value !== 'number' ? value : null
}

export const getDateByActiveInputIndex = <TDate extends unknown>(
  rangeDate: TRangeDate<TDate>,
  activeInputIndex?: 0 | 1
): number | TDate | null => {
  const inverseRangeIndex = {
    0: 1,
    1: 0,
  }

  return activeInputIndex === undefined
    ? null
    : rangeDate[activeInputIndex] ??
        rangeDate[inverseRangeIndex[activeInputIndex]]
}

export function formatDate<TDate = unknown>(
  adapter: CustomUtils<TDate>,
  date: Date | TDate,
  format = 'keyboardDate',
  placeholder = ''
): string {
  if (!date) {
    return placeholder
  }

  try {
    const adapterDate = adapter.date(date) as TDate

    if (format === 'keyboardDate') {
      return adapter.format(adapterDate, format)
    }

    return adapter.formatByString(adapterDate, format)
  } catch (e) {
    return placeholder
  }
}
