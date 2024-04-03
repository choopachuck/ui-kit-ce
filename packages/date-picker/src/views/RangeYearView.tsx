import * as React from 'react'
import { clsx } from '@v-uik/theme'
import { useClassList, useMergedRefs, useButtonReset } from '@v-uik/hooks'
import { useDateLibAdapter } from '../hooks/useDateLibAdapter'
import { useNowDate } from '../hooks/useNowDate'
import { useYearViewStyles } from '../hooks/useYearViewStyles'
import { RangeDate, PartsOfRangeDate } from '../interfaces'
import { useYearViewNavigation } from '../hooks/navigation'
import { RangeYearViewClasses as Classes } from '../interfaces/classes'

export interface RangeYearViewProps<TDate>
  extends Omit<React.ComponentPropsWithRef<'div'>, 'onChange'> {
  /**
   * Список классов
   */
  classes?: Classes
  /**
   * Выбранная дата.
   */
  value: RangeDate<TDate>
  /**
   * Событие изменения даты.
   */
  onChange: (date: TDate) => void
  /**
   * Нижняя граница, с которой начинается отображение лет.
   *
   * @default '1900-01-01T00:00:00.000'
   */
  minDate?: TDate
  /**
   * Верхняя граница, которой заканчивается отображение лет.
   *
   * @default '2099-01-01T00:00:00.000'
   */
  maxDate?: TDate
  /**
   * Функция отключения года. Функция будет вызвана для каждой месяца, которая
   * отображается в календаре. Год будет отключен, если функция вернет true.
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
   * Определяет, какая часть диапазона дат будет редактироваться следующей.
   */
  dateToBeChanged: keyof typeof PartsOfRangeDate
  /**
   * Включить автоматическую установку фокуса на выбранном или текущем годе.
   */
  autoFocus?: boolean
}

export type RangeYearViewComponent = <TDate>(
  props: RangeYearViewProps<TDate> & React.RefAttributes<HTMLDivElement>
) => JSX.Element

export const RangeYearView = React.forwardRef(
  <TDate extends unknown>(
    {
      classes,
      className,
      onChange,
      shouldDisableDate,
      minDate,
      maxDate,
      value,
      displayedDate,
      dateToBeChanged,
      autoFocus: autoFocusProp,
      ...rest
    }: RangeYearViewProps<TDate>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useYearViewStyles()
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
      setContainerNode,
      generateDataDateAttribute,
      buttonOnFocus,
      onKeyDown,
    } = useYearViewNavigation({ displayedDate: actualDate })

    const mergedRefs = useMergedRefs([ref, setContainerNode])

    const actualStartYear =
      minDate ?? (adapter.date('1900-01-01T00:00:00.000') as TDate)
    const actualEndYear =
      maxDate ?? (adapter.date('2099-01-01T00:00:00.000') as TDate)

    const renderYear = () => {
      const yearArray = adapter.getYearRange(actualStartYear, actualEndYear)

      return yearArray.map((year, index) => {
        const handleChangeYear = () => {
          const date = adapter.setYear(actualDate, adapter.getYear(year))

          onChange(date)
        }
        // Устанавливает дату, выбранную пользователем
        const isSelected = value.some((date) =>
          date ? adapter.isSameYear(date, year) : false
        )
        const autoFocus =
          autoFocusProp && (isSelected || adapter.isSameYear(actualDate, year))

        const isWithinRange =
          adapter.isNotNull(startDate) &&
          adapter.isNotNull(endDate) &&
          adapter.isAfterYear(year, startDate) &&
          adapter.isBeforeYear(year, endDate)

        let isWithinHoverRange = false

        try {
          isWithinHoverRange =
            adapter.isNotNull(hoveredDate) &&
            (dateToBeChanged === PartsOfRangeDate.start
              ? adapter.isNotNull(endDate) &&
                adapter.isWithinRange(year, [hoveredDate, endDate])
              : adapter.isNotNull(startDate) &&
                adapter.isWithinRange(year, [startDate, hoveredDate]))
          // eslint-disable-next-line no-empty
        } catch (e) {}

        let isWithinHoverRangeStart = false
        let isWithinHoverRangeEnd = false

        if (isWithinHoverRange) {
          const isHoveredDate =
            !!hoveredDate && adapter.isSameYear(hoveredDate, year)
          isWithinHoverRangeStart =
            dateToBeChanged === PartsOfRangeDate.start && isHoveredDate
          isWithinHoverRangeEnd =
            dateToBeChanged === PartsOfRangeDate.end && isHoveredDate
        }

        const displayedDateIsSelected = adapter.isSameYear(actualDate, year)

        return (
          <button
            key={`year-${index}`}
            tabIndex={displayedDateIsSelected ? 0 : -1}
            data-date={generateDataDateAttribute(year)}
            /**
             * Года как правило не будут помещаться в область просмотра и нужно сделать
             * сделать прокрутку к выбранному элементу.
             */
            autoFocus={autoFocus}
            className={clsx(buttonClasses.resetButton, classesMap.yearButton, {
              [classesMap.selected]: isSelected,
              [classesMap.withinRange]: isWithinRange,
              [classesMap.withinHoverRange]: isWithinHoverRange,
              [classesMap.withinHoverRangeStart]: isWithinHoverRangeStart,
              [classesMap.withinHoverRangeEnd]: isWithinHoverRangeEnd,
            })}
            disabled={shouldDisableDate?.(year)}
            type="button"
            onClick={handleChangeYear}
            onFocus={(event) => {
              buttonOnFocus(event)
              setHoveredDate(year)
            }}
            onBlur={() => setHoveredDate(null)}
            onMouseEnter={() => setHoveredDate(year)}
            onMouseLeave={() => setHoveredDate(null)}
          >
            <span className={classesMap.yearText}>
              {adapter.format(year, 'year')}
            </span>
          </button>
        )
      })
    }

    return (
      <div
        ref={mergedRefs}
        {...rest}
        className={clsx(classesMap.root, className)}
        onKeyDown={onKeyDown}
      >
        {renderYear()}
      </div>
    )
  }
) as RangeYearViewComponent
