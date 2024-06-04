'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList, useButtonReset } from '@v-uik/hooks'
import { ElementSize, ElementSizeType } from '@v-uik/common'
import { Text, TextKinds, TextProps } from '@v-uik/typography'
import { Classes } from './classes'

import { getStyles } from './styles'

export const ButtonKinds = {
  contained: 'contained',
  outlined: 'outlined',
  ghost: 'ghost',
} as const

export type TButtonKinds = keyof typeof ButtonKinds

export const ButtonColor = {
  primary: 'primary',
  secondary: 'secondary',
  error: 'error',
} as const

export type TButtonColor = keyof typeof ButtonColor

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * JSS-классы для стилизации
   */
  classes?: Partial<Classes>
  /**
   * Тип кнопки.
   * primary - стандартная,
   * ghost - текстовая,
   * outlined - контурная
   */
  kind?: TButtonKinds
  /**
   * Цветовая схема кнопки.
   * primary - по-умолчанию,
   * secondary - черно-белая,
   * error - предупреждающая необратимое действие
   */
  color?: TButtonColor
  /**
   * Размер кнопки
   */
  size?: ElementSizeType
  /**
   * Растянуть кнопку во всю ширину родительского контейнера
   */
  fullWidth?: boolean
  /**
   * Настраивает состояние кнопки отключено. В этом состоянии пользователь не может
   * взаимодействовать с кнопкой
   */
  disabled?: boolean
  /**
   * Свойства компонента Text
   */
  textProps?: TextProps
}

const useStyles = createUseStyles(getStyles)

export const Button = React.forwardRef(
  (
    {
      classes,
      className: classNameProp,
      kind = ButtonKinds.contained,
      color = ButtonColor.primary,
      size = ElementSize.md,
      fullWidth,
      textProps,
      children,
      ...rest
    }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const buttonClasses = useButtonReset()
    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const isSmall = size === ElementSize.sm
    const isMedium = size === ElementSize.md
    const isLarge = size === ElementSize.lg
    const className = clsx(
      buttonClasses.resetButton,
      classNameProp,
      classesMap.button,
      {
        [classesMap.contained]: kind === ButtonKinds.contained,
        [classesMap.outlined]: kind === ButtonKinds.outlined,
        [classesMap.ghost]: kind === ButtonKinds.ghost,
        [classesMap.primary]: color === ButtonColor.primary,
        [classesMap.error]: color === ButtonColor.error,
        [classesMap.secondary]: color === ButtonColor.secondary,
        [classesMap.small]: isSmall,
        [classesMap.medium]: isMedium,
        [classesMap.large]: isLarge,
        [classesMap.fullWidth]: fullWidth,
      }
    )
    const textClassName = clsx(textProps?.className, classesMap.text, {
      [classesList.textTypography]: !textProps?.kind,
      [classesMap.textSm]: isSmall,
      [classesMap.textMd]: isMedium,
      [classesMap.textLg]: isLarge,
    })

    return (
      <button type="button" {...rest} ref={ref} className={className}>
        <Text kind={TextKinds.button} {...textProps} className={textClassName}>
          {children}
        </Text>
      </button>
    )
  }
)
