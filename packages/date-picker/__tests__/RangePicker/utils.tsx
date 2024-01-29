import { RangePicker, RangePickerProps } from '@v-uik/date-picker'
import * as React from 'react'
import { DictionaryAdapter, withDateLibAdapter } from '../withDateLibAdapter'
import { functionProxy } from '../helpers'

import { useDateLibAdapter } from '../../src'

// eslint-disable-next-line @typescript-eslint/no-empty-function
window.HTMLElement.prototype.scrollIntoView = function () {}

export interface ComponentProps
  extends Partial<
    Omit<
      RangePickerProps<unknown>,
      | 'value'
      | 'onChange'
      | 'next_shouldDisableDate'
      | 'next_shouldDisableMonth'
      | 'next_shouldDisableYear'
      | 'minDate'
      | 'maxDate'
    > & { value: [unknown, unknown] }
  > {
  adapterKey: DictionaryAdapter
  minDate?: Date
  maxDate?: Date
  next_shouldDisableDate?: (v: Date) => boolean
  next_shouldDisableMonth?: (v: Date) => boolean
  next_shouldDisableYear?: (v: Date) => boolean
  onChange?: (v: [Date | null, Date | null]) => void
}

export const Component = withDateLibAdapter((props: ComponentProps) => {
  const {
    onChange,
    value,
    adapterKey,
    minDate,
    maxDate,
    next_shouldDisableDate,
    next_shouldDisableMonth,
    next_shouldDisableYear,
    ...rest
  } = props
  const adapter = useDateLibAdapter()

  const [range, setRange] = React.useState<
    [unknown | number | null, unknown | number | null]
  >(value ? [adapter.date(value[0]), adapter.date(value[1])] : [null, null])

  return (
    <RangePicker
      //ввод без маски не работает
      {...rest}
      mask="11.11.1111"
      minDate={minDate ? adapter.date(minDate) : undefined}
      maxDate={maxDate ? adapter.date(maxDate) : undefined}
      next_shouldDisableDate={functionProxy(adapter, next_shouldDisableDate)}
      next_shouldDisableMonth={functionProxy(adapter, next_shouldDisableMonth)}
      next_shouldDisableYear={functionProxy(adapter, next_shouldDisableYear)}
      value={range}
      onChange={(range) => {
        onChange?.([
          range[0] ? adapter.toJsDate(range[0]) : null,
          range[1] ? adapter.toJsDate(range[1]) : null,
        ])
        setRange(range)
      }}
    />
  )
})
