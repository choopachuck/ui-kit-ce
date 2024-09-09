import { TreeNodePlain, TreeItem } from '../types'

type ProcessKeysResult = {
  /**
   * Объект ключей выбранных узлов
   */
  keysToCheck: Record<React.Key, boolean>
  /**
   * Объект ключей полувыбранных узлов
   */
  keysToIndeterminate: Record<React.Key, boolean>
}

export type ProcessChildrenKeysOptions = {
  /**
   *  Значение выбранного целевого узла дерева
   */
  targetValue?: boolean
  /**
   * Массив ключей дочерних узлов у целевого узла
   */
  keys?: React.Key[]
  /**
   * Объект ключей заблокированных узлов дерева
   */
  disabledKeys?: Record<React.Key, boolean>
  /**
   * Ссылка на объект всех выбранных ключей узлов дерева
   */
  currentCheckedKeys?: Record<React.Key, boolean>
}

export type ProcessParentKeysOptions = {
  /**
   * Ключ родительского узла у целевого узла
   */
  parentKey?: React.Key
  /**
   * Объект выбранных ключей дочерних узлов дерева у целевого узла
   */
  checkedKeys?: Record<React.Key, boolean>
  /**
   * Ссылка на объект всех полувыбранных ключей узлов дерева
   */
  currentIndeterminateKeys?: Record<React.Key, boolean>
  /**
   * Ссылка на объект всех выбранных ключей узлов дерева
   */
  currentCheckedKeys?: Record<React.Key, boolean>
}

export type ProcessChildrenKeysResult = ProcessKeysResult & {
  /**
   * Все дочерние узелы целевого узла выбраны
   */
  isAllChildrenChecked: boolean
}

export type ProcessParentKeysResult = ProcessKeysResult

export type GetKeysOptions = {
  /**
   * Объект всех полувыбранных ключей узлов дерева
   */
  currentIndeterminateKeys?: Record<React.Key, boolean>
  /**
   * Массив ключей узлов дерева для выбора
   */
  arrayKeys?: React.Key[]
  /**
   * Объект, содержащий текущие ключи выбранных узлов дерева
   */
  currentCheckedKeys?: Record<React.Key, boolean>
  /**
   * Объект ключей заблокированных узлов дерева
   */
  disabledKeys?: Record<React.Key, boolean>
  /**
   * Целевое значение для чекбоксов. Если указано это свойство, то целевое значение берется отсюда, а не оперделяется
   * автомастически с помощью инвертирования текущего значения
   */
  targetValue?: boolean
}

export type GetKeysResult = {
  /**
   * Объект выбранных ключей узлов дерева
   */
  keysToCheck: Record<React.Key, boolean>
  /**
   * Объект полувыбранных ключей узлов дерева
   */
  keysToIndeterminate: Record<React.Key, boolean>
}

/**
 * Функция для обхода дочерних узлов дерева в глубину
 *
 * @param {TreeNodes} treeNodes Плоский объект дерева узлов
 * @param {ProcessChildrenKeysOptions} options Объект с конфигурацией обхода дерева
 *
 * @returns Объект с объектом ключей выбранных узлов, с объектом ключей полувыбранных узлов и
 * флагом, что все дочерние узелы текущего узла были выбраны
 */
export const processChildrenKeys = <TItem = TreeItem>(
  treeNodes: TreeNodePlain<TItem>,
  {
    keys = [],
    targetValue,
    disabledKeys,
    currentCheckedKeys,
  }: ProcessChildrenKeysOptions = {}
): ProcessChildrenKeysResult => {
  const childrenKeys = [...keys]
  const keysToCheck: Record<React.Key, boolean> = {}
  const keysToIndeterminate: Record<React.Key, boolean> = {}

  let childrenCount = 0
  let checkedChildrenCount = 0

  while (childrenKeys.length > 0) {
    const childrenKey = childrenKeys.shift()

    if (!childrenKey) {
      return {
        keysToCheck,
        keysToIndeterminate,
        isAllChildrenChecked: false,
      }
    }

    childrenCount++

    if (treeNodes[childrenKey].children) {
      childrenKeys.push(
        ...(treeNodes[childrenKey].$meta.boundaryChildrenKeys || [])
      )
    }

    if (!disabledKeys?.[childrenKey]) {
      if (targetValue) {
        keysToCheck[childrenKey] = targetValue
      } else if (currentCheckedKeys) {
        delete currentCheckedKeys[childrenKey]
      }
      keysToIndeterminate[childrenKey] = false
      checkedChildrenCount++
    } else {
      const parentKey = treeNodes[childrenKey].$meta.parentKey

      if (parentKey) {
        const parentKeysToIndeterminate = [parentKey]

        while (parentKeysToIndeterminate.length > 0) {
          const parentKeyToIndeterminate = parentKeysToIndeterminate.shift()

          if (!parentKeyToIndeterminate) {
            continue
          }

          const parent = treeNodes[parentKeyToIndeterminate]

          if (parent.$meta.parentKey) {
            parentKeysToIndeterminate.push(parent.$meta.parentKey)
          }

          keysToIndeterminate[parent.$meta.id] = !!targetValue
        }
      }
    }
  }

  return {
    keysToCheck,
    keysToIndeterminate,
    isAllChildrenChecked: childrenCount === checkedChildrenCount,
  }
}

/**
 * Функция для обхода родительских узлов дерева наверх
 *
 * @param {TreeNodes} treeNodes Плоский объект дерева узлов
 * @param {ProcessParentKeysOptions} options Объект с конфигурацией обхода дерева
 *
 * @returns Объект с объектом ключей выбранных узело и с объектом ключей полувыбранных узлов
 */
export const processParentKeys = <TItem = TreeItem>(
  treeNodes: TreeNodePlain<TItem>,
  {
    checkedKeys = {},
    currentIndeterminateKeys = {},
    currentCheckedKeys,
    parentKey,
  }: ProcessParentKeysOptions = {}
): ProcessParentKeysResult => {
  const keysToCheck: Record<React.Key, boolean> = {}
  const keysToCheckWithoutFalse: Record<React.Key, boolean> = {}
  const keysToIndeterminate: Record<React.Key, boolean> = {}

  const parentKeys = [parentKey]

  while (parentKeys.length > 0) {
    let checkedChildrenCount = 0
    let indeterminateChildrenCount = 0

    const parentKey = parentKeys.shift()

    if (!parentKey) {
      return { keysToCheck, keysToIndeterminate }
    }

    const treeNodeItem = treeNodes[parentKey]

    if (treeNodeItem.$meta.parentKey) {
      parentKeys.push(treeNodeItem.$meta.parentKey)
    }

    if (treeNodeItem.children) {
      for (let i = 0; i < treeNodeItem.children.length; i++) {
        const key = treeNodeItem.children[i].$meta.id

        if (
          keysToCheck[key] === undefined ? checkedKeys[key] : keysToCheck[key]
        ) {
          checkedChildrenCount++
        }

        if (
          (keysToIndeterminate[key] === undefined
            ? currentIndeterminateKeys[key]
            : keysToIndeterminate[key]) &&
          !keysToCheck[key]
        ) {
          indeterminateChildrenCount++
        }
      }

      const targetKey = treeNodeItem.$meta.id

      const isAllChildrenChecked =
        checkedChildrenCount !== 0 &&
        checkedChildrenCount === treeNodeItem.children.length &&
        indeterminateChildrenCount === 0

      if (isAllChildrenChecked) {
        keysToCheck[targetKey] = isAllChildrenChecked
        keysToCheckWithoutFalse[targetKey] = isAllChildrenChecked
      } else {
        keysToCheck[targetKey] = false
        if (currentCheckedKeys) {
          delete currentCheckedKeys[targetKey]
        }
      }

      keysToIndeterminate[targetKey] = isAllChildrenChecked
        ? false
        : checkedChildrenCount > 0 || indeterminateChildrenCount > 0
    }
  }

  return { keysToCheck: keysToCheckWithoutFalse, keysToIndeterminate }
}

/**
 * Функция для получения объектов с ключами выбранных и полувыбранных узлов дерева
 *
 * @param {TreeNodes} treeNodes Плоский объект дерева узлов
 * @param {TreeNodeKey} targetKey Ключ целевого узла дерева
 * @param {GetKeysOptions} options Объект с конфигурацией обхода дерева
 */
export const getKeys = <TItem = TreeItem>(
  treeNodes: TreeNodePlain<TItem>,
  targetKey: React.Key,
  {
    currentIndeterminateKeys = {},
    currentCheckedKeys: currentCheckedKeysProp,
    disabledKeys,
    targetValue,
  }: GetKeysOptions
): GetKeysResult => {
  const currentCheckedKeys: Record<React.Key, boolean> = {
    ...currentCheckedKeysProp,
  }
  let keysToIndeterminate: Record<React.Key, boolean> = {}
  let keysToCheck: Record<React.Key, boolean> = {}

  const treeItem = treeNodes[targetKey]

  if (!treeItem) {
    return { keysToCheck, keysToIndeterminate }
  }

  const treeItemChecked = currentIndeterminateKeys[targetKey]
    ? false
    : (targetValue === undefined && !currentCheckedKeys[targetKey]) ||
      targetValue

  if (!disabledKeys?.[targetKey]) {
    if (treeItemChecked) {
      keysToCheck = {
        [targetKey]: treeItemChecked,
      }
    } else {
      delete currentCheckedKeys[targetKey]
    }
  }

  const {
    keysToCheck: childrenKeysToCheck,
    keysToIndeterminate: childrenKeysToIndeterminate,
    isAllChildrenChecked,
  } = processChildrenKeys(treeNodes, {
    currentCheckedKeys,
    targetValue: treeItemChecked,
    keys: treeItem.$meta.boundaryChildrenKeys,
    disabledKeys,
  })

  const {
    keysToCheck: parentKeysToCheck,
    keysToIndeterminate: parentKeysToIndeterminate,
  } = processParentKeys(treeNodes, {
    currentCheckedKeys,
    checkedKeys: Object.assign(
      {},
      currentCheckedKeys,
      childrenKeysToCheck,
      keysToCheck
    ),
    currentIndeterminateKeys: Object.assign(
      currentIndeterminateKeys,
      childrenKeysToIndeterminate
    ),
    parentKey: treeItem.$meta.parentKey,
  })

  Object.assign(keysToCheck, childrenKeysToCheck, parentKeysToCheck)

  if (treeItemChecked !== undefined) {
    keysToIndeterminate = {
      [targetKey]: treeItemChecked ? !isAllChildrenChecked : treeItemChecked,
    }
  }

  Object.assign(
    keysToIndeterminate,
    childrenKeysToIndeterminate,
    parentKeysToIndeterminate
  )

  return {
    keysToCheck: {
      ...currentCheckedKeys,
      ...keysToCheck,
    },
    keysToIndeterminate,
  }
}
