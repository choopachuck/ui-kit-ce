import * as React from 'react'
import { clsx } from '@v-uik/theme'
import { Button, ButtonColor, ButtonKinds } from '@v-uik/button'
import { useDateLibAdapter } from '../hooks/useDateLibAdapter'
import { useNowDate } from '../hooks/useNowDate'
import { useCalendarPickerStyles } from '../hooks/useCalendarPickerStyles'
import { DayView } from './DayView'
import { MonthView } from './MonthView'
import { YearView } from './YearView'
import { ChevronLeftIcon } from '../components/PanelHeader/ChevronLeftIcon'
import { ChevronRightIcon } from '../components/PanelHeader/ChevronRightIcon'
import {
  DayParams,
  CalendarPickerViews,
  CalendarPickerViewsKeys,
  ExternalCalendarViewComponentsPropsPartial,
  DisableDateProps,
} from '../interfaces'
import { getExternalComponentsProps } from '../utils/getExternalComponentProps'
import { CalendarPickerClasses } from '../interfaces/classes'
import { useClassList } from '@v-uik/hooks'

export interface CalendarPickerProps<TDate>
  extends Omit<React.ComponentPropsWithRef<'div'>, 'onChange'>,
    Pick<DisableDateProps<TDate>, 'minDate' | 'maxDate' | 'shouldDisableDate'> {
  /**
   * CSS классы для стилизации
   */
  classes?: CalendarPickerClasses
  /**
   * Выбранная дата.
   */
  value: TDate | null
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

  onChange: (date: TDate) => void
  /**
   * Событие изменения даты. Срабатывает ТОЛЬКО когда пользователь выбирает день.
   */
  onChangeDay?: (date: TDate) => void
  /**
   * Событие изменения даты. Срабатывает ТОЛЬКО когда пользователь выбирает месяц.
   */
  onChangeMonth?: (date: TDate) => void
  /**
   * Событие изменения даты. Срабатывает ТОЛЬКО когда пользователь выбирает год.
   */
  onChangeYear?: (date: TDate) => void
  /**
   * Функция для отображения дня.
   */
  renderDay?: (params: DayParams) => React.ReactNode

  /**
   * Дополнительные пропсы для компонент DayView, MonthView, YearView, левой/правой кнопки навигации, кнопки в панеле месяц/год.
   */
  externalComponentsProps?: ExternalCalendarViewComponentsPropsPartial<TDate>
}

export type CalendarPickerComponent = <TDate>(
  props: CalendarPickerProps<TDate> & React.RefAttributes<HTMLDivElement>
) => JSX.Element

// Обертка для выбора даты, которая объединяет выбор даты, месяца и года.
export const CalendarPicker = React.forwardRef(
  <TDate,>(
    {
      className: classNameProp,
      classes,
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
      externalComponentsProps,
      ...rest
    }: CalendarPickerProps<TDate>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useCalendarPickerStyles()

    const classesMap = useClassList(classesList, classes)

    const className = clsx(classNameProp, classesMap.root)

    const adapter = useDateLibAdapter<TDate>()

    const externalProps = getExternalComponentsProps(externalComponentsProps)

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

    let computedDisplayedDate = displayedDate ?? value ?? nowDate

    // необходимо, чтобы не было переопределения уже установленного пользователем времени
    const displayedTime = adapter.startOfDay(value ?? displayedDate ?? nowDate)
    computedDisplayedDate = adapter.setTime(
      computedDisplayedDate,
      displayedTime
    )

    return (
      <div ref={ref} {...rest} className={className}>
        <div className={clsx(classNameProp, classesMap.calendarBar)}>
          <Button
            kind={ButtonKinds.ghost}
            color={ButtonColor.secondary}
            className={classesMap.chevron}
            onClick={() =>
              setDisplayedDate(adapter.getPreviousMonth(computedDisplayedDate))
            }
            {...externalProps.prevNavigationBarButtonProps}
          >
            <ChevronLeftIcon />
          </Button>

          <Button
            kind={ButtonKinds.ghost}
            color={ButtonColor.secondary}
            className={clsx(classesMap.month, {
              [classesMap.selected]: currentView === CalendarPickerViews.month,
            })}
            onClick={() => setCurrentView(CalendarPickerViews.month)}
            {...externalProps.monthBarButtonProps}
          >
            {adapter.format(computedDisplayedDate, 'month')}
          </Button>

          <Button
            kind={ButtonKinds.ghost}
            color={ButtonColor.secondary}
            className={classesMap.chevron}
            {...externalProps.nextNavigationBarButtonProps}
            onClick={() =>
              setDisplayedDate(adapter.getNextMonth(computedDisplayedDate))
            }
          >
            <ChevronRightIcon />
          </Button>

          <Button
            kind={ButtonKinds.ghost}
            color={ButtonColor.secondary}
            className={clsx(classesMap.year, {
              [classesMap.selected]: currentView === CalendarPickerViews.year,
            })}
            onClick={() => setCurrentView(CalendarPickerViews.year)}
            {...externalProps.yearBarButtonProps}
          >
            {adapter.format(computedDisplayedDate, 'year')}
          </Button>
        </div>

        {currentView === CalendarPickerViews.day && (
          <DayView<TDate>
            value={value}
            displayedDate={computedDisplayedDate}
            shouldDisableDate={shouldDisableDate}
            renderDay={renderDay}
            onChangeDisplayedDate={setDisplayedDate}
            onChange={(date) => {
              onChange?.(date)
              onChangeDay?.(date)
              setDisplayedDate?.(date)
            }}
            {...externalProps.dayViewProps}
          />
        )}
        {currentView === CalendarPickerViews.month && (
          <MonthView
            autoFocus
            value={value}
            displayedDate={computedDisplayedDate}
            shouldDisableDate={shouldDisableDate}
            onChange={(date) => {
              onChangeMonth?.(date)
              setDisplayedDate?.(date)
              setCurrentView(CalendarPickerViews.day)
            }}
            {...externalProps.monthViewProps}
          />
        )}
        {currentView === CalendarPickerViews.year && (
          <YearView
            autoFocus
            value={value}
            displayedDate={computedDisplayedDate}
            shouldDisableDate={shouldDisableDate}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(date) => {
              onChangeYear?.(date)
              setDisplayedDate?.(date)
              setCurrentView(CalendarPickerViews.month)
            }}
            {...externalProps.yearViewProps}
          />
        )}
      </div>
    )
  }
) as CalendarPickerComponent
