'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { Tooltip, TooltipProps } from '@v-uik/tooltip'
import { InfoIcon } from './icons'

export type Classes = {
  /** Стиль, применяемый к основному элементу */
  label?: string
  /** Стиль, применяемый к элементу с `disabled='true'` */
  disabled?: string
  /** Стиль, применяемый к элементу иконки в Tooltip */
  tooltipIcon?: string
  /** Стиль, применяемый к контейнеру suffix */
  suffix?: string
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
    fontSize: theme.comp.inputLabel.typographyFontSize,
    lineHeight: theme.comp.inputLabel.typographyLineHeight,
    letterSpacing: theme.comp.inputLabel.typographyLetterSpacing,
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
    fontSize: theme.comp.inputLabel.typographyFontSize,
    lineHeight: theme.comp.inputLabel.typographyLineHeight,
    letterSpacing: theme.comp.inputLabel.typographyLetterSpacing,
    marginLeft: 'auto',
  },

  hasSuffix: {},
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
      ...rest
    }: InputLabelProps,
    ref: React.Ref<HTMLLabelElement>
  ) => {
    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const className = clsx(classesMap.label, classNameProp, {
      [classesMap.disabled]: disabled,
      [classesMap.labelPointer]: htmlFor,
      [classesMap.hasSuffix]: !!suffix,
    })

    return (
      <label {...rest} ref={ref} htmlFor={htmlFor} className={className}>
        <span className={classesMap.text}>{children}</span>
        {tooltipText && (
          <Tooltip
            {...tooltipProps}
            style={{
              display: 'inline',
              verticalAlign: 'top',
              paddingLeft: 4,
            }}
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
        {suffix && <div className={classesMap.suffix}>{suffix}</div>}
      </label>
    )
  }
)
