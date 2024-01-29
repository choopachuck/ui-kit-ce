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
  Placeholder: React.ComponentType<PlaceholderProps<Option>>
  SelectContainer: React.ComponentType<SelectContainerProps<Option>>
  SingleValue: React.ComponentType<SingleValueProps<Option>>
  ValueContainer: React.ComponentType<ValueContainerProps<Option>>
  OptionList: React.ComponentType<
    OptionListProps<Option, ListElement, OptionItemElement>
  >
  OptionItem: React.ComponentType<OptionItemProps<Option, OptionItemElement>>
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
  Placeholder: Placeholder,
  SelectContainer: SelectContainer,
  SingleValue: SingleValue,
  ValueContainer: ValueContainer,
  OptionList: OptionList,
  OptionItem: OptionItem,
}

export type ComboBoxComponentsGeneric = typeof defaultComboboxComponents

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
