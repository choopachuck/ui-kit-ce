import * as React from 'react'
import { Picker, PickerProps } from './PageSizer'
import { PageButton, PageButtonProps } from './PageButton'

export type PaginationComponents = {
  PageSizer: React.ComponentType<PickerProps>
  PagePicker: React.ComponentType<PickerProps>
  FirstPageButton: React.ComponentType<PageButtonProps>
  LastPageButton: React.ComponentType<PageButtonProps>
  PrevPageButton: React.ComponentType<PageButtonProps>
  NextPageButton: React.ComponentType<PageButtonProps>
}

export type PaginationComponentsConfig = Partial<PaginationComponents>

export const components = {
  PageSizer: Picker,
  PagePicker: Picker,
  FirstPageButton: PageButton,
  LastPageButton: PageButton,
  PrevPageButton: PageButton,
  NextPageButton: PageButton,
}

export type PaginationComponentsGeneric = typeof components

export const defaultComponents = (
  componentProp?: PaginationComponentsConfig | undefined
): PaginationComponentsGeneric =>
  ({
    ...components,
    ...componentProp,
  } as PaginationComponentsGeneric)
