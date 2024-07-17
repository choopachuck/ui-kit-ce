import * as React from 'react'
import { InputBase, InputBaseProps } from '@v-uik/input'
import { CommonProps } from './interfaces'
import { useMaskedInput } from './hooks/useMaskedInput'
import {
  DEFAULT_PLACEHOLDER_CHAR,
  DEFAULT_FORMAT_CHARACTERS,
} from './core/constants'
import { useMergedRefs } from '@v-uik/hooks'

export interface MaskedInputBaseProps
  extends CommonProps,
    Omit<InputBaseProps, 'value' | 'onChange'> {}

export const MaskedInputBase = React.forwardRef(
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
    }: MaskedInputBaseProps,
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
      <InputBase
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
