import * as React from 'react'
import { DirectionType } from '@v-uik/common'
import { InputLabelProps } from '@v-uik/input-label'
import { InputHelperTextProps } from '@v-uik/input-helper-text'
import { Classes } from './classes'

export interface CheckboxGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * JSS-классы для стилизации
   */
  classes?: Partial<Classes>
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
  value?: string[]
  /**
   * Обработчик изменения состояния
   */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value?: CheckboxGroupProps['value']
  ) => void
  /**
   * Подпись под полем ввода
   */
  helperText?: React.ReactNode
  /**
   * Свойства компонента InputHelperText
   */
  helperTextProps?: InputHelperTextProps
  /*
   * Поле отключено
   */
  disabled?: boolean
  /*
   * Поле содержит ошибку
   */
  error?: boolean
}
