'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { Dropdown, DropdownTriggerType } from '@v-uik/dropdown'
import { ElementSize } from '@v-uik/common'
import { InputBase, InputBaseProps } from '@v-uik/input'
import { MaskedInputBase, MaskedInputBaseProps } from '@v-uik/masked-input'
import { BaseTimePicker, BaseTimePickerProps } from './views/BaseTimePicker'
import { ClockIcon } from './components/ClockIcon/ClockIcon'
import { useOpenState } from './hooks/useOpenState'
import { useSafeTimeFormat } from './hooks/useSafeTimeFormat'
import { useDropdownStateChange } from './hooks/useDropdownStateChange'
import { ErrorIcon } from './components/ErrorIcon/ErrorIcon'
import { useShouldDisableRangeTime } from './hooks/useShouldDisableRangeTime'
import { TRangeDate } from './interfaces'
import { TimePickerOwnProps } from './interfaces/time'
import { useClassList, useMergedRefs } from '@v-uik/hooks'
import { isEqualKeyboardKeys } from '@v-uik/utils'
import { RangeInputStyle, RangeInputStyleType } from './constants/range'
import { focusSelectedTime } from './utils/time'
import { TimeValidationErrorMessages } from './constants/common'
import { useRangeTimeInput } from './hooks/useRangeTimeInput'
import { useRangeTimeValidation, useHandleChangeRangeDate } from './hooks'
import { useDateLibAdapter } from './hooks/useDateLibAdapter'
import { Labelled } from '@v-uik/labelled'

const useStyles = createUseStyles((theme) => ({
  root: {},
  fullWidth: {
    '& $inputContainer': {
      width: '100%',
    },
  },
  divider: {
    color: theme.comp.rangePicker.dividerColorText,
    fontFamily: theme.comp.input.typographyFontFamily,
    fontWeight: theme.comp.input.typographyFontWeight,
    fontSize: theme.comp.input.typographyFontSize,
    lineHeight: theme.comp.input.typographyLineHeight,
    letterSpacing: theme.comp.input.typographyLetterSpacing,
  },
  iconContainer: {
    color: theme.comp.rangePicker.iconColorText,
    display: 'flex',
    marginRight: '15px',
    zIndex: 2,
    flexShrink: 0,
    justifyContent: 'flex-end',
  },
  inputContainerDivided: {
    '& $divider': {
      width: 1,
      alignSelf: 'stretch',
      backgroundColor: theme.comp.rangePicker.inputColorBorder,
      flexShrink: 0,
    },

    '& $iconContainer': {
      marginRight: 0,
      padding: [0, 8],
    },

    '& $input': {},
  },
  inputContainer: {
    width: 288,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    borderTopLeftRadius: theme.comp.rangePicker.inputShapeBorderRadiusTopLeftMd,
    borderTopRightRadius:
      theme.comp.rangePicker.inputShapeBorderRadiusTopRightMd,
    borderBottomLeftRadius:
      theme.comp.rangePicker.inputShapeBorderRadiusBottomLeftMd,
    borderBottomRightRadius:
      theme.comp.rangePicker.inputShapeBorderRadiusBottomRightMd,
    overflow: 'hidden',
    backgroundColor: theme.comp.rangePicker.inputColorBackground,

    '&$small': {
      borderTopLeftRadius:
        theme.comp.rangePicker.inputShapeBorderRadiusTopLeftSm,
      borderTopRightRadius:
        theme.comp.rangePicker.inputShapeBorderRadiusTopRightSm,
      borderBottomLeftRadius:
        theme.comp.rangePicker.inputShapeBorderRadiusBottomLeftSm,
      borderBottomRightRadius:
        theme.comp.rangePicker.inputShapeBorderRadiusBottomRightSm,
    },
    '&$large': {
      borderTopLeftRadius:
        theme.comp.rangePicker.inputShapeBorderRadiusTopLeftLg,
      borderTopRightRadius:
        theme.comp.rangePicker.inputShapeBorderRadiusTopRightLg,
      borderBottomLeftRadius:
        theme.comp.rangePicker.inputShapeBorderRadiusBottomLeftLg,
      borderBottomRightRadius:
        theme.comp.rangePicker.inputShapeBorderRadiusBottomRightLg,
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      borderRadius: 'inherit',
      borderColor: theme.comp.rangePicker.inputColorBorder,
      borderStyle: theme.shape.borderStyle,
      borderWidth: theme.shape.borderWidth,
    },

    '&$disabled': {
      cursor: 'default',

      '&::after': {
        borderColor: theme.comp.rangePicker.inputColorBorderDisabled,
      },
    },

    '&:not($disabled)': {
      '&:not($error)': {
        '&:hover': {
          '&::after': {
            borderColor: theme.comp.rangePicker.inputColorBorderHover,
          },
        },
      },

      '&$focused': {
        boxShadow: `0 0 0 2px ${theme.comp.rangePicker.inputColorShadowFocus}`,

        '&::after': {
          borderWidth: 0,
        },
      },

      '&$error': {
        '&::after': {
          borderColor: theme.comp.rangePicker.inputColorBorderError,
        },
      },
    },

    '&$error': {
      borderWidth: '1px',
      borderColor: theme.comp.rangePicker.inputColorBorderError,
    },
  },
  inputDisabled: {},
  inputError: {},
  input: {
    zIndex: 2,
    backgroundColor: 'transparent',

    '&$inputDisabled': {
      backgroundColor: 'transparent',
    },
    '&$inputError:not($inputDisabled)': {
      backgroundColor: 'transparent',
    },

    '&::after': {
      borderWidth: 0,
    },

    '&:not(:disabled)': {
      '&$inputFocused': {
        boxShadow: 'none',
      },
    },
  },

  inputFocused: {},

  inputStart: {
    paddingRight: 8,
  },

  inputEnd: {
    padding: [0, 8],
  },

  error: {},
  errorIcon: {
    display: 'flex',
    color: theme.comp.input.alertIconColorText,
    marginRight: 8,
  },
  emptyIcon: {},
  focused: {},
  large: {},
  small: {
    '& $iconContainer': {
      '& svg': {
        width: 16,
        height: 16,
      },
    },
  },
  disabled: {
    '& $divider': {
      color: theme.comp.rangePicker.dividerColorTextDisabled,
    },

    '& $iconContainer': {
      color: theme.comp.rangePicker.iconColorTextDisabled,
    },
  },
  dropdown: {
    boxSizing: 'border-box',
    padding: '8px 4px',
    backgroundColor: theme.comp.rangePicker.dropdownColorBackground,
    borderTopLeftRadius:
      theme.comp.rangePicker.dropdownShapeBorderRadiusTopLeft,
    borderTopRightRadius:
      theme.comp.rangePicker.dropdownShapeBorderRadiusTopRight,
    borderBottomLeftRadius:
      theme.comp.rangePicker.dropdownShapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.rangePicker.dropdownShapeBorderRadiusBottomRight,
    borderStyle: theme.shape.borderStyle,
    borderWidth: theme.shape.borderWidth,
    borderColor: theme.comp.rangePicker.dropdownColorBorder,
    boxShadow: theme.comp.rangePicker.dropdownElevationShadow,
  },
}))

type Classes = Partial<
  Record<
    | 'root'
    | 'inputContainer'
    | 'inputContainerDivided'
    | 'error'
    | 'focused'
    | 'disabled'
    | 'small'
    | 'large'
    | 'divider'
    | 'iconContainer'
    | 'errorIcon'
    | 'dropdown'
    | 'inputDisabled',
    string
  >
>

export interface TimeRangePickerProps<TDate = unknown>
  extends TimePickerOwnProps {
  /**
   * Сообщения ошибок при вводе некорректного времени
   */
  validationErrorMessages?: Partial<TimeValidationErrorMessages>
  /**
   * CSS классы компонента
   */
  classes?: Classes
  /**
   * Расширить поле на 100% ширины родителя
   */
  fullWidth?: boolean
  /**
   * Значение пикера
   */
  value?: TRangeDate<TDate>
  /**
   * Обработчик изменения значения
   */
  onChange?: (value: TRangeDate<TDate>) => void
  /**
   * Функция для отображения поля ввода.
   */
  renderInput?: (
    startProps: InputBaseProps | MaskedInputBaseProps,
    endProps: InputBaseProps | MaskedInputBaseProps
  ) => React.ReactNode
  /**
   * Свойства компонента InputBase или MaskedInputBase начала диапазона
   */
  startInputProps?: InputBaseProps | MaskedInputBaseProps
  /**
   * Свойства компонента InputBase или MaskedInputBase конца диапазона
   */
  endInputProps?: InputBaseProps | MaskedInputBaseProps
  /**
   * Свойства компонента BaseTimePicker для начала диапазона
   */
  startTimePickerProps?: Omit<
    BaseTimePickerProps<TDate>,
    'value' | 'onChange' | 'is12HoursFormat'
  >
  /**
   * Свойства компонента BaseTimePicker для конца диапазона
   */
  endTimePickerProps?: Omit<
    BaseTimePickerProps<TDate>,
    'value' | 'onChange' | 'is12HoursFormat'
  >
  /**
   * Использовать 12-ти часовой формат (предполагает наличие еще одного столбца с выбором am/pm)
   */
  is12HoursFormat?: boolean
  /**
   * Должен ли срабатывать onChange при вводе невалидной даты с клавиатуры
   */
  triggerOnChangeOnInvalid?: boolean
  /**
   * Вид инпутов пикера
   */
  inputStyle?: RangeInputStyleType

  suffix?: React.ReactNode
}

enum InputIndex {
  LEFT = 0,
  RIGHT = 1,
}

export type RangePickerComponent = <TDate>(
  props: TimeRangePickerProps<TDate> & React.RefAttributes<HTMLDivElement>
) => JSX.Element

export const TimeRangePicker = React.forwardRef(
  <TDate extends unknown>(
    {
      classes,
      fullWidth,
      label,
      labelProps,
      helperText: helperTextValueProps,
      helperTextProps,
      disabled,
      error: propsError,
      mask,
      format,
      size,
      open: openProps,
      dropdownProps,
      renderInput,
      startInputProps: propsStartInputProps,
      endInputProps: propsEndInputProps,
      startTimePickerProps,
      endTimePickerProps,
      is12HoursFormat,
      value,
      onChange,
      triggerOnChangeOnInvalid,
      inputStyle = RangeInputStyle.default,
      suffix = <ClockIcon />,
      validationErrorMessages = {},
      description,
      labelledClasses,
      keepHelperTextMinHeight,
      required,
      ...rest
    }: TimeRangePickerProps<TDate>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    // states
    const [activeInputIndex, setActiveInputIndex] = React.useState<InputIndex>(
      InputIndex.LEFT
    )
    const [range, setRange] = React.useState<TRangeDate<TDate>>(() =>
      Array.isArray(value) ? value : [null, null]
    )
    const [focused, setFocused] = React.useState(false)
    const { open, setOpen } = useOpenState({
      open: openProps,
      onStateChange: dropdownProps?.onStateChange,
    })

    // refs
    const inputContainerRef = React.useRef<HTMLInputElement>(null)
    const startInputRef = React.useRef<HTMLInputElement>(null)
    const endInputRef = React.useRef<HTMLInputElement>(null)
    const mergedStartInputRefs = useMergedRefs([
      startInputRef,
      propsStartInputProps?.inputRef ?? null,
    ])
    const mergedEndInputRefs = useMergedRefs([
      endInputRef,
      propsEndInputProps?.inputRef ?? null,
    ])
    // Для высчитвания позиционирования относительно контейнеров
    const startInputContainerRef = React.useRef<HTMLDivElement>(null)
    const endInputContainerRef = React.useRef<HTMLDivElement>(null)

    const panelRef = React.useRef<HTMLDivElement | null>(null)

    const isDividedStyle = inputStyle === RangeInputStyle.divided

    // hooks
    const safeFormat: string = useSafeTimeFormat(is12HoursFormat, format)
    const [startDisabledTime, endDisabledTime] = useShouldDisableRangeTime(
      startTimePickerProps,
      endTimePickerProps,
      range
    )
    const adapter = useDateLibAdapter<TDate>()

    const { validate, validationErrorEnd, validationErrorStart } =
      useRangeTimeValidation<TDate>({
        startDisabledTime,
        endDisabledTime,
      })

    const handleChange = useHandleChangeRangeDate<TDate>({
      inputs: [startInputRef.current, endInputRef.current],
      format,
      onChange: onChange as (date: TRangeDate<TDate>) => void,
    })

    // callbacks
    const onChangeByIndex = React.useCallback(
      (index: InputIndex) => (date: TDate | null) => {
        const newRange = [...(range ?? [])] as TRangeDate<TDate>

        newRange[index] = date

        setRange(newRange)

        const isValid =
          validate({ range: newRange, index }) || triggerOnChangeOnInvalid
        const isValueChanged = date !== value?.[index]

        if (isValid && isValueChanged) {
          handleChange(newRange, index)
        }
      },
      [
        value,
        setActiveInputIndex,
        setOpen,
        setRange,
        range,
        adapter,
        validate,
        onChange,
        triggerOnChangeOnInvalid,
      ]
    )

    const handleFocus = React.useCallback(
      (value: boolean) => {
        setFocused(value)
      },
      [setFocused]
    )

    const { value: inputValueStart, onChange: inputHandleChangeStart } =
      useRangeTimeInput<TDate>({
        range: range as TRangeDate<TDate>,
        index: 0,
        changeDate: onChangeByIndex(InputIndex.LEFT),
        format: safeFormat,
        validationError: validationErrorStart,
      })

    const { value: inputValueEnd, onChange: inputHandleChangeEnd } =
      useRangeTimeInput<TDate>({
        range: range as TRangeDate<TDate>,
        index: 1,
        changeDate: onChangeByIndex(InputIndex.RIGHT),
        format: safeFormat,
        validationError: validationErrorEnd,
      })

    const { onInputClick, onDropdownStateChange } = useDropdownStateChange({
      isOpen: open,
      setOpen: setOpen,
      inputRef: inputContainerRef,
    })

    const error =
      propsError ||
      !!validationErrorStart ||
      !!validationErrorEnd ||
      propsStartInputProps?.error ||
      propsEndInputProps?.error

    // css
    const classesList = useStyles()
    const classesMap: Required<Classes> = useClassList(classesList, classes)

    const inputContainerClassName = clsx(classesMap.inputContainer, {
      [classesMap.error]: error,
      [classesMap.disabled]: disabled,
      [classesMap.focused]: focused,
      [classesList.inputContainerDivided]: isDividedStyle,
      [classesList.small]: size === ElementSize.sm,
      [classesList.large]: size === ElementSize.lg,
    })
    const startInputClasses: InputBaseProps['classes'] = {
      ...propsStartInputProps?.classes,
      root: clsx(
        classesList.input,
        classesList.inputStart,
        propsStartInputProps?.classes?.root
      ),
      focused: clsx(
        classesList.inputFocused,
        propsStartInputProps?.classes?.focused
      ),
      disabled: clsx(
        classesList.inputDisabled,
        propsStartInputProps?.classes?.disabled
      ),
      error: clsx(classesList.inputError, propsStartInputProps?.classes?.error),
    }

    const endInputClasses: InputBaseProps['classes'] = {
      ...propsEndInputProps?.classes,
      root: clsx(
        classesList.input,
        classesList.inputEnd,
        propsEndInputProps?.classes?.root
      ),
      focused: clsx(
        classesList.inputFocused,
        propsEndInputProps?.classes?.focused
      ),
      disabled: clsx(
        classesList.inputDisabled,
        propsEndInputProps?.classes?.disabled
      ),
      error: clsx(classesList.inputError, propsEndInputProps?.classes?.error),
    }

    // keyboard
    const onKeyDownByIndex = React.useCallback(
      (index: InputIndex) => (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (index === InputIndex.LEFT) {
          propsStartInputProps?.onKeyDown?.(event)
        } else {
          propsEndInputProps?.onKeyDown?.(event)
        }

        if (
          isEqualKeyboardKeys('Enter', event.key) ||
          isEqualKeyboardKeys('ArrowDown', event.key)
        ) {
          event.preventDefault()
          setOpen(true)

          if (panelRef.current) {
            focusSelectedTime(panelRef.current)
          }
        }
      },
      [propsStartInputProps, propsEndInputProps, setOpen]
    )

    // props
    const inputPropsStart: InputBaseProps | MaskedInputBaseProps = {
      error: !!validationErrorStart,
      showErrorIcon: isDividedStyle,
      ...propsStartInputProps,
      classes: startInputClasses,
      disabled,
      inputProps: {
        autoComplete: 'off',
        //@ts-expect-error Компонент корректно принимает data-атрибуты
        'data-v-uik-input-type': 'time-range-start',
        ...propsStartInputProps?.inputProps,
        onFocus: (event: React.FocusEvent<HTMLInputElement>) => {
          propsStartInputProps?.inputProps?.onFocus?.(event)
          setActiveInputIndex(InputIndex.LEFT)
          setOpen(true)
        },
        onKeyDown: onKeyDownByIndex(activeInputIndex),
      },
      onFocusChange: handleFocus,
      size,
      inputRef: mergedStartInputRefs,
      value: inputValueStart,
      onChange: inputHandleChangeStart,
      fullWidth,
    }

    const inputPropsEnd: InputBaseProps | MaskedInputBaseProps = {
      error: !!validationErrorEnd,
      showErrorIcon: isDividedStyle,
      ...propsEndInputProps,
      classes: endInputClasses,
      disabled,
      inputProps: {
        autoComplete: 'off',
        //@ts-expect-error Компонент корректно принимает data-атрибуты
        'data-v-uik-input-type': 'time-range-end',
        ...propsEndInputProps?.inputProps,
        onFocus: (event: React.FocusEvent<HTMLInputElement>) => {
          propsEndInputProps?.inputProps?.onFocus?.(event)
          setActiveInputIndex(InputIndex.RIGHT)
          setOpen(true)
        },
        onKeyDown: onKeyDownByIndex(activeInputIndex),
      },
      onFocusChange: handleFocus,
      size,
      value: inputValueEnd,
      inputRef: mergedEndInputRefs,
      onChange: inputHandleChangeEnd,
      fullWidth,
    }

    const handleClickOnLastColumn = React.useCallback(() => {
      onDropdownStateChange(false)

      if (
        activeInputIndex === InputIndex.LEFT &&
        (!inputValueEnd || validationErrorEnd)
      ) {
        endInputRef.current?.focus()

        return
      }

      if (
        activeInputIndex === InputIndex.RIGHT &&
        (!inputValueStart || validationErrorStart)
      ) {
        startInputRef.current?.focus()

        return
      }

      const activeInput =
        activeInputIndex === InputIndex.RIGHT
          ? endInputRef.current
          : startInputRef.current
      setTimeout(() => {
        if (!activeInput) {
          return
        }

        activeInput.setSelectionRange(
          activeInput.value.length,
          activeInput.value.length
        )
      }, 0)
    }, [
      onDropdownStateChange,
      activeInputIndex,
      inputValueStart,
      inputValueEnd,
      validationErrorEnd,
      validationErrorStart,
    ])

    const handleContainerKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (isEqualKeyboardKeys('Escape', event.key)) {
          setOpen(false)
        }
      },
      [setOpen]
    )

    const getAnchor = React.useCallback(
      (activeInputIndex) => {
        if (renderInput) {
          return activeInputIndex === InputIndex.LEFT
            ? startInputRef.current
            : endInputRef.current
        }

        return activeInputIndex === InputIndex.LEFT
          ? startInputContainerRef.current
          : endInputContainerRef.current
      },
      [renderInput]
    )

    const validationErrorType = validationErrorStart ?? validationErrorEnd
    const helperText =
      helperTextValueProps ||
      (validationErrorType && validationErrorMessages[validationErrorType])

    React.useEffect(() => {
      setRange(Array.isArray(value) ? value : [null, null])
    }, [value])

    return (
      <div
        className={clsx(classesMap.root, {
          [classesList.fullWidth]: !renderInput && fullWidth,
        })}
        {...rest}
        ref={ref}
      >
        <Labelled
          size={size}
          classes={labelledClasses}
          label={label}
          helperText={helperText}
          description={description}
          keepHelperTextMinHeight={keepHelperTextMinHeight}
          required={required}
          labelProps={labelProps}
          disabled={disabled}
          error={error}
          helperTextProps={helperTextProps}
        >
          <Dropdown
            placement="bottom-start"
            /**
             * Отслеживаем изменение ref для корректной передачи ссылки на родительский элемент,
             * если при первом рендере сверху пришло свойство open=true
             */
            anchor={() => getAnchor(activeInputIndex) as HTMLDivElement}
            action={DropdownTriggerType.click}
            {...dropdownProps}
            open={!disabled && open}
            content={
              <div
                ref={panelRef}
                className={classesMap.dropdown}
                onKeyDown={handleContainerKeyDown}
              >
                <BaseTimePicker
                  {...(activeInputIndex === InputIndex.LEFT
                    ? {
                        ...startTimePickerProps,
                        shouldDisableTime: startDisabledTime,
                      }
                    : {
                        ...endTimePickerProps,
                        shouldDisableTime: endDisabledTime,
                      })}
                  is12HoursFormat={is12HoursFormat}
                  value={(range?.[activeInputIndex] ?? null) as TDate}
                  onChange={onChangeByIndex(activeInputIndex)}
                  onClickLastNumberColumn={handleClickOnLastColumn}
                />
              </div>
            }
            onStateChange={onDropdownStateChange}
          >
            {renderInput ? (
              <div onClick={onInputClick}>
                {renderInput(inputPropsStart, inputPropsEnd)}
              </div>
            ) : (
              <div
                ref={inputContainerRef}
                className={inputContainerClassName}
                onClick={onInputClick}
              >
                {mask ? (
                  <MaskedInputBase
                    ref={startInputContainerRef}
                    {...(inputPropsStart as MaskedInputBaseProps)}
                    keepCharPositions
                    valueWithoutMask
                    mask={mask}
                  />
                ) : (
                  <InputBase
                    ref={startInputContainerRef}
                    {...inputPropsStart}
                  />
                )}
                <div className={classesMap.divider}>
                  {isDividedStyle ? '' : '–'}
                </div>
                {mask ? (
                  <MaskedInputBase
                    ref={endInputContainerRef}
                    inputRef={endInputRef}
                    {...(inputPropsEnd as MaskedInputBaseProps)}
                    keepCharPositions
                    valueWithoutMask
                    mask={mask}
                  />
                ) : (
                  <InputBase ref={endInputContainerRef} {...inputPropsEnd} />
                )}

                {isDividedStyle && <div className={classesMap.divider} />}

                <div className={classesMap.iconContainer}>
                  {!isDividedStyle
                    ? (error && (
                        <ErrorIcon className={classesMap.errorIcon} />
                      )) || (
                        <svg
                          viewBox="0 0 24 24"
                          width="24px"
                          className={clsx(
                            classesMap.errorIcon,
                            classesList.emptyIcon
                          )}
                        />
                      )
                    : null}
                  {suffix}
                </div>
              </div>
            )}
          </Dropdown>
        </Labelled>
      </div>
    )
  }
) as RangePickerComponent
