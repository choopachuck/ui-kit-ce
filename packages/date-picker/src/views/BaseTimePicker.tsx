'use client'

import * as React from 'react'
import { createUseStyles } from '@v-uik/theme'
import { useNowDate } from '../hooks/useNowDate'
import { useDateLibAdapter } from '../hooks/useDateLibAdapter'
import {
  NumberColumn,
  DayPartsColumn,
  Classes as NumberColumnClasses,
} from '../components/TimePicker'
import {
  getAscendingArray,
  filterByStep,
  focusNextNode,
  focusNextColumn,
  isAfterNoon,
  setDayPartTime,
  getDayPartTime,
} from '../utils/time'
import { isEqualKeyboardKeys } from '@v-uik/utils'
import {
  BaseTimePickerViewType,
  DayPart,
  DisableTime,
} from '../interfaces/time'
import { useClassList } from '@v-uik/hooks'

const commonTime = 60
const commonTimeValues = getAscendingArray(commonTime)
const millisecondsTimeValues = getAscendingArray(1000)

const useStyles = createUseStyles((theme) => ({
  root: {
    display: 'flex',
    maxHeight: 276,
    position: 'relative',
  },

  column: {
    padding: '2px 4px',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    borderRight: `1px solid ${
      theme.comp.timeView.dividerColorBorder ||
      theme.comp.dayView.dividerColorBorder
    }`,

    '&:last-child': {
      borderRight: 'none',
    },
  },
  cell: {},
}))

type Classes = Partial<Record<'root' | 'column', string>> & NumberColumnClasses

export type StaticBaseTimePickerProps<TDate = unknown> = Omit<
  BaseTimePickerProps<TDate>,
  'value' | 'onChange'
>

export interface BaseTimePickerProps<TDate = unknown> {
  /**
   * CSS классы компонента
   */
  classes?: Classes
  /**
   * Значение пикера
   */
  value: TDate | null
  /**
   * Обработчик изменения значения
   */
  onChange: (value: TDate) => void
  /**
   * Какие панели выбора даты доступны ('hours', 'minutes', 'seconds')
   
   * `@deprecated свойство не используется`
   */
  views?: BaseTimePickerViewType[]
  /**
   * Использовать 12-ти часовой формат (предполагает наличие еще одного столбца с выбором am/pm)
   */
  is12HoursFormat?: boolean
  /**
   * Интервал между часами
   */
  hoursStep?: number
  /**
   * Интервал между минутами
   */
  minutesStep?: number
  /**
   * Интервал между секундами
   */
  secondsStep?: number
  /**
   * Интервал между миллисекндами
   */
  millisecondsStep?: number
  /**
   * Функции отключения конкретных значений времени
   */
  shouldDisableTime?: DisableTime<TDate>
  /**
   * Функция нажатия на последний столбец колонки (нужен для прокидывания каллбека закрытия)
   */
  onClickLastNumberColumn?: () => void
}

export type BaseTimePickerComponent = <TDate>(
  props: BaseTimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>
) => JSX.Element

export const BaseTimePicker = React.forwardRef(
  <TDate extends unknown>(
    {
      classes,
      value: propsValue,
      onChange,
      views = ['hours', 'minutes'],
      is12HoursFormat = false,
      hoursStep = 1,
      minutesStep = 1,
      secondsStep = 1,
      millisecondsStep = 1,
      shouldDisableTime,
      onClickLastNumberColumn,
      ...rest
    }: BaseTimePickerProps<TDate>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const adapter = useDateLibAdapter<TDate>()
    const nowDate = useNowDate<TDate>()

    const displayedDate =
      propsValue && adapter.isValid(propsValue)
        ? propsValue
        : adapter.startOfDay(nowDate)

    const commonHours = React.useMemo(
      () =>
        is12HoursFormat
          ? [12].concat(getAscendingArray(12, 1))
          : getAscendingArray(24),
      [is12HoursFormat]
    )
    const hours = React.useMemo(
      () => filterByStep(commonHours, hoursStep),
      [commonHours, hoursStep]
    )
    const minutes = React.useMemo(
      () => filterByStep(commonTimeValues, minutesStep),
      [minutesStep]
    )
    const seconds = React.useMemo(
      () => filterByStep(commonTimeValues, secondsStep),
      [secondsStep]
    )

    const milliseconds = React.useMemo(
      () => filterByStep(millisecondsTimeValues, millisecondsStep),
      [millisecondsStep]
    )

    const values: Record<BaseTimePickerViewType, number[]> = {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      milliseconds,
    }

    const setHours = (date: TDate, count: number) => {
      if (is12HoursFormat) {
        if (count === 12) {
          return adapter.setHours(date, 0)
        } else {
          return adapter.setHours(
            date,
            isAfterNoon(adapter, date) ? count + 12 : count
          )
        }
      }

      return adapter.setHours(date, count)
    }
    const setMinutes = (date: TDate, count: number) =>
      adapter.setMinutes(date, count)
    const setSeconds = (date: TDate, count: number) =>
      adapter.setSeconds(date, count)

    const setMilliseconds = (date: TDate, count: number) =>
      adapter.setMilliseconds(date, count) as TDate

    const getHours = (date: TDate) =>
      is12HoursFormat
        ? +adapter.format(date, 'hours12h')
        : +adapter.format(date, 'hours24h')
    const getMinutes = (date: TDate) => adapter.getMinutes(date)
    const getSeconds = (date: TDate) => adapter.getSeconds(date)
    const getMilliseconds = (date: TDate) => adapter.getMilliseconds(date)

    const builtins: Record<
      BaseTimePickerViewType,
      {
        setValue: (date: TDate, count: number) => TDate
        getValue: (date: TDate) => number
      }
    > = {
      hours: {
        setValue: setHours,
        getValue: getHours,
      },
      minutes: {
        setValue: setMinutes,
        getValue: getMinutes,
      },
      seconds: {
        setValue: setSeconds,
        getValue: getSeconds,
      },
      milliseconds: {
        setValue: setMilliseconds,
        getValue: getMilliseconds,
      },
    }

    const handleTimeChange = (view: BaseTimePickerViewType, count: number) => {
      onChange(builtins[view].setValue(displayedDate, count))
    }
    const handleDayPartChange = (dayPart: DayPart) => {
      onChange(setDayPartTime(adapter, dayPart, displayedDate))
    }

    const shouldDisableValue = (
      view: BaseTimePickerViewType,
      count: number
    ): boolean | undefined =>
      shouldDisableTime?.(builtins[view].setValue(displayedDate, count), view)
    const shouldDisableDayPart = (dayPart: DayPart): boolean | undefined =>
      shouldDisableTime?.(
        setDayPartTime(adapter, dayPart, displayedDate),
        'dayPart'
      )

    const getCurrentValue = (view: BaseTimePickerViewType) =>
      propsValue && adapter.isValid(propsValue)
        ? builtins[view].getValue(propsValue)
        : undefined
    const currentDayPart: DayPart | undefined = getDayPartTime(
      adapter,
      propsValue
    )

    const classesList = useStyles()
    const classesMap: Classes = useClassList(classesList, classes)

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (isEqualKeyboardKeys('ArrowDown', event.key)) {
        event.preventDefault()
        focusNextNode('increase')

        return
      }

      if (isEqualKeyboardKeys('ArrowUp', event.key)) {
        event.preventDefault()
        focusNextNode('decrease')

        return
      }

      if (isEqualKeyboardKeys('Tab', event.key)) {
        event.preventDefault()
        focusNextColumn(event.shiftKey ? 'decrease' : 'increase')

        return
      }

      if (isEqualKeyboardKeys('ArrowLeft', event.key)) {
        event.preventDefault()
        focusNextNode('decrease')

        return
      }

      if (isEqualKeyboardKeys('ArrowRight', event.key)) {
        event.preventDefault()
        focusNextNode('increase')

        return
      }
    }

    const numberColumnClasses: NumberColumnClasses = React.useMemo(
      () => ({
        option: classes?.option,
        optionDisabled: classes?.optionDisabled,
        optionSelected: classes?.optionSelected,
      }),
      [classes]
    )

    return (
      <div
        {...rest}
        ref={ref}
        className={classesMap.root}
        onKeyDown={handleKeyDown}
      >
        {views?.map((view, index) => (
          <NumberColumn
            key={view}
            view={view}
            className={classesMap.column}
            values={values[view]}
            currentValue={getCurrentValue?.(view)}
            classes={numberColumnClasses}
            shouldDisableValue={shouldDisableValue}
            onChange={handleTimeChange}
            onClickLastColumn={
              index === views.length - 1 && !is12HoursFormat
                ? onClickLastNumberColumn
                : undefined
            }
          />
        ))}
        {is12HoursFormat && (
          <DayPartsColumn
            className={classesMap.column}
            currentDayPart={currentDayPart}
            shouldDisableDayPart={shouldDisableDayPart}
            onClickLastColumn={onClickLastNumberColumn}
            onChange={handleDayPartChange}
          />
        )}
      </div>
    )
  }
) as BaseTimePickerComponent
