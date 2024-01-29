import * as React from 'react'
import { clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { useButtonReset } from '@v-uik/button'
import { useNowDate } from '../hooks/useNowDate'
import { useDateLibAdapter } from '../hooks/useDateLibAdapter'
import { useDayViewStyles } from '../hooks/useDayViewStyles'
import { PartsOfRangeDate, RangeDate, RangeDayParams } from '../interfaces'
import { useDayViewNavigation } from '../hooks/navigation'
import { RangeDayViewClasses as Classes } from '../interfaces/classes'

export interface RangeDayViewProps<TDate> {
  /**
   * Список классов
   */
  classes?: Classes
  /**
   * Выбранный диапазон дат.
   */
  value: RangeDate<TDate>
  /**
   * Событие изменения диапазона дат.
   */
  onChange: (value: RangeDate<TDate>) => void
  /**
   * Управляет отображением текущего месяца.
   *
   * Если значение не передано,
   * предположение о текущем месяце будет получено из `value`.
   *
   * Если `value` также не определено, предположение о текущем месяце
   * высчитывается относительно сегодняшнего дня по системному времени.
   */
  displayedDate?: TDate | null
  /**
   * Определяет, какая часть диапазона дат будет редактироваться следующей.
   */
  dateToBeChanged: keyof typeof PartsOfRangeDate
  /**
   * Событие изменения редактируемой части в диапазоне дат. Вызывается сразу
   * после события изменения диапазона дат onChange.
   */
  onDateToBeChangedToggle: (
    dateToBeChanged: keyof typeof PartsOfRangeDate
  ) => void
  /**
   * Функция отключения дат. Функция будет вызвана для каждой даты, которая
   * отображается в календаре. Дата будет отключена, если функция вернет true.
   */
  shouldDisableDate?: (date: TDate) => boolean
  /**
   * Функция для отображения дня.
   */
  renderDay?: (params: RangeDayParams) => React.ReactNode
  onChangeDisplayedDate?: (date: TDate) => void
}

export type RangeDayViewComponent = <TDate>(
  props: RangeDayViewProps<TDate> & React.RefAttributes<HTMLDivElement>
) => JSX.Element

export const RangeDayView = React.forwardRef(function <TDate>(
  props: RangeDayViewProps<TDate>,
  ref: React.Ref<HTMLDivElement>
) {
  const {
    classes,
    dateToBeChanged,
    displayedDate,
    onChange,
    onDateToBeChangedToggle,
    shouldDisableDate,
    value,
    renderDay,
    onChangeDisplayedDate,
    ...rest
  } = props

  const classesList = useDayViewStyles()
  const classesMap = useClassList(classesList, classes)
  const buttonClasses = useButtonReset()

  const [startDate, endDate] = value

  const adapter = useDateLibAdapter<TDate>()

  const nowDate = useNowDate<TDate>()

  const [hoveredDate, setHoveredDate] = React.useState<TDate | null>(null)

  /**
   * Исходим из предположения, что если время еще не выбрано,
   * что самое релевантное отображение, это месяц, который содержит
   * сегодняшний день.
   */
  const displayedMonth = displayedDate ?? startDate ?? nowDate
  const startOfMonth = adapter.startOfMonth(displayedMonth)
  const endOfMonth = adapter.endOfMonth(displayedMonth)

  const { generateDataDateAttribute, buttonOnFocus, onKeyDown } =
    useDayViewNavigation({
      displayedDate: displayedMonth,
      onChangeDisplayedDate,
    })

  const getCommonDayProps = (day: TDate): RangeDayParams => {
    const isCurrentMonth = adapter.isSameMonth(day, displayedMonth)

    const isNotCurrentMonth = !isCurrentMonth

    const handleChangeDay = () => {
      const changedDate = adapter.setRangeDate(dateToBeChanged, value, day)

      onChange(changedDate)
      onDateToBeChangedToggle(
        adapter.getNextDateToBeChanged(dateToBeChanged, changedDate)
      )
    }

    const isToday = isCurrentMonth && adapter.isSameDay(nowDate, day)

    // Устанавливает дату, выбранную пользователем
    const isSelected =
      isCurrentMonth &&
      value.some((date) => (date ? adapter.isSameDay(date, day) : false))

    const isWithinRange =
      isCurrentMonth &&
      adapter.isNotNull(startDate) &&
      adapter.isNotNull(endDate) &&
      adapter.isAfterDay(day, startDate) &&
      adapter.isBeforeDay(day, endDate)

    const isStartOfMonth =
      isCurrentMonth && adapter.isSameDay(day, startOfMonth)
    const isEndOfMonth = isCurrentMonth && adapter.isSameDay(day, endOfMonth)

    let isWithinHoverRange = false

    try {
      isWithinHoverRange =
        isCurrentMonth &&
        adapter.isNotNull(hoveredDate) &&
        (dateToBeChanged === PartsOfRangeDate.start
          ? adapter.isNotNull(endDate) &&
            adapter.isWithinRange(day, [hoveredDate, endDate])
          : adapter.isNotNull(startDate) &&
            adapter.isWithinRange(day, [startDate, hoveredDate]))
      // eslint-disable-next-line no-empty
    } catch (e) {}

    let isWithinHoverRangeStart = false
    let isWithinHoverRangeEnd = false

    if (isWithinHoverRange) {
      const isHoveredDate = !!hoveredDate && adapter.isSameDay(hoveredDate, day)
      isWithinHoverRangeStart =
        dateToBeChanged === PartsOfRangeDate.start && isHoveredDate
      isWithinHoverRangeEnd =
        dateToBeChanged === PartsOfRangeDate.end && isHoveredDate
    }

    return {
      date: day,
      isCurrentMonth,
      isNotCurrentMonth,
      isToday,
      isWithinRange,
      isWithinHoverRange,
      isWithinHoverRangeStart,
      isWithinHoverRangeEnd,
      isStartOfMonth,
      isEndOfMonth,
      selected: isSelected,
      value: adapter.format(day, 'dayOfMonth'),
      disabled: shouldDisableDate?.(day),
      onClick: handleChangeDay,
      onFocus: (event: React.FocusEvent<HTMLButtonElement>) => {
        buttonOnFocus(event)
        setHoveredDate(day)
      },
      onBlur: () => {
        setHoveredDate(null)
      },
      onMouseEnter: () => {
        setHoveredDate(day)
      },
      onMouseLeave: () => {
        setHoveredDate(null)
      },
    }
  }

  const weekDays = React.useMemo<React.ReactNode>(() => {
    const weekDaysArray = adapter.getWeekdaysStartOfMon()

    return (
      <div className={classesMap.row}>
        {weekDaysArray.map((weekDay, index) => (
          <div key={`day=${index}`} className={classesMap.weekDay}>
            {weekDay}
          </div>
        ))}
      </div>
    )
  }, [adapter, classesMap.row, classesMap.weekDay])

  const renderDays = () => {
    const daysArray = adapter.getWeekNumberArray(displayedMonth, 5)

    return daysArray.map((weekArray, index) => {
      return (
        <div key={`week-${index}`} className={classesMap.row}>
          {weekArray.map((day, dayIndex) => {
            const commonDayProps = getCommonDayProps(day)

            if (renderDay) {
              return renderDay(commonDayProps)
            }

            const {
              isNotCurrentMonth,
              onClick,
              isToday,
              selected,
              isWithinRange,
              isWithinHoverRange,
              isWithinHoverRangeStart,
              isWithinHoverRangeEnd,
              isStartOfMonth,
              isEndOfMonth,
              value,
              disabled,
              onFocus,
              onBlur,
              onMouseEnter,
              onMouseLeave,
            } = commonDayProps

            const displayedValueSelected = adapter.isSameDay(
              day,
              displayedMonth
            )

            return (
              <button
                key={`day-${index}-${dayIndex}`}
                data-date={generateDataDateAttribute(day)}
                tabIndex={displayedValueSelected ? 0 : -1}
                className={clsx(
                  buttonClasses.resetButton,
                  classesMap.dayButton,
                  {
                    [classesMap.today]: isToday,
                    [classesMap.selected]: selected,
                    [classesMap.notCurrentMonth]: isNotCurrentMonth,
                    [classesMap.withinRange]: isWithinRange,
                    [classesMap.withinHoverRange]: isWithinHoverRange,
                    [classesMap.withinHoverRangeStart]: isWithinHoverRangeStart,
                    [classesMap.withinHoverRangeEnd]: isWithinHoverRangeEnd,
                    [classesMap.weekStart]: dayIndex === 0,
                    [classesMap.weekEnd]: dayIndex === 6,
                    [classesMap.monthStart]: isStartOfMonth,
                    [classesMap.monthEnd]: isEndOfMonth,
                  }
                )}
                disabled={disabled}
                type="button"
                onFocus={onFocus}
                onBlur={onBlur}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
              >
                <span className={classesMap.dayText}>{value}</span>
              </button>
            )
          })}
        </div>
      )
    })
  }

  return (
    <div ref={ref} {...rest} onKeyDown={onKeyDown}>
      {weekDays}

      {renderDays()}
    </div>
  )
}) as RangeDayViewComponent
