import {
  SelectDropdownIndicator,
  SelectDropdownIndicatorProps,
} from './SelectDropdownIndicator'

import { OptionSuffix, OptionSuffixProps } from './OptionSuffix'

export * from './SelectButton'
export type { SelectDropdownIndicatorProps, OptionSuffixProps }

export type SelectComponents<
  ListElement extends React.ElementType,
  ListItemElement extends React.ElementType
> = {
  DropdownIndicator: React.ComponentType<
    SelectDropdownIndicatorProps<ListElement, ListItemElement>
  >
  OptionSuffix: React.ComponentType<OptionSuffixProps<ListItemElement>> | null
}

export type SelectComponentsConfig<
  ListElement extends React.ElementType,
  ListItemElement extends React.ElementType
> = Partial<SelectComponents<ListElement, ListItemElement>>

export const defaultSelectComponents = {
  DropdownIndicator: SelectDropdownIndicator,
  OptionSuffix: OptionSuffix,
}

export type SelectComponentsGeneric = typeof defaultSelectComponents

export const getComponents = <
  ListElement extends React.ElementType,
  ListItemElement extends React.ElementType
>(
  componentProp?:
    | SelectComponentsConfig<ListElement, ListItemElement>
    | undefined
): SelectComponentsGeneric =>
  ({
    ...defaultSelectComponents,
    ...componentProp,
  } as SelectComponentsGeneric)
