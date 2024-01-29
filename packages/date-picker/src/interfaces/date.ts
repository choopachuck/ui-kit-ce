import {
  DatePickerViewType,
  DateValidationErrorMessages,
} from '../constants/common'
import * as React from 'react'
import { ShouldDisableDateFunction } from '../hooks/useShouldDisableDate'

export interface BaseDatePickerProps<TDate = unknown> {
  /**
   * Значение пикера
   */
  value: TDate | null
  /**
   * Обработчик изменения значения
   */
  onChange: (value: TDate | null) => void
  /**
   * Какие панели выбора даты доступны ('day', 'month', 'year')
   */
  views?: DatePickerViewType[]
  /**
   * Формат отображения даты в инпуте
   */
  format?: string
  /**
   * Маска ввода.
   */
  mask?: string
  /**
   * Сообщения ошибок при вводе некорректных дат
   */
  validationErrorMessages?: Partial<DateValidationErrorMessages>
  /**
   * Должен ли срабатывать onChange при вводе невалидной даты с клавиатуры
   */
  triggerOnChangeOnInvalid?: boolean
}

export interface DisableDateProps<TDate> {
  /**
   * Минимальная допустимая дата
   */
  minDate?: TDate

  /**
   * Максимальная допустимая дата
   */
  maxDate?: TDate
  /**
   * Функция отключения дня, месяца или года.
   * Кнопка будет отключена, если функция вернет true.
   */
  shouldDisableDate?: ShouldDisableDateFunction<TDate>
  /**
   * Функция отключения даты. Функция будет вызвана для каждого дня, который
   * в данный момент отображается в календаре. Дата будет отключена, если функция вернет true.
   * Не влияет на отображения месяцев и годов.
   */
  next_shouldDisableDate?: (date: TDate) => boolean
  /**
   * Функция отключения месяца. Функция будет вызвана для каждого дня или месяца, который
   * в данный момент отображается в календаре. Дата будет отключена, если функция вернет true.
   * Не влияет на отображения годов.
   */
  next_shouldDisableMonth?: (date: TDate) => boolean
  /**
   * Функция отключения года. Функция будет вызвана для каждого дня, месяца, года, который
   * в данный момент отображается в календаре. Дата будет отключен, если функция вернет true.
   */
  next_shouldDisableYear?: (date: TDate) => boolean
}

export interface ValidateDateProps<TDate = unknown>
  extends DisableDateProps<TDate> {
  /**
   * Заблокировать выбор даты в будущем.
   * Будет удалено, рекомендуется использовать `next_shouldDisableDate`, `next_shouldDisableMonth`, `next_shouldDisableYear`
   * @deprecated
   */
  disableFuture?: boolean
  /**
   * Заблокировать выбор даты в прошлом.
   * Будет удалено, рекомендуется использовать `next_shouldDisableDate`, `next_shouldDisableMonth`, `next_shouldDisableYear`
   * @deprecated
   */
  disablePast?: boolean
  /**
   * Заблокировать определенную дату.
   * Будет удалено, рекомендуется использовать `next_shouldDisableDate`, `next_shouldDisableMonth`, `next_shouldDisableYear`
   * @deprecated
   */
  disableDate?: (date: TDate) => boolean
}

export type DayParams<TDate = unknown> = {
  /**
   * текущая дата
   */
  date: TDate
  /**
   * текущее число месяца
   */
  value: string
  /**
   * событие выбора дня
   */
  onClick: () => void
  /**
   *  функция фокуса на выбранном дне
   */
  onFocus: (event: React.FocusEvent<HTMLButtonElement>) => void
  /**
   * состояние выбранного дня
   */
  selected?: boolean
  /**
   * состояние сегодняшнего дня
   */
  isToday?: boolean
  /**
   * состояние текущего месяца
   */
  isCurrentMonth?: boolean
  /**
   * состояние не текущего месяца
   */
  isNotCurrentMonth?: boolean
  /**
   * состояние заблокированного дня
   */
  disabled?: boolean
}

export type RangeDayParams = DayParams & {
  /**
   * состояние вхождения в выбранный период
   */
  isWithinRange?: boolean
  /**
   * состояние вхождения в предполагаемый период при наведении
   */
  isWithinHoverRange?: boolean
  /**
   * первый день предполагаемого периода при наведении
   */
  isWithinHoverRangeStart?: boolean
  /**
   * последний день предполагаемого периода при наведении
   */
  isWithinHoverRangeEnd?: boolean
  /**
   * первый день месяца
   */
  isStartOfMonth?: boolean
  /**
   * последний день месяца
   */
  isEndOfMonth?: boolean
  /**
   *  обработчик потери фокуса текущего дня
   */
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void
  /**
   *  обработчик наведения курсора
   */
  onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /**
   *  обработчик ухода курсора
   */
  onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
