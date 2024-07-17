import React from 'react'
import { DATA_V_UIK_INPUT_TYPE } from '@v-uik/common'
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
        inputProps={{
          ...datePickerProps?.inputProps,
          inputProps: {
            //@ts-ignore Компонент корректно принимает data-атрибуты
            [DATA_V_UIK_INPUT_TYPE]: 'date-time',
            ...datePickerProps?.inputProps?.inputProps,
          },
        }}
        timePickerProps={timePickerProps ?? {}}
      />
    )
  }
) as DateTimePickerComponent
