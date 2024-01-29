import { DatePickerViewType } from '../constants/common'
import { ButtonProps } from '@v-uik/button'
import { DayViewProps } from '../views/DayView'
import { MonthViewProps } from '../views/MonthView'
import { YearViewProps } from '../views/YearView'

export type ParsableDate<TDate = unknown> =
  | string
  | number
  | Date
  | null
  | undefined
  | TDate

export type CheckDateStateResult = {
  value: boolean
  preventNextCheck?: boolean
  position?: 'start' | 'end'
}

export type ExistedViews = {
  [key in DatePickerViewType]: boolean
}

export interface ForwardRefExoticComponentCommonFields<
  P = Record<string, never>
> {
  readonly $$typeof: symbol
  displayName?: string
  defaultProps?: Partial<P>
  propTypes?: React.WeakValidationMap<P>
}

export interface FunctionComponentCommonFields<P = Record<string, never>> {
  propTypes?: React.WeakValidationMap<P>
  contextTypes?: React.ValidationMap<unknown>
  defaultProps?: Partial<P>
  displayName?: string
}

/**
 * Тип для доп пропсов в календарь
 */
export type ExternalCalendarViewComponentsProps<TDate extends unknown> = {
  /**
   * Пропсы предыдщуей кнопки навигации
   */
  prevNavigationBarButtonProps: Omit<
    ButtonProps,
    'kind' | 'color' | 'className' | 'onClick' | 'children'
  >
  /**
   * Пропсы следующей кнопки навигации
   */
  nextNavigationBarButtonProps: Omit<
    ButtonProps,
    'kind' | 'color' | 'className' | 'onClick' | 'children'
  >
  /**
   * Пропсы кнопки месяца в панеле
   */
  monthBarButtonProps: Omit<
    ButtonProps,
    'kind' | 'color' | 'className' | 'onClick' | 'children'
  >
  /**
   * Пропсы кнопки год в панеле
   */
  yearBarButtonProps: Omit<
    ButtonProps,
    'kind' | 'color' | 'className' | 'onClick' | 'children'
  >
  /**
   * Пропсы для DayView
   */
  dayViewProps: Omit<
    DayViewProps<TDate>,
    | 'value'
    | 'displayedDate'
    | 'shouldDisableDate'
    | 'onChangeDisplayedDate'
    | 'onChange'
  >
  /**
   * Пропсы для MonthView
   */
  monthViewProps: Omit<
    MonthViewProps<TDate>,
    | 'value'
    | 'displayedDate'
    | 'shouldDisableDate'
    | 'onChangeDisplayedDate'
    | 'onChange'
  >
  /**
   * Пропсы для YearView
   */
  yearViewProps: Omit<
    YearViewProps<TDate>,
    | 'autoFocus'
    | 'value'
    | 'displayedDate'
    | 'shouldDisableDate'
    | 'minDate'
    | 'maxDate'
    | 'onChangeDisplayedDate'
    | 'onChange'
  >
}

export type ExternalCalendarViewComponentsPropsPartial<TDate extends unknown> =
  Partial<ExternalCalendarViewComponentsProps<TDate>>
