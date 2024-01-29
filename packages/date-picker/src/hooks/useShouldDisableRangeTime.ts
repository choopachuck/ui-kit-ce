import React from 'react'
import { TRangeDate } from '../interfaces'
import { DisableTime } from '../interfaces/time'
import { CustomUtils } from '../utils/customDateLibAdapter'
import { getTDate } from '../utils/date'
import { StaticBaseTimePickerProps } from '../views/BaseTimePicker'
import { useDateLibAdapter } from './useDateLibAdapter'

export const useShouldDisableRangeTime = <TDate>(
  startTimePickerProps?: StaticBaseTimePickerProps<TDate>,
  endTimePickerProps?: StaticBaseTimePickerProps<TDate>,
  value?: TRangeDate<TDate> | undefined
): [DisableTime<TDate> | undefined, DisableTime<TDate> | undefined] => {
  const adapter = useDateLibAdapter<TDate>()

  const isSameDay = React.useMemo(() => {
    if (
      !value?.[0] ||
      typeof value?.[0] === 'number' ||
      !value?.[1] ||
      typeof value?.[1] === 'number'
    ) {
      return true
    }

    return adapter.isSameDay(value[0], value[1])
  }, [value, adapter])

  const shouldDisableStartTime = React.useMemo(() => {
    const _value = getTDate(value?.[1])

    if (!_value || !isSameDay) {
      return startTimePickerProps?.shouldDisableTime
    }

    return getShouldDisableTime<TDate>(
      adapter,
      _value,
      (current, opposite) => current > opposite,
      (curr, opos) => curr < opos,
      startTimePickerProps
    )
  }, [value, startTimePickerProps, adapter, isSameDay])

  const shouldDisableEndTime = React.useMemo(() => {
    const _value = getTDate(value?.[0])

    if (!_value || !isSameDay) {
      return endTimePickerProps?.shouldDisableTime
    }

    return getShouldDisableTime<TDate>(
      adapter,
      _value,
      (current, opposite) => current < opposite,
      (curr, opos) => curr > opos,
      endTimePickerProps
    )
  }, [value, endTimePickerProps, adapter, isSameDay])

  return [shouldDisableStartTime, shouldDisableEndTime]
}

function getShouldDisableTime<TDate>(
  adapter: CustomUtils<TDate>,
  value: TDate,
  compare: (currentValue: number, oppositeChoiceValue: number) => boolean,
  comparePrevTime: (curr: number, opos: number) => boolean,
  defaultProps?: StaticBaseTimePickerProps<TDate>
): DisableTime<TDate> {
  return (date, view): boolean => {
    const customDisabledTime = defaultProps?.shouldDisableTime?.(date, view)
    if (customDisabledTime) {
      return true
    }

    const currentHour = adapter.getHours(date)
    const oppositeChoiceHour = adapter.getHours(value)

    const currentMinute = adapter.getMinutes(date)
    const oppositeChoiceMinute = adapter.getMinutes(value)

    const currentSecond = adapter.getSeconds(date)
    const oppositeChoiceSecond = adapter.getSeconds(value)

    if (view === 'hours') {
      const currentHour = adapter.getHours(date)
      const oppositeChoiceHour = adapter.getHours(value)

      return compare(currentHour, oppositeChoiceHour)
    }

    const isRecalculateMinutes = comparePrevTime(
      currentHour,
      oppositeChoiceHour
    )
    const isRecalculateSeconds = comparePrevTime(
      currentMinute,
      oppositeChoiceMinute
    )
    const isRecalculateMilliseconds = comparePrevTime(
      currentSecond,
      oppositeChoiceSecond
    )

    if (view === 'minutes') {
      const currentMinute = adapter.getMinutes(date)
      const oppositeChoiceMinute = adapter.getMinutes(value)

      // return compare(currentMinute, oppositeChoiceMinute, currentHour === oppositeChoiceHour)
      return !isRecalculateMinutes
        ? compare(currentMinute, oppositeChoiceMinute)
        : false
    }

    if (view === 'seconds') {
      const currentSecond = adapter.getSeconds(date)
      const oppositeChoiceSecond = adapter.getSeconds(value)

      return !(isRecalculateMinutes || isRecalculateSeconds)
        ? compare(currentSecond, oppositeChoiceSecond)
        : false
    }

    if (view === 'milliseconds') {
      const currentMillisecond = adapter.getMilliseconds(date)
      const oppositeChoiceMillisecond = adapter.getMilliseconds(value)

      return !(
        isRecalculateMinutes ||
        isRecalculateSeconds ||
        isRecalculateMilliseconds
      )
        ? compare(currentMillisecond, oppositeChoiceMillisecond)
        : false
    }

    return false
  }
}
