import React from 'react'
import { DatePicker, DatePickerProps } from './DatePicker'
import { BaseTimePickerProps } from './views/BaseTimePicker'

export interface DateTimePickerProps<TDate = unknown>
  extends DatePickerProps<TDate> {
  timePickerProps?: Omit<BaseTimePickerProps, 'onChange' | 'value'>
}

type DateTimePickerComponent = <TDate>(
  props: DateTimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>
) => JSX.Element

export const DateTimePicker = React.forwardRef(
  <TDate extends unknown>(
    { timePickerProps, ...datePickerProps }: DateTimePickerProps<TDate>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    return (
      <DatePicker
        ref={ref}
        {...datePickerProps}
        timePickerProps={timePickerProps ?? {}}
      />
    )
  }
) as DateTimePickerComponent
