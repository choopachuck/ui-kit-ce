'use client'

import * as React from 'react'
import { clsx, createUseStyles } from '@v-uik/theme'
import { useClassList, useButtonReset } from '@v-uik/hooks'
import { ElementSize, ElementSizeType } from '@v-uik/common'
import { useText } from '@v-uik/typography'
import { Tooltip, TooltipProps } from '@v-uik/tooltip'
import { ErrorIcon } from '../assets/ErrorIcon'

const useStyles = createUseStyles((theme) => ({
  button: {
    position: 'relative',
    cursor: 'pointer',
    outline: 'none',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    color: theme.comp.select.inputColorText,
    backgroundColor: theme.comp.select.inputColorBackground,

    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      borderRadius: 'inherit',
      borderColor: theme.comp.select.inputColorBorder,
      borderStyle: theme.shape.borderStyle,
      borderWidth: theme.shape.borderWidth,
    },

    '&:hover': {
      backgroundColor: theme.comp.select.inputColorBackgroundHover,

      '&::after': {
        borderColor: theme.comp.select.inputColorBorderHover,
      },
    },

    '&:focus-visible': {
      boxShadow: `0 0 0 2px ${theme.comp.select.inputColorShadowFocus}`,

      '&::after': {
        borderWidth: 0,
      },
    },

    '&$error:not(:focus-visible)': {
      backgroundColor: theme.comp.select.inputColorBackgroundError,

      '&::after': {
        borderColor: theme.comp.select.inputColorBorderError,
      },
    },

    '&:disabled': {
      cursor: 'default',
      pointerEvents: 'none',
      color: theme.comp.select.inputColorTextDisabled,
      backgroundColor: theme.comp.select.inputColorBackgroundDisabled,

      '&::after': {
        borderColor: theme.comp.select.inputColorBorderDisabled,
      },
    },
  },

  small: {
    padding: [4, 16],
    borderTopLeftRadius: theme.comp.select.inputShapeBorderRadiusTopLeftSm,
    borderTopRightRadius: theme.comp.select.inputShapeBorderRadiusTopRightSm,
    borderBottomLeftRadius:
      theme.comp.select.inputShapeBorderRadiusBottomLeftSm,
    borderBottomRightRadius:
      theme.comp.select.inputShapeBorderRadiusBottomRightSm,

    '& $errorIcon': {
      width: 16,
      height: 16,
    },
  },

  medium: {
    padding: [8, 16],
    borderTopLeftRadius: theme.comp.select.inputShapeBorderRadiusTopLeftMd,
    borderTopRightRadius: theme.comp.select.inputShapeBorderRadiusTopRightMd,
    borderBottomLeftRadius:
      theme.comp.select.inputShapeBorderRadiusBottomLeftMd,
    borderBottomRightRadius:
      theme.comp.select.inputShapeBorderRadiusBottomRightMd,
  },

  large: {
    padding: [12, 16],
    borderTopLeftRadius: theme.comp.select.inputShapeBorderRadiusTopLeftLg,
    borderTopRightRadius: theme.comp.select.inputShapeBorderRadiusTopRightLg,
    borderBottomLeftRadius:
      theme.comp.select.inputShapeBorderRadiusBottomLeftLg,
    borderBottomRightRadius:
      theme.comp.select.inputShapeBorderRadiusBottomRightLg,
  },

  opened: {},

  error: {},

  empty: {
    color: theme.comp.select.placeholderColorText,
  },

  text: {
    flex: 1,
    textAlign: 'left',
    position: 'relative',
    boxSizing: 'border-box',
    padding: 0,
    fontFamily: theme.comp.select.inputTypographyFontFamily,
    letterSpacing: theme.comp.select.inputTypographyLetterSpacing,
    fontWeight: theme.comp.select.inputTypographyFontWeight,
  },

  textSmall: {
    fontSize:
      theme.comp.select.inputTypographyFontSizeSm ||
      theme.comp.select.inputTypographyFontSize,
    lineHeight:
      theme.comp.select.inputTypographyLineHeightSm ||
      theme.comp.select.inputTypographyLineHeight,
  },

  textMedium: {
    fontSize:
      theme.comp.select.inputTypographyFontSizeMd ||
      theme.comp.select.inputTypographyFontSize,
    lineHeight:
      theme.comp.select.inputTypographyLineHeightMd ||
      theme.comp.select.inputTypographyLineHeight,
  },

  textLarge: {
    fontSize:
      theme.comp.select.inputTypographyFontSizeLg ||
      theme.comp.select.inputTypographyFontSize,
    lineHeight:
      theme.comp.select.inputTypographyLineHeightLg ||
      theme.comp.select.inputTypographyLineHeight,
  },

  content: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    minHeight: 24,
    zIndex: 2,
  },

  errorIcon: {
    color: theme.comp.select.alertIconColorText,
    marginLeft: 8,
    zIndex: 2,
  },

  arrowIconContainer: {
    marginLeft: 8,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  disabled: {
    '& $empty': {
      color: theme.comp.select.placeholderColorTextDisabled,
    },
  },
}))

type Classes = Partial<
  Record<
    'button' | 'empty' | 'content' | 'text' | 'errorIcon' | 'disabled',
    string
  >
>

export interface SelectButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * JSS-классы для стилизации
   */
  classes?: Classes
  /**
   * Флаг открытия селекта
   */
  isOpen?: boolean
  /**
   * Размер поля
   */
  size?: ElementSizeType
  /**
   * Индикатор ошибки
   */
  error?: boolean
  /**
   * Показать дополнительную иконку ошибки
   */
  showErrorIcon?: boolean
  /**
   * Свойства компонента Tooltip для иконки ошибки
   */
  errorIconTooltipProps?: Omit<TooltipProps, 'children'>
  /**
   * Индикатор отсутствия значения
   */
  emptyValue?: boolean
  /**
   * Иконка открытия/закрытия компонента `Select`
   */
  dropdownIndicator?: React.ReactNode
}

export const SelectButton = React.forwardRef(
  (
    {
      classes,
      className: classNameProp,
      size = ElementSize.md,
      isOpen,
      error,
      disabled,
      showErrorIcon,
      errorIconTooltipProps,
      emptyValue,
      children,
      dropdownIndicator,
      ...rest
    }: SelectButtonProps,
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
      classesMap.button,
      classNameProp,
      {
        [classesMap.small]: isSmall,
        [classesMap.medium]: isMedium,
        [classesMap.large]: isLarge,
        [classesMap.opened]: isOpen,
        [classesMap.error]: error,
        [classesMap.disabled]: disabled,
      }
    )
    const { ellipsis } = useText()

    const textClassName = clsx(classesMap.text, ellipsis, {
      [classesMap.empty]: emptyValue,
      [classesMap.textSmall]: isSmall,
      [classesMap.textMedium]: isMedium,
      [classesMap.textLarge]: isLarge,
    })

    const errorIcon = <ErrorIcon className={classesMap.errorIcon} />

    return (
      <button
        {...rest}
        ref={ref}
        className={className}
        disabled={disabled}
        type="button"
      >
        <span className={classesMap.content}>
          <span className={textClassName}>{children}</span>
          {showErrorIcon &&
            error &&
            (errorIconTooltipProps ? (
              <Tooltip single indicator {...errorIconTooltipProps}>
                {errorIcon}
              </Tooltip>
            ) : (
              errorIcon
            ))}
          <span className={classesMap.arrowIconContainer}>
            {dropdownIndicator}
          </span>
        </span>
      </button>
    )
  }
)
