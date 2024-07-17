import * as React from 'react'
import { Input, InputProps } from '@v-uik/input'
import { CommonProps } from './interfaces'
import { useMaskedInput } from './hooks'
import {
  DEFAULT_PLACEHOLDER_CHAR,
  DEFAULT_FORMAT_CHARACTERS,
} from './core/constants'
import { useMergedRefs } from '@v-uik/hooks'

export interface MaskedInputProps
  extends CommonProps,
    Omit<InputProps, 'value' | 'onChange'> {}

export const MaskedInput = React.forwardRef(
  (
    {
      mask,
      value: valueProp,
      onChange: onChangeProp,
      formatCharacters = DEFAULT_FORMAT_CHARACTERS,
      placeholderChar = DEFAULT_PLACEHOLDER_CHAR,
      valueWithoutMask,
      overtype,
      keepCharPositions,
      keepCaretPositionOnFocus,
      maskAsPlaceholder,
      placeholderString,
      groupCharShifting,
      inputProps: inputPropsProp,
      autoSelectOnFocus,
      inputRef: inputRefProp,
      ...rest
    }: MaskedInputProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)

    const mergedInputRef = useMergedRefs([
      inputRefProp as React.RefObject<HTMLInputElement>,
      inputRef,
    ])

    const { value, onChange, inputProps } = useMaskedInput({
      mask,
      value: valueProp,
      onChange: onChangeProp,
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
    })

    return (
      <Input
        {...rest}
        ref={ref}
        inputRef={mergedInputRef}
        inputProps={inputProps}
        value={value}
        onChange={onChange}
      />
    )
  }
)
