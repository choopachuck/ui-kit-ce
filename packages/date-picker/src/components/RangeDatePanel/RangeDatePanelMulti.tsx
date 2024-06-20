'use client'

import React from 'react'
import { createUseStyles } from '@v-uik/theme'
import { useDateLibAdapter } from '../../hooks/useDateLibAdapter'
import { useRangeViews } from '../../hooks/useRangeViews'
import { useCurrentViewDate } from '../../hooks/useCurrentViewDate'
import { useDatePanelKeyDown } from '../../hooks/useDatePanelKeyDown'
import { useRangeDateCheckState } from '../../hooks/useRangeDateCheckState'
import { ForwardRefExoticComponentCommonFields } from '../../interfaces/common'
import { PanelWrapper } from '../PanelWrapper/PanelWrapper'
import { PanelHeader } from '../PanelHeader/PanelHeader'
import { CalendarView } from '../CalendarView/CalendarView'
import { MonthsView } from '../MonthsView/MonthsView'
import { YearsView } from '../YearsView/YearsView'
import { InfinityPanel } from '../InfinityPanel/InfinityPanel'
import { DatePickerView } from '../../constants/common'
import { Props as RangeDatePanelProps } from './RangeDatePanel'
import { useHoverState } from '../../hooks/useHoverState'

import { getStyles } from './styles'
import { getDateByActiveInputIndex } from '../../utils/date'

const useStyles = createUseStyles(getStyles)

export interface Props<TDate = unknown> extends RangeDatePanelProps<TDate> {}

interface IRangeDatePanelMulti
  extends ForwardRefExoticComponentCommonFields<Props> {
  <TDate = unknown>(
    props: React.PropsWithoutRef<Props<TDate>> &
      React.RefAttributes<HTMLDivElement>
  ): React.ReactElement | null
}

export const RangeDatePanelMulti = React.forwardRef(
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

    const classesList = useStyles()

    const adapter = useDateLibAdapter<TDate>()

    const { currentViewDate, setCurrentViewDate } = useCurrentViewDate<TDate>(
      getDateByActiveInputIndex(range, activeInputIndex)
    )

    const currentViewDateNext = adapter.addMonths(currentViewDate, 1)

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

    const monthText = `${adapter.format(
      currentViewDate,
      'month'
    )} - ${adapter.format(currentViewDateNext, 'month')}`
    const yearText = adapter.getYear(currentViewDate)

    const {
      isDateDisabled,
      isDateSelected,
      isDateInRange,
      isDateInHoverRange,
      isMonthDisabled,
      isYearDisabled,
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

    const yearOrMonthSelected =
      currentView === DatePickerView.month ||
      currentView === DatePickerView.year

    return (
      <PanelWrapper {...rest} ref={ref} onKeyDown={onKeyDown}>
        <div>
          {header}

          {allowInfinity && (
            <InfinityPanel<TDate> range={range} changeDate={changeDate} />
          )}

          <PanelHeader
            {...panelHeaderProps}
            monthSelected={yearOrMonthSelected}
            yearSelected={yearOrMonthSelected}
            monthText={monthText}
            yearText={yearText}
            classes={panelHeaderClasses}
          />

          <div className={classesList.viewsContainer}>
            {currentView === DatePickerView.day && (
              <>
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

                <div className={classesList.divider} />

                <CalendarView<TDate>
                  classes={calendarViewClasses}
                  currentViewDate={currentViewDateNext}
                  isDateDisabled={isDateDisabled}
                  isDateSelected={isDateSelected}
                  isInRange={isDateInRange}
                  isInHoverRange={isDateInHoverRange}
                  setHoverDate={setHoverDate}
                  onClickDate={onSelectDate}
                />
              </>
            )}

            {yearOrMonthSelected && (
              <>
                <MonthsView<TDate>
                  fullHeight
                  currentViewDate={currentViewDate}
                  isMonthDisabled={isMonthDisabled}
                  onClickMonth={onSelectMonth}
                />

                <div className={classesList.divider} />

                <YearsView<TDate>
                  currentViewDate={currentViewDate}
                  minDate={minDate}
                  maxDate={maxDate}
                  isYearDisabled={isYearDisabled}
                  onClickYear={onSelectYear}
                />
              </>
            )}
          </div>
        </div>
      </PanelWrapper>
    )
  }
) as IRangeDatePanelMulti

RangeDatePanelMulti.displayName = 'RangeDatePanelMulti'
