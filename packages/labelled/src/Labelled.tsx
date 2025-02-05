'use client'

import * as React from 'react'
import { InputLabel, InputLabelProps } from '@v-uik/input-label'
import { InputHelperText, InputHelperTextProps } from '@v-uik/input-helper-text'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { ElementSizeType, ElementSize } from '@v-uik/common'
import { Classes } from './classes'

const useStyles = createUseStyles((theme) => ({
  helperTextMinHeight: {},
  helperTextMinHeightSmall: {
    minHeight:
      theme.comp.inputHelperText.typographyLineHeightSm ||
      theme.comp.inputHelperText.typographyLineHeight,
  },
  helperTextMinHeightMedium: {
    minHeight:
      theme.comp.inputHelperText.typographyLineHeightMd ||
      theme.comp.inputHelperText.typographyLineHeight,
  },
  helperTextMinHeightLarge: {
    minHeight:
      theme.comp.inputHelperText.typographyLineHeightLg ||
      theme.comp.inputHelperText.typographyLineHeight,
  },
  description: {
    color: theme.comp.inputLabel.descriptionColorText,
    fontFamily: theme.comp.inputLabel.descriptionTypographyFontFamily,
    fontWeight: theme.comp.inputLabel.descriptionTypographyFontWeight,
    letterSpacing: theme.comp.inputLabel.descriptionTypographyLetterSpacing,
  },
  descriptionSmall: {
    fontSize:
      theme.comp.inputLabel.descriptionTypographyFontSizeSm ||
      theme.comp.inputLabel.descriptionTypographyFontSize,
    lineHeight:
      theme.comp.inputLabel.descriptionTypographyLineHeightSm ||
      theme.comp.inputLabel.descriptionTypographyLineHeight,
  },
  descriptionMedium: {
    fontSize:
      theme.comp.inputLabel.descriptionTypographyFontSizeMd ||
      theme.comp.inputLabel.descriptionTypographyFontSize,
    lineHeight:
      theme.comp.inputLabel.descriptionTypographyLineHeightMd ||
      theme.comp.inputLabel.descriptionTypographyLineHeight,
  },
  descriptionLarge: {
    fontSize:
      theme.comp.inputLabel.descriptionTypographyFontSizeLg ||
      theme.comp.inputLabel.descriptionTypographyFontSize,
    lineHeight:
      theme.comp.inputLabel.descriptionTypographyLineHeightLg ||
      theme.comp.inputLabel.descriptionTypographyLineHeight,
  },
  descriptionDisabled: {
    color: theme.comp.inputLabel.descriptionColorTextDisabled,
  },
  inputLabel: {
    marginBottom: 0,
  },
  topLabelsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  topLabels: {
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  required: {
    color: theme.comp.inputLabel.requiredColorText,
    fontFamily: theme.comp.inputLabel.typographyFontFamily,
    fontWeight: theme.comp.inputLabel.typographyFontWeight,
    letterSpacing: theme.comp.inputLabel.typographyLetterSpacing,
    marginRight: 4,
  },

  requiredSmall: {
    fontSize:
      theme.comp.inputLabel.typographyFontSizeSm ||
      theme.comp.inputLabel.typographyFontSize,
    lineHeight:
      theme.comp.inputLabel.typographyLineHeightSm ||
      theme.comp.inputLabel.typographyLineHeight,
  },

  requiredMedium: {
    fontSize:
      theme.comp.inputLabel.typographyFontSizeMd ||
      theme.comp.inputLabel.typographyFontSize,
    lineHeight:
      theme.comp.inputLabel.typographyLineHeightMd ||
      theme.comp.inputLabel.typographyLineHeight,
  },

  requiredLarge: {
    fontSize:
      theme.comp.inputLabel.typographyFontSizeLg ||
      theme.comp.inputLabel.typographyFontSize,
    lineHeight:
      theme.comp.inputLabel.typographyLineHeightLg ||
      theme.comp.inputLabel.typographyLineHeight,
  },
}))

export type LabelledProps = {
  /**
   * CSS классы компонента
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
   * Подпись под полем ввода
   */
  helperText?: React.ReactNode
  /**
   * Свойства компонента InputHelperText
   */
  helperTextProps?: InputHelperTextProps
  /**
   * Подпись под ярлыком
   */
  description?: React.ReactNode
  /**
   * Признак обязательности поля
   */
  required?: boolean
  /**
   * Применить стили для disabled состояния
   */
  disabled?: boolean
  /**
   * Поле содержит ошибку
   */
  error?: boolean
  /**
   * Оставить минимальную высоту контейнера для `helperText`
   */
  keepHelperTextMinHeight?: boolean
  /**
   * Дочерний контент
   */
  children?: React.ReactNode | undefined
  /**
   * Размер надписи
   */
  size?: ElementSizeType
}

export const Labelled: React.FC<LabelledProps> = ({
  classes,
  children,
  label,
  labelProps,
  helperText,
  helperTextProps,
  description,
  required = false,
  keepHelperTextMinHeight = false,
  disabled = false,
  error = false,
  size = ElementSize.md,
}) => {
  const classesMap = useClassList(useStyles(), classes)
  const isSmall = size === ElementSize.sm
  const isMedium = size === ElementSize.md
  const isLarge = size === ElementSize.lg

  const requiredClassName = clsx(classesMap.required, {
    [classesMap.requiredSmall]: isSmall,
    [classesMap.requiredMedium]: isMedium,
    [classesMap.requiredLarge]: isLarge,
  })

  return (
    <>
      {(label || description) && (
        <div className={classesMap.topLabelsWrapper}>
          {required && label && <div className={requiredClassName}>*</div>}
          {label && (
            <div className={classesMap.topLabels}>
              <InputLabel
                {...labelProps}
                disabled={labelProps?.disabled || disabled}
                size={labelProps?.size || size}
                classes={{
                  ...labelProps?.classes,
                  label: clsx(
                    classesMap.inputLabel,
                    labelProps?.classes?.label
                  ),
                }}
              >
                {label}
              </InputLabel>
              {description && (
                <div
                  className={clsx(classesMap.description, {
                    [classesMap?.descriptionDisabled]: disabled,
                    [classesMap.descriptionSmall]: isSmall,
                    [classesMap.descriptionMedium]: isMedium,
                    [classesMap.descriptionLarge]: isLarge,
                  })}
                >
                  {description}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {children}
      {(helperText || keepHelperTextMinHeight) && (
        <InputHelperText
          {...helperTextProps}
          size={helperTextProps?.size || size}
          error={helperTextProps?.error || error}
          disabled={helperTextProps?.disabled || disabled}
          classes={{
            ...helperTextProps?.classes,
            helperText: clsx(
              {
                [classesMap.helperTextMinHeight]: keepHelperTextMinHeight,
                [classesMap.helperTextMinHeightSmall]:
                  keepHelperTextMinHeight && isSmall,
                [classesMap.helperTextMinHeightMedium]:
                  keepHelperTextMinHeight && isMedium,
                [classesMap.helperTextMinHeightLarge]:
                  keepHelperTextMinHeight && isLarge,
              },
              helperTextProps?.classes?.helperText
            ),
          }}
        >
          {helperText}
        </InputHelperText>
      )}
    </>
  )
}
