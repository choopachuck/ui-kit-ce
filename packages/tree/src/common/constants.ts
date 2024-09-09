import { TreeSizeType } from './types'

/**
 * Размеры узлов.
 *
 * XS - extra small. очень маленький размер
 * SM - small. маленький размер
 * MD - medium. средний размер
 */
export const TreeSize = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
} as const

/**
 * Базовый размер узлов управления (длина и ширина)
 */
export const CONTROL_ELEMENT_SIZE = 24

/**
 * Базовые отступы сверху и снизу у узлов дерева относительно размера дерева
 */
export const TreeSpacingVertical: Record<keyof typeof TreeSize, number> = {
  [TreeSize.xs]: 0,
  [TreeSize.sm]: 4,
  [TreeSize.md]: 8,
}

/**
 * Базовый отступ между компонентами узла дерева
 */
export const DEFAULT_SPACING = 4

/**
 * Основной дата-атрибут для узла дерева
 */
export const DATA_ITEM_ID = 'data-tree-item-id'

/**
 * Основной дата-атрибут для дерева
 */
export const DATA_MAIN_TREE = 'data-tree'

/**
 * Размер дерева по умолчанию
 */
export const DEFAULT_SIZE: TreeSizeType = TreeSize.md

/**
 * Длина пути до узла дерева по умолчанию
 */
export const DEFAULT_TREE_TRAIL_LENGTH = 12
