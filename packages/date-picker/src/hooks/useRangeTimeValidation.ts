import React from 'react'
import { TimeValidationError } from '../constants/common'
import { TRangeDate } from '../interfaces'
import { DisableTime } from '../interfaces/time'
import { validateRange } from '../utils/time'
import { useDateLibAdapter } from './useDateLibAdapter'

export type UseRangeTimeValidationProps<TDate = unknown> = {
  startDisabledTime?: DisableTime<TDate>
  endDisabledTime?: DisableTime<TDate>
}

export type UseRangeTimeValidateProps<TDate = unknown> = {
  range: TRangeDate<TDate>
  index: 0 | 1
}

export type UseRangeTimeValidationReturnProps<TDate = unknown> = {
  validate: (args: UseRangeTimeValidateProps<TDate>) => boolean
  validationErrorStart: TimeValidationError | null
  validationErrorEnd: TimeValidationError | null
}

export const useRangeTimeValidation = <TDate = unknown>({
  endDisabledTime,
  startDisabledTime,
}: UseRangeTimeValidationProps<TDate>): UseRangeTimeValidationReturnProps<TDate> => {
  const [validationErrorStart, setValidationErrorStart] =
    React.useState<TimeValidationError | null>(null)
  const [validationErrorEnd, setValidationErrorEnd] =
    React.useState<TimeValidationError | null>(null)

  const adapter = useDateLibAdapter<TDate>()

  const validate = React.useCallback(
    ({ range, index }: UseRangeTimeValidateProps<TDate>) => {
      const [start, end] = validateRange(
        range,
        index,
        adapter,
        index === 0 ? startDisabledTime : endDisabledTime
      )

      setValidationErrorStart(start)
      setValidationErrorEnd(end)

      return !start && !end
    },
    [
      adapter,
      startDisabledTime,
      endDisabledTime,
      setValidationErrorStart,
      setValidationErrorEnd,
    ]
  )

  return {
    validate,
    validationErrorEnd,
    validationErrorStart,
  }
}
