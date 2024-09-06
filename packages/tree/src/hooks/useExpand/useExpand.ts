'use client'

import * as React from 'react'
import { useValue } from '@v-uik/hooks'
import { warning } from '@v-uik/utils'
import type {
  TreeItem,
  TreeNodeItem,
  TreeNodePlain,
  TreeGetters,
} from '../types'

export type UseTreeToggleExpandOptions = {
  /**
   * При раскрытии элемента дерева дерева раскрывать только его родительские элементы
   */
  toggleParentsOnly?: boolean
}

export type UseExpandProps<TItem = TreeItem> = {
  /**
   * Функция обратного вызова, которая срабатывает при скрытии/раскрытии элемента дерева
   *
   * @param {React.Key[]} expandedKeys Массив раскрытых элементов дерева
   * @param {TreeNodeItem<TItem>} node Целевой элемент дерева
   */
  onNodeExpand?: (expandedKeys: React.Key[], node: TreeNodeItem<TItem>) => void
  /**
   * Массив раскрытых элементов дерева по умолчанию
   */
  defaultExpandedKeys?: React.Key[]
  /**
   * Массив раскрытых элементов дерева
   */
  expandedKeys?: React.Key[]
  /**
   * Функция подгрузки данных при разворачивании элементов дерева с флагом `loadable = true`
   */
  onLoadData?: (node: TreeNodeItem<TItem>) => Promise<unknown>
  allowedKeysForExpand: Record<React.Key, boolean>
  treePlain: TreeNodePlain<TItem>
} & {
  getters: TreeGetters<TItem>
}

export type UseExpandReturnProps = {
  /**
   * Функция для смены состояния раскрытия элемента дерева
   *
   * @param {React.Key} key Ключ элемента дерева
   * @param {UseTreeToggleExpandOptions} options Параметры раскрытия элемента дерева
   */
  toggleExpand: (key: React.Key, options?: UseTreeToggleExpandOptions) => void
  /**
   * Функция для определения раскрытия элемента
   *
   * @param {React.Key} key Ключ элемента дерева
   *
   * @returns Флаг раскрытия элемента дерева
   */
  getIsExpanded: (key: React.Key) => boolean
  /**
   * Функция для определения состояния загрузки у элемента дерева
   *
   * @param {React.Key} key Ключ элемента дерева
   *
   * @returns Состояние загрузки элемента дерева
   */
  getIsLoading: (key: React.Key) => boolean
}

const makeFormatValueFromProp =
  (allowedKeysForExpand: Record<React.Key, boolean>) =>
  (keys: React.Key[] = []) =>
    keys.reduce((accum, key) => {
      if (allowedKeysForExpand[key]) {
        accum[key] = true
      }

      return accum
    }, {} as Record<React.Key, boolean>)

export const useExpand = <TItem = TreeItem>({
  onNodeExpand,
  allowedKeysForExpand,
  defaultExpandedKeys,
  expandedKeys: expandedKeysProp,
  treePlain,
  onLoadData,
  getters: { getTreeItemLoadable },
}: UseExpandProps<TItem>): UseExpandReturnProps => {
  const isControlled = expandedKeysProp !== undefined

  const [expandedKeys, setExpandedKeys] = useValue(
    expandedKeysProp || defaultExpandedKeys,
    {
      formatValueFromProp: makeFormatValueFromProp(allowedKeysForExpand),
      useInnerState: !isControlled,
    }
  )

  const [loadingExpandKeys, setLoadingExpandKeys] = React.useState<React.Key[]>(
    []
  )
  const [loadedNodes, setLoadedNodes] = React.useState<React.Key[]>([])

  const toggleExpandController = (
    key: React.Key,
    options: UseTreeToggleExpandOptions = {}
  ) => {
    if (!allowedKeysForExpand[key]) {
      return
    }

    const isExpanded = getIsExpanded(key)
    const node = treePlain[key]

    if (
      !isExpanded &&
      getTreeItemLoadable(node as unknown as TItem) &&
      !loadedNodes.includes(key)
    ) {
      if (!onLoadData) {
        warning(
          false,
          'Tree',
          'Для подгрузки данных необходимо использовать свойство `onLoadData`'
        )

        return
      }

      setLoadingExpandKeys((p) => [...p, key])

      return onLoadData(node)
        .then(() => {
          setLoadedNodes((p) => [...p, key])

          handleExpand(key, options)
        })
        .finally(() => {
          setLoadingExpandKeys((p) => p.filter((k) => k !== key))
        })
    }

    handleExpand(key, options)
  }

  const handleExpand = (
    key: React.Key,
    { toggleParentsOnly }: UseTreeToggleExpandOptions = {}
  ) => {
    const newExpandedKeys = { ...expandedKeys }

    if (toggleParentsOnly) {
      const parentKeys = [treePlain[key].$meta.parentKey]

      while (parentKeys.length) {
        const parentKey = parentKeys.shift()

        if (!parentKey) {
          continue
        }

        const parentItem = treePlain[parentKey]

        if (parentItem.$meta.parentKey) {
          parentKeys.push(parentItem.$meta.parentKey)
        }

        newExpandedKeys[parentKey] = true
      }
    } else {
      if (newExpandedKeys[key]) {
        delete newExpandedKeys[key]
      } else {
        newExpandedKeys[key] = true
      }
    }

    onNodeExpand?.(Object.keys(newExpandedKeys), treePlain[key])

    if (!isControlled) {
      setExpandedKeys(newExpandedKeys)
    }
  }

  const getIsExpanded = (key: React.Key) => !!expandedKeys[key]

  const getIsLoading = (key: React.Key) => loadingExpandKeys.includes(key)

  return {
    getIsExpanded,
    getIsLoading,
    toggleExpand: toggleExpandController,
  }
}
