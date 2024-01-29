import * as React from 'react'
import { DirectionType } from '@v-uik/common'
import { InputLabelProps } from '@v-uik/input-label'
import { InputHelperTextProps } from '@v-uik/input-helper-text'

type RadioGroupClasses = Partial<
  Record<'container' | 'error' | 'disabled' | 'radioGroup' | 'vertical', string>
>

export interface RadioGroupProps<T extends string>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * JSS-классы для стилизации
   */
  classes?: RadioGroupClasses
  /**
   * Подпись над полем ввода
   */
  label?: React.ReactNode
  /**
   * Свойства компонента InputLabel
   */
  labelProps?: InputLabelProps
  /**
   * Направление расположения элементов
   */
  direction?: DirectionType
  /**
   * Значение поля
   */
  value?: T
  /**
   * Имя элемента
   */
  name?: string
  /**
   * Обработчик изменения поля
   */
  onChange?: (value: T, event: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * Подпись под полем ввода
   */
  helperText?: React.ReactNode
  /**
   * Свойства компонента InputHelperText
   */
  helperTextProps?: InputHelperTextProps
  /**
   * Поле отключено
   */
  disabled?: boolean
  /**
   * Поле содержит ошибку
   */
  error?: boolean
}
