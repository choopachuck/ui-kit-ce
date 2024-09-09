'use client'

import * as React from 'react'
import { useValue } from '@v-uik/hooks'
import { TreeItem, TreeNodeItem, TreeNodePlain } from '../types'
import { getKeys } from './utils'

export type UseCheckProps<TItem = TreeItem> = {
  /**
   * Функция обратного вызова, которая срабатывает при изменении состояния чекбокса у узла дерева
   *
   * @param {React.Key[]} checkedKeys Массив ключей узлов, для которых будут отмечены чекбоксы
   * @param {TreeNodeItem<TItem>} node Целевой узел дерева
   */
  onNodeCheck?: (checkedKeys: React.Key[], node: TreeNodeItem<TItem>) => void
  /**
   * Массив ключей узлов, для которых будут отмечены чекбоксы по умолчанию
   */
  defaultCheckedKeys?: React.Key[]
  /**
   * Массив ключей узлов, для которых будут отмечены чекбоксы
   */
  checkedKeys?: React.Key[]
  treePlain: TreeNodePlain<TItem>
  disabledKeysForCheck: Record<React.Key, boolean>
}

export type UseCheckReturnProps = {
  /**
   * Функция для смены состояния чекбокса у узла дерева
   *
   * @param {React.Key} key Ключ узла дерева
   */
  toggleCheck: (key: React.Key) => void
  /**
   * Функция для проверки выбора чекбокса у узла дерева
   *
   * @param {React.Key} key Ключ узла дерева
   *
   * @returns Флаг выбранного чекбокса у узла дерева
   */
  getIsChecked: (key: React.Key) => boolean
  /**
   * Функция для проверки неопределенного состояния чекбокса у узла дерева
   *
   * @param {React.Key} key Ключ узла дерева
   *
   * @returns Флаг полувыбранного чекбокса у узла дерева
   */
  getIsIndeterminate: (key: React.Key) => boolean
}

const makeFormatValueFromProp =
  <TItem = TreeItem>(
    treePlain: TreeNodePlain<TItem>,
    disabledKeysForCheck: Record<React.Key, boolean>
  ) =>
  (keys: React.Key[] = []) => {
    const checkedKeys: Record<React.Key, boolean> = {}
    const indeterminateKeys: Record<React.Key, boolean> = {}

    keys.forEach((key) => {
      const { keysToCheck, keysToIndeterminate } = getKeys(treePlain, key, {
        currentCheckedKeys: checkedKeys,
        currentIndeterminateKeys: indeterminateKeys,
        disabledKeys: disabledKeysForCheck,
        targetValue: true,
      })
      Object.assign(checkedKeys, keysToCheck)
      Object.assign(indeterminateKeys, keysToIndeterminate)
    })

    Object.keys(indeterminateKeys).forEach((key) => {
      if (!indeterminateKeys[key] || disabledKeysForCheck[key]) {
        delete indeterminateKeys[key]
      }
    })

    return { checkedKeys, indeterminateKeys }
  }

export const useCheck = <TItem = TreeNodeItem>({
  checkedKeys: checkedKeysProp,
  defaultCheckedKeys,
  onNodeCheck,
  treePlain,
  disabledKeysForCheck,
}: UseCheckProps<TItem>): UseCheckReturnProps => {
  const isControlled = checkedKeysProp !== undefined

  const [{ checkedKeys, indeterminateKeys }, setKeysState] = useValue(
    checkedKeysProp || defaultCheckedKeys,
    {
      formatValueFromProp: makeFormatValueFromProp<TItem>(
        treePlain,
        disabledKeysForCheck
      ),
      useInnerState: !isControlled,
    }
  )

  const toggleCheck = (key: React.Key) => {
    let keysToCheck: Record<React.Key, boolean> = {}

    const keys = getKeys(treePlain, key, {
      currentCheckedKeys: checkedKeys,
      currentIndeterminateKeys: indeterminateKeys,
      disabledKeys: disabledKeysForCheck,
    })
    keysToCheck = keys.keysToCheck

    onNodeCheck?.(Object.keys(keysToCheck), treePlain[key])

    if (!isControlled) {
      const keysToIndeterminate = { ...indeterminateKeys }

      Object.keys(keys.keysToIndeterminate).forEach((key) => {
        if (keys.keysToIndeterminate[key] && !disabledKeysForCheck[key]) {
          keysToIndeterminate[key] = keys.keysToIndeterminate[key]
        } else {
          delete keysToIndeterminate[key]
        }
      })

      setKeysState({
        checkedKeys: keysToCheck,
        indeterminateKeys: keysToIndeterminate,
      })
    }
  }

  const getIsChecked = (key: React.Key) => !!checkedKeys[key]

  const getIsIndeterminate = (key: React.Key) => !!indeterminateKeys[key]

  return {
    getIsChecked,
    getIsIndeterminate,
    toggleCheck,
  }
}
