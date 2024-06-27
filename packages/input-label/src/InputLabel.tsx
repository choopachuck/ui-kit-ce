'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { Tooltip, TooltipProps } from '@v-uik/tooltip'
import { ElementSizeType, ElementSize } from '@v-uik/common'
import { InfoIcon } from './icons'

export type Classes = {
  /** Стиль, применяемый к основному элементу */
  label?: string
  /** Стиль, применяемый к элементу `span` */
  text?: string
  /** Стиль, применяемый к элементу `span` с `size='sm'` */
  textSmall?: string
  /** Стиль, применяемый к элементу `span` с `size='md'` */
  textMedium?: string
  /** Стиль, применяемый к элементу `span` с `size='lg'` */
  textLarge?: string
  /** Стиль, применяемый к элементу с `disabled='true'` */
  disabled?: string
  /** Стиль, применяемый к элементу иконки в Tooltip */
  tooltipIcon?: string
  /** Стиль, применяемый к контейнеру suffix */
  suffix?: string
  /** Стиль, применяемый к контейнеру suffix с `size='sm'` */
  suffixSmall?: string
  /** Стиль, применяемый к контейнеру suffix с `size='md'` */
  suffixMedium?: string
  /** Стиль, применяемый к контейнеру suffix с `size='lg'` */
  suffixLarge?: string
}

export interface InputLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Список классов
   */
  classes?: Partial<Classes>
  /**
   * Применить стили для disabled состояния
   */
  disabled?: boolean
  /**
   * Текст всплывающей подсказки подписи
   */
  tooltipText?: React.ReactNode
  /**
   * Свойства компонента Tooltip
   */
  tooltipProps?: Omit<TooltipProps, 'children'>
  /**
   * Вспомогательный элемент после текста
   */
  suffix?: React.ReactNode
  /**
   * Размер надписи
   */
  size?: ElementSizeType
}

const useStyles = createUseStyles((theme) => ({
  label: {
    display: 'inline-flex',
    alignItems: 'center',
    color: theme.comp.inputLabel.colorText,
    cursor: 'default',
    marginBottom: 8,
    width: 'inherit',
    '&$hasSuffix': {
      width: '100%',
    },

    '&$disabled': {
      color: theme.comp.inputLabel.colorTextDisabled,
    },
  },

  text: {
    fontFamily: theme.comp.inputLabel.typographyFontFamily,
    fontWeight: theme.comp.inputLabel.typographyFontWeight,
    letterSpacing: theme.comp.inputLabel.typographyLetterSpacing,
  },

  textSmall: {
    fontSize:
      theme.comp.inputLabel.typographyFontSizeSm ||
      theme.comp.inputLabel.typographyFontSize,
    lineHeight:
      theme.comp.inputLabel.typographyLineHeightSm ||
      theme.comp.inputLabel.typographyLineHeight,
  },

  textMedium: {
    fontSize:
      theme.comp.inputLabel.typographyFontSizeMd ||
      theme.comp.inputLabel.typographyFontSize,
    lineHeight:
      theme.comp.inputLabel.typographyLineHeightMd ||
      theme.comp.inputLabel.typographyLineHeight,
  },

  textLarge: {
    fontSize:
      theme.comp.inputLabel.typographyFontSizeLg ||
      theme.comp.inputLabel.typographyFontSize,
    lineHeight:
      theme.comp.inputLabel.typographyLineHeightLg ||
      theme.comp.inputLabel.typographyLineHeight,
  },

  disabled: {},

  labelPointer: {}, //TODO: удалить в 2.0

  tooltipIcon: {
    flexShrink: 0,
    marginLeft: 4,
  },

  suffix: {
    fontFamily: theme.comp.inputLabel.typographyFontFamily,
    fontWeight: theme.comp.inputLabel.typographyFontWeight,
    letterSpacing: theme.comp.inputLabel.typographyLetterSpacing,
    marginLeft: 'auto',
  },

  suffixSmall: {
    fontSize:
      theme.comp.inputLabel.typographyFontSizeSm ||
      theme.comp.inputLabel.typographyFontSize,
    lineHeight:
      theme.comp.inputLabel.typographyLineHeightSm ||
      theme.comp.inputLabel.typographyLineHeight,
  },

  suffixMedium: {
    fontSize:
      theme.comp.inputLabel.typographyFontSizeMd ||
      theme.comp.inputLabel.typographyFontSize,
    lineHeight:
      theme.comp.inputLabel.typographyLineHeightMd ||
      theme.comp.inputLabel.typographyLineHeight,
  },

  suffixLarge: {
    fontSize:
      theme.comp.inputLabel.typographyFontSizeLg ||
      theme.comp.inputLabel.typographyFontSize,
    lineHeight:
      theme.comp.inputLabel.typographyLineHeightLg ||
      theme.comp.inputLabel.typographyLineHeight,
  },

  hasSuffix: {},

  tooltip: {
    paddingLeft: 4,
  },
}))

export const InputLabel = React.forwardRef(
  (
    {
      classes,
      className: classNameProp,
      disabled,
      htmlFor,
      tooltipText,
      tooltipProps,
      suffix,
      children,
      size = ElementSize.md,
      ...rest
    }: InputLabelProps,
    ref: React.Ref<HTMLLabelElement>
  ) => {
    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const isSmall = size === ElementSize.sm
    const isMedium = size === ElementSize.md
    const isLarge = size === ElementSize.lg

    const className = clsx(classesMap.label, classNameProp, {
      [classesMap.disabled]: disabled,
      [classesMap.labelPointer]: htmlFor,
      [classesMap.hasSuffix]: !!suffix,
    })
    const textClassName = clsx(classesMap.text, {
      [classesMap.textSmall]: isSmall,
      [classesMap.textMedium]: isMedium,
      [classesMap.textLarge]: isLarge,
    })
    const suffixClassName = clsx(classesMap.suffix, {
      [classesMap.suffixSmall]: isSmall,
      [classesMap.suffixMedium]: isMedium,
      [classesMap.suffixLarge]: isLarge,
    })

    return (
      <label {...rest} ref={ref} htmlFor={htmlFor} className={className}>
        <span className={textClassName}>{children}</span>
        {tooltipText && (
          <Tooltip
            {...tooltipProps}
            className={clsx(classesList.tooltip, tooltipProps?.className)}
            dropdownProps={{
              placement: 'top-start',
              ...tooltipProps?.dropdownProps,
              content: tooltipText,
            }}
          >
            <InfoIcon
              width={16}
              height={16}
              className={classesMap.tooltipIcon}
              fill="#282828"
            />
          </Tooltip>
        )}
        {suffix && <div className={suffixClassName}>{suffix}</div>}
      </label>
    )
  }
)
