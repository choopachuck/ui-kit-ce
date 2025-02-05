'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useMergedRefs, useClassList, useSafetyValue } from '@v-uik/hooks'
import type { Classes } from './interfaces'
import {
  ElementSize,
  ElementSizeType,
  ComponentPropsWithRefFix,
} from '@v-uik/common'
import { getTextLength } from '@v-uik/utils'
import { Labelled, LabelledProps } from '@v-uik/labelled'

type TextareaAttributesWithRef =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> &
    React.RefAttributes<HTMLTextAreaElement>

export interface TextareaProps<
  InnerProps extends TextareaAttributesWithRef = TextareaAttributesWithRef
> extends Omit<ComponentPropsWithRefFix<'div'>, 'onChange'>,
    Omit<LabelledProps, 'children' | 'classes'> {
  /**
   * Список классов
   */
  classes?: Partial<Classes>
  /**
   * Список классов для компонента Labelled
   */
  labelledClasses?: LabelledProps['classes']
  /**
   * HTML-атрибуты элемента textarea
   */
  textareaProps?: InnerProps
  /**
   * Ссылка на нативный элемент textarea
   */
  textareaRef?:
    | React.RefCallback<HTMLTextAreaElement>
    | React.MutableRefObject<HTMLTextAreaElement | null>
    | null
  /**
   * Количество строк
   */
  rows?: number
  /**
   * Растянуть компонент на всю ширину контейнера
   */
  fullWidth?: boolean
  /**
   * Поле содержит ошибку
   */
  error?: boolean
  /**
   * Возможность изменения размера поля пользователем
   */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
  /**
   * Размер поля
   */
  size?: ElementSizeType
  /**
   * Поле заблокировано для ввода
   */
  disabled?: boolean
  /**
   * Подсказка внутри поля, если не введен текст
   */
  placeholder?: string
  /**
   * Значение поля
   */
  value?: React.ReactText | null
  /**
   * Обработчик события изменения значения поля
   */
  onChange?: (
    value: string,
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void
  /**
   * Этот объект включает в себя кастомный компонент Textarea, передайте сюда сторонний/свой компонент для перезаписи,
   *
   * Интерфейс свойств передаваемого компонента необходимо передать в основной компонент Textarea, который может принимать тип,
   *
   * Если вы хотите изменить только стиль компонента, мы рекомендуем использовать свойство `classes` или токены темы
   */
  components?: {
    Textarea: React.ForwardRefExoticComponent<InnerProps>
  }
  /**
   * Показывать ли счетчик введенных символов
   */
  showCount?: boolean
}

export type TextareaComponent = <
  InnerProps extends TextareaAttributesWithRef = TextareaAttributesWithRef
>(
  props: TextareaProps<InnerProps>
) => JSX.Element

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  fullWidth: {
    width: '100%',
    '& $textareaContainer': {
      width: '100%',
    },
  },

  textareaContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: 0,
    borderTopLeftRadius: theme.comp.textarea.shapeBorderRadiusTopLeft,
    borderTopRightRadius: theme.comp.textarea.shapeBorderRadiusTopRight,
    borderBottomLeftRadius: theme.comp.textarea.shapeBorderRadiusBottomLeft,
    borderBottomRightRadius: theme.comp.textarea.shapeBorderRadiusBottomRight,
    backgroundColor: theme.comp.textarea.colorBackground,

    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      borderRadius: 'inherit',
      borderColor: theme.comp.textarea.colorBorder,
      borderStyle: theme.shape.borderStyle,
      borderWidth: theme.shape.borderWidth,
    },

    '&$textareaContainerDisabled': {
      cursor: 'not-allowed',
      backgroundColor: theme.comp.textarea.colorBackgroundDisabled,

      '&::after': {
        borderColor: theme.comp.textarea.colorBorderDisabled,
      },
    },

    '&:not($textareaContainerDisabled)': {
      '&:hover': {
        '&::after': {
          borderColor: theme.comp.textarea.colorBorderHover,
        },
      },

      '&$textareaContainerFocused': {
        boxShadow: `0 0 0 2px ${theme.comp.textarea.colorShadowFocus}`,

        '&::after': {
          borderWidth: 0,
        },
      },

      '&$textareaContainerError': {
        backgroundColor: theme.comp.textarea.colorBackgroundError,

        '&::after': {
          borderColor: theme.comp.textarea.colorBorderError,
        },
      },
    },
  },

  textareaContainerFocused: {},

  textareaContainerDisabled: {},

  textareaContainerError: {},

  textarea: {
    zIndex: 2,
    width: '100%',
    margin: 0,
    padding: [8, 16],
    outline: 0,
    border: 0,
    boxShadow: 'none',
    color: theme.comp.textarea.colorText,
    backgroundColor: 'transparent',
    fontFamily: theme.comp.textarea.typographyFontFamily,
    letterSpacing: theme.comp.textarea.typographyLetterSpacing,
    fontWeight: theme.comp.textarea.typographyFontWeight,

    '&::placeholder': {
      color: theme.comp.textarea.placeholderColorText,
    },

    '&:disabled': {
      color: theme.comp.textarea.colorTextDisabled,

      '&::placeholder': {
        color: theme.comp.textarea.placeholderColorTextDisabled,
      },
    },

    '&:focus': {
      outline: 0,
    },
  },

  resizeNone: {
    resize: 'none',
  },
  resizeBoth: {
    resize: 'both',
  },
  resizeHorizontal: {
    resize: 'horizontal',
  },
  resizeVertical: {
    resize: 'vertical',
  },

  textareaSmall: {
    fontSize:
      theme.comp.textarea.typographyFontSizeSm ||
      theme.comp.textarea.typographyFontSize,
    lineHeight:
      theme.comp.textarea.typographyLineHeightSm ||
      theme.comp.textarea.typographyLineHeight,
  },

  textareaMedium: {
    fontSize:
      theme.comp.textarea.typographyFontSizeMd ||
      theme.comp.textarea.typographyFontSize,
    lineHeight:
      theme.comp.textarea.typographyLineHeightMd ||
      theme.comp.textarea.typographyLineHeight,
  },

  textareaLarge: {
    fontSize:
      theme.comp.textarea.typographyFontSizeLg ||
      theme.comp.textarea.typographyFontSize,
    lineHeight:
      theme.comp.textarea.typographyLineHeightLg ||
      theme.comp.textarea.typographyLineHeight,
  },
}))

export const Textarea = React.forwardRef(
  <InnerProps extends TextareaAttributesWithRef>(
    {
      classes,
      className,
      label,
      labelProps,
      value: rawValue,
      onChange,
      placeholder,
      textareaProps,
      textareaRef: textareaRefProp = null,
      helperText,
      helperTextProps,
      fullWidth,
      disabled,
      error,
      size = ElementSize.md,
      resize = 'none',
      rows = 3,
      components,
      showCount,
      description,
      labelledClasses,
      keepHelperTextMinHeight,
      required,
      ...rest
    }: TextareaProps<InnerProps>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const [focused, setFocused] = React.useState(false)
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    const mergedTextAreaRef = useMergedRefs([textareaRefProp, textareaRef])

    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const containerClassName = clsx(classesMap.container, className, {
      [classesMap.fullWidth]: fullWidth,
      [classesMap?.disabled ?? '']: disabled,
      [classesMap?.error ?? '']: error,
      [classesMap?.focused ?? '']: focused,
    })
    const textareaContainerClassName = clsx(classesMap.textareaContainer, {
      [classesMap.textareaContainerFocused]: focused,
      [classesMap.textareaContainerDisabled]: disabled,
      [classesMap.textareaContainerError]: error,
    })
    const textareaClassName = clsx(classesMap.textarea, {
      [classesMap?.textareaSmall ?? '']: size === ElementSize.sm,
      [classesMap?.textareaMedium ?? '']: size === ElementSize.md,
      [classesMap?.textareaLarge ?? '']: size === ElementSize.lg,
      [classesMap?.resizeNone]: resize === 'none',
      [classesMap?.resizeBoth]: resize === 'both',
      [classesMap?.resizeHorizontal]: resize === 'horizontal',
      [classesMap?.resizeVertical]: resize === 'vertical',
    })

    const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(true)
      if (textareaProps && textareaProps.onFocus) {
        textareaProps.onFocus(event)
      }
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(event.target.value, event)
    }

    const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(false)
      if (textareaProps && textareaProps.onBlur) {
        textareaProps.onBlur(event)
      }
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (textareaRef.current && event.currentTarget === event.target) {
        textareaRef.current.focus()
      }
    }

    const safetyValue = useSafetyValue(rawValue)

    const innerProps = {
      ref: mergedTextAreaRef,
      rows,
      className: textareaClassName,
      disabled,
      placeholder,
      value: safetyValue,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      ...textareaProps,
    }

    const TextareaComp = components?.Textarea ?? 'textarea'

    const labelSuffix = React.useMemo(() => {
      return showCount
        ? getTextLength(safetyValue, textareaProps?.maxLength)
        : undefined
    }, [showCount, safetyValue, textareaProps?.maxLength])

    return (
      <div {...rest} ref={ref} className={containerClassName}>
        <Labelled
          size={size}
          classes={labelledClasses}
          label={label || showCount}
          helperText={helperText}
          description={description}
          keepHelperTextMinHeight={keepHelperTextMinHeight}
          required={required}
          disabled={disabled}
          labelProps={{
            ...labelProps,
            suffix: labelSuffix,
          }}
          error={error}
          helperTextProps={helperTextProps}
        >
          <div className={textareaContainerClassName} onClick={handleClick}>
            <TextareaComp {...(innerProps as InnerProps)} />
          </div>
        </Labelled>
      </div>
    )
  }
) as TextareaComponent
