'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'

export type Classes = {
  /** Стиль, применяемый к основному элементу */
  helperText?: string
  /** Стиль, применяемый к элементу с `disabled='true'` */
  disabled?: string
  /** Стиль, применяемый к элементу с `error='true'` */
  error?: string
}

export interface InputHelperTextProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Список классов
   */
  classes?: Partial<Classes>
  /**
   * Применить стили для disabled состояния
   */
  disabled?: boolean
  /**
   * Применить стили для error состояния
   */
  error?: boolean
}

const useStyles = createUseStyles((theme) => ({
  helperText: {
    color: theme.comp.inputHelperText.colorText,
    cursor: 'default',
    marginTop: 4,
    fontFamily: theme.comp.inputHelperText.typographyFontFamily,
    fontWeight: theme.comp.inputHelperText.typographyFontWeight,
    fontSize: theme.comp.inputHelperText.typographyFontSize,
    lineHeight: theme.comp.inputHelperText.typographyLineHeight,
    letterSpacing: theme.comp.inputHelperText.typographyLetterSpacing,

    '&$disabled': {
      color: theme.comp.inputHelperText.colorTextDisabled,
    },
  },

  disabled: {},

  error: {
    color: theme.comp.inputHelperText.colorTextError,
  },
}))

export const InputHelperText = React.forwardRef(
  (
    {
      classes,
      className: classNameProp,
      disabled,
      error,
      children,
      ...rest
    }: InputHelperTextProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const className = clsx(classesMap.helperText, classNameProp, {
      [classesMap.disabled]: disabled,
      [classesMap.error]: error,
    })

    return (
      <div {...rest} ref={ref} className={className}>
        {children}
      </div>
    )
  }
)
