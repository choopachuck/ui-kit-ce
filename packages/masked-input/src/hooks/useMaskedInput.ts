import * as React from 'react'
import { CommonProps, ChangeEvent } from '../interfaces'
import { MaskedInputCore } from '../core/MaskedInputCore'
import { isEqualKeyboardKeys } from '@v-uik/utils'
import { InputChangeReason } from '@v-uik/input'

interface IUseMaskedInputProps extends CommonProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  inputRef: React.RefObject<HTMLInputElement>
}

interface IUseMaskedInputResult {
  value: string
  onChange: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>,
    reason?: InputChangeReason
  ) => void
  inputProps: React.InputHTMLAttributes<HTMLInputElement>
}

export const useMaskedInput = (
  props: IUseMaskedInputProps
): IUseMaskedInputResult => {
  const {
    mask,
    value,
    onChange,
    formatCharacters,
    placeholderChar,
    valueWithoutMask,
    overtype,
    keepCharPositions,
    keepCaretPositionOnFocus,
    maskAsPlaceholder,
    placeholderString,
    groupCharShifting,
    inputProps: inputPropsProp,
    autoSelectOnFocus,
    inputRef,
  } = props

  const maskedInputCore = React.useRef<MaskedInputCore>(
    new MaskedInputCore({
      pattern: mask,
      value,
      formatCharacters,
      placeholderChar,
      overtype: overtype === undefined ? !!keepCharPositions : overtype,
      keepCharPositions,
      placeholderString,
      groupCharShifting,
    })
  ).current

  const prevValueRef = React.useRef(value)
  const prevMaskRef = React.useRef(mask)

  if (prevValueRef.current !== value) {
    maskedInputCore.setValue(value)
    prevValueRef.current = value
  }

  if (prevMaskRef.current !== mask) {
    maskedInputCore.setPattern(mask, {
      value: maskedInputCore.getRawValue(),
      placeholderString,
    })
    prevMaskRef.current = mask
  }

  const emitChange = React.useCallback(
    (
      newValue: string,
      event: ChangeEvent,
      reason: InputChangeReason = 'input'
    ) => {
      const value = valueWithoutMask
        ? (newValue !== maskedInputCore.emptyValue && newValue) || ''
        : maskedInputCore.getRawValue()

      onChange?.(value, event, reason)
    },
    [maskedInputCore, valueWithoutMask, onChange]
  )

  const handleChange = (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>,
    reason?: InputChangeReason
  ) => {
    const maskValue = maskedInputCore.getValue()
    const input = inputRef.current as HTMLInputElement

    if (maskValue === maskedInputCore.emptyValue) {
      return
    }

    if (reason === 'clear') {
      maskedInputCore.setValue('')
    }

    if (mask && value !== maskValue) {
      // Вырезание или удаление - сокращает размер значения.
      const isDeletion = value.length < maskValue.length

      if (isDeletion) {
        maskedInputCore.selection = {
          start: Number(input.selectionStart),
          end: Number(input.selectionStart) + maskValue.length - value.length,
        }
        maskedInputCore.backspace()
      }

      value = maskedInputCore.getValue()
      input.value =
        value === maskedInputCore.emptyValue && !maskAsPlaceholder ? '' : value

      if (value) {
        input.setSelectionRange(
          maskedInputCore.selection.start,
          maskedInputCore.selection.end
        )
      }

      if (isDeletion) {
        emitChange(value, event, reason)
      }
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const input = event.currentTarget

    let oldValue: string
    let value = ''
    let isChanged: boolean

    if (
      (event.ctrlKey || event.metaKey) &&
      event.key.toUpperCase() === (event.shiftKey ? 'Y' : 'Z') // undo
    ) {
      event.preventDefault()
      if (maskedInputCore.undo()) {
        value = maskedInputCore.getValue()
        input.value =
          value === maskedInputCore.emptyValue && !maskAsPlaceholder
            ? ''
            : value
        input.setSelectionRange(
          maskedInputCore.selection.start,
          maskedInputCore.selection.end
        )
        emitChange(value, event)
      }

      return
    } else if (
      (event.ctrlKey || event.metaKey) &&
      event.key.toUpperCase() === (event.shiftKey ? 'Z' : 'Y') // redo
    ) {
      event.preventDefault()
      if (maskedInputCore.redo()) {
        value = maskedInputCore.getValue()
        input.value =
          value === maskedInputCore.emptyValue && !maskAsPlaceholder
            ? ''
            : value
        input.setSelectionRange(
          maskedInputCore.selection.start,
          maskedInputCore.selection.end
        )
        emitChange(value, event)
      }

      return
    } else if (event.ctrlKey || event.metaKey) {
      return
    } else if (isEqualKeyboardKeys('Backspace', event.key)) {
      event.preventDefault()
      maskedInputCore.selection = {
        start: Number(input.selectionStart),
        end: Number(input.selectionEnd),
      }
      oldValue = input.value
      isChanged = false

      while (maskedInputCore.backspace()) {
        isChanged = true
        value = maskedInputCore.getValue()
        value =
          value === maskedInputCore.emptyValue && !maskAsPlaceholder
            ? ''
            : value

        if (value !== oldValue) {
          break
        }
      }

      if (isChanged) {
        input.value = value
        if (value) {
          input.setSelectionRange(
            maskedInputCore.selection.start,
            maskedInputCore.selection.end
          )
        }
        emitChange(value, event)
      }

      return
    } else if (isEqualKeyboardKeys('Delete', event.key)) {
      event.preventDefault()
      maskedInputCore.selection = {
        start: Number(input.selectionStart),
        end: Number(input.selectionEnd),
      }
      oldValue = input.value
      maskedInputCore.delete()
      value = maskedInputCore.getValue()
      value =
        value === maskedInputCore.emptyValue && !maskAsPlaceholder ? '' : value

      if (value !== oldValue) {
        input.value = value
        if (value) {
          input.setSelectionRange(
            maskedInputCore.selection.start,
            maskedInputCore.selection.end
          )
        }
        emitChange(value, event)
      }

      return
    } else {
      maskedInputCore.selection = {
        start: Number(input.selectionStart),
        end: Number(input.selectionEnd),
      }

      maskedInputCore.setValue(input.value)

      if (maskedInputCore.input(event.key)) {
        const value = maskedInputCore.getValue()
        input.value = value
        input.setSelectionRange(
          maskedInputCore.selection.start,
          maskedInputCore.selection.end
        )
        emitChange(value, event)
      }
    }

    inputPropsProp?.onKeyDown?.(event)
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    if (event && event.clipboardData) {
      event.preventDefault()
      const text = event.clipboardData.getData('Text')
      const input = event.currentTarget
      const onPaste = inputPropsProp?.onPaste

      if (onPaste) {
        onPaste(event)
      } else {
        maskedInputCore.selection = {
          start: Number(input.selectionStart),
          end: Number(input.selectionEnd),
        }
        maskedInputCore.paste(text)
        const value = maskedInputCore.getValue()
        input.value = value
        input.setSelectionRange(
          maskedInputCore.selection.start,
          maskedInputCore.selection.end
        )
        emitChange(value, event)
      }
    }
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const input = event.currentTarget

    if (autoSelectOnFocus) {
      input.setSelectionRange(0, maskedInputCore.value.length)
    } else if (!keepCaretPositionOnFocus) {
      // Blur срабатывает быстрее, чем обновляется selection в input'е,
      // запускаем проверку значений с задержкой.
      setTimeout(() => {
        if (
          input.selectionStart === input.selectionEnd &&
          Number(input.selectionEnd) >= maskedInputCore.value.length
        ) {
          // Устанавливем каретку на первый доступный для ввода символ.
          const firstFreePosition = maskedInputCore.getFirstFreePosition()
          input.setSelectionRange(firstFreePosition, firstFreePosition)
        }
      }, 0)
    }

    inputPropsProp?.onFocus?.(event)
  }

  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
    ...inputPropsProp,
    onKeyDown: handleKeyDown,
    onFocus: handleFocus,
    onPaste: handlePaste,
  }

  let valueToShow = ''
  if (value) {
    valueToShow = valueWithoutMask ? value : maskedInputCore.getValue()
  } else {
    if (maskAsPlaceholder) {
      valueToShow = maskedInputCore.emptyValue
    }
  }

  return {
    value: valueToShow,
    onChange: handleChange,
    inputProps,
  }
}
