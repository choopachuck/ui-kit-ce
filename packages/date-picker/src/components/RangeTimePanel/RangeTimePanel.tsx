import * as React from 'react'
import { BaseTimePicker, BaseTimePickerProps } from '../../views/BaseTimePicker'
import { TRangeDate, TRangeValue } from '../../interfaces'
import { createUseStyles } from '@v-uik/theme'
import { useShouldDisableRangeTime } from '../../hooks/useShouldDisableRangeTime'
import { getTDate } from '../../utils/date'

export interface RangeTimePanelProps<TDate = unknown> {
  /**
   * Свойства компонента BaseTimePicker для начала диапазона
   */
  startTimePickerProps?: Omit<
    BaseTimePickerProps<TDate>,
    'value' | 'onChange' | 'is12HoursFormat'
  >
  /**
   * Свойства компонента BaseTimePicker для конца диапазона
   */
  endTimePickerProps?: Omit<
    BaseTimePickerProps<TDate>,
    'value' | 'onChange' | 'is12HoursFormat'
  >
  /**
   * Диапазон
   */
  value?: TRangeDate<TDate>
  /**
   * Обработчик изменения диапазона по индексу
   */
  changeDate: (date: TRangeValue<TDate>, index: 0 | 1) => void
  /**
   * Использовать 12-ти часовой формат
   */
  is12HoursFormat?: boolean
}

const useStyles = createUseStyles({
  container: {
    marginTop: '61px',
    borderTop: '1px solid rgba(0,0,0,.1)',

    '&:first-child': {
      marginLeft: 10,
      paddingRight: 2,
    },

    '&:last-child': {
      borderLeft: '1px solid rgba(0,0,0,.1)',
      paddingLeft: 2,
    },
  },

  timePickerRoot: {
    maxHeight: 290,
  },

  divider: {
    width: 1,
    marginLeft: 6,
    backgroundColor: 'rgba(0,0,0,.1)',
  },
})

export type RangeTimePanelComponent = <TDate>(
  props: RangeTimePanelProps<TDate>
) => JSX.Element

export const RangeTimePanel = React.memo(
  <TDate extends unknown>({
    startTimePickerProps,
    endTimePickerProps,
    changeDate,
    value,
    is12HoursFormat,
  }: RangeTimePanelProps<TDate>): React.ReactElement => {
    const classesList = useStyles()

    const [shouldDisableStartTime, shouldDisableEndTime] =
      useShouldDisableRangeTime(startTimePickerProps, endTimePickerProps, value)

    return (
      <>
        <div className={classesList.divider} />
        <div className={classesList.container}>
          <BaseTimePicker
            {...startTimePickerProps}
            is12HoursFormat={is12HoursFormat}
            shouldDisableTime={shouldDisableStartTime}
            classes={{ root: classesList.timePickerRoot }}
            value={getTDate(value?.[0])}
            onChange={(date: TDate) => changeDate(date, 0)}
          />
        </div>
        <div className={classesList.container}>
          <BaseTimePicker
            {...endTimePickerProps}
            is12HoursFormat={is12HoursFormat}
            shouldDisableTime={shouldDisableEndTime}
            classes={{ root: classesList.timePickerRoot }}
            value={getTDate(value?.[1])}
            onChange={(date: TDate) => changeDate(date, 1)}
          />
        </div>
      </>
    )
  }
) as RangeTimePanelComponent
