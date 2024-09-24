'use client'

/* eslint-disable react/prop-types */

import * as React from 'react'
import { TreeSize, getTreeProperty } from './common'
import { useTree, TreeItem, TreeSelectMode } from './hooks'
import * as Getters from './hooks/getters'
import { TreeContextProvider } from './TreeContext'
import { useStyles } from './styles'
import { useClassList } from '@v-uik/hooks'
import { clsx } from '@v-uik/theme'
import { TreeProps, TreeImperativeHandlersRef } from './types'
import { getComponents } from './userComponents'
import { TreeNodeList } from './TreeNodeList'
import { TreeSelectionProvider } from './TreeSelectionContext'
import { TreeRoot } from './TreeRoot'

const _Tree = React.forwardRef(
  <TItem extends unknown = TreeItem>(
    {
      getters: {
        getTreeItemChildren = Getters.getTreeItemChildren,
        getTreeItemKey = Getters.getTreeItemKey,
        getTreeItemLabel = Getters.getTreeItemLabel,
        getTreeItemCheckDisabled = Getters.getTreeItemCheckDisabled,
        getTreeItemDisabled = Getters.getTreeItemDisabled,
        getTreeItemSelectDisabled = Getters.getTreeItemSelectDisabled,
        getTreeItemLoadable = Getters.getTreeItemLoadable,
      } = Getters,
      classes,
      className,
      size = TreeSize.sm,
      dataSource,
      onNodeExpand,
      defaultExpandedKeys,
      expandedKeys,
      components,
      maxContentLines = 1,
      showIcons = false,
      showTrails = false,
      withHalfLevelSpacer = false,
      checkable = false,
      checkedKeys,
      disableExpand = false,
      defaultCheckedKeys,
      onNodeCheck,
      onNodeClick,
      getExpandButtonInnerProps,
      selectable = false,
      defaultSelectedKeys,
      selectedKeys,
      onNodeSelect,
      enableCheckOnClick = false,
      disableExpandOnClick = false,
      disableSelectOnClick = false,
      multipleSelect = false,
      selectMode = TreeSelectMode.strict,
      disableFocusTreeOnItemClick = false,
      onTreeKeyDown,
      levelSpacer,
      disabled = false,
      onLoadData,
      ...rest
    }: TreeProps<TItem>,
    ref: React.Ref<TreeImperativeHandlersRef<TItem>>
  ) => {
    const treeRef = React.useRef<HTMLUListElement>(null)

    const getters = {
      getTreeItemChildren,
      getTreeItemKey,
      getTreeItemLabel,
      getTreeItemCheckDisabled,
      getTreeItemDisabled,
      getTreeItemSelectDisabled,
      getTreeItemLoadable,
    }

    const baseProps = {
      selectMode,
      multipleSelect,
    }

    const treeProps = {
      size,
      maxContentLines,
      disableFocusTreeOnItemClick,
      levelSpacer,
      showIcons,
      showTrails,
      withHalfLevelSpacer,
      checkable,
      disableExpand,
      onNodeClick,
      getExpandButtonInnerProps,
      selectable,
      enableCheckOnClick,
      disableExpandOnClick,
      disableSelectOnClick,
      disabled,
      onLoadData,
      ...baseProps,
    }

    const tree = useTree<TItem>({
      getters,
      dataSource,
      checkedKeys,
      onNodeCheck,
      onNodeExpand,
      defaultExpandedKeys,
      expandedKeys,
      defaultCheckedKeys,
      defaultSelectedKeys,
      selectedKeys,
      onNodeSelect,
      onLoadData,
      ...baseProps,
    })

    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)

    const treeClassName = clsx(classesMap.root, className, {
      [classesMap.rootExtraSmall]: size === TreeSize.xs,
      [classesMap.rootSmall]: size === TreeSize.sm,
      [classesMap.rootMedium]: size === TreeSize.md,
    })

    return (
      <TreeContextProvider
        getters={getters}
        classesMap={classesMap}
        components={getComponents(components)}
        treeRef={treeRef}
      >
        <TreeSelectionProvider>
          <TreeRoot
            ref={ref}
            role="tree"
            aria-label="Tree"
            tabIndex={0}
            disableFocusTreeOnItemClick={disableFocusTreeOnItemClick}
            selectable={selectable}
            checkable={checkable}
            disableExpand={disableExpand}
            selectMode={selectMode}
            disabled={disabled}
            onTreeKeyDown={onTreeKeyDown}
            {...rest}
            {...tree}
            {...getTreeProperty()}
            className={treeClassName}
          >
            <TreeNodeList<TItem> {...tree} {...treeProps} />
          </TreeRoot>
        </TreeSelectionProvider>
      </TreeContextProvider>
    )
  }
)

export const Tree = _Tree as <TItem extends unknown = TreeItem>(
  props: TreeProps<TItem> & {
    ref?: React.Ref<TreeImperativeHandlersRef<TItem>>
  }
) => React.ReactElement
