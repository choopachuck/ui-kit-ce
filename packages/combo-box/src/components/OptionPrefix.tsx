import React from 'react'
import { CheckboxProps } from '@v-uik/checkbox'

export type OptionPrefixComponents = {
  MultiCheckbox: React.ComponentType<CheckboxProps> | null
}

export type OptionPrefixProps<Option> = {
  option: Option
  multiple?: boolean
  selected?: boolean
  disabled?: boolean
  creating?: boolean
  components?: OptionPrefixComponents
  customOptionPrefix?: React.ReactNode
}
