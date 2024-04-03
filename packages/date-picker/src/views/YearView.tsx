import * as React from 'react'
import { clsx } from '@v-uik/theme'
import { useClassList, useMergedRefs, useButtonReset } from '@v-uik/hooks'
import { useDateLibAdapter } from '../hooks/useDateLibAdapter'
import { useNowDate } from '../hooks/useNowDate'
import { useYearViewStyles } from '../hooks/useYearViewStyles'

import { useYearViewNavigation } from '../hooks/navigation'
import { DisableDateProps, CalendarPickerViews } from '../interfaces'
import { YearViewClasses as Classes } from '../interfaces/classes'

export interface YearViewProps<TDate>
  extends Omit<React.ComponentPropsWithRef<'div'>, 'onChange'>,
    Pick<DisableDateProps<TDate>, 'minDate' | 'maxDate' | 'shouldDisableDate'> {
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
   * Включить автоматическую установку фокуса на выбранном или текущем годе.
   */
  autoFocus?: boolean
}

export type YearViewComponent = <TDate>(
  props: YearViewProps<TDate> & React.RefAttributes<HTMLDivElement>
) => JSX.Element

export const YearView = React.forwardRef(
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
      autoFocus: autoFocusProp,
      ...rest
    }: YearViewProps<TDate>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useYearViewStyles()
    const classesMap = useClassList(classesList, classes)
    const buttonClasses = useButtonReset()

    const adapter = useDateLibAdapter<TDate>()

    const nowDate = useNowDate<TDate>()

    /**
     * Исходим из предположения, что если время еще не выбрано,
     * то самое релевантное отображение, это год, который содержит
     * сегодняшний день.
     */
    const actualDate = displayedDate ?? value ?? nowDate
    const {
      onKeyDown,
      buttonOnFocus,
      setContainerNode,
      generateDataDateAttribute,
    } = useYearViewNavigation({
      displayedDate: actualDate,
    })

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
        const isSelected = value ? adapter.isSameYear(value, year) : false
        const autoFocus =
          autoFocusProp && (isSelected || adapter.isSameYear(actualDate, year))

        /**
         * является ли текущая дата displayedValue, нужна для tabIndex
         */
        const displayedValueSelected = adapter.isSameYear(year, actualDate)

        const disabled = shouldDisableDate?.(year, CalendarPickerViews.year)

        return (
          <button
            key={`year-${index}`}
            data-date={generateDataDateAttribute(year)}
            /**
             * Года как правило не будут помещаться в область просмотра и нужно сделать
             * сделать прокрутку к выбранному элементу.
             */
            autoFocus={autoFocus}
            className={clsx(buttonClasses.resetButton, classesMap.yearButton, {
              [classesMap.selected]: isSelected,
            })}
            tabIndex={displayedValueSelected ? 0 : -1}
            aria-selected={isSelected}
            //aria-disabled вместо disabled, чтобы работала навигация с клавиатуры
            aria-disabled={disabled}
            role="row"
            type="button"
            onFocus={buttonOnFocus}
            onClick={disabled ? undefined : handleChangeYear}
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
        className={clsx(className, classesMap.root)}
        role="grid"
        onKeyDown={onKeyDown}
        {...rest}
      >
        {renderYear()}
      </div>
    )
  }
) as YearViewComponent
