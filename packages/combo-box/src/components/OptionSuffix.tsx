import React from 'react'
import { ComboBoxOptionIcon } from '../assets/ComboBoxOptionIcon'

export type OptionSuffixProps<Option> = {
  option: Option
  multiple?: boolean
  selected?: boolean
  showCheckMark?: boolean
  customOptionSuffix?: React.ReactNode
}

export const OptionSuffix = <Option,>({
  selected,
  multiple,
  showCheckMark,
  customOptionSuffix,
}: OptionSuffixProps<Option>): JSX.Element => {
  if (!multiple && selected) {
    return (
      <>
        {customOptionSuffix}
        {showCheckMark && <ComboBoxOptionIcon />}
      </>
    )
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{customOptionSuffix}</>
}
