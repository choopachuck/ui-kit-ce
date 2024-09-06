'use client'

/* eslint-disable react/jsx-no-useless-fragment */

import * as React from 'react'
import { TreeNodeListProps, TreeBaseComponentProps } from './types'
import { TreeItem, TreeSelectMode, getTreeItemLoadable } from './hooks'
import { useTreeContext } from './TreeContext'
import { clsx } from '@v-uik/theme'
import {
  TreeSize,
  getDataIdProperty,
  TreeSizeType,
  getTreeNodeLevelSpacer,
  toAriaBoolean,
} from './common'
import {
  TreeNodeExpander,
  TreeNodeContentContainer,
  TreeNodeIconContainer,
  TreeTrail,
  TreeNodeChecker,
} from './components'
import { useTreeSelectionContext } from './TreeSelectionContext'

const _TreeNodeList = <TItem extends unknown = TreeItem>(
  props: TreeNodeListProps<TItem>
) => {
  const {
    tree,
    size,
    disableExpand,
    getIsExpanded,
    toggleExpand,
    maxContentLines,
    showIcons,
    showTrails,
    withHalfLevelSpacer,
    checkable,
    toggleCheck,
    getIsChecked,
    getIsIndeterminate,
    toggleSelect,
    getIsSelected,
    selectable,
    onNodeClick,
    getExpandButtonInnerProps,
    getItemInnerProps,
    getNodeGroupInnerProps,
    getNodeInnerProps,
    lastParentsOnLevelMap = {},
    enableCheckOnClick,
    disableExpandOnClick,
    disableSelectOnClick,
    toggleSelectRange,
    selectMode,
    disableFocusTreeOnItemClick,
    levelSpacer,
    multipleSelect,
    disabled: disabledProp,
    onLoadData,
    getIsLoading,
  } = props

  const {
    classesMap,
    getters: {
      getTreeItemKey,
      getTreeItemDisabled,
      getTreeItemLabel,
      getTreeItemCheckDisabled,
      getTreeItemSelectDisabled,
    },
    treeRef,
  } = useTreeContext<TItem>()

  const {
    currentSelectedItemKey,
    setCurrentSelectedItemKey,
    focusedItemKey,
    setFocusedItemKey,
    skipFocusOnTree,
  } = useTreeSelectionContext()

  const itemClassName = clsx(classesMap.item, {
    [classesMap.itemExtraSmall]: size === TreeSize.xs,
    [classesMap.itemSmall]: size === TreeSize.sm,
    [classesMap.itemMedium]: size === TreeSize.md,
  })

  return (
    <>
      {tree?.map((item, i) => {
        const {
          $meta: { depth, closestChildKey },
          children,
          ...data
        } = item
        const key = getTreeItemKey(item as TItem)
        const disabled = disabledProp || getTreeItemDisabled(item as TItem)
        const selectDisabled = getTreeItemSelectDisabled(item as TItem)
        const label = getTreeItemLabel(item as TItem)
        const checkDisabled = getTreeItemCheckDisabled(item as TItem)
        const loadable = getTreeItemLoadable(item)

        const canSelect = !disabled && selectable && !selectDisabled
        const canCheck = !disabled && checkable && !checkDisabled
        const focused = focusedItemKey === key

        const itemInnerProps = getItemInnerProps?.(item)
        const nodeGroupInnerProps = getNodeGroupInnerProps?.(item)
        const nodeInnerProps = getNodeInnerProps?.(item)

        const handleItemClick = (
          event: React.MouseEvent<HTMLLIElement, MouseEvent>
        ) => {
          itemInnerProps?.onClick?.(event)

          const result = onNodeClick?.(event, item, {
            toggleSelectRange,
            toggleCheck,
            toggleExpand,
            toggleSelect,
          })

          setFocusedItemKey(key)

          if (!disableFocusTreeOnItemClick) {
            setTimeout(() => {
              treeRef.current?.focus()
            }, 1)
          }

          if (result) {
            return
          }

          if (checkable && enableCheckOnClick) {
            toggleCheck(key)
          }

          if (!disableExpand && !disableExpandOnClick) {
            toggleExpand(key)
          }

          if (canSelect && !disableSelectOnClick) {
            if (selectMode === TreeSelectMode.strict) {
              toggleSelect(key)
            } else {
              if ((event.shiftKey || event.metaKey) && currentSelectedItemKey) {
                if (event.shiftKey) {
                  toggleSelectRange(currentSelectedItemKey, key)
                } else if (event.metaKey) {
                  toggleSelectRange(key, undefined)
                  setCurrentSelectedItemKey(key)
                }
              } else {
                setCurrentSelectedItemKey(key)
                toggleSelect(key)
              }
            }
          }

          if (canSelect || !disableExpand) {
            event.stopPropagation()
          }
        }

        const handleMouseDown = (
          event: React.MouseEvent<HTMLSpanElement, MouseEvent>
        ) => {
          // Костыль для Firefox, так как event.preventDefault() игнорирует состояние active
          skipFocusOnTree.current = true
          nodeInnerProps?.onMouseDown?.(event)
        }

        if (!key) {
          return null
        }

        const expanded = getIsExpanded(key)
        const checked = getIsChecked(key)
        const indeterminate = getIsIndeterminate(key)
        const selected = getIsSelected(key)
        const loading = getIsLoading(key)
        const isLastChild = i === tree.length - 1
        const { id, parentKey } = item.$meta

        if (showTrails) {
          lastParentsOnLevelMap[id] = {
            depth: !tree[i + 1] ? depth : undefined,
            parentKey,
          }
        }

        const baseProps: TreeBaseComponentProps<TItem> = {
          nodeKey: key,
          depth,
          size: size as TreeSizeType,
          data: data as TItem,
          disabled,
          expanded,
          selected,
          loading,
        }

        return (
          <li
            key={key}
            {...(!disableExpand && {
              'aria-expanded': toAriaBoolean(expanded),
            })}
            {...(checkable &&
              canCheck && {
                'aria-checked': toAriaBoolean(checked),
              })}
            {...(selectable &&
              canSelect && {
                'aria-selected': toAriaBoolean(selected),
              })}
            {...(onLoadData &&
              loadable && {
                'aria-busy': toAriaBoolean(loading),
              })}
            aria-disabled={toAriaBoolean(disabled)}
            role="treeitem"
            {...itemInnerProps}
            className={clsx(itemClassName, itemInnerProps?.className, {
              [classesMap.itemExpanded]: expanded,
              [classesMap.itemDisabled]: disabled,
              [classesMap.itemSelected]: selected,
              [classesMap.itemExpandable]: !disableExpand,
              [classesMap.itemSelectable]: selectable && canSelect,
              [classesMap.itemFocused]: focused,
              [classesMap.itemLoading]: loading,
            })}
          >
            <span
              {...getDataIdProperty(key)}
              {...nodeInnerProps}
              className={clsx(classesMap.node, nodeInnerProps?.className)}
              onMouseDown={handleMouseDown}
              onClick={handleItemClick}
            >
              {!multipleSelect &&
                selectMode === TreeSelectMode.strict &&
                selected && <div className={classesMap.selectedIndicator} />}
              {showTrails && (
                <TreeTrail
                  lastParentsOnLevelMap={lastParentsOnLevelMap}
                  levelSpacer={levelSpacer}
                  withHalfLevelSpacer={withHalfLevelSpacer}
                  isLastChild={isLastChild}
                  childrenCount={children?.length || 0}
                  {...baseProps}
                />
              )}
              {depth > 0 && (
                <div
                  style={{
                    marginLeft:
                      depth *
                      getTreeNodeLevelSpacer(withHalfLevelSpacer, levelSpacer),
                  }}
                />
              )}
              {!disableExpand && (
                <TreeNodeExpander
                  {...baseProps}
                  {...getExpandButtonInnerProps?.(item)}
                  toggleExpand={toggleExpand}
                  mock={!closestChildKey}
                />
              )}
              {checkable && (
                <TreeNodeChecker
                  indeterminate={indeterminate}
                  checked={checked}
                  toggleCheck={toggleCheck}
                  {...baseProps}
                  disabled={!canCheck}
                />
              )}
              {showIcons && (
                <TreeNodeIconContainer
                  canExpand={!!closestChildKey || loadable}
                  {...baseProps}
                />
              )}
              <TreeNodeContentContainer
                maxContentLines={maxContentLines}
                {...baseProps}
              >
                {label}
              </TreeNodeContentContainer>
            </span>
            {children && expanded && (
              <ul
                role="group"
                {...nodeGroupInnerProps}
                className={clsx(
                  classesMap.itemGroup,
                  nodeGroupInnerProps?.className
                )}
              >
                <TreeNodeList<TItem>
                  {...props}
                  tree={children}
                  lastParentsOnLevelMap={lastParentsOnLevelMap}
                />
              </ul>
            )}
          </li>
        )
      })}
    </>
  )
}

export const TreeNodeList = _TreeNodeList as <TItem extends unknown = TreeItem>(
  props: TreeNodeListProps<TItem> & { ref?: React.Ref<HTMLUListElement> }
) => React.ReactElement
