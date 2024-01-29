import * as React from 'react'
import { clsx } from '@v-uik/theme'
import { useClassList, useMergedRefs } from '@v-uik/hooks'
import { useButtonReset } from '@v-uik/button'
import { useDateLibAdapter } from '../hooks/useDateLibAdapter'
import { useMonthViewStyles } from '../hooks/useMonthViewStyles'
import { useNowDate } from '../hooks/useNowDate'
import { useMonthViewNavigation } from '../hooks/navigation'
import { DisableDateProps, CalendarPickerViews } from '../interfaces'
import { MonthViewClasses as Classes } from '../interfaces/classes'

export interface MonthViewProps<TDate>
  extends Omit<React.ComponentPropsWithRef<'div'>, 'onChange'>,
    Pick<DisableDateProps<TDate>, 'shouldDisableDate'> {
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
   * Включить автоматическую установку фокуса на выбранном или текущем месяце.
   */
  autoFocus?: boolean
}

export type MonthViewComponent = (<TDate>(
  props: MonthViewProps<TDate> & React.RefAttributes<HTMLDivElement>
) => JSX.Element) & { displayName?: string }

// Саб-компонент для отображения выбора месяца.
export const MonthView = React.forwardRef(
  <TDate extends unknown>(
    {
      classes,
      shouldDisableDate,
      value,
      onChange,
      className,
      displayedDate,
      autoFocus: autoFocusProp,
      ...rest
    }: MonthViewProps<TDate>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useMonthViewStyles()
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
      generateDataDateAttribute,
      setContainerNode,
      onKeyDown,
      buttonOnFocus,
    } = useMonthViewNavigation({
      displayedDate: actualDate,
    })

    const mergedRefs = useMergedRefs([ref, setContainerNode])
    const renderMonths = () => {
      const monthsArray = adapter.getMonthArray(actualDate)

      return monthsArray.map((month, index) => {
        const handleChangeMonth = () => {
          const date = adapter.setMonth(actualDate, adapter.getMonth(month))

          onChange(date)
        }
        // Устанавливает дату, выбранную пользователем
        const isSelected = value ? adapter.isSameMonth(value, month) : false
        const autoFocus =
          autoFocusProp &&
          (isSelected || adapter.isSameMonth(actualDate, month))

        /**
         * является ли текущая дата displayedValue, нужна для tabIndex
         */
        const isDisplayedDateSelected = adapter.isSameMonth(actualDate, month)

        const disabled = shouldDisableDate?.(month, CalendarPickerViews.month)

        return (
          <button
            key={`month-${index}`}
            tabIndex={isDisplayedDateSelected ? 0 : -1}
            data-date={generateDataDateAttribute(month)}
            autoFocus={autoFocus}
            className={clsx(buttonClasses.resetButton, classesMap.monthButton, {
              [classesMap.selected]: isSelected,
            })}
            role="row"
            aria-selected={isSelected}
            //aria-disabled вместо disabled, чтобы работала навигация с клавиатуры
            aria-disabled={disabled}
            type="button"
            onFocus={buttonOnFocus}
            onClick={!disabled ? handleChangeMonth : undefined}
          >
            <span className={classesMap.monthText}>
              {adapter.format(month, 'monthShort')}
            </span>
          </button>
        )
      })
    }

    return (
      <div
        ref={mergedRefs}
        role="grid"
        {...rest}
        className={clsx(classesMap.root, className)}
        onKeyDown={onKeyDown}
      >
        {renderMonths()}
      </div>
    )
  }
) as MonthViewComponent
