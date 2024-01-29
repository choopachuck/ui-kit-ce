import * as React from 'react'
import { useDateLibAdapter } from './useDateLibAdapter'
import { DatePickerView, DatePickerViewType } from '../constants/common'
import { Props as PanelHeaderProps } from '../components/PanelHeader/PanelHeader'
import { TRangeDate, TRangeValue } from '../interfaces/range'
import { ExistedViews } from '../interfaces/common'
import { getView } from '../utils/getView'
import { isWrongDirection } from '../utils/date'

interface IUseRangeViewsProps<TDate> {
  existedViews: ExistedViews
  range: TRangeDate<TDate>
  activeInputIndex?: 0 | 1
  changeOpen: (value: boolean) => void
  changeDate: (
    date: TRangeValue<TDate>,
    index: 0 | 1,
    overrideRange?: TRangeDate<TDate>
  ) => void
  setCurrentViewDate: React.Dispatch<React.SetStateAction<TDate>>
}

export interface IUseRangeViewsResult<TDate = unknown> {
  currentView: DatePickerViewType
  setCurrentView: (view: DatePickerViewType) => void
  panelHeaderProps: Partial<PanelHeaderProps>
  onSelectDate: (date: TDate) => void
  onSelectMonth: (date: TDate) => void
  onSelectYear: (date: TDate) => void
}

export const useRangeViews = <TDate = unknown>({
  existedViews,
  range,
  activeInputIndex,
  changeDate,
  changeOpen,
  setCurrentViewDate,
}: IUseRangeViewsProps<TDate>): IUseRangeViewsResult<TDate> => {
  const adapter = useDateLibAdapter<TDate>()

  const [currentView, setCurrentView] = React.useState<DatePickerViewType>(
    getView(existedViews)
  )

  const onClickMonth = () => {
    if (currentView !== DatePickerView.month) {
      setCurrentView(DatePickerView.month)
    }
  }

  const onClickChevron = (event: React.MouseEvent, value: number) => {
    if (existedViews.day) {
      setCurrentViewDate((prevCurrentViewDate) =>
        adapter.addMonths(prevCurrentViewDate, value)
      )
      setCurrentView(DatePickerView.day)
    }
  }

  const onClickYear = () => {
    if (currentView !== DatePickerView.year) {
      setCurrentView(DatePickerView.year)
    }
  }

  const panelHeaderProps: Partial<PanelHeaderProps> = {
    showMonth: existedViews.day,
    monthSelected: currentView === DatePickerView.month,
    showYear: !(existedViews.month && !existedViews.day && !existedViews.year),
    yearSelected: currentView === DatePickerView.year,
    onClickMonth,
    onClickChevron,
    onClickYear,
  }

  const onSelectDate = (newDate: TDate) => {
    if (typeof activeInputIndex === 'undefined') {
      return
    }

    const nextRange: TRangeDate<TDate> = [...range]
    nextRange[activeInputIndex] = newDate
    if (isWrongDirection(nextRange, activeInputIndex, adapter)) {
      changeDate(newDate, 0, [newDate, null])

      return
    }

    changeDate(newDate, activeInputIndex)
    if (activeInputIndex === 1 && range[0]) {
      changeOpen(false)
    }
  }

  const onSelectMonth = (newDate: TDate) => {
    if (existedViews.day) {
      setCurrentViewDate(newDate)
      setCurrentView(DatePickerView.day)
    } else if (typeof activeInputIndex !== 'undefined') {
      changeDate(newDate, activeInputIndex)
      if (activeInputIndex === 1 && range[0]) {
        changeOpen(false)
      }
    }
  }

  const onSelectYear = (newDate: TDate) => {
    if (existedViews.day || existedViews.month) {
      setCurrentViewDate((prevDate) =>
        adapter.setYear(prevDate, adapter.getYear(newDate))
      )
      setCurrentView(DatePickerView.month)
    } else if (typeof activeInputIndex !== 'undefined') {
      changeDate(newDate, activeInputIndex)
      if (activeInputIndex === 1 && range[0]) {
        changeOpen(false)
      }
    }
  }

  return {
    currentView,
    setCurrentView,
    panelHeaderProps,
    onSelectDate,
    onSelectMonth,
    onSelectYear,
  }
}
