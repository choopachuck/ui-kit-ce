import * as React from 'react'
import { SelectContainer, SelectContainerProps } from './SelectContainer'
import { Control, ControlProps } from './Control'
import { ValueContainer, ValueContainerProps } from './ValueContainer'
import {
  IndicatorContainer,
  IndicatorContainerProps,
} from './IndicatorContainer'
import { SingleValue, SingleValueProps } from './SingleValue'
import { DropdownIndicator, DropdownIndicatorProps } from './DropdownIndicator'
import { ClearIndicator, ClearIndicatorProps } from './ClearIndicator'
import { MultiValue, MultiValueProps } from './MultiValue'
import { Input, InputProps } from './Input'
import { Placeholder, PlaceholderProps } from './Placeholder'
import { OptionList, OptionListProps } from './OptionList'
import { OptionItem, OptionItemProps } from './OptionItem'
import { OptionPrefixProps } from './OptionPrefix'
import { OptionSuffixProps } from './OptionSuffix'
import { Checkbox, CheckboxProps } from '@v-uik/checkbox'

export type { OptionListProps, OptionItemProps }

export type ComboBoxComponents<
  Option,
  ListElement extends React.ElementType,
  OptionItemElement extends React.ElementType
> = {
  ClearIndicator: React.ComponentType<ClearIndicatorProps<Option>>
  Control: React.ComponentType<ControlProps<Option>>
  DropdownIndicator: React.ComponentType<DropdownIndicatorProps<Option>>
  IndicatorContainer: React.ComponentType<IndicatorContainerProps<Option>>
  Input: React.ComponentType<InputProps<Option>>
  MultiValue: React.ComponentType<MultiValueProps<Option>>
  MultiCheckbox: React.ComponentType<CheckboxProps>
  Placeholder: React.ComponentType<PlaceholderProps<Option>>
  SelectContainer: React.ComponentType<SelectContainerProps<Option>>
  SingleValue: React.ComponentType<SingleValueProps<Option>>
  ValueContainer: React.ComponentType<ValueContainerProps<Option>>
  OptionList: React.ComponentType<
    OptionListProps<Option, ListElement, OptionItemElement>
  >
  OptionItem: React.ComponentType<OptionItemProps<Option, OptionItemElement>>
  OptionPrefix: React.ComponentType<OptionPrefixProps<Option>> | null
  OptionSuffix: React.ComponentType<OptionSuffixProps<Option>> | null
}

export type ComboBoxComponentsConfig<
  Option,
  ListElement extends React.ElementType,
  OptionItemElement extends React.ElementType
> = Partial<ComboBoxComponents<Option, ListElement, OptionItemElement>>

export const defaultComboboxComponents = {
  ClearIndicator: ClearIndicator,
  Control: Control,
  DropdownIndicator: DropdownIndicator,
  IndicatorContainer: IndicatorContainer,
  Input: Input,
  MultiValue: MultiValue,
  MultiCheckbox: Checkbox,
  Placeholder: Placeholder,
  SelectContainer: SelectContainer,
  SingleValue: SingleValue,
  ValueContainer: ValueContainer,
  OptionList: OptionList,
  OptionItem: OptionItem,
}

export type ComboBoxComponentsGeneric = typeof defaultComboboxComponents & {
  OptionPrefix?: React.ComponentType<OptionPrefixProps<unknown>> | null
  OptionSuffix?: React.ComponentType<OptionSuffixProps<unknown>> | null
}

export const getComponents = <
  Option,
  ListElement extends React.ElementType,
  OptionItemElement extends React.ElementType
>(
  componentProp?:
    | ComboBoxComponentsConfig<Option, ListElement, OptionItemElement>
    | undefined
): ComboBoxComponentsGeneric =>
  ({
    ...defaultComboboxComponents,
    ...componentProp,
  } as ComboBoxComponentsGeneric)

export type {
  ControlProps,
  DropdownIndicatorProps,
  IndicatorContainerProps,
  MultiValueProps,
  PlaceholderProps,
  SelectContainerProps,
  SingleValueProps,
  ValueContainerProps,
  OptionSuffixProps,
  OptionPrefixProps,
  ClearIndicatorProps,
}
