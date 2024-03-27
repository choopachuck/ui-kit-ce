import {
  SelectDropdownIndicator,
  SelectDropdownIndicatorProps,
} from './SelectDropdownIndicator'

export * from './SelectButton'
export type { SelectDropdownIndicatorProps }

export type SelectComponents<
  ListElement extends React.ElementType,
  ListItemElement extends React.ElementType
> = {
  DropdownIndicator: React.ComponentType<
    SelectDropdownIndicatorProps<ListElement, ListItemElement>
  >
}

export type SelectComponentsConfig<
  ListElement extends React.ElementType,
  ListItemElement extends React.ElementType
> = Partial<SelectComponents<ListElement, ListItemElement>>

export const defaultSelectComponents = {
  DropdownIndicator: SelectDropdownIndicator,
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
