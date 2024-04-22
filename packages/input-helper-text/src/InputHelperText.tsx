'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import {
  ElementSizeType,
  ElementSize,
  ComponentPropsWithRefFix,
} from '@v-uik/common'

export type Classes = {
  /** Стиль, применяемый к основному элементу */
  helperText?: string
  /** Стиль, применяемый к основному элементу с `size='sm'` */
  helperTextSmall?: string
  /** Стиль, применяемый к основному элементу с `size='md'` */
  helperTextMedium?: string
  /** Стиль, применяемый к основному элементу с `size='lg'` */
  helperTextLarge?: string
  /** Стиль, применяемый к элементу с `disabled='true'` */
  disabled?: string
  /** Стиль, применяемый к элементу с `error='true'` */
  error?: string
}

export interface InputHelperTextProps
  extends Omit<ComponentPropsWithRefFix<'div'>, 'ref'> {
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
  /**
   * Размер подписи
   */
  size?: ElementSizeType
}

const useStyles = createUseStyles((theme) => ({
  helperText: {
    color: theme.comp.inputHelperText.colorText,
    cursor: 'default',
    marginTop: 4,
    fontFamily: theme.comp.inputHelperText.typographyFontFamily,
    fontWeight: theme.comp.inputHelperText.typographyFontWeight,
    letterSpacing: theme.comp.inputHelperText.typographyLetterSpacing,

    '&$disabled': {
      color: theme.comp.inputHelperText.colorTextDisabled,
    },
  },

  helperTextSmall: {
    fontSize:
      theme.comp.inputHelperText.typographyFontSizeSm ||
      theme.comp.inputHelperText.typographyFontSize,
    lineHeight:
      theme.comp.inputHelperText.typographyLineHeightSm ||
      theme.comp.inputHelperText.typographyLineHeight,
  },

  helperTextMedium: {
    fontSize:
      theme.comp.inputHelperText.typographyFontSizeMd ||
      theme.comp.inputHelperText.typographyFontSize,
    lineHeight:
      theme.comp.inputHelperText.typographyLineHeightMd ||
      theme.comp.inputHelperText.typographyLineHeight,
  },

  helperTextLarge: {
    fontSize:
      theme.comp.inputHelperText.typographyFontSizeLg ||
      theme.comp.inputHelperText.typographyFontSize,
    lineHeight:
      theme.comp.inputHelperText.typographyLineHeightLg ||
      theme.comp.inputHelperText.typographyLineHeight,
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
      size = ElementSize.md,
      ...rest
    }: InputHelperTextProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const className = clsx(classesMap.helperText, classNameProp, {
      [classesMap.disabled]: disabled,
      [classesMap.error]: error,
      [classesMap.helperTextSmall]: size === ElementSize.sm,
      [classesMap.helperTextMedium]: size === ElementSize.md,
      [classesMap.helperTextLarge]: size === ElementSize.lg,
    })

    return (
      <div {...rest} ref={ref} className={className}>
        {children}
      </div>
    )
  }
)
