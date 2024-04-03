import * as React from 'react'
import { clsx } from '@v-uik/theme'
import { useClassList, useButtonReset } from '@v-uik/hooks'
import { useDateLibAdapter } from '../hooks/useDateLibAdapter'
import { useNowDate } from '../hooks/useNowDate'
import { useDayViewStyles } from '../hooks/useDayViewStyles'
import { DayParams } from '../interfaces'
import { useDayViewNavigation } from '../hooks/navigation'
import { DayViewClasses as Classes } from '../interfaces/classes'

export interface DayViewProps<TDate>
  extends Omit<React.ComponentPropsWithRef<'div'>, 'onChange'> {
  /**
   * Список классов
   */
  classes?: Classes
  /**
   * Выбранная дата.
   */
  value: TDate | null
  /**
   * Событие изменения даты.
   */
  onChange: (date: TDate) => void
  /**
   * Функция отключения дат. Функция будет вызвана для каждой даты, которая
   * отображается в календаре. Дата будет отключена, если функция вернет true.
   */
  shouldDisableDate?: (date: TDate) => boolean
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
   * Событие изменения отображения текущего месяца.
   */
  onChangeMonth?: (date: TDate) => void
  /**
   * Функция для отображения дня.
   */
  renderDay?: (params: DayParams) => React.ReactNode
  /**
   * Функция для события изменения displayedDate
   * @param date
   */
  onChangeDisplayedDate?: (date: TDate) => void
}

export type DayViewComponent = <TDate>(
  props: DayViewProps<TDate> & React.RefAttributes<HTMLDivElement>
) => JSX.Element

// Саб-компонент для отображения выбора даты.
export const DayView = React.forwardRef(
  <TDate,>(props: DayViewProps<TDate>, ref: React.Ref<HTMLDivElement>) => {
    const {
      classes,
      shouldDisableDate,
      value,
      onChange,
      displayedDate,
      onChangeMonth,
      renderDay,
      onChangeDisplayedDate,
      ...rest
    } = props

    const classesList = useDayViewStyles()
    const classesMap = useClassList(classesList, classes)
    const buttonClasses = useButtonReset()

    const adapter = useDateLibAdapter<TDate>()

    const nowDate = useNowDate<TDate>()

    /**
     * Исходим из предположения, что если время еще не выбрано,
     * что самое релевантное отображение, это месяц, который содержит
     * сегодняшний день.
     */
    const displayedMonth = displayedDate ?? value ?? nowDate

    const { onKeyDown, buttonOnFocus, generateDataDateAttribute } =
      useDayViewNavigation({
        onChangeDisplayedDate,
        displayedDate: displayedMonth,
      })

    const getCommonDayProps = (day: TDate): DayParams => {
      const isCurrentMonth = adapter.isSameMonth(day, displayedMonth)

      const isNotCurrentMonth = !isCurrentMonth

      const handleChangeDay = () => {
        /**
         * Решает проблему, когда при выборе даты из следующего месяца,
         * фокус оставался на старом элементе
         */
        // if (refDayInFocus.current) {
        //   refDayInFocus.current.blur()
        // }

        // необходимо, чтобы не было переопределения уже установленного пользователем времени
        const displayedTime = value ?? displayedDate ?? nowDate
        day = adapter.setTime(day, displayedTime)

        if (isNotCurrentMonth && onChangeMonth) {
          onChangeMonth(day)
        }

        onChange(day)
      }

      const isToday = adapter.isSameDay(nowDate, day)

      // Устанавливает дату, выбранную пользователем
      const isSelected = value ? adapter.isSameDay(value, day) : false

      return {
        date: day,
        isCurrentMonth,
        isNotCurrentMonth,
        isToday,
        selected: isSelected,
        value: adapter.format(day, 'dayOfMonth'),
        disabled: shouldDisableDate?.(day),
        onClick: handleChangeDay,
        onFocus: buttonOnFocus,
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
      // Массив из 6-и недель для текущего месяца
      const daysArray = adapter.getWeekNumberArray(displayedMonth, 5)

      return daysArray.map((weekArray, index) => {
        return (
          <div key={`week-${index}`} className={classesMap.row} role="row">
            {weekArray.map((day, dayIndex) => {
              const commonDayProps = getCommonDayProps(day)

              if (renderDay) {
                return renderDay({ ...commonDayProps })
              }

              const {
                isCurrentMonth,
                isNotCurrentMonth,
                onClick,
                isToday,
                selected,
                value,
                disabled,
                onFocus,
              } = commonDayProps
              /**
               * является ли текущая дата displayedValue, нужна для tabIndex
               */
              const displayedValueSelected = adapter.isSameDay(
                day,
                displayedMonth
              )

              return (
                <button
                  key={`day-${index}-${dayIndex}`}
                  role="gridcell"
                  tabIndex={displayedValueSelected ? 0 : -1}
                  data-date={generateDataDateAttribute(day)}
                  className={clsx(
                    buttonClasses.resetButton,
                    classesMap.dayButton,
                    {
                      [classesMap.today]: isCurrentMonth && isToday,
                      [classesMap.selected]: isCurrentMonth && selected,
                      [classesMap.notCurrentMonth]: isNotCurrentMonth,
                    }
                  )}
                  aria-selected={selected}
                  //aria-disabled вместо disabled, чтобы работала навигация с клавиатуры
                  aria-disabled={disabled}
                  type="button"
                  onFocus={onFocus}
                  onClick={disabled ? undefined : onClick}
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
      <div ref={ref} role="grid" onKeyDown={onKeyDown} {...rest}>
        {weekDays}

        {renderDays()}
      </div>
    )
  }
) as DayViewComponent
