import * as React from 'react'
import { useDateLibAdapter } from '../../hooks/useDateLibAdapter'
import { useRangeViews } from '../../hooks/useRangeViews'
import { useCurrentViewDate } from '../../hooks/useCurrentViewDate'
import { useDatePanelKeyDown } from '../../hooks/useDatePanelKeyDown'
import {
  PanelWrapper,
  Props as PanelWrapperProps,
} from '../PanelWrapper/PanelWrapper'
import { PanelHeader } from '../PanelHeader/PanelHeader'
import { CalendarView } from '../CalendarView/CalendarView'
import { MonthsView } from '../MonthsView/MonthsView'
import { YearsView } from '../YearsView/YearsView'
import { InfinityPanel } from '../InfinityPanel/InfinityPanel'
import { DatePickerView } from '../../constants/common'
import { ValidateDateProps } from '../../interfaces/date'
import { TRangeDate, TRangeValue } from '../../interfaces/range'
import {
  ExistedViews,
  ForwardRefExoticComponentCommonFields,
} from '../../interfaces/common'
import { useRangeDateCheckState } from '../../hooks/useRangeDateCheckState'
import { useHoverState } from '../../hooks/useHoverState'
import {
  CalendarViewClasses,
  PanelHeaderClasses,
} from '../../interfaces/classes'

export interface Props<TDate = unknown>
  extends ValidateDateProps<TDate>,
    Omit<PanelWrapperProps, 'onChange'> {
  /**
   * CSS классы для стилизации
   */
  calendarViewClasses?: CalendarViewClasses
  /**
   * CSS классы для стилизации компонента PanelHeader
   */
  panelHeaderClasses?: PanelHeaderClasses
  /**
   * Выбранный промежуток
   */
  range: TRangeDate<TDate>
  /**
   * Какие панели выбора даты доступны ('day', 'month', 'year')
   */
  existedViews: ExistedViews
  /**
   * Индекс активного инпута
   */
  activeInputIndex?: 0 | 1
  /**
   * Обработчик изменения даты
   */
  changeDate: (date: TRangeValue<TDate> | null, index: 0 | 1) => void
  /**
   * Обработчик открытия пикера
   */
  changeOpen: (value: boolean) => void
  /**
   * Дополнительный контент сверху
   */
  header?: React.ReactNode
  /**
   * Разрешить значение Infinity
   */
  allowInfinity?: boolean
}

interface IRangeDatePanel extends ForwardRefExoticComponentCommonFields<Props> {
  <TDate = unknown>(
    props: React.PropsWithoutRef<Props<TDate>> &
      React.RefAttributes<HTMLDivElement>
  ): React.ReactElement | null
}

export const RangeDatePanel = React.forwardRef(
  <TDate extends unknown>(
    props: Props<TDate>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const {
      range,
      activeInputIndex,
      changeDate,
      changeOpen,
      existedViews,
      minDate,
      maxDate,
      disablePast,
      disableFuture,
      shouldDisableDate,
      header,
      allowInfinity,
      calendarViewClasses,
      panelHeaderClasses,
      ...rest
    } = props

    const adapter = useDateLibAdapter<TDate>()

    const { currentViewDate, setCurrentViewDate } = useCurrentViewDate<TDate>(
      range?.[0] || range?.[1]
    )

    const { hoverDate, setHoverDate } = useHoverState<TDate>(
      range,
      activeInputIndex
    )

    const {
      currentView,
      setCurrentView,
      panelHeaderProps,
      onSelectDate,
      onSelectMonth,
      onSelectYear,
    } = useRangeViews<TDate>({
      existedViews,
      range,
      activeInputIndex,
      changeDate,
      changeOpen,
      setCurrentViewDate,
    })

    const monthText = adapter.format(currentViewDate, 'month')
    const yearText = adapter.getYear(currentViewDate)

    const {
      isDateDisabled,
      isDateSelected,
      isDateInRange,
      isDateInHoverRange,
      isMonthDisabled,
      isMonthSelected,
      isYearDisabled,
      isYearSelected,
    } = useRangeDateCheckState<TDate>({
      range,
      activeInputIndex,
      existedViews,
      hoverDate,
      minDate,
      maxDate,
      disablePast,
      disableFuture,
      shouldDisableDate,
    })

    const onKeyDown = useDatePanelKeyDown({
      currentView,
      setCurrentView,
      changeOpen,
      existedViews,
    })

    return (
      <PanelWrapper {...rest} ref={ref} onKeyDown={onKeyDown}>
        <div>
          {header}

          {allowInfinity && (
            <InfinityPanel<TDate> range={range} changeDate={changeDate} />
          )}

          <PanelHeader
            {...panelHeaderProps}
            classes={panelHeaderClasses}
            monthText={monthText}
            yearText={yearText}
          />

          {currentView === DatePickerView.day && (
            <CalendarView<TDate>
              classes={calendarViewClasses}
              currentViewDate={currentViewDate}
              isDateDisabled={isDateDisabled}
              isDateSelected={isDateSelected}
              isInRange={isDateInRange}
              isInHoverRange={isDateInHoverRange}
              setHoverDate={setHoverDate}
              onClickDate={onSelectDate}
            />
          )}

          {currentView === DatePickerView.month && (
            <MonthsView<TDate>
              fullHeight={existedViews?.day || existedViews?.year}
              currentViewDate={currentViewDate}
              isMonthDisabled={isMonthDisabled}
              isMonthSelected={isMonthSelected}
              isInRange={isDateInRange}
              isInHoverRange={isDateInHoverRange}
              setHoverDate={setHoverDate}
              onClickMonth={onSelectMonth}
            />
          )}

          {currentView === DatePickerView.year && (
            <YearsView<TDate>
              currentViewDate={currentViewDate}
              minDate={minDate}
              maxDate={maxDate}
              isYearDisabled={isYearDisabled}
              isYearSelected={isYearSelected}
              isInRange={isDateInRange}
              isInHoverRange={isDateInHoverRange}
              setHoverDate={setHoverDate}
              onClickYear={onSelectYear}
            />
          )}
        </div>
      </PanelWrapper>
    )
  }
) as IRangeDatePanel
