import * as React from 'react'
import { CalendarPicker, CalendarPickerProps } from '../../views/CalendarPicker'
import {
  BaseTimePicker,
  StaticBaseTimePickerProps,
} from '../../views/BaseTimePicker'

type View = 'calendar' | 'time'

export const MobileCalendarPicker = <TDate extends unknown>({
  onChangeDay,
  timePickerProps,
  ...rest
}: CalendarPickerProps<TDate> & {
  timePickerProps?: StaticBaseTimePickerProps<TDate>
}): React.ReactElement => {
  const [currentView, setCurrentView] = React.useState<View>('calendar')

  const handleChangeDay = React.useCallback(
    (date: TDate) => {
      if (timePickerProps) {
        setCurrentView('time')
      }
      onChangeDay?.(date)
    },
    [onChangeDay, timePickerProps]
  )

  return (
    <>
      {currentView === 'calendar' && (
        <CalendarPicker onChangeDay={handleChangeDay} {...rest} />
      )}
      {currentView === 'time' && (
        <BaseTimePicker
          {...timePickerProps}
          value={rest.value}
          onChange={rest.onChange}
        />
      )}
    </>
  )
}
