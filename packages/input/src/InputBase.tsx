'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import {
  ElementSize,
  ElementSizeType,
  ClearButton,
  ClearButtonProps,
} from '@v-uik/common'
import { Tooltip, TooltipProps } from '@v-uik/tooltip'
import { useMergedRefs, useClassList } from '@v-uik/hooks'
import { InputAffix, InputAffixType } from './InputAffix'
import { ErrorIcon } from './assets/ErrorIcon'

type Classes = {
  /** Стиль, применяемый к основному элементу */
  root?: string
  /** Стиль, применяемый к элементу ввода */
  input?: string
  /** Стиль, применяемый с `error='true'` */
  error?: string
  /** Стиль, применяемый с `disabled='true'` */
  disabled?: string
  /** Стиль, применяемый к элементу в момент фокуса */
  focused?: string
  /** Стиль, применяемый к элементу с `size='sm` */
  small?: string
  /** Стиль, применяемый к элементу с `size='lg` */
  large?: string
  /** Стиль, применяемый к элементу префикса */
  prefix?: string
  /** Стиль, применяемый к элементу суффикса */
  suffix?: string
  /** Стиль, применяемый к иконке ошибки */
  errorIcon?: string
  /** Стиль, применяемый к контейнеру кнопки очистки поля  */
  inputClear?: string
} & Partial<ClearButtonProps['classes']>

export type InputChangeReason = 'input' | 'clear'

export type InputChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.MouseEvent<HTMLDivElement>

export interface InputBaseProps<TCanClear extends boolean = boolean>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'prefix' | 'onChange'> {
  /**
   * Список классов
   */
  classes?: Partial<Classes>
  /**
   * HTML-атрибуты элемента input
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  /**
   * Ссылка на нативный элемент input
   */
  inputRef?:
    | React.RefCallback<HTMLInputElement>
    | React.MutableRefObject<HTMLInputElement | null>
    | null
  /**
   * Растянуть компонент на всю ширину контейнера
   */
  fullWidth?: boolean
  /**
   * Поле содержит ошибку
   */
  error?: boolean
  /**
   * Размер поля
   */
  size?: ElementSizeType
  /**
   * Вспомогательный элемент перед полем ввода
   */
  prefix?: React.ReactNode
  /**
   * Вспомогательный элемент после поля ввода
   */
  suffix?: React.ReactNode
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
  value?: React.ReactText
  /**
   * Можно ли очищать всё поле
   */
  canClear?: TCanClear | boolean
  /**
   * Обработчик события изменения значения поля. <br/>
   *
   * @param `value` измененное значение. <br/>
   * @param `event` - инициатор события из обработчика. Имеет или тип `React.ChangeEvent<HTMLInputElement>`, если флаг `canClear` равен `false` <br/>
   * или тип `InputChangeReason`, если флаг `canClear` равен `true` <br/>
   * @param `reason` тип изменения значения поля: `input` - пользовательский ввод, `clear` - очищение поля с помощью кнопки очистки
   */
  onChange?: TCanClear extends true
    ? (
        value: string,
        event: InputChangeEvent,
        reason?: InputChangeReason
      ) => void
    : (
        value: string,
        event: React.ChangeEvent<HTMLInputElement>,
        reason?: InputChangeReason
      ) => void
  /**
   * Показать дополнительную иконку ошибки
   */
  showErrorIcon?: boolean
  /**
   * Свойства компонента Tooltip для иконки ошибки
   */
  errorIconTooltipProps?: Omit<TooltipProps, 'children'>
  /**
   * Обработчик изменения фокуса
   */
  onFocusChange?: (focused: boolean) => void
  /**
   * Иконка для кнопки очистки поля
   */
  clearIcon?: React.ReactNode
  /**
   * Обработчик нажатия на кнопку очистки поля
   */
  onClear?: () => void
  /**
   * HTML-атрибуты для кнопки очистки поля
   */
  clearButtonInnerProps?: ClearButtonProps['innerProps']
}

const useStyles = createUseStyles((theme) => ({
  root: {
    // TODO после добавления cypress'a надо написать на это дело тесты
    width: 288,
    //----------------------------------------------------------------
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    position: 'relative',
    paddingLeft: 16,
    paddingRight: 16,
    color: theme.comp.input.colorText,
    borderTopLeftRadius: theme.comp.input.shapeBorderRadiusTopLeftMd,
    borderTopRightRadius: theme.comp.input.shapeBorderRadiusTopRightMd,
    borderBottomLeftRadius: theme.comp.input.shapeBorderRadiusBottomLeftMd,
    borderBottomRightRadius: theme.comp.input.shapeBorderRadiusBottomRightMd,
    backgroundColor: theme.comp.input.colorBackground,
    cursor: 'text',

    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      borderRadius: 'inherit',
      borderColor: theme.comp.input.colorBorder,
      borderStyle: theme.shape.borderStyle,
      borderWidth: theme.shape.borderWidth,
    },

    '&$fullWidth': {
      width: '100%',
    },

    '&$disabled': {
      cursor: 'not-allowed',
      backgroundColor: theme.comp.input.colorBackgroundDisabled,

      '&::after': {
        borderColor: theme.comp.input.colorBorderDisabled,
      },
    },

    '&:not($disabled)': {
      '&:hover': {
        '&::after': {
          borderColor: theme.comp.input.colorBorderHover,
        },
      },

      '&$error': {
        '&::after': {
          borderColor: theme.comp.input.colorBorderError,
        },
      },
    },
  },

  fullWidth: {},

  focused: {
    boxShadow: `0 0 0 2px ${theme.comp.input.colorShadowFocus}`,

    '&::after': {
      borderWidth: 0,
    },
  },

  disabled: {
    color: theme.comp.input.colorTextDisabled,
  },

  error: {},

  small: {
    borderTopLeftRadius: theme.comp.input.shapeBorderRadiusTopLeftSm,
    borderTopRightRadius: theme.comp.input.shapeBorderRadiusTopRightSm,
    borderBottomLeftRadius: theme.comp.input.shapeBorderRadiusBottomLeftSm,
    borderBottomRightRadius: theme.comp.input.shapeBorderRadiusBottomRightSm,

    '& $input': {
      marginTop: 4,
      marginBottom: 4,
    },

    '& $prefix': {
      '& svg': {
        width: 16,
        height: 16,
      },
    },

    '& $suffix': {
      '& svg': {
        width: 16,
        height: 16,
      },
    },

    '& $errorIcon': {
      '& svg': {
        width: 16,
        height: 16,
      },
    },
  },

  large: {
    borderTopLeftRadius: theme.comp.input.shapeBorderRadiusTopLeftLg,
    borderTopRightRadius: theme.comp.input.shapeBorderRadiusTopRightLg,
    borderBottomLeftRadius: theme.comp.input.shapeBorderRadiusBottomLeftLg,
    borderBottomRightRadius: theme.comp.input.shapeBorderRadiusBottomRightLg,

    '& $input': {
      marginTop: 12,
      marginBottom: 12,
    },
  },

  input: {
    width: '100%',
    minHeight: 24,
    boxSizing: 'border-box',
    padding: 0,
    margin: [8, 0],
    outline: 0,
    border: 0,
    boxShadow: 'none',
    zIndex: 2,
    color: 'inherit',
    backgroundColor: 'transparent',

    fontFamily: theme.comp.input.typographyFontFamily,
    fontWeight: theme.comp.input.typographyFontWeight,
    fontSize: theme.comp.input.typographyFontSize,
    lineHeight: theme.comp.input.typographyLineHeight,
    letterSpacing: theme.comp.input.typographyLetterSpacing,
    textOverflow: 'ellipsis',

    '&:-webkit-autofill': {
      // в autofill можно только так переопределить фон,
      // хак взят отсюда https://css-tricks.com/snippets/css/change-autocomplete-styles-webkit-browsers/
      boxShadow: 'none',
      transition: 'background-color 5000s ease-in-out 0s',
      background: 'transparent',
      color: `${theme.comp.input.colorText} !important`,
    },

    '&::placeholder': {
      color: theme.comp.input.placeholderColorText,
    },

    '&:disabled': {
      cursor: 'not-allowed',
      '&:-webkit-autofill': {
        color: `${theme.comp.input.colorTextDisabled} !important`,
      },

      '&::placeholder': {
        color: theme.comp.input.placeholderColorTextDisabled,
      },
    },

    '&:focus': {
      outline: 0,
    },
  },

  prefix: {
    zIndex: 2,
  },

  suffix: {
    zIndex: 2,
  },

  errorIcon: {
    display: 'flex',
    marginLeft: 8,
    color: theme.comp.input.alertIconColorText,
    zIndex: 2,
  },

  inputClear: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'stretch',
    flexShrink: 0,
    zIndex: 2,
  },
}))

const _InputBase = React.forwardRef(
  <TCanClear extends boolean = boolean>(
    {
      classes,
      className: classNameProp,
      onClick,
      value,
      onChange,
      placeholder,
      inputProps,
      inputRef: inputRefProp = null,
      fullWidth,
      disabled,
      error,
      size = ElementSize.md,
      prefix,
      suffix,
      showErrorIcon = true,
      errorIconTooltipProps,
      onFocusChange,
      clearIcon,
      onClear,
      canClear = false,
      clearButtonInnerProps,
      ...rest
    }: InputBaseProps<TCanClear>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const [focused, setFocused] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const mergedInputRef = useMergedRefs([inputRefProp, inputRef])

    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const className = clsx(classNameProp, classesMap.root, {
      [classesMap.focused]: !disabled && focused,
      [classesMap.disabled]: disabled,
      [classesMap.error]: error,
      [classesMap.small]: size === ElementSize.sm,
      [classesMap.large]: size === ElementSize.lg,
      [classesMap.fullWidth]: fullWidth,
    })

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true)
      onFocusChange?.(true)
      inputProps?.onFocus?.(event)
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false)
      onFocusChange?.(false)
      inputProps?.onBlur?.(event)
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(event)
      if (inputRef.current && event.currentTarget === event.target) {
        inputRef.current.focus()
      }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.value, event, 'input')
    }

    const handleClear = (event: InputChangeEvent) => {
      const _onChange = onChange as (
        value: string,
        event: InputChangeEvent,
        reason?: InputChangeReason
      ) => void
      _onChange?.('', event, 'clear')
      onClear?.()
    }

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
      handleClear(event)
      clearButtonInnerProps?.onMouseDown?.(event)
    }

    const errorIcon = (
      <div className={classesMap.errorIcon}>
        <ErrorIcon />
      </div>
    )

    return (
      <div {...rest} ref={ref} className={className} onClick={handleClick}>
        {prefix && (
          <InputAffix
            className={classesMap.prefix}
            type={InputAffixType.prefix}
            disabled={disabled}
          >
            {prefix}
          </InputAffix>
        )}

        <input
          {...inputProps}
          ref={mergedInputRef}
          className={classesMap.input}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {value && canClear && (
          <div
            ref={ref}
            className={classesMap?.inputClear}
            aria-disabled={disabled}
          >
            <ClearButton
              disabled={disabled}
              classes={{
                clearButton: classesMap?.clearButton,
              }}
              size={size}
              innerProps={{
                ...clearButtonInnerProps,
                onMouseDown: handleMouseDown,
              }}
              clearIcon={clearIcon}
            />
          </div>
        )}

        {showErrorIcon &&
          error &&
          (errorIconTooltipProps ? (
            <Tooltip single indicator {...errorIconTooltipProps}>
              {errorIcon}
            </Tooltip>
          ) : (
            errorIcon
          ))}

        {suffix && (
          <InputAffix
            className={classesMap.suffix}
            type={InputAffixType.suffix}
            disabled={disabled}
          >
            {suffix}
          </InputAffix>
        )}
      </div>
    )
  }
)

export const InputBase = _InputBase as <TCanClear extends boolean = boolean>(
  props: InputBaseProps<TCanClear> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement
