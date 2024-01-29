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
      ...rest
    } = props

    const classesList = useStyles()

    const adapter = useDateLibAdapter<TDate>()

    const { currentViewDate, setCurrentViewDate } = useCurrentViewDate<TDate>(
      range[0] || range[1]
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
          />

          <div className={classesList.viewsContainer}>
            {currentView === DatePickerView.day && (
              <>
                <CalendarView<TDate>
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
                  isMonthSelected={isMonthSelected}
                  isInRange={isDateInRange}
                  isInHoverRange={isDateInHoverRange}
                  setHoverDate={setHoverDate}
                  onClickMonth={onSelectMonth}
                />

                <div className={classesList.divider} />

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
              </>
            )}
          </div>
        </div>
      </PanelWrapper>
    )
  }
) as IRangeDatePanelMulti

RangeDatePanelMulti.displayName = 'RangeDatePanelMulti'
