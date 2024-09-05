'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import {
  ElementSize,
  ElementSizeType,
  ClearButton,
  ClearButtonProps,
  ComponentPropsWithRefFix,
  DATA_V_UIK_INPUT_TYPE,
} from '@v-uik/common'
import { Tooltip, TooltipProps } from '@v-uik/tooltip'
import { useMergedRefs, useClassList, useSafetyValue } from '@v-uik/hooks'
import { InputAffix, InputAffixType } from './InputAffix'
import { ErrorIcon } from './assets/ErrorIcon'
import { dispatchChangeEvent } from '@v-uik/utils'

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
  /**
   * @deprecated Заменено на React.PointerEvent<HTMLButtonElement>
   */
  | React.MouseEvent<HTMLDivElement>
  | React.PointerEvent<HTMLButtonElement>

export interface InputBaseProps<TCanClear extends boolean = boolean>
  extends Omit<ComponentPropsWithRefFix<'div'>, 'prefix' | 'onChange' | 'ref'> {
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
   * Использовать ли нативное css-свойство text-overflow со значением ellipsis
   */
  ellipsis?: boolean
  /**
   * Подсказка внутри поля, если не введен текст
   */
  placeholder?: string
  /**
   * Значение поля
   */
  value?: React.ReactText | null
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
    padding: [0, 16],
    color: theme.comp.input.colorText,
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
        backgroundColor: theme.comp.input.colorBackgroundError,

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

  medium: {
    borderTopLeftRadius: theme.comp.input.shapeBorderRadiusTopLeftMd,
    borderTopRightRadius: theme.comp.input.shapeBorderRadiusTopRightMd,
    borderBottomLeftRadius: theme.comp.input.shapeBorderRadiusBottomLeftMd,
    borderBottomRightRadius: theme.comp.input.shapeBorderRadiusBottomRightMd,
  },

  large: {
    borderTopLeftRadius: theme.comp.input.shapeBorderRadiusTopLeftLg,
    borderTopRightRadius: theme.comp.input.shapeBorderRadiusTopRightLg,
    borderBottomLeftRadius: theme.comp.input.shapeBorderRadiusBottomLeftLg,
    borderBottomRightRadius: theme.comp.input.shapeBorderRadiusBottomRightLg,
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
    letterSpacing: theme.comp.input.typographyLetterSpacing,

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

  ellipsis: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },

  inputSmall: {
    fontSize:
      theme.comp.input.typographyFontSizeSm ||
      theme.comp.input.typographyFontSize,
    lineHeight:
      theme.comp.input.typographyLineHeightSm ||
      theme.comp.input.typographyLineHeight,
    margin: [4, 0],
  },

  inputMedium: {
    fontSize:
      theme.comp.input.typographyFontSizeMd ||
      theme.comp.input.typographyFontSize,
    lineHeight:
      theme.comp.input.typographyLineHeightMd ||
      theme.comp.input.typographyLineHeight,
  },

  inputLarge: {
    fontSize:
      theme.comp.input.typographyFontSizeLg ||
      theme.comp.input.typographyFontSize,
    lineHeight:
      theme.comp.input.typographyLineHeightLg ||
      theme.comp.input.typographyLineHeight,
    margin: [12, 0],
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
      ellipsis,
      ...rest
    }: InputBaseProps<TCanClear>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const [focused, setFocused] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)

    //#region О механизме изменения значения поля
    // Ранее инициатором изменения поля могли служить два элемента - это input, и кнопка очистки поля.
    // Соответственно имелось два ивента - это React.ChangeEvent<HTMLInputElement> и
    // React.MouseEvent<HTMLDivElement>. После внедрения доработок ClickStream и вызова
    // нативного ивента через dispatchEvent, инициатором очистки поля теперь всегда является input.
    // Очистка поля всегда триггерит dispachtEvent, вместо прямого вызова onChange. Поэтому
    // необходимо дополнительные значения, такие как reason или event, отправлять не аргументами, а
    // сохранять в рефе, и уже эти значения прокидывать в onChange

    // Костыль, чтобы отлавливать тип изменения поля при диспатче нативного ивента
    const inputChangeReasonRef = React.useRef<InputChangeReason | null>(null)
    // Костыль, чтобы отлавливать событие изменения поля при диспатче нативного ивента
    const inputChangeEventRef = React.useRef<InputChangeEvent | null>(null)
    //#endregion

    const mergedInputRef = useMergedRefs([inputRefProp, inputRef])

    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)

    const isSmall = size === ElementSize.sm
    const isMedium = size === ElementSize.md
    const isLarge = size === ElementSize.lg

    const className = clsx(classNameProp, classesMap.root, {
      [classesMap.focused]: !disabled && focused,
      [classesMap.disabled]: disabled,
      [classesMap.error]: error,
      [classesMap.small]: isSmall,
      [classesMap.medium]: isMedium,
      [classesMap.large]: isLarge,
      [classesMap.fullWidth]: fullWidth,
    })

    const setInputChangeEvent = (
      event: InputChangeEvent,
      reason: InputChangeReason
    ) => {
      inputChangeEventRef.current = event
      inputChangeReasonRef.current = reason
    }

    const clearInputChangeEvent = () => {
      inputChangeEventRef.current = null
      inputChangeReasonRef.current = null
    }

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
      onChange?.(
        event.target.value,
        // Для сохранения обратной совместимости хардкодом кастим тип ивента
        (inputChangeEventRef.current ??
          event) as React.ChangeEvent<HTMLInputElement>,
        inputChangeReasonRef.current ?? 'input'
      )
      clearInputChangeEvent()
    }

    const handleClear = (event: InputChangeEvent) => {
      if (inputRef.current) {
        onClear?.()
        setInputChangeEvent(event, 'clear')
        dispatchChangeEvent(inputRef.current, '')
      }
    }

    const handleClearButtonClick = (
      event: React.PointerEvent<HTMLDivElement>
    ) => {
      handleClear(event)
      clearButtonInnerProps?.onClick?.(event)
    }

    const errorIcon = (
      <div className={classesMap.errorIcon}>
        <ErrorIcon />
      </div>
    )

    const vUikInputType =
      (inputProps?.[
        DATA_V_UIK_INPUT_TYPE as keyof React.InputHTMLAttributes<HTMLInputElement>
      ] as string) ||
      inputProps?.type ||
      'text'

    React.useEffect(() => {
      if (disabled && focused) {
        setFocused(false)
        onFocusChange?.(false)
      }
    }, [disabled, focused, onFocusChange])

    const safetyValue = useSafetyValue(value)

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
          className={clsx(classesMap.input, {
            [classesMap.inputSmall]: isSmall,
            [classesMap.inputMedium]: isMedium,
            [classesMap.inputLarge]: isLarge,
            [classesMap.ellipsis]: ellipsis,
          })}
          {...{ [DATA_V_UIK_INPUT_TYPE]: vUikInputType }}
          disabled={disabled}
          placeholder={placeholder}
          value={safetyValue}
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
                onClick: handleClearButtonClick,
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
