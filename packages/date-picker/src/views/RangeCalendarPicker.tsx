import * as React from 'react'
import { clsx } from '@v-uik/theme'
import { Button, ButtonColor, ButtonKinds } from '@v-uik/button'
import { useDateLibAdapter } from '../hooks/useDateLibAdapter'
import { useNowDate } from '../hooks/useNowDate'
import { useCalendarPickerStyles } from '../hooks/useCalendarPickerStyles'
import {
  RangeDate,
  RangeDayParams,
  CalendarPickerViews,
  CalendarPickerViewsKeys,
  PartsOfRangeDate,
} from '../interfaces'
import { RangeDayView } from './RangeDayView'
import { RangeMonthView } from './RangeMonthView'
import { RangeYearView, RangeYearViewProps } from './RangeYearView'
import { ChevronLeftIcon } from '../components/PanelHeader/ChevronLeftIcon'
import { ChevronRightIcon } from '../components/PanelHeader/ChevronRightIcon'
import type { ComponentPropsWithRefFix } from '@v-uik/common'

export interface RangeCalendarPickerProps<TDate>
  extends Omit<ComponentPropsWithRefFix<'div'>, 'onChange'>,
    Pick<RangeYearViewProps<TDate>, 'minDate' | 'maxDate'> {
  /**
   * Выбранная дата.
   */
  value: RangeDate<TDate>
  /**
   * Указывает, с какой даты начать отображение календаря. Будет использоваться
   * при первой отрисовки компонента, если не указано свойство `value`.
   */
  defaultDisplayedDate?: TDate
  /**
   * Определяет, что показать при первой отрисовки компонента — выбор дня, месяца или года.
   *
   * @default
   * 'day'
   */
  defaultView?: CalendarPickerViewsKeys
  /**
   * Событие изменения даты. Срабатывает когда пользователь выбирает день,
   * месяц или год.
   */
  onChange: (date: RangeDate<TDate>) => void
  /**
   * Событие изменения даты. Срабатывает ТОЛЬКО когда пользователь выбирает день.
   */
  onChangeDay?: (date: RangeDate<TDate>) => void
  /**
   * Событие изменения даты. Срабатывает ТОЛЬКО когда пользователь выбирает месяц.
   */
  onChangeMonth?: (date: TDate) => void
  /**
   * Событие изменения даты. Срабатывает ТОЛЬКО когда пользователь выбирает год.
   */
  onChangeYear?: (date: TDate) => void
  /**
   * Функция отключения даты. Функция будет вызвана для каждой даты (дня, месяца, года), которая
   * в данный момент отображает в календаре. Дата будет отключен, если функция вернет true.
   */
  shouldDisableDate?: (date: TDate) => boolean
  /**
   *
   * Функция для отображения дня.
   */
  renderDay?: (params: RangeDayParams) => React.ReactNode
}

export type RangeCalendarPickerComponent = <TDate>(
  props: RangeCalendarPickerProps<TDate> & React.RefAttributes<HTMLDivElement>
) => JSX.Element

// Обертка для выбора даты, которая объединяет выбор даты, месяца и года.
export const RangeCalendarPicker = React.forwardRef(
  <TDate extends unknown>(
    {
      className: classNameProp,
      value,
      onChange,
      onChangeDay,
      onChangeMonth,
      onChangeYear,
      defaultDisplayedDate,
      defaultView = CalendarPickerViews.day,
      shouldDisableDate,
      minDate,
      maxDate,
      renderDay,
      ...rest
    }: RangeCalendarPickerProps<TDate>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useCalendarPickerStyles()
    const className = clsx(classNameProp, classesList.root)

    const [startDate] = value

    const adapter = useDateLibAdapter<TDate>()

    const [dateToBeChanged, setDateToBeChanged] =
      React.useState<keyof typeof PartsOfRangeDate>('start')

    const [currentView, setCurrentView] =
      React.useState<CalendarPickerViewsKeys>(defaultView)

    const nowDate = useNowDate<TDate>()

    /**
     * Управляет отображением календаря. Стандартный случай, когда пользователь
     * хочет пролистать вперед или назад несколько месяцев, без выбора даты.
     */
    const [displayedDate, setDisplayedDate] = React.useState<
      TDate | null | undefined
    >(defaultDisplayedDate)

    const computedDisplayedDate = displayedDate ?? startDate ?? nowDate

    return (
      <div ref={ref} {...rest} className={className}>
        <div className={clsx(classNameProp, classesList.calendarBar)}>
          <Button
            kind={ButtonKinds.ghost}
            color={ButtonColor.secondary}
            className={classesList.chevron}
            onClick={() =>
              setDisplayedDate(adapter.getPreviousMonth(computedDisplayedDate))
            }
          >
            <ChevronLeftIcon />
          </Button>

          <Button
            kind={ButtonKinds.ghost}
            color={ButtonColor.secondary}
            className={clsx(classesList.month, {
              [classesList.selected]: currentView === CalendarPickerViews.month,
            })}
            onClick={() => setCurrentView(CalendarPickerViews.month)}
          >
            {adapter.format(computedDisplayedDate, 'month')}
          </Button>

          <Button
            kind={ButtonKinds.ghost}
            color={ButtonColor.secondary}
            className={classesList.chevron}
            onClick={() =>
              setDisplayedDate(adapter.getNextMonth(computedDisplayedDate))
            }
          >
            <ChevronRightIcon />
          </Button>

          <Button
            kind={ButtonKinds.ghost}
            color={ButtonColor.secondary}
            className={clsx(classesList.year, {
              [classesList.selected]: currentView === CalendarPickerViews.year,
            })}
            onClick={() => setCurrentView(CalendarPickerViews.year)}
          >
            {adapter.format(computedDisplayedDate, 'year')}
          </Button>
        </div>

        {currentView === CalendarPickerViews.day && (
          <RangeDayView<TDate>
            value={value}
            displayedDate={computedDisplayedDate}
            dateToBeChanged={dateToBeChanged}
            shouldDisableDate={shouldDisableDate}
            renderDay={renderDay}
            onChangeDisplayedDate={setDisplayedDate}
            onDateToBeChangedToggle={setDateToBeChanged}
            onChange={(date) => {
              onChange?.(date)
              onChangeDay?.(date)
            }}
          />
        )}
        {currentView === CalendarPickerViews.month && (
          <RangeMonthView
            value={value}
            displayedDate={computedDisplayedDate}
            dateToBeChanged={dateToBeChanged}
            shouldDisableDate={shouldDisableDate}
            onChange={(date) => {
              onChangeMonth?.(date)
              setDisplayedDate?.(date)
              setCurrentView(CalendarPickerViews.day)
            }}
          />
        )}
        {currentView === CalendarPickerViews.year && (
          <RangeYearView
            value={value}
            displayedDate={computedDisplayedDate}
            dateToBeChanged={dateToBeChanged}
            shouldDisableDate={shouldDisableDate}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(date) => {
              onChangeYear?.(date)
              setDisplayedDate?.(date)
              setCurrentView(CalendarPickerViews.month)
            }}
          />
        )}
      </div>
    )
  }
) as RangeCalendarPickerComponent
