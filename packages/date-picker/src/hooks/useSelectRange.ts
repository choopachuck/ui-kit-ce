import * as React from 'react'
import { useDateLibAdapter } from './useDateLibAdapter'
import { parsePickerInputValue } from '../utils/date'
import { TRangeDate, TRangeValue } from '../interfaces/range'
import { ParsableDate } from '../interfaces/common'
import { CustomUtils } from '../utils/customDateLibAdapter'
import {
  useRangeMaskedInputValidation,
  UseRangeMaskedInputValidationProps,
  UseRangeMaskedInputValidationResult,
} from './useRangeMaskedInputValidation'
import { DateValidationError } from '../constants/common'

interface IUseSelectRangeProps<TDate = unknown>
  extends UseRangeMaskedInputValidationProps<TDate> {
  value: [ParsableDate<TDate>, ParsableDate<TDate>]
  onChange?: (date: TRangeDate<TDate>) => void
  onChangeByIndex?: (date: TRangeDate<TDate>, index: 0 | 1) => void
  rawValue?: [ParsableDate<TDate>, ParsableDate<TDate>]
  triggerOnChangeOnInvalid?: boolean
}

export interface IUseSelectRangeResult<TDate = unknown>
  extends Omit<UseRangeMaskedInputValidationResult, 'validate'> {
  selectedRange: TRangeDate<TDate>
  setSelectedRangeByIndex: (
    date: TRangeValue<TDate> | null,
    index: 0 | 1
  ) => void
}

const parseStart = <TDate>(
  value: [ParsableDate<TDate>, ParsableDate<TDate>],
  adapter: CustomUtils<TDate>
) =>
  Number(value[0]) === -Infinity
    ? -Infinity
    : parsePickerInputValue<TDate>(adapter, value[0])

const parseEnd = <TDate>(
  value: [ParsableDate<TDate>, ParsableDate<TDate>],
  adapter: CustomUtils<TDate>
) =>
  Number(value[1]) === Infinity
    ? Infinity
    : parsePickerInputValue<TDate>(adapter, value[1])

export const useSelectRange = <TDate = unknown>({
  value,
  onChange,
  onChangeByIndex,
  rawValue: rawValueDates,
  disableDate,
  disableFuture,
  disablePast,
  maxDate,
  minDate,
  triggerOnChangeOnInvalid,
}: IUseSelectRangeProps<TDate>): IUseSelectRangeResult<TDate> => {
  const adapter = useDateLibAdapter<TDate>()

  const { validate, validationErrorEnd, validationErrorStart } =
    useRangeMaskedInputValidation<TDate>({
      minDate,
      maxDate,
      disableFuture,
      disablePast,
      disableDate,
    })

  const [selectedRange, setSelectedRange] = React.useState<TRangeDate<TDate>>(
    () => {
      let startRange: TRangeValue<TDate> | null = null
      let endRange: TRangeValue<TDate> | null = null

      if (value && value[0]) {
        startRange = parseStart(value, adapter)
      }

      if (value && value[1]) {
        endRange = parseEnd(value, adapter)
      }

      return [startRange, endRange]
    }
  )

  React.useEffect(() => {
    const value_0 = value ? value[0] : null
    const value_1 = value ? value[1] : null
    let startChanged = !!value_0
    let endChanged = !!value_1
    if (selectedRange[0]) {
      startChanged =
        value_0 === -Infinity
          ? value_0 !== selectedRange[0]
          : !adapter.isEqual(selectedRange[0], value_0)
    }
    if (selectedRange[1]) {
      endChanged =
        value_1 === Infinity
          ? value_1 !== selectedRange[1]
          : !adapter.isEqual(selectedRange[1], value_1)
    }
    if (startChanged || endChanged) {
      setSelectedRange([parseStart(value, adapter), parseEnd(value, adapter)])
    }
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangeDateByIndex = (
    rawValue: TRangeValue<TDate> | null,
    index: 0 | 1,
    overrideRange?: TRangeDate<TDate>
  ) => {
    if (overrideRange) {
      setSelectedRange(overrideRange)
      onChange?.(overrideRange)
      onChangeByIndex?.(overrideRange, index)

      return
    }
    const rawNewRange = [
      rawValueDates?.[0] || selectedRange[0],
      rawValueDates?.[1] || selectedRange[1],
    ] as TRangeDate<TDate>
    const newRange: TRangeDate<TDate> = [...selectedRange]
    rawNewRange[index] = rawValue

    const validationErrors = validate({ range: rawNewRange, index })

    const isValidDate =
      validationErrors?.[index] !== DateValidationError.invalidDate
    newRange[index] = isValidDate ? rawValue : null
    setSelectedRange(newRange)
    if (!validationErrors || triggerOnChangeOnInvalid) {
      onChange?.(rawNewRange)
    }

    //перекинуть фокус на след инпут, если ввод валидный
    if (isValidDate) {
      onChangeByIndex?.(rawNewRange, index)
    }
  }

  return {
    selectedRange,
    setSelectedRangeByIndex: handleChangeDateByIndex,
    validationErrorEnd,
    validationErrorStart,
  }
}
