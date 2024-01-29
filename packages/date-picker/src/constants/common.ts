export const DatePickerView = {
  day: 'day',
  month: 'month',
  year: 'year',
} as const

export type DatePickerViewType = keyof typeof DatePickerView

export const defaultViews: DatePickerViewType[] = ['day', 'month', 'year']

export enum DateValidationError {
  invalidDate = 'invalidDate',
  notAllowedDate = 'notAllowedDate',
  isBeforeStartDate = 'isBeforeStartDate',
  isAfterEndDate = 'isAfterEndDate',
}

export type DateValidationErrorMessages = {
  [key in DateValidationError]: string
}

export const defaultValidationErrorMessages: DateValidationErrorMessages = {
  [DateValidationError.invalidDate]: 'Некорректная дата',
  [DateValidationError.notAllowedDate]: 'Дата недоступна для выбора',
  [DateValidationError.isBeforeStartDate]: 'Дата конца раньше даты начала',
  [DateValidationError.isAfterEndDate]: 'Дата начала позже даты конца',
}

export enum TimeValidationError {
  invalidTime = 'invalidTime',
  notAllowedTime = 'notAllowedTime',
  isBeforeStartTime = 'isBeforeStartTime',
  isAfterEndTime = 'isAfterEndTime',
}

export type TimeValidationErrorMessages = {
  [key in TimeValidationError]: string
}
