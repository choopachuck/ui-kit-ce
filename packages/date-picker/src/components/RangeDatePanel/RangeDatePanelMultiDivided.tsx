'use client'

import * as React from 'react'
import { createUseStyles } from '@v-uik/theme'
import { useDateLibAdapter } from '../../hooks/useDateLibAdapter'
import { useNowDate } from '../../hooks/useNowDate'
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

interface IRangeDatePanelMultiDivided
  extends ForwardRefExoticComponentCommonFields<Props> {
  <TDate = unknown>(
    props: React.PropsWithoutRef<Props<TDate>> &
      React.RefAttributes<HTMLDivElement>
  ): React.ReactElement | null
}

export const RangeDatePanelMultiDivided = React.forwardRef(
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

    const nowDate = useNowDate<TDate>()

    const {
      currentViewDate: currentViewDateLeft,
      setCurrentViewDate: setCurrentViewDateLeft,
    } = useCurrentViewDate<TDate>(range[0])

    const monthRight = React.useRef(range[1] || adapter.addMonths(nowDate, 1))

    const {
      currentViewDate: currentViewDateRight,
      setCurrentViewDate: setCurrentViewDateRight,
    } = useCurrentViewDate<TDate>(monthRight.current)

    const { hoverDate, setHoverDate } = useHoverState<TDate>(
      range,
      activeInputIndex
    )

    const {
      currentView: currentViewLeft,
      setCurrentView: setCurrentViewLeft,
      panelHeaderProps: panelHeaderPropsLeft,
      onSelectDate: onSelectDateLeft,
      onSelectMonth: onSelectMonthLeft,
      onSelectYear: onSelectYearLeft,
    } = useRangeViews<TDate>({
      existedViews,
      range,
      activeInputIndex,
      changeDate,
      changeOpen,
      setCurrentViewDate: setCurrentViewDateLeft,
    })

    const {
      currentView: currentViewRight,
      setCurrentView: setCurrentViewRight,
      panelHeaderProps: panelHeaderPropsRight,
      onSelectDate: onSelectDateRight,
      onSelectMonth: onSelectMonthRight,
      onSelectYear: onSelectYearRight,
    } = useRangeViews<TDate>({
      existedViews,
      range,
      activeInputIndex,
      changeDate,
      changeOpen,
      setCurrentViewDate: setCurrentViewDateRight,
    })

    const monthTextLeft = adapter.format(currentViewDateLeft, 'month')
    const yearTextLeft = adapter.getYear(currentViewDateLeft)

    const monthTextRight = adapter.format(currentViewDateRight, 'month')
    const yearTextRight = adapter.getYear(currentViewDateRight)

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

    const onKeyDownLeft = useDatePanelKeyDown({
      currentView: currentViewLeft,
      setCurrentView: setCurrentViewLeft,
      changeOpen,
      existedViews,
    })

    const onKeyDownRight = useDatePanelKeyDown({
      currentView: currentViewRight,
      setCurrentView: setCurrentViewRight,
      changeOpen,
      existedViews,
    })

    return (
      <PanelWrapper {...rest} ref={ref}>
        {header}

        {allowInfinity && (
          <InfinityPanel<TDate> range={range} changeDate={changeDate} />
        )}

        <div className={classesList.viewsContainer}>
          <div onKeyDown={onKeyDownLeft}>
            <PanelHeader
              {...panelHeaderPropsLeft}
              monthText={monthTextLeft}
              yearText={yearTextLeft}
              classes={panelHeaderClasses}
            />

            {currentViewLeft === DatePickerView.day && (
              <CalendarView<TDate>
                classes={calendarViewClasses}
                currentViewDate={currentViewDateLeft}
                isDateDisabled={isDateDisabled}
                isDateSelected={isDateSelected}
                isInRange={isDateInRange}
                isInHoverRange={isDateInHoverRange}
                setHoverDate={setHoverDate}
                onClickDate={onSelectDateLeft}
              />
            )}

            {currentViewLeft === DatePickerView.month && (
              <MonthsView<TDate>
                fullHeight={existedViews.day || existedViews.year}
                currentViewDate={currentViewDateLeft}
                isMonthDisabled={isMonthDisabled}
                onClickMonth={onSelectMonthLeft}
              />
            )}

            {currentViewLeft === DatePickerView.year && (
              <YearsView<TDate>
                currentViewDate={currentViewDateLeft}
                minDate={minDate}
                maxDate={maxDate}
                isYearDisabled={isYearDisabled}
                onClickYear={onSelectYearLeft}
              />
            )}
          </div>

          <div className={classesList.divider} />

          <div onKeyDown={onKeyDownRight}>
            <PanelHeader
              {...panelHeaderPropsRight}
              monthText={monthTextRight}
              yearText={yearTextRight}
              classes={panelHeaderClasses}
            />

            {currentViewRight === DatePickerView.day && (
              <CalendarView<TDate>
                classes={calendarViewClasses}
                currentViewDate={currentViewDateRight}
                isDateDisabled={isDateDisabled}
                isDateSelected={isDateSelected}
                isInRange={isDateInRange}
                isInHoverRange={isDateInHoverRange}
                setHoverDate={setHoverDate}
                onClickDate={onSelectDateRight}
              />
            )}

            {currentViewRight === DatePickerView.month && (
              <MonthsView<TDate>
                fullHeight={existedViews.day || existedViews.year}
                currentViewDate={currentViewDateRight}
                isMonthDisabled={isMonthDisabled}
                onClickMonth={onSelectMonthRight}
              />
            )}

            {currentViewRight === DatePickerView.year && (
              <YearsView<TDate>
                currentViewDate={currentViewDateRight}
                minDate={minDate}
                maxDate={maxDate}
                isYearDisabled={isYearDisabled}
                onClickYear={onSelectYearRight}
              />
            )}
          </div>
        </div>
      </PanelWrapper>
    )
  }
) as IRangeDatePanelMultiDivided

RangeDatePanelMultiDivided.displayName = 'RangeDatePanelMultiDivided'
