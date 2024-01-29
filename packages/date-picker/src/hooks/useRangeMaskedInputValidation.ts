import React from 'react'
import { DateValidationError } from '../constants/common'
import { TRangeDate, ValidateDateProps } from '../interfaces'
import { validateRange } from '../utils/date'
import { useDateLibAdapter } from './useDateLibAdapter'

export type UseRangeMaskedInputValidationProps<TDate = unknown> =
  ValidateDateProps<TDate>

export type UseRangeMaskedInputValidateProps<TDate = unknown> = {
  range: TRangeDate<TDate>
  index: 0 | 1
}

export type UseRangeMaskedInputValidationResult<TDate = unknown> = {
  validate: (
    args: UseRangeMaskedInputValidateProps<TDate>
  ) => null | [DateValidationError | null, DateValidationError | null]
  validationErrorStart: DateValidationError | null
  validationErrorEnd: DateValidationError | null
}

export const useRangeMaskedInputValidation = <TDate = unknown>({
  disableDate,
  disableFuture,
  disablePast,
  maxDate,
  minDate,
}: UseRangeMaskedInputValidationProps<TDate>): UseRangeMaskedInputValidationResult<TDate> => {
  const [validationErrorStart, setValidationErrorStart] =
    React.useState<DateValidationError | null>(null)
  const [validationErrorEnd, setValidationErrorEnd] =
    React.useState<DateValidationError | null>(null)

  const adapter = useDateLibAdapter<TDate>()

  const validate = ({
    range,
    index,
  }: UseRangeMaskedInputValidateProps<TDate>) => {
    const [start, end] = validateRange(range, index, adapter, {
      disableDate,
      disableFuture,
      disablePast,
      maxDate,
      minDate,
    })

    setValidationErrorStart(start)
    setValidationErrorEnd(end)

    return !start && !end
      ? null
      : ([start, end] as [
          DateValidationError | null,
          DateValidationError | null
        ])
  }

  return {
    validate,
    validationErrorEnd,
    validationErrorStart,
  }
}
