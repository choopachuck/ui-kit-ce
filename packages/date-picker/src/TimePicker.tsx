'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { VirtualElement } from '@popperjs/core'
import { Dropdown, DropdownTriggerType } from '@v-uik/dropdown'
import { ElementSize, TrapFocus } from '@v-uik/common'
import { InputBase, InputBaseProps } from '@v-uik/input'
import { ClockIcon } from './components/ClockIcon/ClockIcon'
import {
  BaseTimePicker,
  StaticBaseTimePickerProps,
} from './views/BaseTimePicker'
import { MaskedInputBase, MaskedInputBaseProps } from '@v-uik/masked-input'
import { useOpenState } from './hooks/useOpenState'
import { useTimeInput } from './hooks/useTimeInput'
import { useSafeTimeFormat } from './hooks/useSafeTimeFormat'
import { useHandleChangeDate } from './hooks'
import { useDropdownStateChange } from './hooks/useDropdownStateChange'
import { useMergedRefs, useClassList } from '@v-uik/hooks'
import { isEqualKeyboardKeys } from '@v-uik/utils'
import { TimeRangePicker } from './TimeRangePicker'
import { TimePickerOwnProps } from './interfaces/time'
import { focusSelectedTime } from './utils/time'
import { TimeValidationErrorMessages } from './constants/common'
import { Labelled } from '@v-uik/labelled'

const useStyles = createUseStyles((theme) => ({
  root: {},
  inputContainer: {},
  dropdown: {
    boxSizing: 'border-box',
    padding: '8px 4px',
    backgroundColor: theme.comp.datePicker.dropdownColorBackground,
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
    boxShadow: theme.comp.datePicker.dropdownElevationShadow,
  },
  fullWidth: {
    alignItems: 'stretch',
  },
  error: {},
  disabled: {},
  inputRoot: {
    width: 176,
  },
}))

type Classes = Partial<
  Record<'root' | 'inputContainer' | 'error' | 'disabled' | 'dropdown', string>
>

export interface TimePickerProps<TDate = unknown> extends TimePickerOwnProps {
  /**
   * CSS классы компонента
   */
  classes?: Classes
  /**
   * Сообщения ошибок при вводе некорректного времени
   */
  validationErrorMessages?: Partial<TimeValidationErrorMessages>
  /**
   * Свойства компонента InputBase или MaskedInputBase
   */
  inputProps?: InputBaseProps | MaskedInputBaseProps
  /**
   * Значение пикера
   */
  value: TDate | null
  /**
   * Обработчик изменения значения
   */
  onChange: (value: TDate) => void
  /**
   * Функция для отображения поля ввода.
   *
   * @param {string} params.value - выбранное время
   * @param {React.ReactNode} params.suffix — иконка часов
   * @param {(value: TDate) => void} params.onChange — событие изменения даты
   * @param {boolean} params.disabled — состояние отключено
   * @param {ElementSizeType} params.size — размер инпута
   * @param {boolean} params.error — поле содержит ошибку
   */
  renderInput?: (params: InputBaseProps) => React.ReactNode
  /**
   * Базовые пропсы тайм пикера
   */
  baseTimePickerProps?: StaticBaseTimePickerProps<TDate>
  /**
   * Должен ли срабатывать onChange при вводе невалидной даты с клавиатуры
   */
  triggerOnChangeOnInvalid?: boolean
  className?: string
}

export type TimePickerComponent = <TDate>(
  props: TimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>
) => JSX.Element

export const TimePicker = React.forwardRef(
  <TDate extends unknown>(
    {
      classes,
      size = ElementSize.md,
      label,
      labelProps,
      helperText: helperTextValueProps,
      helperTextProps,
      dropdownProps,
      disabled,
      open: propsIsOpen,
      error: propsError,
      format,
      mask,
      inputProps: propsInputProps,
      baseTimePickerProps,
      renderInput,
      value,
      onChange,
      triggerOnChangeOnInvalid = false,
      validationErrorMessages = {},
      className,
      description,
      labelledClasses,
      keepHelperTextMinHeight,
      required,
      ...rest
    }: TimePickerProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    // states
    const { open, setOpen } = useOpenState({
      open: propsIsOpen,
      onStateChange: dropdownProps?.onStateChange,
    })

    // refs
    const panelRef = React.useRef<HTMLDivElement | null>(null)
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const mergedInputRef = useMergedRefs([
      propsInputProps?.inputRef ?? null,
      inputRef,
    ])

    // hooks
    const { onInputClick, onDropdownStateChange } = useDropdownStateChange({
      isOpen: open,
      setOpen,
      inputRef,
    })

    const safeFormat: string = useSafeTimeFormat(
      baseTimePickerProps?.is12HoursFormat,
      format
    )

    const handleChange = useHandleChangeDate({
      input: inputRef.current,
      onChange,
      format,
    })

    const {
      value: inputValue,
      onChange: inputHandleChange,
      validationError,
    } = useTimeInput<TDate>({
      is12HoursFormat: baseTimePickerProps?.is12HoursFormat,
      date: value as TDate,
      changeDate: handleChange,
      format: safeFormat,
      shouldDisableTime: baseTimePickerProps?.shouldDisableTime,
      triggerOnChangeOnInvalid,
    })

    // keyboard
    const handleInputKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        propsInputProps?.onKeyDown?.(event)
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
      [propsInputProps, setOpen]
    )

    const handleContainerKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (isEqualKeyboardKeys('Escape', event.key)) {
          setOpen(false)
        }
      },
      [setOpen]
    )

    const error = propsError || !!validationError
    const isOpen = !disabled && open

    // css
    const classesList = useStyles()
    const classesMap: Required<Classes> = useClassList(classesList, classes)

    const timepickerClassName = clsx(className, classesMap.root, {
      [classesMap.error]: error,
      [classesMap.disabled]: disabled,
      [classesList.fullWidth]: !renderInput && propsInputProps?.fullWidth,
    })

    const inputProps: InputBaseProps | MaskedInputBaseProps = {
      suffix: <ClockIcon />,
      ...propsInputProps,
      classes: {
        ...(propsInputProps?.classes ?? {}),
        root: clsx(propsInputProps?.classes?.root, classesList.inputRoot),
      },
      inputRef: mergedInputRef,
      value: inputValue,
      onChange: inputHandleChange,
      disabled,
      inputProps: {
        autoComplete: 'off',
        //@ts-expect-error Компонент корректно принимает data-атрибуты
        'data-v-uik-input-type': 'time',
        ...propsInputProps?.inputProps,
        role: 'combobox',
        'aria-haspopup': 'dialog',
        onKeyDown: handleInputKeyDown,
        'aria-expanded': open,
      },
      size,
      error,
    }

    const helperText =
      helperTextValueProps ||
      (validationError && validationErrorMessages[validationError])

    return (
      <div className={timepickerClassName} {...rest} ref={ref}>
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
            /**
             * Отслеживаем изменение ref для корректной передачи ссылки на родительский элемент,
             * если при первом рендере сверху пришло свойство open=true
             */
            anchor={() =>
              inputRef.current?.parentElement as HTMLElement | VirtualElement
            }
            role="dialog"
            {...dropdownProps}
            open={isOpen}
            content={
              <div
                ref={panelRef}
                className={classesMap.dropdown}
                onKeyDown={handleContainerKeyDown}
              >
                <TrapFocus focusSentinelStartByDefault={false}>
                  <BaseTimePicker
                    {...baseTimePickerProps}
                    value={value}
                    onClickLastNumberColumn={() => {
                      onDropdownStateChange(false)
                      setTimeout(() => {
                        const input = inputRef.current
                        if (!input) {
                          return
                        }

                        input.setSelectionRange(
                          input.value.length,
                          input.value.length
                        )
                      }, 0)
                    }}
                    onChange={handleChange}
                  />
                </TrapFocus>
              </div>
            }
            onStateChange={onDropdownStateChange}
          >
            <div className={classesMap.inputContainer} onClick={onInputClick}>
              {renderInput?.(inputProps) ??
                (mask ? (
                  <MaskedInputBase
                    {...(inputProps as MaskedInputBaseProps)}
                    keepCharPositions
                    valueWithoutMask
                    mask={mask}
                  />
                ) : (
                  <InputBase {...inputProps} />
                ))}
            </div>
          </Dropdown>
        </Labelled>
      </div>
    )
  }
) as unknown as TimePickerComponent & { RangePicker: typeof TimeRangePicker }

TimePicker.RangePicker = TimeRangePicker
