import * as React from 'react'
import { clsx } from '@v-uik/theme'
import { useClassList, useMergedRefs, useButtonReset } from '@v-uik/hooks'
import { useDateLibAdapter } from '../hooks/useDateLibAdapter'
import { useNowDate } from '../hooks/useNowDate'
import { useMonthViewStyles } from '../hooks/useMonthViewStyles'
import { RangeDate, PartsOfRangeDate } from '../interfaces'
import { useMonthViewNavigation } from '../hooks/navigation'
import { RangeMonthViewClasses as Classes } from '../interfaces/classes'

export interface RangeMonthViewProps<TDate>
  extends Omit<React.ComponentPropsWithRef<'div'>, 'onChange'> {
  /**
   * Список классов
   */
  classes?: Classes
  /**
   * Выбранный диапазон дат.
   */
  value: RangeDate<TDate>
  /**
   * Событие изменения даты.
   */
  onChange: (value: TDate) => void
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
   * Функция отключения месяца. Функция будет вызвана для каждой месяца, которая
   * отображается в календаре. Месяц будет отключена, если функция вернет true.
   */
  shouldDisableDate?: (date: TDate) => boolean
}

export type RangeMonthViewComponent = (<TDate>(
  props: RangeMonthViewProps<TDate> & React.RefAttributes<HTMLDivElement>
) => JSX.Element) & { displayName?: string }

export const RangeMonthView = React.forwardRef(
  <TDate extends unknown>(
    {
      classes,
      className,
      dateToBeChanged,
      displayedDate,
      onChange,
      shouldDisableDate,
      value,
      ...rest
    }: RangeMonthViewProps<TDate>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useMonthViewStyles()
    const classesMap = useClassList(classesList, classes)
    const buttonClasses = useButtonReset()

    const [startDate, endDate] = value

    const adapter = useDateLibAdapter<TDate>()

    const nowDate = useNowDate<TDate>()

    const [hoveredDate, setHoveredDate] = React.useState<TDate | null>(null)

    /**
     * Исходим из предположения, что если время еще не выбрано,
     * то самое релевантное отображение, это год, который содержит
     * сегодняшний день.
     */
    const actualDate = displayedDate ?? startDate ?? nowDate

    const {
      buttonOnFocus,
      generateDataDateAttribute,
      setContainerNode,
      onKeyDown,
    } = useMonthViewNavigation({ displayedDate: actualDate })

    const renderMonths = () => {
      const monthsArray = adapter.getMonthArray(actualDate)

      return monthsArray.map((month, index) => {
        const handleChangeMonth = () => {
          const date = adapter.setMonth(actualDate, adapter.getMonth(month))

          onChange(date)
        }
        // Устанавливает дату, выбранную пользователем
        const isSelected = value.some((date) =>
          date ? adapter.isSameMonth(date, month) : false
        )

        const isWithinRange =
          adapter.isNotNull(startDate) &&
          adapter.isNotNull(endDate) &&
          adapter.isAfterDay(month, adapter.endOfMonth(startDate)) &&
          adapter.isBeforeDay(month, adapter.startOfMonth(endDate))

        let isWithinHoverRange = false

        try {
          isWithinHoverRange =
            adapter.isNotNull(hoveredDate) &&
            (dateToBeChanged === PartsOfRangeDate.start
              ? adapter.isNotNull(endDate) &&
                adapter.isWithinRange(month, [hoveredDate, endDate])
              : adapter.isNotNull(startDate) &&
                adapter.isWithinRange(month, [startDate, hoveredDate]))
          // eslint-disable-next-line no-empty
        } catch (e) {}

        let isWithinHoverRangeStart = false
        let isWithinHoverRangeEnd = false

        if (isWithinHoverRange) {
          const isHoveredDate =
            !!hoveredDate && adapter.isSameMonth(hoveredDate, month)
          isWithinHoverRangeStart =
            dateToBeChanged === PartsOfRangeDate.start && isHoveredDate
          isWithinHoverRangeEnd =
            dateToBeChanged === PartsOfRangeDate.end && isHoveredDate
        }

        const displayedValueIsSelected = adapter.isSameMonth(actualDate, month)

        return (
          <button
            key={`month-${index}`}
            tabIndex={displayedValueIsSelected ? 0 : -1}
            data-date={generateDataDateAttribute(month)}
            className={clsx(buttonClasses.resetButton, classesMap.monthButton, {
              [classesMap.selected]: isSelected,
              [classesMap.withinRange]: isWithinRange,
              [classesMap.withinHoverRange]: isWithinHoverRange,
              [classesMap.withinHoverRangeStart]: isWithinHoverRangeStart,
              [classesMap.withinHoverRangeEnd]: isWithinHoverRangeEnd,
            })}
            disabled={shouldDisableDate?.(month)}
            type="button"
            onClick={handleChangeMonth}
            onFocus={(event) => {
              buttonOnFocus(event)
              setHoveredDate(month)
            }}
            onBlur={() => setHoveredDate(null)}
            onMouseEnter={() => setHoveredDate(month)}
            onMouseLeave={() => setHoveredDate(null)}
          >
            <span className={classesMap.monthText}>
              {adapter.format(month, 'monthShort')}
            </span>
          </button>
        )
      })
    }

    const mergedRefs = useMergedRefs([ref, setContainerNode])

    return (
      <div
        ref={mergedRefs}
        {...rest}
        className={clsx(classesMap.root, className)}
        onKeyDown={onKeyDown}
      >
        {renderMonths()}
      </div>
    )
  }
) as RangeMonthViewComponent
