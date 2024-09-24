import { TreeItem } from './types'

export const getTreeItemChildren = <TItem = TreeItem>(
  item: TItem
): TItem[] | undefined =>
  (item as unknown as TreeItem).children as TItem[] | undefined

export const getTreeItemKey = <TItem = TreeItem>(item: TItem): React.Key =>
  (item as unknown as TreeItem).key

export const getTreeItemLabel = <TItem = TreeItem>(
  item: TItem
): React.ReactNode => (item as unknown as TreeItem).label

export const getTreeItemDisabled = <TItem = TreeItem>(item: TItem): boolean =>
  !!(item as unknown as TreeItem).disabled

export const getTreeItemCheckDisabled = <TItem = TreeItem>(
  item: TItem
): boolean => !!(item as unknown as TreeItem).checkDisabled

export const getTreeItemSelectDisabled = <TItem = TreeItem>(
  item: TItem
): boolean => !!(item as unknown as TreeItem).selectDisabled

export const getTreeItemLoadable = <TItem = TreeItem>(item: TItem): boolean =>
  !!(item as unknown as TreeItem).loadable
