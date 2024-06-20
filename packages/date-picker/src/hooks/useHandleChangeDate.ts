'use client'

import * as React from 'react'
import { dispatchChangeEvent } from '@v-uik/utils'
import { useDateLibAdapter } from './useDateLibAdapter'
import { formatDate } from '../utils/date'
import { CustomUtils } from '../utils/customDateLibAdapter'
import { TRangeDate } from '../interfaces'
import { TRangeDateBackwardCompat } from '../interfaces/range'

type PerformChangeProps<TDate extends unknown = unknown> = {
  input?: HTMLInputElement | null
  format?: string
  date: TDate
  adapter: CustomUtils<TDate>
}

export type UseHandleChangeDateProps<TDate extends unknown = unknown> = Pick<
  PerformChangeProps<TDate>,
  'format' | 'input'
> & {
  onChange?: (date: TDate) => void
}

export type UseHandleChangeDateRangeProps<TDate extends unknown = unknown> =
  Pick<PerformChangeProps<TDate>, 'format'> & {
    inputs: [
      PerformChangeProps<TDate>['input'],
      PerformChangeProps<TDate>['input']
    ]
    onChange?: (date: TRangeDate<TDate>) => void
  }

const performChange = <TDate extends unknown = unknown>({
  format,
  input,
  date,
  adapter,
}: PerformChangeProps<TDate>) => {
  const stringValue = formatDate<TDate>(adapter, date, format)

  if (input && stringValue) {
    dispatchChangeEvent(input, stringValue)
  }
}

export const useHandleChangeDate = <TDate extends unknown = unknown>({
  onChange,
  format,
  input,
}: UseHandleChangeDateProps<TDate>) => {
  const adapter = useDateLibAdapter<TDate>()

  const handleChange = React.useCallback(
    (date: TDate) => {
      performChange<TDate>({
        adapter,
        date,
        format,
        input,
      })
      onChange?.(date)
    },
    [onChange, format, adapter, input]
  )

  return handleChange
}

export const useHandleChangeRangeDate = <TDate extends unknown = unknown>({
  onChange,
  format,
  inputs,
}: UseHandleChangeDateRangeProps<TDate>) => {
  const adapter = useDateLibAdapter<TDate>()

  const handleChange = React.useCallback(
    (date: TRangeDate<TDate>, index: 0 | 1) => {
      performChange({
        adapter,
        date: date[index],
        format,
        input: inputs[index],
      })

      onChange?.(date as TRangeDateBackwardCompat<TDate>)
    },
    [onChange, format, adapter, inputs]
  )

  return handleChange
}
