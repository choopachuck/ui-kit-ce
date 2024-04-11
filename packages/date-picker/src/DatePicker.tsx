'use client'

import * as React from 'react'
import { clsx, createUseStyles } from '@v-uik/theme'
import { Dropdown, DropdownProps, DropdownTriggerType } from '@v-uik/dropdown'
import { ElementSize, ElementSizeType, TrapFocus } from '@v-uik/common'
import { InputBase, InputBaseProps } from '@v-uik/input'
import { MaskedInputBase, MaskedInputBaseProps } from '@v-uik/masked-input'
import {
  useMergedRefs,
  useGeneratedId,
  useOutsideScroll,
  useForceSecondRender,
  useClassList,
} from '@v-uik/hooks'
import {
  BaseTimePicker,
  StaticBaseTimePickerProps,
} from './views/BaseTimePicker'
import {
  BaseDatePickerProps,
  DayParams,
  ValidateDateProps,
} from './interfaces/date'
import { useOpenState } from './hooks/useOpenState'
import { useMaskedInput } from './hooks/useMaskedInput'
import { useHandleFocus } from './hooks/useHandleFocus'
import { useSafeValue } from './hooks/useSafeValue'
import { CalendarIcon } from './components/CalendarIcon/CalendarIcon'
import { defaultValidationErrorMessages } from './constants/common'
import { CalendarPicker } from './views/CalendarPicker'
import { useDateLibAdapter } from './hooks/useDateLibAdapter'
import { isEqualKeyboardKeys, warning } from '@v-uik/utils'
import { ExternalCalendarViewComponentsPropsPartial } from './interfaces'
import { useShouldDisableDate } from './hooks/useShouldDisableDate'
import { ComponentIdContext } from './utils/ComponentIdContext'
import { useDefaultFocus } from './hooks/useDefaultFocus'
import {
  CalendarPickerClasses,
  DatePickerClasses as Classes,
} from './interfaces/classes'
import { useDropdownStateChange } from './hooks/useDropdownStateChange'
import { useMobileView } from './hooks/useMobileView'
import { MobileCalendarPicker } from './components/MobileCalendar/MobileCalendarPicker'
import { focusSelectedTime } from './utils/time'
import { Labelled, LabelledProps } from '@v-uik/labelled'

const useStyles = createUseStyles((theme) => ({
  root: {},

  fullWidth: {
    alignItems: 'stretch',
  },

  calendarPickerDropdown: {
    boxSizing: 'border-box',
    padding: 8,
    backgroundColor: theme.comp.datePicker.dropdownColorBackground,
    boxShadow: theme.comp.datePicker.dropdownElevationShadow,
    borderTopLeftRadius: theme.comp.datePicker.dropdownShapeBorderRadiusTopLeft,
    borderTopRightRadius:
      theme.comp.datePicker.dropdownShapeBorderRadiusTopRight,
    borderBottomLeftRadius:
      theme.comp.datePicker.dropdownShapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.datePicker.dropdownShapeBorderRadiusBottomRight,
    borderStyle: theme.shape.borderStyle,
    borderWidth: theme.shape.borderWidth,
    borderColor: theme.comp.datePicker.dropdownColorBorder,

    display: 'flex',
  },

  timePickerContainer: {
    marginLeft: 8,
    borderLeft: `1px solid ${
      theme.comp.timeView.dividerColorBorder ||
      theme.comp.dayView.dividerColorBorder
    }`,
  },

  timePickerRoot: {
    maxHeight: 348,
  },
  inputRoot: {
    width: 176,
  },
}))

export interface DatePickerProps<TDate = unknown>
  extends BaseDatePickerProps<TDate>,
    Omit<ValidateDateProps<TDate>, 'shouldDisableDate'>,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
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
   * Список классов для компонента CalendarPicker
   */
  calendarPickerClasses?: CalendarPickerClasses
  /**
   * Поле содержит ошибку
   */
  error?: boolean
  /**
   * Свойства компонента InputBase или MaskedInputBase
   */
  inputProps?: InputBaseProps | MaskedInputBaseProps
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
   *
   * @param {string} params.value - выбранное время
   * @param {React.ReactNode} params.suffix — иконка календаря
   * @param {(value: TDate) => void} params.onChange — событие изменения даты
   * @param {boolean} params.disabled — состояние отключено
   * @param {ElementSizeType} params.size — иконка календаря
   * @param {boolean} params.error — поле содержит ошибку
   */
  renderInput?: (
    params: InputBaseProps | MaskedInputBaseProps
  ) => React.ReactNode
  /**
   * Функция отключения даты. Функция будет вызвана для каждой даты (дня, месяца, года), которая
   * в данный момент отображается в календаре. Дата будет отключена, если функция вернет true.
   * Работает некорректно, рекомендуется использовать `next_shouldDisableDate`, `next_shouldDisableMonth`, `next_shouldDisableYear`
   * @param {TDate} date - дата для проверки
   */
  shouldDisableDate?: (date: TDate) => boolean
  /**
   * Функция для отображения дня.
   *
   * @param {string} params.value - текущий день
   * @param {() => void} params.onClick — событие выбора дня
   * @param {(event: React.FocusEvent<HTMLElement> => void} params.onFocus — функция фокуса на выбранном дне
   * @param {boolean} params.selected — состояние выбранного дня
   * @param {boolean} params.isToday — состояние сегодняшнего дня
   * @param {boolean} params.isCurrentMonth — состояние текущего месяца
   * @param {boolean} params.isNotCurrentMonth — состояние не текущего месяца
   * @param {boolean} params.disabled — состояние заблокированного дня
   */
  renderDay?: (params: DayParams) => React.ReactNode
  /**
   * показать ли выбор времени
   */
  timePickerProps?: StaticBaseTimePickerProps<TDate>

  calendarViewExternalProps?: ExternalCalendarViewComponentsPropsPartial<TDate>

  /**
   * Скрывать дропдаун при скроле вне дропдауна
   */
  hideDropdownOnOutsideScroll?: boolean
}

export type DatePickerComponent = <TDate>(
  props: DatePickerProps<TDate> & React.RefAttributes<HTMLDivElement>
) => JSX.Element

export const DatePicker = React.forwardRef(
  <TDate,>(
    {
      classes,
      className: classNameProp,
      label,
      labelProps,
      helperText: helperTextProp,
      helperTextProps,
      error: errorProp,
      value: rawValue,
      onChange,
      disabled,
      format,
      mask,
      minDate,
      maxDate,
      disableFuture,
      disablePast,
      disableDate,
      open: openProp,
      dropdownProps,
      inputProps,
      renderInput,
      validationErrorMessages: validationErrorMessagesProp,
      size = ElementSize.md,
      shouldDisableDate: shouldDisableDateProp,
      next_shouldDisableDate,
      next_shouldDisableMonth,
      next_shouldDisableYear,
      renderDay,
      calendarViewExternalProps,
      triggerOnChangeOnInvalid = false,
      hideDropdownOnOutsideScroll = false,
      timePickerProps,
      labelledClasses,
      calendarPickerClasses,
      description,
      keepHelperTextMinHeight,
      required,
      ...rest
    }: DatePickerProps<TDate>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    warning(
      !(disablePast || disableFuture),
      'DatePicker',
      'параметры `disablePast` и `disableFuture` не рекомендуется, в версии 2.X.X их заменит параметр `shouldDisableDate`'
    )
    const isMobile = useMobileView()

    const validationErrorMessages = {
      ...defaultValidationErrorMessages,
      validationErrorMessagesProp,
    }

    const inputRef = React.useRef<HTMLInputElement | null>(null)

    const panelRef = React.useRef<HTMLDivElement | null>(null)

    const { open, setOpen } = useOpenState({
      open: openProp,
      onStateChange: dropdownProps?.onStateChange,
    })
    useForceSecondRender(openProp)

    const adapter = useDateLibAdapter<TDate>()
    const componentSystemId = useGeneratedId()

    const shouldDisableDate = useShouldDisableDate(adapter, {
      maxDate,
      minDate,
      shouldDisableDate: shouldDisableDateProp,
      disablePast,
      disableFuture,
      next_shouldDisableDate,
      next_shouldDisableMonth,
      next_shouldDisableYear,
    })

    const value = useSafeValue(rawValue)

    const { detectCalendarOpenRef, scheduleFocusDateOnOpen } = useDefaultFocus(
      value,
      componentSystemId,
      adapter
    )

    const {
      value: inputValue,
      onChange: inputHandleChange,
      validationError,
    } = useMaskedInput<TDate>({
      date: rawValue,
      changeDate: onChange,
      format,
      mask,
      minDate,
      maxDate,
      disableFuture,
      disablePast,
      disableDate:
        next_shouldDisableDate ||
        next_shouldDisableMonth ||
        next_shouldDisableYear
          ? shouldDisableDate
          : disableDate,
      triggerOnChangeOnInvalid,
    })

    const handleOnKeyDown: React.KeyboardEventHandler<HTMLInputElement> =
      React.useCallback(
        (event) => {
          inputProps?.onKeyDown?.(event)
          if (
            isEqualKeyboardKeys('ArrowDown', event.key) ||
            isEqualKeyboardKeys('Enter', event.key)
          ) {
            event.preventDefault()

            setOpen(true)
            scheduleFocusDateOnOpen()
          }
        },
        [setOpen, inputProps?.onKeyDown, scheduleFocusDateOnOpen]
      )

    const { handleKeyDown, handleBlur } = useHandleFocus({
      open,
      setOpen,
      panelRef,
      onKeyDown: handleOnKeyDown,
      onBlur: inputProps?.onBlur,
    })

    const error = errorProp || !!validationError

    const helperText =
      helperTextProp ||
      (validationError && validationErrorMessages[validationError])

    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)

    const className = clsx(classesMap.root, classes?.root, classNameProp, {
      ...(classes?.error
        ? {
            [classes.error]: error,
          }
        : {}),
      ...(classes?.disabled
        ? {
            [classes.disabled]: disabled,
          }
        : {}),
      // позволяем растянуть input на 100% ширины, при отсутствии рендер функции
      [classesMap.fullWidth]: !renderInput && inputProps?.fullWidth,
    })

    const { onInputClick: onClick, onDropdownStateChange } =
      useDropdownStateChange({
        isOpen: open,
        setOpen,
        inputRef,
      })

    const timePickerContainerRef = React.useRef<HTMLDivElement>(null)

    const close = React.useCallback(() => {
      if (timePickerProps && timePickerContainerRef.current) {
        focusSelectedTime(timePickerContainerRef.current)

        return
      }

      setOpen(false)
    }, [timePickerProps, setOpen])

    const refOutsideScroll = useOutsideScroll(close)
    const mergedRootRefs = useMergedRefs([
      ref,
      hideDropdownOnOutsideScroll ? refOutsideScroll : null,
    ])

    const nativeInputProps = {
      ...inputProps?.inputProps,
      onKeyDown: handleKeyDown,
      onBlur: handleBlur,
    }

    const mergedInputRef = useMergedRefs([
      inputProps?.inputRef ?? null,
      inputRef,
    ])

    const commonInputProps: InputBaseProps | MaskedInputBaseProps = {
      suffix: <CalendarIcon />,
      ...inputProps,
      classes: {
        ...(inputProps?.classes ?? {}),
        root: clsx(
          {
            [classesMap.inputRoot]: !timePickerProps,
          },
          inputProps?.classes?.root
        ),
      },
      inputRef: mergedInputRef,
      value: inputValue,
      onChange: inputHandleChange,
      disabled,
      inputProps: {
        autoComplete: 'off',
        role: 'combobox',
        'aria-haspopup': 'dialog',
        'aria-expanded': open,
        ...nativeInputProps,
      },
      size,
      error,
    }

    const isOpen = !disabled && open

    const handleContainerKeyDown: React.KeyboardEventHandler<HTMLDivElement> =
      React.useCallback(
        (event) => {
          if (isEqualKeyboardKeys('Escape', event.key)) {
            setOpen(false)
          }
        },
        [setOpen]
      )

    const externalComponentsProps = {
      ...(calendarViewExternalProps ?? {}),
      dayViewProps: {
        ...(calendarViewExternalProps?.dayViewProps ?? {}),
        ref: useMergedRefs([
          detectCalendarOpenRef,
          calendarViewExternalProps?.dayViewProps?.ref ?? null,
        ]),
      },
    }

    const content = (
      <div
        ref={panelRef}
        className={clsx(
          classesMap.calendarPickerDropdown,
          classes?.calendarPickerDropdown
        )}
        onKeyDown={handleContainerKeyDown}
      >
        <TrapFocus focusSentinelStartByDefault={false}>
          {isMobile ? (
            <MobileCalendarPicker
              value={value}
              minDate={minDate}
              maxDate={maxDate}
              shouldDisableDate={shouldDisableDate}
              renderDay={renderDay}
              externalComponentsProps={externalComponentsProps}
              timePickerProps={timePickerProps}
              onChange={onChange}
              onChangeDay={close}
              onChangeMonth={scheduleFocusDateOnOpen}
            />
          ) : (
            <CalendarPicker
              classes={calendarPickerClasses || {}}
              value={value}
              minDate={minDate}
              maxDate={maxDate}
              shouldDisableDate={shouldDisableDate}
              renderDay={renderDay}
              externalComponentsProps={externalComponentsProps}
              onChange={onChange}
              onChangeDay={close}
              onChangeMonth={scheduleFocusDateOnOpen}
            />
          )}

          {!isMobile && timePickerProps && (
            <div
              ref={timePickerContainerRef}
              className={classesMap.timePickerContainer}
            >
              <BaseTimePicker
                classes={{ root: classesMap.timePickerRoot }}
                {...timePickerProps}
                value={value}
                onChange={onChange}
                onClickLastNumberColumn={() => setOpen(false)}
              />
            </div>
          )}
        </TrapFocus>
      </div>
    )

    return (
      <ComponentIdContext.Provider value={componentSystemId}>
        <div {...rest} ref={mergedRootRefs} className={className}>
          <Labelled
            size={size}
            keepHelperTextMinHeight={keepHelperTextMinHeight}
            required={required}
            classes={labelledClasses}
            label={label}
            helperText={helperText}
            description={description}
            labelProps={labelProps}
            disabled={disabled}
            error={error}
            helperTextProps={helperTextProps}
          >
            <Dropdown
              placement="bottom-start"
              action={DropdownTriggerType.click}
              anchor={inputRef.current?.parentElement}
              {...dropdownProps}
              open={isOpen}
              content={content}
              onStateChange={onDropdownStateChange}
            >
              <div className={classes?.inputContainer} onClick={onClick}>
                {renderInput?.(commonInputProps) ??
                  (mask ? (
                    <MaskedInputBase
                      {...(commonInputProps as MaskedInputBaseProps)}
                      keepCharPositions
                      valueWithoutMask
                      mask={mask}
                    />
                  ) : (
                    <InputBase {...commonInputProps} />
                  ))}
              </div>
            </Dropdown>
          </Labelled>
        </div>
      </ComponentIdContext.Provider>
    )
  }
) as DatePickerComponent
