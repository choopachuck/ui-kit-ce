import * as React from 'react'
import { DatePickerView, DatePickerViewType } from '../constants/common'
import { ExistedViews } from '../interfaces/common'
import { isEqualKeyboardKeys } from '@v-uik/utils'

export interface IUseDatePanelKeydownProps {
  currentView: DatePickerViewType
  setCurrentView: (view: DatePickerViewType) => void
  changeOpen: (value: boolean) => void
  existedViews: ExistedViews
}

export type IUseDatePanelKeydownResult = (
  event: React.KeyboardEvent<HTMLDivElement>
) => void

export const useDatePanelKeyDown = ({
  currentView,
  setCurrentView,
  changeOpen,
  existedViews,
}: IUseDatePanelKeydownProps): IUseDatePanelKeydownResult => {
  return (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isEqualKeyboardKeys('Escape', event.key)) {
      if (currentView === DatePickerView.year && existedViews.month) {
        setCurrentView(DatePickerView.month)
      } else if (currentView === DatePickerView.month && existedViews.day) {
        setCurrentView(DatePickerView.day)
      } else {
        changeOpen(false)
      }
    }
  }
}
