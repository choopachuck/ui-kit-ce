import * as React from 'react'
import { UseExpandReturnProps, UseExpandProps } from './useExpand'
import { UseCheckProps, UseCheckReturnProps } from './useCheck'
import { UseSelectProps, UseSelectReturnProps } from './useSelect'
import { GettersProps } from '../types'

/**
 * Базовый элемент дерева. Используется в качестве источника данных
 */
export type TreeItem = {
  /**
   * Уникальный ключ элемента
   */
  key: React.Key
  /**
   * Отображаемый текст
   */
  label?: string | React.ReactNode
  /**
   * Флаг заблокированного элемента
   */
  disabled?: boolean
  /**
   * Флаг элемента, для которого отключен функционал чекбокса
   */
  checkDisabled?: boolean
  /**
   * Массив дочерних элементов
   */
  children?: TreeItem[]
  /**
   * Флаг элемента, для которого отключен функционал выбора
   */
  selectDisabled?: boolean
  /**
   * Флаг элемента, при раскрытии которого будут подгружаться новые данные
   */
  loadable?: boolean
}

export type TreeNodeItemMeta = {
  /**
   * Глубина вложенности элемента дерева
   */
  depth: number
  /**
   * Ключ родительского элемента
   */
  parentKey?: React.Key
  /**
   * Ключ ближайшего дочернего элемента дерева
   */
  closestChildKey?: React.Key
  /**
   * Уникальный идентификатор элемента дерева
   */
  id: string
  /**
   * Массив ближайших крайних дочерних элементов дерева
   */
  boundaryChildrenKeys?: string[]
  /**
   * Порядковый номер
   */
  order: number
  /**
   * Флаг заблокированого элемента
   */
  disabled: boolean
}

/**
 * Элемент на основе базового элемента дерева с метаинформацией и преобразованным `children`. Является возвращаемым значением
 */
export type TreeNodeItem<TItem = TreeItem> = Omit<TItem, 'children'> & {
  /**
   * Метаданные элемента дерева
   */
  $meta: TreeNodeItemMeta
  /**
   * Массив дочерних элементов дерева
   */
  children?: TreeNodeItem<TItem>[]
}

/**
 * Плоский объект на основе возвращаемых элементов дерева
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
     * Массив данных для элементов дерева
     */
    dataSource: TItem[]
  }

export type TreeGetters<TItem = TreeItem> = {
  /**
   * Функция для получения дочерних элементов дерева из массива данных
   *
   * @param {TItem} item Элемент дерева
   *
   * @returns Массив дочерних элементов дерева
   */
  getTreeItemChildren: (item: TItem) => TItem[] | undefined
  /**
   * Функция для получения ключа дерева из массива данных
   *
   * @param {TItem} item Элемент дерева
   *
   * @returns Ключ элемента дерева
   */
  getTreeItemKey: (item: TItem) => React.Key
  /**
   * Функция для получения отображаемого текста у элемента дерева из массива данных
   *
   * @param {TItem} item Элемент дерева
   *
   * @returns Отображаемый текст элемента дерева
   */
  getTreeItemLabel: (item: TItem) => React.ReactNode
  /**
   * Функция для получения флага заблокированного элемента дерева из массива данных
   *
   * @param {TItem} item Элемент дерева
   *
   * @returns Флаг заблокированного элемента дерева
   */
  getTreeItemDisabled: (item: TItem) => boolean
  /**
   * Функция для получения флага для заблокированного чекбокса у элемента дерева из массива данных
   *
   * @param {TItem} item Элемент дерева
   *
   * @returns Флаг заблокированного чекбокса элемента дерева
   */
  getTreeItemCheckDisabled: (item: TItem) => boolean
  /**
   * Функция для получения флага для элемента дерева, недоступного для выбора
   *
   * @param {TItem} item Элемент дерева
   *
   * @returns Флаг недоступного для выбора элемента дерева
   */
  getTreeItemSelectDisabled: (item: TItem) => boolean
  /**
   * Функция для получения флага подгружаемого элемента дерева
   *
   * @param {TItem} item Элемент дерева
   *
   * @returns Флаг подгружаемого элемента дерева
   */
  getTreeItemLoadable: (item: TItem) => boolean
}

export type UseTreeReturnProps<TItem = TreeItem> = UseExpandReturnProps &
  UseCheckReturnProps &
  UseSelectReturnProps & {
    /**
     * Массив данных для элементов дерева, содержащих дополнительную метаинформацию
     */
    tree: TreeNodeItem<TItem>[]
    /**
     * Массив ключей элементов дерева
     */
    nodeKeys: React.Key[]
    /**
     * Получить данные об элементе дерева из массива по ключу
     *
     * @returns Объект данных элемента дерева
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
