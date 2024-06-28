import * as React from 'react'
import type { CommonProps, ChangeEvent } from '../../interfaces'
import type { InputChangeReason } from '@v-uik/input'
import { MaskedInputCore } from '../../core/MaskedInputCore'
import { dispatchChangeEvent } from '@v-uik/utils'
import { MaskedInputAction } from './MaskedInputAction'
import { DATA_V_UIK_INPUT_TYPE } from '@v-uik/common'

interface IUseMaskedInputProps extends CommonProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
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
    value: valueProp,
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
  } = props

  const [mockValue, setMockValue] = React.useState('')

  const maskedInputCore = React.useRef<MaskedInputCore>(
    new MaskedInputCore({
      pattern: mask,
      value: valueProp,
      formatCharacters,
      placeholderChar,
      overtype: overtype === undefined ? !!keepCharPositions : overtype,
      keepCharPositions,
      placeholderString,
      groupCharShifting,
    })
  ).current

  const prevValueRef = React.useRef<string | null>(null)
  const prevMaskRef = React.useRef(mask)

  if (prevValueRef.current !== valueProp) {
    maskedInputCore.setValue(valueProp)
    prevValueRef.current = String(valueProp)
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
      const input = event.target

      if (input instanceof HTMLInputElement) {
        const { start, end } = maskedInputCore.selection
        input.setSelectionRange(start, end)
      }

      if (valueWithoutMask) {
        onChange?.(newValue, event, reason)
      } else {
        // В кейсе, когда не указывается valueWithoutMask и значение пустое, то мокаем
        // отображаемое значение и не вызываем onChange
        if (!maskedInputCore.getRawValue().trim().length) {
          if (prevValueRef.current) {
            onChange?.('', event, reason)
          }
          setMockValue(newValue)
        } else {
          setMockValue('')
          onChange?.(maskedInputCore.getRawValue(), event, reason)
        }
      }
    },
    [maskedInputCore, valueWithoutMask, onChange]
  )

  const handleChange = (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>,
    reason?: InputChangeReason
  ) => {
    if (!mask) {
      return
    }

    const maskedInputAction = new MaskedInputAction(maskedInputCore, event, {
      maskAsPlaceholder,
      reason,
      valueWithoutMask,
    })
    const isValueChanged = maskedInputAction.performChange(value)

    if (isValueChanged) {
      emitChange(maskedInputAction.getResultValue(), event, reason)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const input = event.currentTarget

    let value = ''

    // TODO: убрать и переделать на handleChange с использованием MaskedInputAction:: _performUndo
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
        dispatchChangeEvent(input, value)
        emitChange(value, event)
      }

      return
    } else if (
      // TODO: убрать и переделать на handleChange с использованием MaskedInputAction:: _performRedo
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
        dispatchChangeEvent(input, value)
        emitChange(value, event)
      }

      return
    } else if (event.ctrlKey || event.metaKey) {
      return
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
        maskedInputCore.paste(text.trim())
        const value = maskedInputCore.getValue()
        input.value = value
        input.setSelectionRange(
          maskedInputCore.selection.start,
          maskedInputCore.selection.end
        )
        dispatchChangeEvent(input, value)
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
          // Устанавливаем каретку на первый доступный для ввода символ.
          const firstFreePosition = maskedInputCore.getFirstFreePosition()

          input.setSelectionRange(firstFreePosition, firstFreePosition)
        }
      }, 0)
    }

    inputPropsProp?.onFocus?.(event)
  }

  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
    //@ts-ignore Компонент корректно принимает data-атрибуты
    [DATA_V_UIK_INPUT_TYPE]: 'masked-input',
    ...inputPropsProp,
    onKeyDown: handleKeyDown,
    onFocus: handleFocus,
    onPaste: handlePaste,
  }

  let value = ''

  if (valueProp) {
    value = maskedInputCore.getValue()
  } else {
    if (maskAsPlaceholder) {
      value = maskedInputCore.emptyValue
    }
  }

  return {
    value: mockValue || value,
    onChange: handleChange,
    inputProps,
  }
}
