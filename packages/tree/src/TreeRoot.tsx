'use client'

/* eslint-disable react/prop-types */

import * as React from 'react'
import { getTreeProperty } from './common'
import { TreeItem, useKeyboard } from './hooks'
import { useTreeContext } from './TreeContext'
import { TreeRootProps, TreeImperativeHandlersRef } from './types'
import { useTreeSelectionContext } from './TreeSelectionContext'

const _TreeRoot = React.forwardRef(
  <TItem extends unknown = TreeItem>(
    {
      nodeKeys,
      getIsChecked,
      getIsExpanded,
      getIsIndeterminate,
      toggleCheck,
      toggleExpand,
      onKeyDown,
      onFocus,
      onBlur,
      getTreeNodeData,
      getIsSelected,
      toggleSelectRange,
      toggleSelect,
      className,
      children,
      getFirstSelectedKey,
      tree,
      onTreeKeyDown,
      disableFocusTreeOnItemClick,
      disableExpand,
      checkable,
      selectable,
      selectMode,
      getLastSelectedKey,
      disabled,
      getIsLoading,
      ...rest
    }: React.PropsWithChildren<TreeRootProps<TItem>>,
    ref: React.Ref<TreeImperativeHandlersRef<TItem>>
  ): React.ReactElement => {
    const { handleBlur, handleFocus, handleKeyDown } = useKeyboard<TItem>({
      nodeKeys,
      getIsChecked,
      getIsExpanded,
      getIsIndeterminate,
      toggleCheck,
      toggleExpand,
      onKeyDown,
      onFocus,
      onBlur,
      getTreeNodeData,
      getIsSelected,
      toggleSelectRange,
      toggleSelect,
      getFirstSelectedKey,
      getLastSelectedKey,
      onTreeKeyDown,
      disableFocusTreeOnItemClick,
      disableExpand,
      checkable,
      selectable,
      selectMode,
      disabled,
    })
    const { treeRef } = useTreeContext()
    const { focusedItemKey } = useTreeSelectionContext()

    React.useImperativeHandle(
      ref,
      () => ({
        getElementRef: () => treeRef,
        handleBlur,
        handleFocus,
        handleKeyDown,
        getFocusItem: () =>
          focusedItemKey ? getTreeNodeData(focusedItemKey) : undefined,
        toggleSelectRange,
        toggleCheck,
        toggleExpand,
        toggleSelect,
      }),
      [
        handleBlur,
        handleFocus,
        handleKeyDown,
        treeRef,
        focusedItemKey,
        getTreeNodeData,
        toggleSelectRange,
        toggleCheck,
        toggleExpand,
        toggleSelect,
      ]
    )

    return (
      <ul
        ref={treeRef}
        role="tree"
        aria-label="Tree"
        {...rest}
        {...getTreeProperty()}
        className={className}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      >
        {children}
      </ul>
    )
  }
)

export const TreeRoot = _TreeRoot as <TItem extends unknown = TreeItem>(
  props: React.PropsWithChildren<TreeRootProps<TItem>> & {
    ref?: React.Ref<TreeImperativeHandlersRef<TItem>>
  }
) => React.ReactElement
