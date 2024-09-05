import * as React from 'react'
import { InputLabelProps } from '@v-uik/input-label'
import { InputHelperTextProps } from '@v-uik/input-helper-text'
import { InputBaseProps } from '@v-uik/input'
import { MaskedInputBaseProps } from '@v-uik/masked-input'
import { ParsableDate } from './common'
import { BaseDatePickerProps } from './date'
import {
  RangeInputStyleType,
  RangeDatePanelStyleType,
} from '../constants/range'

export type TRangeValue<TDate = unknown> = TDate | number

export type TRangeDate<TDate = unknown> = [
  TRangeValue<TDate> | null,
  TRangeValue<TDate> | null
]

//TODO: удалить в 2.0 и везде использовать TRangeDate, внутри компонента нигде не использовать
export type TRangeDateBackwardCompat<TDate = unknown> = [
  TRangeValue<TDate>,
  TRangeValue<TDate>
]

export interface BaseRangePickerProps<TDate = unknown>
  extends Omit<BaseDatePickerProps<TDate>, 'value' | 'onChange'> {
  /**
   * Вид инпутов пикера
   */
  inputStyle?: RangeInputStyleType
  /**
   * Вид панели календаря пикера
   */
  datePanelStyle?: RangeDatePanelStyleType
  /**
   * Значение пикера
   */
  value?: [ParsableDate<TDate>, ParsableDate<TDate>] | null
  /**
   * Обработчик изменения значения
   */
  onChange?: (value: TRangeDateBackwardCompat<TDate>) => void
  /**
   * Поле содержит ошибку
   */
  error?: boolean
  /**
   * Подпись над полем ввода
   */
  label?: React.ReactNode
  /**
   * Свойства компонента InputLabel
   */
  labelProps?: InputLabelProps
  /**
   * Подпись под полем ввода
   */
  helperText?: React.ReactNode
  /**
   * Свойства компонента InputHelperText
   */
  helperTextProps?: InputHelperTextProps
  /**
   * Свойства компонента InputBase или MaskedInputBase начала диапазона
   */
  startInputProps?: InputBaseProps | MaskedInputBaseProps
  /**
   * Свойства компонента InputBase или MaskedInputBase конца диапазона
   */
  endInputProps?: InputBaseProps | MaskedInputBaseProps
  /**
   * Разрешить значение Infinity
   */
  allowInfinity?: boolean
}
