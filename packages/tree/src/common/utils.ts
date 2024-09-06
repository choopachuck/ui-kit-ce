import {
  DATA_ITEM_ID,
  DATA_MAIN_TREE,
  DEFAULT_SIZE,
  TreeSpacingVertical,
  CONTROL_ELEMENT_SIZE,
  DEFAULT_SPACING,
} from './constants'
import { TreeSizeType } from './types'

export const getDataIdProperty = (key: React.Key): Record<string, string> => ({
  [DATA_ITEM_ID]: String(key),
})

export const getTreeProperty = (): Record<string, boolean> => ({
  [DATA_MAIN_TREE]: true,
})

export const getMinTreeNodeHeight = (
  controlSize: number,
  size: TreeSizeType = DEFAULT_SIZE
): number => {
  return controlSize + TreeSpacingVertical[size] * 2
}

export const getControlFullWidth = (): number =>
  CONTROL_ELEMENT_SIZE + DEFAULT_SPACING * 2

export const getControlFullHeight = (size: TreeSizeType): number =>
  CONTROL_ELEMENT_SIZE + TreeSpacingVertical[size] * 2

export const getTreeNodeLevelSpacer = (
  withHalfLevelSpacer = false,
  value = getControlFullWidth()
): number => {
  return withHalfLevelSpacer ? value / 2 : value
}

export const toAriaBoolean = (value: boolean): 'true' | 'false' =>
  String(value) as 'true' | 'false'
