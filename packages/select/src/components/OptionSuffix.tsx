import React from 'react'
import { Option } from '../interfaces'
import { SelectOptionIcon } from '../assets/SelectOptionIcon'

export type OptionSuffixProps<ListItemElement extends React.ElementType> = {
  selected?: boolean
  option: Option<ListItemElement>
}

export const OptionSuffix = <ListItemElement extends React.ElementType>({
  selected,
}: OptionSuffixProps<ListItemElement>): React.ReactElement | null => {
  return selected ? <SelectOptionIcon /> : null
}
