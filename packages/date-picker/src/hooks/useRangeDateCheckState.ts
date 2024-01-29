import { ExistedViews, CheckDateStateResult } from '../interfaces/common'
import { getTDate, validate } from '../utils/date'
import { useDateLibAdapter } from './useDateLibAdapter'
import { useNowDate } from './useNowDate'
import { TRangeDate } from '../interfaces/range'
import { ValidateDateProps } from '../interfaces/date'
import { useDefaultDates } from './useDefaultDates'

export interface IUseRangeDateCheckStateProps<TDate = unknown>
  extends ValidateDateProps<TDate> {
  range: TRangeDate<TDate>
  activeInputIndex?: 0 | 1
  existedViews: ExistedViews
  hoverDate: TDate | null
}

export interface IUseRangeDateCheckStateResult<TDate = unknown> {
  isDateDisabled: (date: TDate) => boolean
  isDateSelected: (date: TDate) => CheckDateStateResult
  isDateInRange: (date: TDate) => CheckDateStateResult
  isDateInHoverRange: (date: TDate) => CheckDateStateResult
  isMonthDisabled: (date: TDate) => boolean
  isMonthSelected: (date: TDate) => CheckDateStateResult
  isYearDisabled: (date: TDate) => boolean
  isYearSelected: (date: TDate) => CheckDateStateResult
}

export const useRangeDateCheckState = <TDate = unknown>({
  range,
  activeInputIndex,
  hoverDate,
  disablePast,
  disableFuture,
  shouldDisableDate,
  ...rest
}: IUseRangeDateCheckStateProps<TDate>): IUseRangeDateCheckStateResult<TDate> => {
  const adapter = useDateLibAdapter<TDate>()

  const nowDate = useNowDate<TDate>()
  const { minDate, maxDate } = useDefaultDates(rest)

  const isDateDisabled = (date: TDate): boolean => {
    return !!validate<TDate>(date, adapter, {
      minDate,
      maxDate,
      disableFuture,
      disablePast,
      disableDate: shouldDisableDate,
    })
  }

  const isStartInfinity = range[0] === -Infinity
  const isEndInfinity = range[1] === Infinity
  const range_0_notInfinity = getTDate(range[0])
  const range_1_notInfinity = getTDate(range[1])

  const isDateSelected = (checkedDate: TDate): CheckDateStateResult => {
    if (range_0_notInfinity) {
      const isStartDate = adapter.isSameDay(range_0_notInfinity, checkedDate)
      if (isStartDate) {
        return {
          value: isStartDate,
          preventNextCheck: !range[1] || isEndInfinity,
          position:
            isEndInfinity ||
            (range_1_notInfinity &&
              !adapter.isSameDay(checkedDate, range_1_notInfinity))
              ? 'start'
              : undefined,
        }
      }
    }

    if (range_1_notInfinity) {
      const isEndDate = adapter.isSameDay(range_1_notInfinity, checkedDate)
      if (isEndDate) {
        return {
          value: isEndDate,
          preventNextCheck: !!(
            range_0_notInfinity &&
            adapter.isAfterDay(range_1_notInfinity, range_0_notInfinity)
          ),
          position:
            isStartInfinity ||
            (range_0_notInfinity &&
              !adapter.isSameDay(checkedDate, range_0_notInfinity))
              ? 'end'
              : undefined,
        }
      }
    }

    return {
      value: false,
      preventNextCheck:
        (!range[0] || isStartInfinity) && (!range[1] || isEndInfinity),
    }
  }

  const isDateInRange = (checkedDate: TDate): CheckDateStateResult => {
    if (range[0] && range[1]) {
      const inRange =
        (isStartInfinity && isEndInfinity) ||
        (isStartInfinity &&
          range_1_notInfinity &&
          adapter.isBeforeDay(checkedDate, range_1_notInfinity)) ||
        (isEndInfinity &&
          range_0_notInfinity &&
          adapter.isAfterDay(checkedDate, range_0_notInfinity)) ||
        (range_0_notInfinity &&
          range_1_notInfinity &&
          adapter.isBeforeDay(range_0_notInfinity, range_1_notInfinity) &&
          adapter.isWithinRange(checkedDate, [
            range_0_notInfinity,
            range_1_notInfinity,
          ]))
      if (inRange) {
        return {
          value: true,
          preventNextCheck: false,
        }
      }

      return {
        value: false,
        preventNextCheck:
          !!range_1_notInfinity &&
          adapter.isAfterDay(checkedDate, range_1_notInfinity),
      }
    }

    return {
      value: false,
      preventNextCheck: true,
    }
  }

  const isDateInHoverRange = (checkedDate: TDate): CheckDateStateResult => {
    if (activeInputIndex === 0 && range[1]) {
      const isSameDayWithHoverDate =
        !!hoverDate && adapter.isSameDay(checkedDate, hoverDate)
      const isAfterHoverDate =
        !!hoverDate && adapter.isAfter(checkedDate, hoverDate)
      let isBeforeRangeDate = false
      if (isAfterHoverDate || isSameDayWithHoverDate) {
        isBeforeRangeDate =
          isEndInfinity ||
          (!!range_1_notInfinity &&
            adapter.isBefore(checkedDate, range_1_notInfinity))
      }

      return {
        value:
          isBeforeRangeDate && (isSameDayWithHoverDate || isAfterHoverDate),
        preventNextCheck: isAfterHoverDate && !isBeforeRangeDate,
        position:
          isSameDayWithHoverDate && isBeforeRangeDate ? 'start' : undefined,
      }
    }

    if (activeInputIndex === 1 && range[0]) {
      const isAfterRangeDate =
        isStartInfinity ||
        (!!range_0_notInfinity &&
          adapter.isAfter(checkedDate, range_0_notInfinity))
      let isBeforeHoverDate = false
      if (isAfterRangeDate) {
        isBeforeHoverDate =
          !!hoverDate && adapter.isBefore(checkedDate, hoverDate)
      }
      const isSameDayWithHoverDate =
        !!hoverDate && adapter.isSameDay(checkedDate, hoverDate)

      return {
        value:
          isAfterRangeDate && (isSameDayWithHoverDate || isBeforeHoverDate),
        preventNextCheck: isSameDayWithHoverDate,
        position:
          isSameDayWithHoverDate && isAfterRangeDate ? 'end' : undefined,
      }
    }

    return {
      value: false,
      preventNextCheck: false,
    }
  }

  const isMonthDisabled = (checkedMonth: TDate): boolean => {
    const firstEnabledMonth = adapter.startOfMonth(
      disablePast && adapter.isAfter(nowDate, minDate) ? nowDate : minDate
    )
    if (adapter.isBefore(checkedMonth, firstEnabledMonth)) {
      return true
    }

    const lastEnabledMonth = adapter.startOfMonth(
      disableFuture && adapter.isBefore(nowDate, maxDate) ? nowDate : maxDate
    )
    if (adapter.isAfter(checkedMonth, lastEnabledMonth)) {
      return true
    }

    return !!shouldDisableDate?.(checkedMonth, 'month')
  }

  const isMonthSelected = (checkedMonth: TDate): CheckDateStateResult => {
    if (range_0_notInfinity) {
      const isSelected = adapter.isSameMonth(checkedMonth, range_0_notInfinity)
      if (isSelected) {
        return {
          value: isSelected,
          preventNextCheck: !range[1] || isEndInfinity,
          position:
            isEndInfinity ||
            (range_1_notInfinity &&
              !adapter.isSameMonth(checkedMonth, range_1_notInfinity))
              ? 'start'
              : undefined,
        }
      }
    }

    if (range_1_notInfinity) {
      const isSelected = adapter.isSameMonth(checkedMonth, range_1_notInfinity)
      if (isSelected) {
        return {
          value: isSelected,
          preventNextCheck: true,
          position:
            isStartInfinity ||
            (range_0_notInfinity &&
              !adapter.isSameMonth(range_0_notInfinity, checkedMonth))
              ? 'end'
              : undefined,
        }
      }
    }

    return {
      value: false,
      preventNextCheck:
        (!range[0] || isStartInfinity) && (!range[1] || isEndInfinity),
    }
  }

  const isYearDisabled = (checkedYear: TDate): boolean => {
    if (disablePast && adapter.isBeforeYear(checkedYear, nowDate)) {
      return true
    }

    if (disableFuture && adapter.isAfterYear(checkedYear, nowDate)) {
      return true
    }

    return !!shouldDisableDate?.(checkedYear, 'year')
  }

  const isYearSelected = (checkedYear: TDate): CheckDateStateResult => {
    if (range_0_notInfinity) {
      const isSelected = adapter.isSameYear(checkedYear, range_0_notInfinity)
      if (isSelected) {
        return {
          value: isSelected,
          preventNextCheck: !range[1] || isEndInfinity,
          position:
            isEndInfinity ||
            (range_1_notInfinity &&
              !adapter.isSameYear(checkedYear, range_1_notInfinity))
              ? 'start'
              : undefined,
        }
      }
    }

    if (range_1_notInfinity) {
      const isSelected = adapter.isSameYear(checkedYear, range_1_notInfinity)
      if (isSelected) {
        return {
          value: isSelected,
          preventNextCheck: true,
          position:
            isStartInfinity ||
            (range_0_notInfinity &&
              !adapter.isSameYear(range_0_notInfinity, checkedYear))
              ? 'end'
              : undefined,
        }
      }
    }

    return {
      value: false,
      preventNextCheck:
        (!range[0] || isStartInfinity) && (!range[1] || isEndInfinity),
    }
  }

  return {
    isDateDisabled,
    isDateSelected,
    isDateInRange,
    isDateInHoverRange,
    isMonthDisabled,
    isMonthSelected,
    isYearDisabled,
    isYearSelected,
  }
}
