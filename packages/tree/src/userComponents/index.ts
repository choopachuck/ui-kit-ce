import {
  TreeNodeExpandIcon,
  TreeNodeExpandIconProps,
} from './TreeNodeExpandIcon'
import { TreeNodeContent, TreeNodeContentProps } from './TreeNodeContent'
import { TreeNodeIcon, TreeNodeIconProps } from './TreeNodeIcon'
import {
  TreeNodeExpandButton,
  TreeNodeExpandButtonProps,
} from './TreeNodeExpandButton'
import { TreeNodeCheckbox, TreeNodeCheckboxProps } from './TreeNodeCheckbox'
import {
  TreeNodeLoadingIndicatorProps,
  TreeNodeLoadingIndicator,
} from './TreeNodeLoadingIndicator'
import { TreeItem } from '../hooks'

export type TreeComponents<TItem = TreeItem> = {
  ExpandIcon: React.ComponentType<TreeNodeExpandIconProps<TItem>> | null
  Content: React.ComponentType<TreeNodeContentProps<TItem>> | null
  Icon: React.ComponentType<TreeNodeIconProps<TItem>> | null
  ExpandButton: React.ComponentType<TreeNodeExpandButtonProps<TItem>> | null
  Checkbox: React.ComponentType<TreeNodeCheckboxProps<TItem>> | null
  LoadingIndicator: React.ComponentType<
    TreeNodeLoadingIndicatorProps<TItem>
  > | null
}

export type TreeComponentsConfig<TItem = TreeItem> = Partial<
  TreeComponents<TItem>
>

export const defaultTreeComponents: TreeComponents = {
  Content: TreeNodeContent,
  Icon: TreeNodeIcon,
  ExpandButton: TreeNodeExpandButton,
  Checkbox: TreeNodeCheckbox,
  ExpandIcon: TreeNodeExpandIcon,
  LoadingIndicator: TreeNodeLoadingIndicator,
}

export type TreeComponentsGeneric<TItem = TreeItem> = TreeComponents<TItem>

export const getComponents = <TItem = TreeItem>(
  componentProp?: TreeComponentsConfig<TItem> | undefined
): TreeComponentsGeneric<TItem> =>
  ({
    ...defaultTreeComponents,
    ...componentProp,
  } as TreeComponentsGeneric<TItem>)

export type {
  TreeNodeCheckboxProps,
  TreeNodeContentProps,
  TreeNodeExpandButtonProps,
  TreeNodeExpandIconProps,
  TreeNodeIconProps,
  TreeNodeLoadingIndicatorProps,
}
