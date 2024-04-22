'use client'

import * as React from 'react'
import { clsx, createUseStyles } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { Box, PolymorphicComponentProps } from '@v-uik/box'
import { UploaderLabelClasses } from './classes'
import type { ComponentPropsWithRefFix } from '@v-uik/common'

const useStyles = createUseStyles((theme) => ({
  label: {
    fontFamily: theme.comp.inputLabel.typographyFontFamily,
    fontWeight: theme.comp.inputLabel.typographyFontWeight,
    fontSize: theme.comp.inputLabel.typographyFontSize,
    lineHeight: theme.comp.inputLabel.typographyLineHeight,
    letterSpacing: theme.comp.inputLabel.typographyLetterSpacing,

    color: theme.comp.inputLabel.colorText,

    '$disabled &': {
      color: theme.comp.inputLabel.colorTextDisabled,
    },

    marginBottom: 4,
  },
  description: {
    marginBottom: 8,
    fontFamily: theme.comp.inputLabel.descriptionTypographyFontFamily,
    fontWeight: theme.comp.inputLabel.descriptionTypographyFontWeight,
    fontSize: theme.comp.inputLabel.descriptionTypographyFontSize,
    lineHeight: theme.comp.inputLabel.descriptionTypographyLineHeight,
    letterSpacing: theme.comp.inputLabel.descriptionTypographyLetterSpacing,

    color: theme.comp.inputLabel.descriptionColorText,

    '$disabled &': {
      color: theme.comp.inputLabel.descriptionColorTextDisabled,
    },
  },
  error: {
    marginTop: 4,
    fontFamily: theme.comp.inputHelperText.typographyFontFamily,
    fontWeight: theme.comp.inputHelperText.typographyFontWeight,
    fontSize: theme.comp.inputHelperText.typographyFontSize,
    lineHeight: theme.comp.inputHelperText.typographyLineHeight,
    letterSpacing: theme.comp.inputHelperText.typographyLetterSpacing,

    color: theme.comp.inputHelperText.colorTextError,
  },
  disabled: {},
}))

const defaultElement = 'div'

type UploaderLabelOwnProps = {
  /**
   * Контент лейбла
   */
  label?: React.ReactNode
  /**
   * Описание
   */
  description?: React.ReactNode
  /**
   * Текст ошибки
   */
  errorText?: React.ReactNode
  /**
   * Пропсы для label
   */
  labelProps?: ComponentPropsWithRefFix<'label'>
  /**
   * Пропсы для description
   */
  descriptionProps?: ComponentPropsWithRefFix<'div'>
  /**
   * Пропсы для errorText
   */
  errorTextProps?: ComponentPropsWithRefFix<'div'>
  children: React.ReactNode
  /**
   * Классы
   */
  classes?: UploaderLabelClasses
  /**
   * UploaderLabel задизейблен
   */
  disabled?: boolean
} & ComponentPropsWithRefFix<typeof defaultElement>

export type UploaderLabelProps<E extends React.ElementType> =
  PolymorphicComponentProps<E, UploaderLabelOwnProps>

export const UploaderLabel = React.forwardRef(
  <E extends React.ElementType = typeof defaultElement>(
    {
      errorText,
      label,
      description,
      classes,
      children,
      as,
      ref,
      labelProps = {},
      errorTextProps = {},
      descriptionProps = {},
      className: classNameProps,
      disabled = false,
      ...props
    }: UploaderLabelProps<E>,
    innerRef: typeof ref
  ) => {
    const classesList = useStyles()

    const classesMap = useClassList(classesList, classes)

    return (
      <Box
        as={as ?? defaultElement}
        {...props}
        ref={innerRef}
        className={clsx(classNameProps, disabled && classesMap.disabled)}
      >
        {label && (
          <label
            {...labelProps}
            className={clsx(classesMap.label, labelProps.className)}
          >
            {label}
          </label>
        )}
        {description && (
          <div
            {...descriptionProps}
            className={clsx(classesMap.description, descriptionProps.className)}
          >
            {description}
          </div>
        )}
        {children}
        {errorText && (
          <div
            {...errorTextProps}
            className={clsx(classesMap.error, errorTextProps.className)}
          >
            {errorText}
          </div>
        )}
      </Box>
    )
  }
) as <E extends React.ElementType = typeof defaultElement>(
  props: UploaderLabelProps<E>
) => JSX.Element
