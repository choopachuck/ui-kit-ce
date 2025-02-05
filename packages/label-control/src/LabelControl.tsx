'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import {
  ElementSize,
  ElementSizeType,
  ComponentPropsWithRefFix,
} from '@v-uik/common'
import { Classes } from './classes'

const useStyles = createUseStyles((theme) => ({
  label: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    verticalAlign: 'middle',
  },

  end: {
    flexDirection: 'row-reverse',
    '& $labelContent': {
      marginLeft: 8,
    },
  },

  top: {
    flexDirection: 'column',
    '& $labelContent': {
      marginBottom: 4,
    },
  },

  bottom: {
    flexDirection: 'column-reverse',
    '& $labelContent': {
      marginTop: 4,
    },
  },

  start: {
    flexDirection: 'row',
    '& $labelContent': {
      marginRight: 8,
    },
  },

  disabled: {
    cursor: 'default',
    pointerEvents: 'none',

    '& $labelContent': {
      color: theme.comp.labelControl.colorTextDisabled,
    },
  },

  labelContent: {
    color: theme.comp.labelControl.colorText,
    fontFamily: theme.comp.labelControl.typographyFontFamilyMd,
    fontWeight: theme.comp.labelControl.typographyFontWeightMd,
    fontSize: theme.comp.labelControl.typographyFontSizeMd,
    lineHeight: theme.comp.labelControl.typographyLineHeightMd,
    letterSpacing: theme.comp.labelControl.typographyLetterSpacingMd,
  },

  labelSmall: {
    fontFamily: theme.comp.labelControl.typographyFontFamilySm,
    fontWeight: theme.comp.labelControl.typographyFontWeightSm,
    fontSize: theme.comp.labelControl.typographyFontSizeSm,
    lineHeight: theme.comp.labelControl.typographyLineHeightSm,
    letterSpacing: theme.comp.labelControl.typographyLetterSpacingSm,
  },
  labelMedium: {
    fontFamily: theme.comp.labelControl.typographyFontFamilyMd,
    fontWeight: theme.comp.labelControl.typographyFontWeightMd,
    fontSize: theme.comp.labelControl.typographyFontSizeMd,
    lineHeight: theme.comp.labelControl.typographyLineHeightMd,
    letterSpacing: theme.comp.labelControl.typographyLetterSpacingMd,
  },
  labelLarge: {
    fontFamily: theme.comp.labelControl.typographyFontFamilyLg,
    fontWeight: theme.comp.labelControl.typographyFontWeightLg,
    fontSize: theme.comp.labelControl.typographyFontSizeLg,
    lineHeight: theme.comp.labelControl.typographyLineHeightLg,
    letterSpacing: theme.comp.labelControl.typographyLetterSpacingLg,
  },
}))

export interface LabelControlProps
  extends Omit<ComponentPropsWithRefFix<'label'>, 'onChange'> {
  /**
   * CSS классы компонента
   */
  classes?: Partial<Classes>
  /**
   * Значение поля
   */
  checked?: boolean
  /**
   * Размер заголовка и контролла
   */
  size?: ElementSizeType
  /**
   * Контролл, который будет выводиться вместе с меткой Radio, CheckBox или Switch
   */
  control: React.ReactElement
  /**
   * Элемент отключен
   */
  disabled?: boolean
  /**
   * Обработчик, вызываемый при изменении состояния
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * Свойства элемента input
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  /**
   * Текст, который будет использоваться рядом с меткой
   */
  label: React.ReactNode
  /**
   * Расположение лейбла относительно контролла
   */
  labelPlacement?: 'bottom' | 'end' | 'start' | 'top'
  /**
   * value компонента
   */
  value?: React.ReactText
  /**
   * Атрибут name элемента input
   */
  name?: string
}

export const LabelControl = React.forwardRef(
  (
    {
      classes,
      className: classNameProps,
      checked,
      control,
      disabled,
      size = 'md',
      onChange,
      inputProps,
      label,
      value,
      name,
      labelPlacement = 'end',
      ...rest
    }: LabelControlProps,
    ref: React.Ref<HTMLLabelElement>
  ) => {
    const classList = useStyles()
    const classesMap = useClassList(classList, classes)
    const className = clsx(classesMap.label, classNameProps, {
      [classesMap.disabled]: disabled,
      [classesMap.start]: labelPlacement === 'start',
      [classesMap.top]: labelPlacement === 'top',
      [classesMap.bottom]: labelPlacement === 'bottom',
      [classesMap.end]: labelPlacement === 'end',
    })
    const contentClassName = clsx(classesMap.labelContent, {
      [classesMap.labelSmall]: size === ElementSize.sm,
      [classesMap.labelMedium]: size === ElementSize.md,
      [classesMap.labelLarge]: size === ElementSize.lg,
    })

    return (
      <label {...rest} ref={ref} className={className}>
        <span className={contentClassName}>{label}</span>
        {React.cloneElement(control, {
          disabled,
          inputProps,
          checked,
          onChange,
          size,
          value,
          name,
        })}
      </label>
    )
  }
)
