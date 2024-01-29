import { ValidateDateProps } from '../interfaces/date'
import { BaseRangePickerProps } from '../interfaces/range'
import { defaultViews } from './common'

export const rangePickerDefaultProps: BaseRangePickerProps & ValidateDateProps =
  {
    views: defaultViews,
  }

export const RangeInputStyle = {
  default: 'default',
  divided: 'divided',
} as const
export type RangeInputStyleType = keyof typeof RangeInputStyle

export const RangeDatePanelStyle = {
  single: 'single',
  default: 'default',
  divided: 'divided',
} as const
export type RangeDatePanelStyleType = keyof typeof RangeDatePanelStyle

export const MOBILE_BREAKPOINT = 640

export const MOBILE_MEDIA_QUERY = `(max-width: ${MOBILE_BREAKPOINT}px)`
