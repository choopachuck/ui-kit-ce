'use client'

import * as React from 'react'
import { clsx, createUseStyles } from '@v-uik/theme'
import { useClassList, useMergedRefs } from '@v-uik/hooks'
import { useText } from '@v-uik/typography'
import { useButtonReset } from '@v-uik/button'
import { AddIcon } from './assets/AddIcon'
import { isEqualKeyboardKeys } from '@v-uik/utils'
import { TagInputClasses } from './interfaces'
import { TTagElementSizeType, TagElementSize } from './TTagElementSizeType'

export interface TagInputProps
  extends Omit<
    React.ComponentPropsWithRef<'div'>,
    'prefix' | 'onChange' | 'onSubmit'
  > {
  /**
   * Список классов
   */
  classes?: Partial<TagInputClasses>
  /**
   * HTML-атрибуты элемента input
   */
  inputProps?: React.HTMLAttributes<HTMLInputElement>
  /**
   * Ссылка на нативный элемент input
   */
  inputRef?:
    | React.RefCallback<HTMLInputElement>
    | React.MutableRefObject<HTMLInputElement | null>
    | null
  /**
   * Поле заблокировано для ввода
   */
  disabled?: boolean
  /**
   * Размер поля
   */
  size?: TTagElementSizeType
  /**
   * Подсказка внутри поля, если не введен текст
   */
  placeholder?: string
  /**
   * Значение поля
   */
  value?: React.ReactText
  /**
   * Обработчик события изменения значения поля
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * Обработчик события обновления значения поля
   */
  onSubmit?: (value: string) => void
}

const useStyles = createUseStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    borderTopLeftRadius: theme.comp.tagInput.shapeBorderRadiusTopLeft,
    borderTopRightRadius: theme.comp.tagInput.shapeBorderRadiusTopRight,
    borderBottomLeftRadius: theme.comp.tagInput.shapeBorderRadiusBottomLeft,
    borderBottomRightRadius: theme.comp.tagInput.shapeBorderRadiusBottomRight,

    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      borderRadius: 'inherit',
      borderColor: theme.comp.tagInput.containerColorBorder,
      borderStyle: 'dashed',
      borderWidth: theme.shape.borderWidth,
    },

    '&$disabled': {
      '&::after': {
        borderColor: theme.comp.tagInput.containerColorBorderDisabled,
      },
    },

    '&:hover:not($disabled)': {
      backgroundColor: theme.comp.tagInput.containerColorBackgroundHover,
    },

    '&$focused': {
      borderTopLeftRadius: theme.comp.tagInput.shapeBorderRadiusTopLeftFocused,
      borderTopRightRadius:
        theme.comp.tagInput.shapeBorderRadiusTopRightFocused,
      borderBottomLeftRadius:
        theme.comp.tagInput.shapeBorderRadiusBottomLeftFocused,
      borderBottomRightRadius:
        theme.comp.tagInput.shapeBorderRadiusBottomRightFocused,
      boxShadow: `0 0 0 2px ${theme.comp.tagInput.containerColorBorderFocus}`,

      '&::after': {
        borderWidth: 0,
      },
    },

    '&$focused:hover': {
      backgroundColor: 'transparent',
    },

    '& > $addIcon': {
      position: 'absolute',
      top: '50%',
      marginTop: -8,
      right: 8,
      zIndex: 2,
      cursor: 'pointer',
    },
  },

  focused: {},

  disabled: {},

  extraSmall: {
    '& $tag': {
      padding: [2, 8],
    },

    '& $text': {
      '& $addIcon': {
        marginLeft: 4,
      },
    },

    '& > $addIcon': {
      right: 4,
    },
  },

  small: {
    '& $tag': {
      padding: [2, 8],
    },

    '& $text': {
      '& $addIcon': {
        marginLeft: 4,
      },
    },

    '& > $addIcon': {
      right: 4,
    },
  },

  medium: {
    '& $tag': {
      padding: [6, 8, 6, 12],
    },
  },

  large: {
    '& $tag': {
      padding: [6, 8, 6, 12],
    },
  },

  tag: {
    width: '100%',
    padding: [6, 8, 6, 12],
    cursor: 'pointer',
    color: theme.comp.tagInput.tagColorText,
    display: 'flex',
    alignItems: 'center',
    zIndex: 2,

    '&:disabled': {
      cursor: 'default',
      color: theme.comp.tagInput.tagColorTextDisabled,

      '& $addIcon': {
        color: theme.comp.tagInput.iconColorTextDisabled,
      },
    },
  },

  text: {
    fontFamily: theme.comp.tagInput.typographyFontFamily,
    fontWeight: theme.comp.tagInput.typographyFontWeight,
    letterSpacing: theme.comp.tagInput.typographyLetterSpacing,

    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',

    '& $addIcon': {
      flexShrink: 0,
      marginLeft: 8,
    },
  },

  textExtraSmall: {
    fontSize:
      theme.comp.tagInput.typographyFontSize ||
      theme.comp.tagInput.typographyFontSizeXs,
    lineHeight:
      theme.comp.tagInput.typographyLineHeight ||
      theme.comp.tagInput.typographyLineHeightXs,
  },

  textSmall: {
    fontSize:
      theme.comp.tagInput.typographyFontSize ||
      theme.comp.tagInput.typographyFontSizeSm,
    lineHeight:
      theme.comp.tagInput.typographyLineHeight ||
      theme.comp.tagInput.typographyLineHeightSm,
  },

  textMedium: {
    fontSize:
      theme.comp.tagInput.typographyFontSize ||
      theme.comp.tagInput.typographyFontSizeMd,
    lineHeight:
      theme.comp.tagInput.typographyLineHeight ||
      theme.comp.tagInput.typographyLineHeightMd,
  },

  textLarge: {
    fontSize:
      theme.comp.tagInput.typographyFontSize ||
      theme.comp.tagInput.typographyFontSizeLg,
    lineHeight:
      theme.comp.tagInput.typographyLineHeight ||
      theme.comp.tagInput.typographyLineHeightLg,
  },

  addIcon: {
    color: theme.comp.tagInput.iconColorText,
  },

  input: {
    width: '100%',
    margin: 0,
    outline: 0,
    border: 0,
    boxShadow: 'none',
    borderRadius: 'inherit',
    color: theme.comp.tagInput.inputColorText,
    backgroundColor: theme.comp.tagInput.inputColorBackground,

    fontFamily: theme.comp.tagInput.typographyFontFamily,
    fontWeight: theme.comp.tagInput.typographyFontWeight,
    letterSpacing: theme.comp.tagInput.typographyLetterSpacing,

    '&::placeholder': {
      color: theme.comp.tagInput.inputPlaceholderColorText,
    },

    '&:focus': {
      outline: 0,
    },
  },

  inputExtraSmall: {
    padding: [2, 24, 2, 8],
    fontSize:
      theme.comp.tagInput.typographyFontSize ||
      theme.comp.tagInput.typographyFontSizeXs,
    lineHeight:
      theme.comp.tagInput.typographyLineHeight ||
      theme.comp.tagInput.typographyLineHeightXs,
  },

  inputSmall: {
    padding: [2, 24, 2, 8],
    fontSize:
      theme.comp.tagInput.typographyFontSize ||
      theme.comp.tagInput.typographyFontSizeSm,
    lineHeight:
      theme.comp.tagInput.typographyLineHeight ||
      theme.comp.tagInput.typographyLineHeightSm,
  },

  inputMedium: {
    padding: [6, 28, 6, 12],
    fontSize:
      theme.comp.tagInput.typographyFontSize ||
      theme.comp.tagInput.typographyFontSizeMd,
    lineHeight:
      theme.comp.tagInput.typographyLineHeight ||
      theme.comp.tagInput.typographyLineHeightMd,
  },

  inputLarge: {
    padding: [6, 28, 6, 12],
    fontSize:
      theme.comp.tagInput.typographyFontSize ||
      theme.comp.tagInput.typographyFontSizeLg,
    lineHeight:
      theme.comp.tagInput.typographyLineHeight ||
      theme.comp.tagInput.typographyLineHeightLg,
  },

  empty: {
    '& + $addIcon': {
      color: theme.comp.tagInput.iconColorTextFocusEmpty,
    },
  },
}))

export const TagInput = React.forwardRef(
  (
    {
      classes,
      className,
      style,
      value,
      onChange,
      placeholder,
      inputProps,
      inputRef: inputRefProp = null,
      disabled,
      size = TagElementSize.md,
      children,
      onClick,
      onSubmit,
      ...rest
    }: TagInputProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const [focused, setFocused] = React.useState(false)
    const width = React.useRef<number>()

    const innerRef = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const mergedInnerRef = useMergedRefs([ref, innerRef])
    const mergedInputRef = useMergedRefs([inputRefProp, inputRef])

    const buttonClasses = useButtonReset()
    const { ellipsis } = useText()
    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const isExtraSmall = size === TagElementSize.xs
    const isSmall = size === TagElementSize.sm
    const isMedium = size === TagElementSize.md
    const isLarge = size === TagElementSize.lg
    const containerClassName = clsx(classesMap.container, className, {
      [classesMap.focused]: focused,
      [classesMap.disabled]: disabled,
      [classesMap.extraSmall]: isExtraSmall,
      [classesMap.small]: isSmall,
      [classesMap.medium]: isMedium,
      [classesMap.large]: isLarge,
    })
    const inputClassName = clsx(classesMap.input, {
      [classesMap.empty]: typeof value !== 'number' && !value?.trim(),
      [classesMap.inputExtraSmall]: isExtraSmall,
      [classesMap.inputSmall]: isSmall,
      [classesMap.inputMedium]: isMedium,
      [classesMap.inputLarge]: isLarge,
    })

    const textClassName = clsx(ellipsis, classesMap.text, {
      [classesMap.textExtraSmall]: isExtraSmall,
      [classesMap.textSmall]: isSmall,
      [classesMap.textMedium]: isMedium,
      [classesMap.textLarge]: isLarge,
    })

    React.useEffect(() => {
      if (focused) {
        inputRef.current?.focus()
      }
    })

    const handleFocusButton = () => {
      width.current = innerRef.current?.getBoundingClientRect().width
      setFocused(true)
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false)
      if (inputProps && inputProps.onBlur) {
        inputProps.onBlur(event)
      }
    }

    const submitValue = () => {
      if (inputRef.current?.value) {
        onSubmit?.(inputRef.current?.value)
      }
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      inputProps?.onKeyDown?.(event)

      if (isEqualKeyboardKeys('Enter', event.key)) {
        submitValue()
      }
    }

    return (
      <div
        {...rest}
        ref={mergedInnerRef}
        style={{
          width: focused ? width.current : undefined,
          ...style,
        }}
        className={containerClassName}
      >
        {!focused && (
          <button
            type="button"
            disabled={disabled}
            className={clsx(buttonClasses.resetButton, classesMap.tag)}
            onFocus={handleFocusButton}
          >
            <span className={textClassName}>
              {children}
              <AddIcon className={classesMap.addIcon} />
            </span>
          </button>
        )}
        {focused && (
          <>
            <input
              {...inputProps}
              ref={mergedInputRef}
              className={inputClassName}
              disabled={disabled}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onBlur={handleBlur}
              onKeyDown={onKeyDown}
            />
            <AddIcon
              aria-label="submit"
              className={classesMap.addIcon}
              onMouseDown={submitValue}
            />
          </>
        )}
      </div>
    )
  }
)
