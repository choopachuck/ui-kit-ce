'use client'

import * as React from 'react'
import { InputLabel, InputLabelProps } from '@v-uik/input-label'
import { InputHelperText, InputHelperTextProps } from '@v-uik/input-helper-text'
import { createUseStyles, clsx } from '@v-uik/theme'
import { Classes } from './classes'
import { useClassList } from '@v-uik/hooks'

const useStyles = createUseStyles((theme) => ({
  helperTextMinHeight: {
    minHeight: theme.comp.inputHelperText.typographyLineHeight,
  },
  description: {
    color: theme.comp.inputLabel.descriptionColorText,
    fontFamily: theme.comp.inputLabel.descriptionTypographyFontFamily,
    fontSize: theme.comp.inputLabel.descriptionTypographyFontSize,
    fontWeight: theme.comp.inputLabel.descriptionTypographyFontWeight,
    letterSpacing: theme.comp.inputLabel.descriptionTypographyLetterSpacing,
    lineHeight: theme.comp.inputLabel.descriptionTypographyLineHeight,
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
  },
  topLabels: {
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'column',
  },
  required: {
    color: theme.comp.inputLabel.requiredColorText,
    fontFamily: theme.comp.inputLabel.typographyFontFamily,
    fontSize: theme.comp.inputLabel.typographyFontSize,
    fontWeight: theme.comp.inputLabel.typographyFontWeight,
    letterSpacing: theme.comp.inputLabel.typographyLetterSpacing,
    lineHeight: theme.comp.inputLabel.typographyLineHeight,
    marginRight: 4,
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
}) => {
  const classesMap = useClassList(useStyles(), classes)

  return (
    <>
      {(label || description) && (
        <div className={classesMap.topLabelsWrapper}>
          {required && label && <div className={classesMap.required}>*</div>}
          {label && (
            <div className={classesMap.topLabels}>
              <InputLabel
                {...labelProps}
                disabled={labelProps?.disabled || disabled}
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
          error={helperTextProps?.error || error}
          disabled={helperTextProps?.disabled || disabled}
          classes={{
            ...helperTextProps?.classes,
            helperText: clsx(
              { [classesMap.helperTextMinHeight]: keepHelperTextMinHeight },
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
