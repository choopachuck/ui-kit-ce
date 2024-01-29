export type DatePickerClasses = {
  /** Стиль, применяемый к основному элементу  */
  root?: string
  /** Стиль, применяемый к обертке поля ввода */
  inputContainer?: string
  /** Стиль, применяемый к основному элементу в случае ошибки */
  error?: string
  /** Стиль, применяемый к основному элементу состоянии disabled */
  disabled?: string
  /** Стиль, применяемый к выпадашке пикера */
  calendarPickerDropdown?: string
}

export type DayViewClasses = {
  /** Стиль, применяемый к каждой строке (недели) */
  row?: string
  /** Стиль, применяемый к выбранному дню */
  selected?: string
  /** Стиль, применяемый к каждому заголовку дню недели */
  weekDay?: string
  /** Стиль, применяемый к текстовому полю каждого дня */
  dayText?: string
  /** Стиль, применяемый к кнопке каждого дня */
  dayButton?: string
  /** Стиль, применяемый к сегодняшнему дню */
  today?: string
  /** Стиль, применяемый к каждому дню не текущего месяца */
  notCurrentMonth?: string
}

export type MonthViewClasses = {
  /** Стиль, применяемый к обертке компонента */
  root?: string
  /** Стиль, применяемый к выбранному месяцу */
  selected?: string
  /** Стиль, применяемый к текстовому полю каждого месяца */
  monthText?: string
  /** Стиль, применяемый к кнопке каждого месяца */
  monthButton?: string
}

export type YearViewClasses = {
  /** Стиль, применяемый к обертке компонента */
  root?: string
  /** Стиль, применяемый к выбранному году */
  selected?: string
  /** Стиль, применяемый к текстовому полю каждого года */
  yearText?: string
  /** Стиль, применяемый к кнопке каждого года */
  yearButton?: string
}

export type RangePickerClasses = {
  /** Стиль, применяемый к основному элементу  */
  root?: string
  /** Стиль, применяемый к обертке полей ввода */
  inputContainer?: string
  /** Стиль, применяемый к inputContainer в случае ошибки */
  error?: string
  /** Стиль, применяемый к inputContainer, в состоянии disabled */
  disabled?: string
  /** Стиль, применяемый к inputContainer, в состоянии focused */
  focused?: string
  /** Стиль, применяемый к inputContainer в случае lg размера */
  large?: string
  /** Стиль, применяемый к inputContainer в случае sm размера */
  small?: string
  /** Стиль, применяемый к разделителю между инпутами */
  divider?: string
  /** Стиль, применяемый к обертке иконки календаря */
  iconContainer?: string
  /** Стиль, применяемый к иконке ошибки в случае inputStyle="default" */
  errorIcon?: string
}

export type RangeDayViewClasses = {
  /** Стиль, применяемый к каждой строке (недели) */
  row?: string
  /** Стиль, применяемый к выбранному дню */
  selected?: string
  /** Стиль, применяемый к кнопке каждого дня, в состоянии вхождения в выбранный период */
  withinRange?: string
  /** Стиль, применяемый при наведении на кнопку каждого дня, в состоянии вхождения в выбранный период */
  withinHoverRange?: string
  /** Стиль, применяемый при наведении на кнопку первого дня предполагаемого периода */
  withinHoverRangeStart?: string
  /** Стиль, применяемый при наведении на кнопку последного дня предполагаемого периода */
  withinHoverRangeEnd?: string
  /** Стиль, применяемый к каждому заголовку дню недели */
  weekDay?: string
  /** Стиль, применяемый к текстовому полю каждого дня */
  dayText?: string
  /** Стиль, применяемый к кнопке каждого дня */
  dayButton?: string
  /** Стиль, применяемый к сегодняшнему дню */
  today?: string
  /** Стиль, применяемый к каждому дню не текущего месяца */
  notCurrentMonth?: string
  /** Стиль, применяемый к каждой кнопке дня начала недели */
  weekStart?: string
  /** Стиль, применяемый к каждой кнопке дня конца недели */
  weekEnd?: string
  /** Стиль, применяемый к каждой кнопке дня начала месяца */
  monthStart?: string
  /** Стиль, применяемый к каждой кнопке дня конца месяца */
  monthEnd?: string
}

export type RangeMonthViewClasses = {
  /** Стиль, применяемый к обертке компонента */
  root?: string
  /** Стиль, применяемый к выбранному месяцу */
  selected?: string
  /** Стиль, применяемый к кнопке каждого месяца, в состоянии вхождения в выбранный период */
  withinRange?: string
  /** Стиль, применяемый при наведении на кнопку каждого месяца, в состоянии вхождения в выбранный период */
  withinHoverRange?: string
  /** Стиль, применяемый при наведении на кнопку первого месяца предполагаемого периода */
  withinHoverRangeStart?: string
  /** Стиль, применяемый при наведении на кнопку последного месяца предполагаемого периода */
  withinHoverRangeEnd?: string
  /** Стиль, применяемый к текстовому полю каждого месяца */
  monthText?: string
  /** Стиль, применяемый к кнопке каждого месяца */
  monthButton?: string
}

export type RangeYearViewClasses = {
  /** Стиль, применяемый к обертке компонента */
  root?: string
  /** Стиль, применяемый к выбранному году */
  selected?: string
  /** Стиль, применяемый к текстовому полю каждого года */
  yearText?: string
  /** Стиль, применяемый к кнопке каждого года */
  yearButton?: string
  /** Стиль, применяемый к кнопке каждого года, в состоянии вхождения в выбранный период */
  withinRange?: string
  /** Стиль, применяемый при наведении на кнопку каждого года, в состоянии вхождения в выбранный период */
  withinHoverRange?: string
  /** Стиль, применяемый при наведении на кнопку первого года предполагаемого периода */
  withinHoverRangeStart?: string
  /** Стиль, применяемый при наведении на кнопку последного года предполагаемого периода */
  withinHoverRangeEnd?: string
}
