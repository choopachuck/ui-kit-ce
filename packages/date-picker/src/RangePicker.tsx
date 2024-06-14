'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { Dropdown, DropdownProps, DropdownTriggerType } from '@v-uik/dropdown'
import {
  ElementSize,
  ElementSizeType,
  ComponentPropsWithRefFix,
} from '@v-uik/common'
import { InputBase, InputBaseProps } from '@v-uik/input'
import { MaskedInputBase, MaskedInputBaseProps } from '@v-uik/masked-input'
import { warning } from '@v-uik/utils'
import { ValidateDateProps } from './interfaces/date'
import { BaseRangePickerProps, TRangeDate } from './interfaces/range'
import { useOpenState } from './hooks/useOpenState'
import { useSelectRange } from './hooks/useSelectRange'
import { useRangeMaskedInput } from './hooks/useRangeMaskedInput'
import { useRangeHandleFocus } from './hooks/useRangeHandleFocus'
import { useMobileView } from './hooks/useMobileView'
import { RangeDatePanel } from './components/RangeDatePanel/RangeDatePanel'
import { RangeDatePanelMulti } from './components/RangeDatePanel/RangeDatePanelMulti'
import { RangeDatePanelMultiDivided } from './components/RangeDatePanel/RangeDatePanelMultiDivided'
import { CalendarIcon } from './components/CalendarIcon/CalendarIcon'
import { InputInfinityButton } from './components/InputInfinityButton/InputInfinityButton'
import { RangeInputStyle, RangeDatePanelStyle } from './constants/range'
import {
  defaultValidationErrorMessages,
  DatePickerView,
} from './constants/common'
import {
  ExistedViews,
  ForwardRefExoticComponentCommonFields,
} from './interfaces/common'
import { ErrorIcon } from './components/ErrorIcon/ErrorIcon'
import { defaultViews } from './constants/common'
import { useDateLibAdapter } from './hooks/useDateLibAdapter'
import { useShouldDisableDate } from './hooks/useShouldDisableDate'
import { useSafeRangeValue } from './hooks/useSafeValue'
import {
  RangePickerClasses as Classes,
  CalendarViewClasses,
  PanelHeaderClasses,
} from './interfaces/classes'
import {
  useOutsideScroll,
  useMergedRefs,
  useForceSecondRender,
  useClassList,
} from '@v-uik/hooks'
import { Labelled, LabelledProps } from '@v-uik/labelled'

const useStyles = createUseStyles((theme) => ({
  root: {},

  inputDisabled: {},

  fullWidth: {
    '& $inputContainer': {
      width: '100%',
    },
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
      backgroundColor: theme.comp.rangePicker.inputColorBackgroundDisabled,

      '&::after': {
        borderColor: theme.comp.rangePicker.inputColorBorderDisabled,
      },
    },

    '&:not($disabled)': {
      '&:hover': {
        '&::after': {
          borderColor: theme.comp.rangePicker.inputColorBorderHover,
        },
      },

      '&$focused': {
        boxShadow: `0 0 0 2px ${theme.comp.rangePicker.inputColorShadowFocus}`,

        '&::after': {
          borderWidth: 0,
        },
      },

      '&$error': {
        backgroundColor: theme.comp.rangePicker.inputColorBackgroundError,

        '&::after': {
          borderColor: theme.comp.rangePicker.inputColorBorderError,
        },
      },
    },

    '&$error:not($inputContainerDivided)': {
      '& $inputStart': {},
      '& $inputEnd': {},
    },
  },

  error: {},
  errorIcon: {
    display: 'flex',
    color: theme.comp.input.alertIconColorText,
    marginRight: 8,
  },

  disabled: {
    '& $divider': {
      color: theme.comp.rangePicker.dividerColorTextDisabled,
    },

    '& $iconContainer': {
      color: theme.comp.rangePicker.iconColorTextDisabled,
    },
  },

  focused: {},

  inputContainerDivided: {
    width: 324,
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

  small: {
    '& $iconContainer': {
      '& svg': {
        width: 16,
        height: 16,
      },
    },
  },

  large: {},

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
  inputError: {},

  inputStart: {
    paddingRight: 8,
  },

  inputEnd: {
    padding: [0, 8],
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
    display: 'flex',
    marginRight: 15,
    color: theme.comp.rangePicker.iconColorText,
    zIndex: 2,
    flexShrink: 0,
    justifyContent: 'flex-end',
  },
}))

const TRIGGER_CLICK_DELAY_HANDLE = 20

export interface RangePickerProps<TDate = unknown>
  extends Omit<
      BaseRangePickerProps<TDate>,
      'label' | 'labelProps' | 'helperText' | 'helperTextProps'
    >,
    ValidateDateProps<TDate>,
    Omit<ComponentPropsWithRefFix<'div'>, 'onChange'>,
    Omit<LabelledProps, 'children' | 'classes'> {
  /**
   * CSS классы для стилизации
   */
  classes?: Classes
  /**
   * Список классов для компонента Labelled
   */
  labelledClasses?: LabelledProps['classes']
  /**
   * Заблокировать поле
   */
  disabled?: boolean
  /**
   * Размер поля
   */
  size?: ElementSizeType
  /**
   * Раскрыть date picker
   */
  open?: boolean
  /**
   * Свойства компонента Dropdown
   */
  dropdownProps?: DropdownProps
  /**
   * Функция для отображения поля ввода.
   */
  renderInput?: (
    startProps: InputBaseProps | MaskedInputBaseProps,
    endProps: InputBaseProps | MaskedInputBaseProps
  ) => React.ReactNode
  /**
   * Расширить поле на 100% ширины родителя
   */
  fullWidth?: boolean
  /**
   * Скрывать дропдаун при скроле вне дропдауна
   */
  hideDropdownOnOutsideScroll?: boolean
  /**
   * Вспомогательный элемент после поля ввода
   */
  suffix?: React.ReactNode
  /**
   * CSS классы для стилизации сетки календаря
   */
  calendarViewClasses?: CalendarViewClasses
  /**
   * CSS классы для стилизации компонента PanelHeader
   */
  panelHeaderClasses?: PanelHeaderClasses
}

interface IRangePicker
  extends ForwardRefExoticComponentCommonFields<RangePickerProps> {
  <TDate = unknown>(
    props: React.PropsWithoutRef<RangePickerProps<TDate>> &
      React.RefAttributes<HTMLDivElement>
  ): React.ReactElement | null
}

const getRangeDatePanelComponent = (
  isSingleDatePanel: boolean,
  datePanelStyle: keyof typeof RangeDatePanelStyle | undefined
) => {
  if (isSingleDatePanel) {
    return RangeDatePanel
  }

  if (datePanelStyle === RangeDatePanelStyle.divided) {
    return RangeDatePanelMultiDivided
  }

  return RangeDatePanelMulti
}

export const RangePicker = React.forwardRef(
  <TDate extends unknown>(
    props: RangePickerProps<TDate>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const {
      classes,
      className: classNameProp,
      inputStyle = RangeInputStyle.default,
      datePanelStyle = RangeDatePanelStyle.default,
      size = ElementSize.md,
      label,
      labelProps,
      helperText: helperTextProp,
      helperTextProps,
      error: errorProp,
      value: rawValue,
      onChange,
      views = defaultViews,
      disabled,
      format,
      mask,
      minDate,
      maxDate,
      disableFuture,
      disablePast,
      disableDate,
      next_shouldDisableDate,
      next_shouldDisableMonth,
      next_shouldDisableYear,
      open: openProp,
      dropdownProps,
      startInputProps,
      endInputProps,
      validationErrorMessages: validationErrorMessagesProp,
      allowInfinity,
      renderInput,
      fullWidth,
      triggerOnChangeOnInvalid = false,
      hideDropdownOnOutsideScroll = false,
      description,
      labelledClasses,
      calendarViewClasses,
      panelHeaderClasses,
      keepHelperTextMinHeight,
      required,
      suffix,
      ...rest
    } = props

    warning(
      !(endInputProps?.fullWidth || startInputProps?.fullWidth),
      'RangePicker',
      'параметр fullWidth внутри объектов инпутов (endInputProps или startInputProps) не рекомендуется использовать, по скольку они не рабочие, для установки ширины в' +
        ' 100% используйте корневой параметр fullWidth, в версии `2.X.X` эти параметры будут удалены из объектов инпутов.'
    )

    const validationErrorMessages = {
      ...defaultValidationErrorMessages,
      validationErrorMessagesProp,
    }

    const existedViews = React.useMemo<ExistedViews>(
      () => ({
        day: views.includes(DatePickerView.day),
        month: views.includes(DatePickerView.month),
        year: views.includes(DatePickerView.year),
      }),
      [views]
    )

    const triggerClickedTimestamp = React.useRef(0)
    const panelRef = React.useRef<HTMLInputElement>(null)
    const startInputRef = React.useRef<HTMLInputElement>(null)
    const endInputRef = React.useRef<HTMLInputElement>(null)

    const isDividedStyle = inputStyle === RangeInputStyle.divided

    const isMobile = useMobileView()

    const value = useSafeRangeValue(rawValue)

    const [activeInputIndex, setActiveInputIndex] = React.useState<0 | 1>(0)

    const [focused, setFocused] = React.useState(false)

    const focusTimeoutRef = React.useRef<ReturnType<typeof setTimeout>>()
    const debouncedSetFocused = (value: boolean) => {
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current)
      }
      focusTimeoutRef.current = setTimeout(() => {
        setFocused(value)
      }, 30)
    }

    useForceSecondRender(openProp)
    const { open, setOpen } = useOpenState({
      open: openProp,
      onStateChange: dropdownProps?.onStateChange,
    })

    const adapter = useDateLibAdapter<TDate>()

    const shouldDisableDate = useShouldDisableDate(adapter, {
      maxDate,
      minDate,
      disablePast,
      disableFuture,
      next_shouldDisableDate: next_shouldDisableDate ?? disableDate,
      next_shouldDisableMonth,
      next_shouldDisableYear,
    })

    const onChangeByIndex = React.useCallback(
      (newRange: TRangeDate<TDate>, index: 0 | 1) => {
        if (newRange[index] === null) {
          return
        }
        if (index === 0) {
          if (endInputRef.current) {
            endInputRef.current?.focus()
          } else {
            // picker without inputs
            setActiveInputIndex(1)
          }
        }
        if (index === 1) {
          if (startInputRef.current) {
            if (!newRange[0]) {
              startInputRef.current?.focus()
            }
          } else {
            // picker without inputs
            setActiveInputIndex(0)
          }
        }
      },
      []
    )

    const {
      selectedRange,
      setSelectedRangeByIndex,
      validationErrorEnd,
      validationErrorStart,
    } = useSelectRange<TDate>({
      value,
      //TODO: приведение для обратной совместимости кривых типов, удалить в 2.0
      onChange: onChange as (date: TRangeDate<TDate>) => void,
      onChangeByIndex,
      rawValue,
      minDate,
      maxDate,
      disableFuture,
      disablePast,
      disableDate: shouldDisableDate,
      triggerOnChangeOnInvalid,
    })

    const isStartInfinity = selectedRange[0] === -Infinity
    const isEndInfinity = selectedRange[1] === Infinity

    const maskedRangeInputProps = {
      range: selectedRange,
      changeDate: setSelectedRangeByIndex,
      format,
      mask,
      rawValue,
    }

    const { value: inputValueStart, onChange: inputHandleChangeStart } =
      useRangeMaskedInput<TDate>({
        ...maskedRangeInputProps,
        validationError: validationErrorStart,
        index: 0,
      })

    const { value: inputValueEnd, onChange: inputHandleChangeEnd } =
      useRangeMaskedInput<TDate>({
        ...maskedRangeInputProps,
        validationError: validationErrorEnd,
        index: 1,
      })

    const { handleKeyDown: handleKeyDownStart, handleBlur: handleBlurStart } =
      useRangeHandleFocus({
        panelRef,
        compareInputRef: endInputRef,
        open,
        setOpen,
        onKeyDown: startInputProps?.inputProps?.onKeyDown,
        onBlur: startInputProps?.inputProps?.onBlur,
      })

    const { handleKeyDown: handleKeyDownEnd, handleBlur: handleBlurEnd } =
      useRangeHandleFocus({
        panelRef,
        compareInputRef: startInputRef,
        open,
        setOpen,
        onKeyDown: endInputProps?.inputProps?.onKeyDown,
        onBlur: endInputProps?.inputProps?.onBlur,
      })

    const error =
      errorProp ||
      !!validationErrorStart ||
      !!validationErrorEnd ||
      startInputProps?.error ||
      endInputProps?.error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

    const validationErrorType = validationErrorStart ?? validationErrorEnd
    const helperText =
      helperTextProp ||
      (validationErrorType && validationErrorMessages[validationErrorType])

    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const className = clsx(classesMap.root, classNameProp, {
      [classesList.fullWidth]: !renderInput && fullWidth,
    })
    const inputContainerClassName = clsx(classesMap.inputContainer, {
      [classesMap.error]: error,
      [classesMap.disabled]: disabled,
      [classesMap.focused]: focused,
      [classesList.inputContainerDivided]: isDividedStyle,
      [classesList.small]: size === ElementSize.sm,
      [classesList.large]: size === ElementSize.lg,
    })

    const startInputClasses: InputBaseProps['classes'] = {
      ...startInputProps?.classes,
      root: clsx(
        classesList.input,
        classesList.inputStart,
        startInputProps?.classes?.root
      ),
      focused: clsx(
        classesList.inputFocused,
        startInputProps?.classes?.focused
      ),
      disabled: clsx(
        classesList.inputDisabled,
        startInputProps?.classes?.disabled
      ),
      error: clsx(classesList.inputError, startInputProps?.classes?.error),
    }

    const endInputClasses: InputBaseProps['classes'] = {
      ...endInputProps?.classes,
      root: clsx(
        classesList.input,
        classesList.inputEnd,
        endInputProps?.classes?.root
      ),
      focused: clsx(classesList.inputFocused, endInputProps?.classes?.focused),
      disabled: clsx(
        classesList.inputDisabled,
        endInputProps?.classes?.disabled
      ),
      error: clsx(classesList.inputError, endInputProps?.classes?.error),
    }

    const nativeInputPropsStart: InputBaseProps['inputProps'] = {
      autoComplete: 'off',
      ...startInputProps?.inputProps,
      onKeyDown: handleKeyDownStart,
      onBlur: handleBlurStart,
      onFocus: (event: React.FocusEvent<HTMLInputElement>) => {
        startInputProps?.inputProps?.onFocus?.(event)
        setActiveInputIndex(0)
      },
    }

    const nativeInputPropsEnd: InputBaseProps['inputProps'] = {
      autoComplete: 'off',
      ...endInputProps?.inputProps,
      onKeyDown: handleKeyDownEnd,
      onBlur: handleBlurEnd,
      onFocus: (event: React.FocusEvent<HTMLInputElement>) => {
        endInputProps?.inputProps?.onFocus?.(event)
        setActiveInputIndex(1)
      },
    }

    const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
      triggerClickedTimestamp.current = Date.now()
      if (startInputRef.current && endInputRef.current) {
        if (
          event.target === startInputRef.current ||
          event.target === startInputRef.current.parentElement ||
          event.target === endInputRef.current ||
          event.target === endInputRef.current.parentElement
        ) {
          return
        }

        if (!selectedRange[0] || (selectedRange[0] && selectedRange[1])) {
          startInputRef.current.focus()
        } else {
          endInputRef.current.focus()
        }
      }
    }

    const onDropdownStateChange = (value: boolean) => {
      const isAfterTriggerClick =
        Date.now() - triggerClickedTimestamp.current <
        TRIGGER_CLICK_DELAY_HANDLE
      if (isAfterTriggerClick && open) {
        return
      }
      setOpen(value)
    }

    const close = () => setOpen(false)
    const refOutsideScroll = useOutsideScroll(close)
    const mergedRootRefs = useMergedRefs([
      ref,
      hideDropdownOnOutsideScroll ? refOutsideScroll : null,
    ])

    const isSingleDatePanel =
      isMobile ||
      datePanelStyle === RangeDatePanelStyle.single ||
      (existedViews.month && !existedViews.day && !existedViews.year) ||
      (existedViews.year && !existedViews.day && !existedViews.month)

    const RangeDatePanelComponent = getRangeDatePanelComponent(
      isSingleDatePanel,
      datePanelStyle
    )

    const content = (
      <RangeDatePanelComponent<TDate>
        ref={panelRef}
        calendarViewClasses={calendarViewClasses}
        panelHeaderClasses={panelHeaderClasses}
        existedViews={existedViews}
        range={selectedRange}
        activeInputIndex={activeInputIndex}
        changeDate={setSelectedRangeByIndex}
        changeOpen={setOpen}
        minDate={minDate}
        maxDate={maxDate}
        disablePast={disablePast}
        disableFuture={disableFuture}
        shouldDisableDate={shouldDisableDate}
        allowInfinity={allowInfinity}
      />
    )

    const startSuffix = allowInfinity ? (
      <InputInfinityButton
        isInfinity={isStartInfinity}
        index={0}
        setSelectedRangeByIndex={
          // TODO кажется, что тут слишком сильная связность, InputInfinityIcon
          // должен быть более тупым компонентом, например просто обрабатывать onClick
          setSelectedRangeByIndex
        }
      />
    ) : (
      startInputProps?.suffix
    )

    const endSuffix = allowInfinity ? (
      <InputInfinityButton
        isInfinity={isEndInfinity}
        index={1}
        setSelectedRangeByIndex={
          // TODO кажется, что тут слишком сильная связность, InputInfinityIcon
          // должен быть более тупым компонентом, например просто обрабатывать onClick
          setSelectedRangeByIndex
        }
      />
    ) : (
      endInputProps?.suffix
    )

    const inputPropsStart: InputBaseProps | MaskedInputBaseProps = {
      error: !!validationErrorStart,
      showErrorIcon: isDividedStyle,
      ...startInputProps,
      classes: startInputClasses,
      disabled,
      inputRef: startInputRef,
      inputProps: nativeInputPropsStart,
      onFocusChange: debouncedSetFocused,
      suffix: startSuffix,
      size,
      value: inputValueStart,
      onChange: inputHandleChangeStart,
      fullWidth,
    }

    const inputPropsEnd: InputBaseProps | MaskedInputBaseProps = {
      error: !!validationErrorEnd,
      showErrorIcon: isDividedStyle,
      ...endInputProps,
      classes: endInputClasses,
      disabled,
      inputRef: endInputRef,
      inputProps: nativeInputPropsEnd,
      onFocusChange: debouncedSetFocused,
      suffix: endSuffix,
      size,
      value: inputValueEnd,
      onChange: inputHandleChangeEnd,
      fullWidth,
    }

    React.useEffect(() => {
      if (disabled && open) {
        setOpen(false)
      }
    }, [disabled, open, setOpen])

    return (
      <div {...rest} ref={mergedRootRefs} className={className}>
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
            action={DropdownTriggerType.click}
            {...dropdownProps}
            open={open}
            content={content}
            onStateChange={onDropdownStateChange}
          >
            {renderInput ? (
              <div onClick={onClick}>
                {renderInput(inputPropsStart, inputPropsEnd)}
              </div>
            ) : (
              <div className={inputContainerClassName} onClick={onClick}>
                {mask && !isStartInfinity ? (
                  <MaskedInputBase
                    {...(inputPropsStart as MaskedInputBaseProps)}
                    keepCharPositions
                    valueWithoutMask
                    mask={mask}
                  />
                ) : (
                  <InputBase {...inputPropsStart} />
                )}

                <div className={classesMap.divider}>
                  {isDividedStyle ? '' : '–'}
                </div>

                {mask && !isEndInfinity ? (
                  <MaskedInputBase
                    {...(inputPropsEnd as MaskedInputBaseProps)}
                    keepCharPositions
                    valueWithoutMask
                    mask={mask}
                  />
                ) : (
                  <InputBase {...inputPropsEnd} />
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
                          className={classesMap.errorIcon}
                        />
                      )
                    : null}
                  {suffix ?? <CalendarIcon />}
                </div>
              </div>
            )}
          </Dropdown>
        </Labelled>
      </div>
    )
  }
) as IRangePicker

RangePicker.displayName = 'RangePicker'
