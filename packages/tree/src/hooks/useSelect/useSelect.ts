'use client'

import * as React from 'react'
import { TreeItem, TreeNodeItem, TreeNodePlain } from '../types'
import { useValue } from '@v-uik/hooks'

export const TreeSelectMode = {
  strict: 'strict',
  directory: 'directory',
} as const

export type TreeSelectModeType =
  typeof TreeSelectMode[keyof typeof TreeSelectMode]

export type ToggleSelectRangeOptions = {
  /**
   * При изменении состояния выбора игнорировать ключи, которые нужно убрать из выбора
   */
  ignoreUnselectedState?: boolean
}

export type UseSelectProps<TItem = TreeItem> = {
  /**
   * Функция обратного вызова, которая срабатывает при выборе элемента дерева
   *
   * @param {React.Key[]} selectedKeys Массив выбранных элементов дерева
   * @param {TreeNodeItem<TItem>} node Целевой элемент дерева
   */
  onNodeSelect?: (selectedKeys: React.Key[], node: TreeNodeItem<TItem>) => void
  /**
   * Массив выбранных элементов дерева по умолчанию
   */
  defaultSelectedKeys?: React.Key[]
  /**
   * Массив выбранных элементов дерева
   */
  selectedKeys?: React.Key[]
  treePlain: TreeNodePlain<TItem>
  disabledKeysForSelect: Record<React.Key, boolean>
  /**
   * Флаг для включения функционала множественного выбора элементов дерева. Актуально только для `selectMode="strict"` и `selectable="true"`
   */
  multipleSelect?: boolean
  /**
   * Режим поведения у функционала выбора элементов дерева, где `strict` - это прямой выбор элементов, а `directory` - выбор элементов согласно поведению
   * директорий и файловых систем
   */
  selectMode?: TreeSelectModeType
  nodeKeys: React.Key[]
  /**
   * Функция для определения раскрытия элемента
   *
   * @param {React.Key} key Ключ элемента дерева
   *
   * @returns Флаг раскрытия элемента дерева
   */
  getIsExpanded: (key: React.Key) => boolean
}

export type UseSelectReturnProps = {
  /**
   * Функция для смены состояния выбора элемента дерева
   *
   * @param {React.Key} key Ключ элемента дерева
   */
  toggleSelect: (key: React.Key) => void
  /**
   * Функция для смены состояния выбора у диапазона ключей элементов дерева
   *
   * Если указаны аргументы `keyFrom` и `keyTo`, то выбирается диапазон элементов от `keyFrom`
   * до `keyTo`. Если указан только аргумент `keyFrom`, то предыдущий диапазон сохраняется в общий массив выбранных ключей и
   * выбирается либо убирается только элемент `keyFrom`.
   *
   * @param {React.Key} keyFrom Ключ элемента дерева, с которого начинается новый диапазон значений
   * @param {React.Key} keyTo Ключ элемента дерева, которым оканчивается новый диапазон значений. Если аргумент пуст, то выбирается или убирается
   * только элемет `keyTo`
   * @param {ToggleSelectRangeOptions} Параметры выбора диапазона значений
   */
  toggleSelectRange: (
    keyFrom: React.Key,
    keyTo?: React.Key,
    options?: ToggleSelectRangeOptions
  ) => void
  /**
   * Функция для определения состояния выбора элемента
   *
   * @param {React.Key} key Ключ элемента дерева
   *
   * @returns Флаг состояния выбора элемента дерева
   */
  getIsSelected: (key: React.Key) => boolean
  /**
   * Функция для получения первого выбранного элемента дерева
   *
   * @returns Ключ первого выбранного элемента дерева
   */
  getFirstSelectedKey: () => React.Key | undefined
  /**
   * Функция для получения последнего выбранного элемента дерева
   *
   * @returns Ключ первого выбранного элемента дерева
   */
  getLastSelectedKey: () => React.Key | undefined
}

const sortSelectedItems = <TItem = TreeItem>(
  selectedKeys: Record<React.Key, boolean>,
  treePlain: TreeNodePlain<TItem>
) =>
  Object.keys(selectedKeys).sort(
    (keyX, keyY) =>
      (treePlain[keyX]?.$meta?.order || 0) -
      (treePlain[keyY]?.$meta?.order || 0)
  )

const makeFormatValueFromProp =
  (
    disabledKeysForSelect: Record<React.Key, boolean>,
    multipleSelect: boolean
  ) =>
  (keys: React.Key[] = []) => {
    if (!keys.length) {
      return {}
    }
    if (!multipleSelect) {
      const key: React.Key = keys[keys.length - 1]

      return { [key]: !disabledKeysForSelect[key] }
    }

    return keys.reduce((accum, key) => {
      if (!disabledKeysForSelect[key]) {
        accum[key] = true
      }

      return accum
    }, {} as Record<React.Key, boolean>)
  }

const hasAllExpandedParents = <TItem = TreeItem>(
  key: React.Key,
  treePlain: TreeNodePlain<TItem>,
  getIsExpanded: (key: React.Key) => boolean
): boolean => {
  const parentKeys: React.Key[] = [key]

  while (parentKeys.length) {
    const parentKey = parentKeys.shift()

    if (!parentKey) {
      continue
    }

    const parentNode = treePlain[parentKey]

    if (parentNode.$meta.parentKey) {
      parentKeys.push(parentNode.$meta.parentKey)
    }

    if (!getIsExpanded(parentKey)) {
      return false
    }
  }

  return true
}

export const useSelect = <TItem = TreeItem>({
  onNodeSelect,
  treePlain,
  selectedKeys: selectedKeysProp,
  disabledKeysForSelect,
  defaultSelectedKeys,
  multipleSelect,
  selectMode = TreeSelectMode.directory,
  nodeKeys = [],
  getIsExpanded,
}: UseSelectProps<TItem>): UseSelectReturnProps => {
  const isControlled = selectedKeysProp !== undefined

  const [selectedKeys, setSelectedKeys] = useValue(
    selectedKeysProp || defaultSelectedKeys,
    {
      formatValueFromProp: makeFormatValueFromProp(
        disabledKeysForSelect,
        !!multipleSelect
      ),
      useInnerState: !isControlled,
    }
  )

  const selectedKeysArray = React.useMemo(
    () => sortSelectedItems(selectedKeys, treePlain),
    [selectedKeys, treePlain]
  )

  const [ranges, setRanges] = React.useState<Record<string, boolean>[]>([])

  const toggleSelect = (key: React.Key) => {
    let newSelectedKeys: Record<React.Key, boolean> = {}

    if (disabledKeysForSelect[key]) {
      return
    }

    const canMultipleSelect =
      multipleSelect && selectMode === TreeSelectMode.strict

    if (canMultipleSelect) {
      newSelectedKeys = {
        ...selectedKeys,
      }

      if (selectedKeys[key]) {
        delete newSelectedKeys[key]
      } else {
        newSelectedKeys[key] = true
      }
    } else {
      newSelectedKeys[key] = true
    }

    onNodeSelect?.(Object.keys(newSelectedKeys), treePlain[key])

    if (!isControlled) {
      setSelectedKeys(newSelectedKeys)
    }

    setRanges([])
  }

  const toggleSelectRange = (
    keyFrom: React.Key,
    keyTo?: React.Key,
    { ignoreUnselectedState }: ToggleSelectRangeOptions = {}
  ) => {
    if (
      selectMode !== TreeSelectMode.directory ||
      (selectedKeys[keyFrom] && keyTo && selectedKeys[keyTo])
    ) {
      return
    }

    let newSelectedKeys: Record<React.Key, boolean> = {}

    const itemFrom = treePlain[keyFrom]
    let orderCounter = itemFrom.$meta.order

    if (keyTo) {
      const itemTo = treePlain[keyTo]

      const isDirectionDown = itemTo.$meta.order > itemFrom.$meta.order

      while (orderCounter !== itemTo.$meta.order) {
        const key = nodeKeys[orderCounter - 1]
        const parentKey = treePlain[key].$meta.parentKey

        if (!disabledKeysForSelect[key]) {
          if (
            !parentKey ||
            (parentKey &&
              hasAllExpandedParents(parentKey, treePlain, getIsExpanded))
          ) {
            newSelectedKeys[key] = true
          }
        }

        orderCounter = orderCounter + (isDirectionDown ? 1 : -1)

        ranges.forEach((i) => {
          newSelectedKeys = {
            ...newSelectedKeys,
            ...i,
          }
        })
      }

      newSelectedKeys[itemTo.$meta.id] = true
    } else {
      setRanges([...ranges, selectedKeys])
      newSelectedKeys = {
        ...selectedKeys,
      }
      if (newSelectedKeys[keyFrom] && !ignoreUnselectedState) {
        delete newSelectedKeys[keyFrom]
      } else {
        newSelectedKeys[keyFrom] = true
      }
    }

    if (onNodeSelect) {
      onNodeSelect(Object.keys(newSelectedKeys), treePlain[orderCounter])
    } else {
      setSelectedKeys(newSelectedKeys)
    }
  }

  const getIsSelected = React.useCallback(
    (key: React.Key) => !!selectedKeys[key],
    [selectedKeys]
  )

  const getFirstSelectedKey = React.useCallback(
    () => selectedKeysArray[0],
    [selectedKeysArray]
  )

  const getLastSelectedKey = React.useCallback(
    () => selectedKeysArray[selectedKeysArray.length - 1],
    [selectedKeysArray]
  )

  return {
    toggleSelect,
    getIsSelected,
    toggleSelectRange,
    getFirstSelectedKey,
    getLastSelectedKey,
  }
}
