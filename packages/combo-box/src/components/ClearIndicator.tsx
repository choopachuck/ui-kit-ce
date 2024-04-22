import * as React from 'react'
import {
  ElementSizeType,
  ClearButton,
  ComponentPropsWithRefFix,
} from '@v-uik/common'
import { CommonProps } from '../interfaces'

type Classes = Partial<Record<'clearIndicator' | 'disabled' | 'small', string>>

export type ClearIndicatorProps<Option> = {
  children?: React.ReactNode
  classes?: Classes
  innerProps: ComponentPropsWithRefFix<'div'>
  disabled?: boolean
  size: ElementSizeType
} & CommonProps<Option>

export const ClearIndicator = React.forwardRef(
  <Option,>(
    { children, classes, ...rest }: ClearIndicatorProps<Option>,
    ref: React.Ref<HTMLDivElement>
  ) => (
    <ClearButton
      ref={ref}
      classes={{
        clearButton: classes?.clearIndicator,
        disabled: classes?.disabled,
        small: classes?.small,
      }}
      clearIcon={children}
      {...rest}
    />
  )
)
