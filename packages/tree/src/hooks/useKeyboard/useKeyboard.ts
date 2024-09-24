'use client'

import * as React from 'react'
import { TreeNodeItem, TreeItem, UseTreeReturnProps } from '../types'
import { isEqualKeyboardKeys } from '@v-uik/utils'
import { UseExpandReturnProps } from '../useExpand'
import { UseCheckReturnProps } from '../useCheck'
import {
  UseSelectReturnProps,
  TreeSelectModeType,
  TreeSelectMode,
} from '../useSelect'
import { useTreeSelectionContext } from '../../TreeSelectionContext'

type TreeHandlers = Pick<
  UseTreeReturnProps,
  'toggleCheck' | 'toggleExpand' | 'toggleSelect' | 'toggleSelectRange'
>

export type PerformKeyData<TItem = TreeItem> = TreeNodeItem<TItem>['$meta']

export type UseKeyboardProps<TItem = TreeItem> = Omit<
  UseExpandReturnProps,
  'getIsLoading'
> &
  UseCheckReturnProps &
  UseSelectReturnProps &
  Pick<UseTreeReturnProps<TItem>, 'getTreeNodeData'> & {
    nodeKeys: React.Key[]
    onKeyDown?: (event: React.KeyboardEvent<HTMLUListElement>) => void
    onFocus?: (event: React.FocusEvent<HTMLUListElement, Element>) => void
    onBlur?: (event: React.FocusEvent<HTMLUListElement, Element>) => void
    onTreeKeyDown?: (
      event: React.KeyboardEvent<HTMLUListElement>,
      node: TreeNodeItem<TItem>,
      handlers: TreeHandlers
    ) => void | boolean
    disableFocusTreeOnItemClick?: boolean
    selectable?: boolean
    disableExpand?: boolean
    checkable?: boolean
    selectMode?: TreeSelectModeType
    disabled?: boolean
  }

export type UseKeyboardReturnProps = {
  handleKeyDown: (event: React.KeyboardEvent<HTMLUListElement>) => void
  handleFocus: (event: React.FocusEvent<HTMLUListElement, Element>) => void
  handleBlur: (event: React.FocusEvent<HTMLUListElement, Element>) => void
}

type FindFocusableNodeKeyHandlers<TItem = TreeItem> = Pick<
  UseTreeReturnProps<TItem>,
  'getTreeNodeData'
> &
  Pick<UseExpandReturnProps, 'getIsExpanded'>

const findFocusableNodeKey = <TItem = TreeItem>(
  nodeKeys: React.Key[],
  currentIndex = 0,
  direction: 'next' | 'previous',
  { getTreeNodeData, getIsExpanded }: FindFocusableNodeKeyHandlers<TItem>
) => {
  const offset = direction === 'next' ? 1 : -1
  let index = currentIndex + offset

  while (nodeKeys[index]) {
    const {
      $meta: { id, disabled, depth, parentKey },
    } = getTreeNodeData(nodeKeys[index])
    const isVisible = depth === 0 || (parentKey && getIsExpanded(parentKey))

    if (disabled || !isVisible) {
      index = index + offset
      continue
    }

    return id
  }
}

/**
 * Управление деревом с клавиатуры, реализованое в соответствии с требованиями доступности
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tree_role
 *
 * @returns Функция-обработчик нажатия на клавиатуру
 */
export const useKeyboard = <TItem = TreeItem>({
  nodeKeys,
  toggleExpand,
  getIsExpanded,
  getTreeNodeData,
  onKeyDown,
  onFocus,
  onBlur,
  getFirstSelectedKey,
  toggleCheck,
  toggleSelect,
  toggleSelectRange,
  onTreeKeyDown,
  disableFocusTreeOnItemClick,
  disableExpand,
  selectable,
  getIsSelected,
  selectMode,
  disabled,
}: UseKeyboardProps<TItem>): UseKeyboardReturnProps => {
  const {
    focusedItemKey,
    setFocusedItemKey,
    currentSelectedItemKey,
    setCurrentSelectedItemKey,
    skipFocusOnTree,
  } = useTreeSelectionContext()

  const handlers: FindFocusableNodeKeyHandlers<TItem> = {
    getIsExpanded,
    getTreeNodeData,
  }

  const handleFocus = (event: React.FocusEvent<HTMLUListElement, Element>) => {
    if (disabled) {
      return
    }
    if (skipFocusOnTree.current) {
      skipFocusOnTree.current = false

      return
    }
    onFocus?.(event)

    const key =
      focusedItemKey ||
      getFirstSelectedKey() ||
      findFocusableNodeKey<TItem>(nodeKeys, -1, 'next', handlers)

    if (!key) {
      return
    }

    setFocusedItemKey(key)
    toggleExpand(key, {
      toggleParentsOnly: true,
    })
  }

  const handleBlur = (event: React.FocusEvent<HTMLUListElement, Element>) => {
    onBlur?.(event)

    if (!disableFocusTreeOnItemClick) {
      setFocusedItemKey(undefined)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (disabled) {
      return
    }

    onKeyDown?.(event)

    const key =
      focusedItemKey ||
      findFocusableNodeKey<TItem>(nodeKeys, -1, 'next', handlers)

    if (!key) {
      return
    }

    const result = onTreeKeyDown?.(event, getTreeNodeData(key), {
      toggleSelectRange,
      toggleCheck,
      toggleExpand,
      toggleSelect,
    })

    if (result) {
      return
    }

    const {
      $meta: { id, closestChildKey, parentKey },
    } = getTreeNodeData(key)

    const isExpanded = getIsExpanded(id)
    const isSelected = getIsSelected(id)
    const currentKeyIndex = nodeKeys.findIndex((k) => k === id)

    /**
     * Обработка нажатия стрелки вправо:
     *
     * 1) Когда фокус находится на закрытом элементе, элемент открывается; фокус не перемещается;
     *
     * 2) Когда фокус находится на открытом элементе, фокус перемещается на первый дочерний элемент;
     *
     * 3) Когда фокус находится на конечном элементе (элементе дерева без дочерних элементов), ничего не происходит.
     */
    if (
      !disableExpand &&
      !!focusedItemKey &&
      isEqualKeyboardKeys('ArrowRight', event.key)
    ) {
      if (isExpanded && closestChildKey) {
        const nextKey = findFocusableNodeKey<TItem>(
          nodeKeys,
          currentKeyIndex,
          'next',
          handlers
        )

        if (nextKey) {
          setFocusedItemKey(nextKey)
        }
      } else {
        toggleExpand(id)
      }
    }

    /**
     * Обработка нажатия стрелки влево:
     *
     * 1) Когда фокус находится на открытом элементе, элемент закрывается;
     *
     * 2) Когда элемент находится на дочернем элементе, который также является конечным элементом или закрытым элементом,
     *    фокус перемещается на его родительский элемент;
     *
     * 3) Когда фокус находится на закрытом дереве, ничего не происходит.
     */
    if (
      !disableExpand &&
      !!focusedItemKey &&
      isEqualKeyboardKeys('ArrowLeft', event.key)
    ) {
      event.preventDefault()
      if (isExpanded) {
        toggleExpand(key)
      } else if (
        (!closestChildKey || (!!closestChildKey && !isExpanded)) &&
        parentKey
      ) {
        const prevKey = findFocusableNodeKey<TItem>(
          nodeKeys,
          currentKeyIndex,
          'previous',
          handlers
        )

        if (prevKey) {
          setFocusedItemKey(prevKey)
        }
      }
    }

    /**
     * Обработка нажатия стрелки вниз:
     *
     * Перемещение фокуса на следующий элемент, на котором можно фокусироваться, но не открывая и не закрывая его
     */
    if (isEqualKeyboardKeys('ArrowDown', event.key)) {
      const nextKey = findFocusableNodeKey<TItem>(
        nodeKeys,
        focusedItemKey ? currentKeyIndex : -1,
        'next',
        handlers
      )

      if (nextKey) {
        event.preventDefault()
        setFocusedItemKey(nextKey)
      }
    }

    /**
     * Обработка нажатия стрелки вверх:
     *
     * Перемещение фокуса на предыдущий элемент, на котором можно фокусироваться, но не открывая и не закрывая его
     */
    if (isEqualKeyboardKeys('ArrowUp', event.key)) {
      const prevKey = findFocusableNodeKey<TItem>(
        nodeKeys,
        currentKeyIndex,
        'previous',
        handlers
      )

      if (prevKey) {
        event.preventDefault()
        setFocusedItemKey(prevKey)
      }
    }

    /**
     * Обработка нажатия Enter:
     *
     * Выполнение действия по-умолчанию для текущего элемента. Для родительских элементов действие открывает или закрывает элемент.
     * В случае кейса с единичным выбором если у элемента нет дочерних элементов, выбирается текущий элемент.
     */
    if (isEqualKeyboardKeys('Enter', event.key)) {
      if (closestChildKey && !disableExpand) {
        toggleExpand(id)
      } else if (!isSelected && selectable) {
        toggleSelect(id)
      }
    }

    /**
     * Обработка нажатия пробела:
     *
     * Изменяет состояние выбора элемента
     *
     * Если пробел был нажат с зажатой клавишей SHIFT, то выбирается диапазон значений
     * от последнего выбранного элемента до текущего (при selectMode === directory)
     */
    if (
      (isEqualKeyboardKeys(' ', event.key) || event.code === 'Space') &&
      selectable
    ) {
      event.preventDefault()
      setCurrentSelectedItemKey(id)

      if (
        selectMode === TreeSelectMode.directory &&
        event.shiftKey &&
        currentSelectedItemKey
      ) {
        toggleSelectRange(currentSelectedItemKey, id, {
          ignoreUnselectedState: true,
        })
      } else {
        toggleSelect(id)
      }
    }

    /**
     * Обработка нажатия Shift + стрелка вниз:
     *
     * Изменяет состояние выбора у следующего элемента
     */
    if (
      isEqualKeyboardKeys('ArrowDown', event.key) &&
      event.shiftKey &&
      selectable
    ) {
      const nextKey = findFocusableNodeKey<TItem>(
        nodeKeys,
        focusedItemKey ? currentKeyIndex : -1,
        'next',
        handlers
      )

      if (nextKey) {
        event.preventDefault()
        toggleSelect(nextKey)
        setCurrentSelectedItemKey(nextKey)
      }
    }

    /**
     * Обработка нажатия Shift + стрелка вверх:
     *
     * Изменяет состояние выбора у предыдущего элемента
     */
    if (
      isEqualKeyboardKeys('ArrowUp', event.key) &&
      event.shiftKey &&
      selectable
    ) {
      const prevKey = findFocusableNodeKey<TItem>(
        nodeKeys,
        currentKeyIndex,
        'previous',
        handlers
      )

      if (prevKey) {
        event.preventDefault()
        toggleSelect(prevKey)
        setCurrentSelectedItemKey(prevKey)
      }
    }

    if (selectable && selectMode === TreeSelectMode.directory) {
      /**
       * Обработка нажатия Control + Shift + Home:
       *
       * Выбор всех элементов, начиная с текущего и до первого (при selectMode === directory)
       */
      if (
        isEqualKeyboardKeys('Home', event.key) &&
        event.shiftKey &&
        event.ctrlKey &&
        focusedItemKey
      ) {
        toggleSelectRange(focusedItemKey, nodeKeys[0])
      }

      /**
       * Обработка нажатия Control + Shift + End:
       *
       * Выбор всех элементов, начиная с текущего и до последнего (при selectMode === directory)
       */
      if (
        isEqualKeyboardKeys('End', event.key) &&
        event.shiftKey &&
        event.ctrlKey &&
        focusedItemKey
      ) {
        toggleSelectRange(focusedItemKey, nodeKeys[nodeKeys.length - 1])
      }

      /**
       * Обработка нажатия Control + A:
       *
       * Выбор всех элементов (при selectMode === directory)
       */
      if (
        isEqualKeyboardKeys('a', event.key.toLocaleLowerCase()) &&
        event.ctrlKey
      ) {
        toggleSelectRange(nodeKeys[0], nodeKeys[nodeKeys.length - 1])
      }
    }
  }

  return {
    handleKeyDown,
    handleFocus,
    handleBlur,
  }
}
