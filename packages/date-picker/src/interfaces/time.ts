import { ElementSizeType } from '@v-uik/common'
import { DropdownProps } from '@v-uik/dropdown'
import { LabelledProps } from '@v-uik/labelled'

const BaseTimePickerView = {
  hours: 'hours',
  minutes: 'minutes',
  seconds: 'seconds',
  milliseconds: 'milliseconds',
}

export type BaseTimePickerViewType = keyof typeof BaseTimePickerView

export type DisableTimeViewType = BaseTimePickerViewType | 'dayPart'

export type DisableTime<TDate = unknown> = (
  date: TDate,
  view: DisableTimeViewType
) => boolean

export type DayPart = 'am' | 'pm'

export interface TimePickerOwnProps
  extends Partial<
    Pick<
      LabelledProps,
      | 'label'
      | 'labelProps'
      | 'helperText'
      | 'helperTextProps'
      | 'description'
      | 'keepHelperTextMinHeight'
      | 'required'
    >
  > {
  /**
   * Список классов для компонента Labelled
   */
  labelledClasses?: LabelledProps['classes']
  /**
   * Поле содержит ошибку
   */
  error?: boolean
  /**
   * Заблокировать поле
   */
  disabled?: boolean
  /**
   * Размер поля
   */
  size?: ElementSizeType
  /**
   * Раскрыт ли time picker
   */
  open?: boolean
  /**
   * Свойства компонента Dropdown
   */
  dropdownProps?: DropdownProps
  /**
   * Формат отображения даты в инпуте
   * По умолчанию fullTime12h / fullTime24h
   * зависящий от is12HoursFormat соответственно
   */
  format?: string
  /**
   * Маска ввода.
   */
  mask?: string
}
