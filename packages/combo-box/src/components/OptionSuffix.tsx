import React from 'react'

export type OptionSuffixProps<Option> = {
  option: Option
  multiple?: boolean
  selected?: boolean
  showCheckMark?: boolean
  customOptionSuffix?: React.ReactNode
}
