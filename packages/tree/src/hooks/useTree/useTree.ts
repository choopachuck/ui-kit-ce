'use client'

import * as React from 'react'
import {
  TreeItem,
  UseTreeProps,
  UseTreeReturnProps,
  TreeNodeItem,
  TreeState,
  TreeNodePlain,
  TreeGetters,
} from '../types'
import * as Getters from '../getters'
import { useExpand } from '../useExpand'
import { useCheck } from '../useCheck'
import { useValue } from '@v-uik/hooks'
import { useSelect } from '../useSelect'

const makeFormatValueFromProp =
  <TItem = TreeItem>({
    getTreeItemChildren,
    getTreeItemKey,
    getTreeItemCheckDisabled,
    getTreeItemDisabled,
    getTreeItemSelectDisabled,
    getTreeItemLoadable,
  }: TreeGetters<TItem>) =>
  (dataSource: TItem[]): TreeState<TItem> => {
    const allowedKeysForExpand: Record<React.Key, boolean> = {}
    const disabledKeysForCheck: Record<React.Key, boolean> = {}
    const disabledKeysForSelect: Record<React.Key, boolean> = {}
    const treePlain: TreeNodePlain<TItem> = {}
    const nodeKeys: React.Key[] = []

    const processTreeItems = (dataSource: TItem[], depth = 0, parent?: TItem) =>
      dataSource.reduce((accum, item) => {
        const children = getTreeItemChildren(item)
        const disabled = getTreeItemDisabled(item)
        const key = getTreeItemKey(item)
        const parentKey = parent ? getTreeItemKey(parent) : undefined
        nodeKeys.push(key)

        if (
          getTreeItemCheckDisabled(item) ||
          disabled ||
          (parentKey && disabledKeysForCheck[parentKey])
        ) {
          disabledKeysForCheck[key] = true
        }

        if (getTreeItemSelectDisabled(item) || disabled) {
          disabledKeysForSelect[key] = true
        }

        const node: TreeNodeItem<TItem> = {
          ...item,
        } as unknown as TreeNodeItem<TItem>

        const meta: TreeNodeItem<TItem>['$meta'] = {
          depth,
          id: String(key),
          order: nodeKeys.length,
          disabled,
        } as TreeNodeItem<TItem>['$meta']

        if (parentKey) {
          meta['parentKey'] = parentKey
        }

        if (children?.length || getTreeItemLoadable(item)) {
          allowedKeysForExpand[key] = true
        }

        if (children?.length) {
          meta['closestChildKey'] = getTreeItemKey(children[0])
          meta['boundaryChildrenKeys'] = children.map((item) =>
            String(getTreeItemKey(item))
          )
        }

        node['$meta'] = meta

        accum.push(node)
        treePlain[key] = node

        if (children?.length) {
          node['children'] = processTreeItems(
            children,
            depth + 1,
            node as unknown as TItem
          )
        }

        return accum
      }, [] as unknown as TreeNodeItem<TItem>[])

    const tree = processTreeItems(dataSource)

    return {
      tree,
      treePlain,
      allowedKeysForExpand,
      disabledKeysForCheck,
      disabledKeysForSelect,
      nodeKeys,
    }
  }

export const useTree = <TItem = TreeItem>({
  dataSource,
  getters: {
    getTreeItemChildren = Getters.getTreeItemChildren,
    getTreeItemKey = Getters.getTreeItemKey,
    getTreeItemLabel = Getters.getTreeItemLabel,
    getTreeItemCheckDisabled = Getters.getTreeItemCheckDisabled,
    getTreeItemDisabled = Getters.getTreeItemDisabled,
    getTreeItemSelectDisabled = Getters.getTreeItemSelectDisabled,
    getTreeItemLoadable = Getters.getTreeItemLoadable,
  } = Getters,
  onNodeExpand,
  defaultExpandedKeys,
  expandedKeys,
  checkedKeys,
  defaultCheckedKeys,
  onNodeCheck,
  defaultSelectedKeys,
  onNodeSelect,
  selectedKeys,
  multipleSelect,
  selectMode,
  onLoadData,
}: UseTreeProps<TItem>): UseTreeReturnProps<TItem> => {
  const getters = React.useMemo(
    () => ({
      getTreeItemChildren,
      getTreeItemKey,
      getTreeItemLabel,
      getTreeItemCheckDisabled,
      getTreeItemDisabled,
      getTreeItemSelectDisabled,
      getTreeItemLoadable,
    }),
    [
      getTreeItemChildren,
      getTreeItemKey,
      getTreeItemLabel,
      getTreeItemCheckDisabled,
      getTreeItemDisabled,
      getTreeItemSelectDisabled,
      getTreeItemLoadable,
    ]
  )

  const [
    {
      tree,
      allowedKeysForExpand,
      treePlain,
      disabledKeysForCheck,
      nodeKeys,
      disabledKeysForSelect,
    },
  ] = useValue(dataSource, {
    formatValueFromProp: makeFormatValueFromProp<TItem>(getters),
  })

  const { getIsExpanded, toggleExpand, getIsLoading } = useExpand({
    allowedKeysForExpand,
    treePlain,
    onNodeExpand,
    defaultExpandedKeys,
    expandedKeys,
    onLoadData,
    getters,
  })

  const { getIsChecked, getIsIndeterminate, toggleCheck } = useCheck({
    disabledKeysForCheck,
    treePlain,
    checkedKeys,
    defaultCheckedKeys,
    onNodeCheck,
  })

  const {
    getIsSelected,
    toggleSelect,
    toggleSelectRange,
    getFirstSelectedKey,
    getLastSelectedKey,
  } = useSelect<TItem>({
    defaultSelectedKeys,
    onNodeSelect,
    selectedKeys,
    treePlain,
    disabledKeysForSelect,
    multipleSelect,
    selectMode,
    nodeKeys,
    getIsExpanded,
  })

  const getTreeNodeData = React.useCallback(
    (key: React.Key) => treePlain[key],
    [treePlain]
  )

  return {
    tree,
    getIsExpanded,
    toggleExpand,
    getIsChecked,
    getIsIndeterminate,
    toggleCheck,
    nodeKeys,
    getIsSelected,
    toggleSelect,
    toggleSelectRange,
    getTreeNodeData,
    getFirstSelectedKey,
    getLastSelectedKey,
    getIsLoading,
  }
}
