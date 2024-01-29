import { ExistedViews } from '../interfaces'
import { DatePickerView } from '../constants/common'

export const getView = (
  existedViews: ExistedViews
): keyof typeof DatePickerView => {
  if (existedViews.day) {
    return DatePickerView.day
  }

  return existedViews.year ? DatePickerView.year : DatePickerView.month
}
