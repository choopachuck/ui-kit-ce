import * as React from 'react'
import { UseExpandReturnProps, UseExpandProps } from './useExpand'
import { UseCheckProps, UseCheckReturnProps } from './useCheck'
import { UseSelectProps, UseSelectReturnProps } from './useSelect'
import { GettersProps } from '../types'

/**
 * Базовый узел дерева. Используется в качестве источника данных
 */
export type TreeItem = {
  /**
   * Уникальный ключ узла
   */
  key: React.Key
  /**
   * Отображаемый текст
   */
  label?: string | React.ReactNode
  /**
   * Флаг заблокированного узла
   */
  disabled?: boolean
  /**
   * Флаг узла, для которого отключена функциональность чекбокса
   */
  checkDisabled?: boolean
  /**
   * Массив дочерних узлов
   */
  children?: TreeItem[]
  /**
   * Флаг узла, для которого отключена функциональность выбора
   */
  selectDisabled?: boolean
  /**
   * Флаг узла, при раскрытии которого будут подгружаться новые данные
   */
  loadable?: boolean
}

export type TreeNodeItemMeta = {
  /**
   * Глубина вложенности узла дерева
   */
  depth: number
  /**
   * Ключ родительского узла
   */
  parentKey?: React.Key
  /**
   * Ключ ближайшего дочернего узла дерева
   */
  closestChildKey?: React.Key
  /**
   * Уникальный идентификатор узла дерева
   */
  id: string
  /**
   * Массив ближайших крайних дочерних узлов дерева
   */
  boundaryChildrenKeys?: string[]
  /**
   * Порядковый номер
   */
  order: number
  /**
   * Флаг заблокированого узла
   */
  disabled: boolean
}

/**
 * Элемент на основе базового узла дерева с метаинформацией и преобразованным `children`. Является возвращаемым значением
 */
export type TreeNodeItem<TItem = TreeItem> = Omit<TItem, 'children'> & {
  /**
   * Метаданные узла дерева
   */
  $meta: TreeNodeItemMeta
  /**
   * Массив дочерних узлов дерева
   */
  children?: TreeNodeItem<TItem>[]
}

/**
 * Плоский объект на основе возвращаемых узлов дерева
 */
export type TreeNodePlain<TItem = TreeItem> = Record<
  React.Key,
  TreeNodeItem<TItem>
>

export type UseTreeProps<TItem = TreeItem> = Omit<
  UseExpandProps<TItem>,
  'treePlain' | 'allowedKeysForExpand' | 'getters'
> &
  Omit<UseCheckProps<TItem>, 'treePlain' | 'disabledKeysForCheck'> &
  Omit<
    UseSelectProps<TItem>,
    'treePlain' | 'disabledKeysForSelect' | 'nodeKeys' | 'getIsExpanded'
  > &
  GettersProps<TItem> & {
    /**
     * Массив данных для узлов дерева
     */
    dataSource: TItem[]
  }

export type TreeGetters<TItem = TreeItem> = {
  /**
   * Функция для получения дочерних узлов дерева из массива данных
   *
   * @param {TItem} item Узел дерева
   *
   * @returns Массив дочерних узлов дерева
   */
  getTreeItemChildren: (item: TItem) => TItem[] | undefined
  /**
   * Функция для получения ключа дерева из массива данных
   *
   * @param {TItem} item Узел дерева
   *
   * @returns Ключ узла дерева
   */
  getTreeItemKey: (item: TItem) => React.Key
  /**
   * Функция для получения отображаемого текста у узла дерева из массива данных
   *
   * @param {TItem} item Узел дерева
   *
   * @returns Отображаемый текст узла дерева
   */
  getTreeItemLabel: (item: TItem) => React.ReactNode
  /**
   * Функция для получения флага заблокированного узла дерева из массива данных
   *
   * @param {TItem} item Узел дерева
   *
   * @returns Флаг заблокированного узла дерева
   */
  getTreeItemDisabled: (item: TItem) => boolean
  /**
   * Функция для получения флага для заблокированного чекбокса у узла дерева из массива данных
   *
   * @param {TItem} item Узел дерева
   *
   * @returns Флаг заблокированного чекбокса узла дерева
   */
  getTreeItemCheckDisabled: (item: TItem) => boolean
  /**
   * Функция для получения флага для узла дерева, недоступного для выбора
   *
   * @param {TItem} item Узел дерева
   *
   * @returns Флаг недоступного для выбора узла дерева
   */
  getTreeItemSelectDisabled: (item: TItem) => boolean
  /**
   * Функция для получения признака необходимости подгрузки узла
   *
   * @param {TItem} item Узел дерева
   *
   * @returns Флаг подгружаемого узла дерева
   */
  getTreeItemLoadable: (item: TItem) => boolean
}

export type UseTreeReturnProps<TItem = TreeItem> = UseExpandReturnProps &
  UseCheckReturnProps &
  UseSelectReturnProps & {
    /**
     * Массив данных для узлов дерева, содержащих дополнительную метаинформацию
     */
    tree: TreeNodeItem<TItem>[]
    /**
     * Массив ключей узлов дерева
     */
    nodeKeys: React.Key[]
    /**
     * Получить данные об узле дерева из массива по ключу
     *
     * @returns Объект данных узла дерева
     */
    getTreeNodeData: (key: React.Key) => TreeNodeItem<TItem>
  }

export type TreeState<TItem = TreeItem> = {
  tree: TreeNodeItem<TItem>[]
  treePlain: TreeNodePlain<TItem>
  allowedKeysForExpand: Record<React.Key, boolean>
  disabledKeysForCheck: Record<React.Key, boolean>
  disabledKeysForSelect: Record<React.Key, boolean>
  nodeKeys: React.Key[]
}
