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

export type UseHandleChangeDateReason = 'input' | 'panel'

export type UseHandleChangeDateReturnProps<TDate extends unknown = unknown> = (
  date: TDate,
  reason?: UseHandleChangeDateReason
) => void

export type UseHandleChangeRangeDateReturnProps<
  TDate extends unknown = unknown
> = (
  date: TRangeDate<TDate>,
  index: 0 | 1,
  reason?: UseHandleChangeDateReason
) => void

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
}: UseHandleChangeDateProps<TDate>): UseHandleChangeDateReturnProps<TDate> => {
  const adapter = useDateLibAdapter<TDate>()
  const performChangeTimeoutRef = React.useRef<ReturnType<
    typeof setTimeout
  > | null>(null)

  const handleChange = React.useCallback(
    (date: TDate, reason: UseHandleChangeDateReason = 'panel') => {
      if (performChangeTimeoutRef.current) {
        clearTimeout(performChangeTimeoutRef.current)
      }
      const makePerformChange = () =>
        performChange<TDate>({
          adapter,
          date,
          format,
          input,
        })
      if (reason === 'input') {
        makePerformChange()
      } else {
        // Выносим диспатч в макротаску, чтобы не задерживать ивенты клика по календарю, а, затем,
        // позже забрать все атрибуты из инпута в change event
        performChangeTimeoutRef.current = setTimeout(
          () => makePerformChange(),
          1
        )
      }
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
}: UseHandleChangeDateRangeProps<TDate>): UseHandleChangeRangeDateReturnProps<TDate> => {
  const adapter = useDateLibAdapter<TDate>()
  const performChangeTimeoutRef = React.useRef<ReturnType<
    typeof setTimeout
  > | null>(null)

  const handleChange = React.useCallback(
    (
      date: TRangeDate<TDate>,
      index: 0 | 1,
      reason: UseHandleChangeDateReason = 'panel'
    ) => {
      const makePerformChange = () =>
        performChange({
          adapter,
          date: date[index],
          format,
          input: inputs[index],
        })

      if (reason === 'input') {
        makePerformChange()
      } else {
        // Выносим диспатч в макротаску, чтобы не задерживать ивенты клика по календарю, а, затем,
        // позже забрать все атрибуты из инпута в change event
        performChangeTimeoutRef.current = setTimeout(
          () => makePerformChange(),
          1
        )
      }
      onChange?.(date as TRangeDateBackwardCompat<TDate>)
    },
    [onChange, format, adapter, inputs]
  )

  return handleChange
}
