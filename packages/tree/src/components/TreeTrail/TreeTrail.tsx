import * as React from 'react'
import {
  getTreeNodeLevelSpacer,
  getMinTreeNodeHeight,
  DEFAULT_TREE_TRAIL_LENGTH,
  CONTROL_ELEMENT_SIZE,
  getControlFullHeight,
} from '../../common'
import {
  TreeBaseComponentProps,
  TreeProps,
  LastParentsOnLevelMap,
} from '../../types'
import { TreeItem } from '../../hooks'
import { useTreeContext } from '../../TreeContext'

const getDepthsToSkip = (
  startKey: React.Key,
  lastParentsOnLevelMap: LastParentsOnLevelMap
) => {
  const depthsToSkip: Record<number, boolean> = {}
  const keys = lastParentsOnLevelMap[startKey]?.parentKey
    ? [lastParentsOnLevelMap[startKey].parentKey]
    : []

  while (keys.length) {
    const key = keys.shift()

    if (!key || !lastParentsOnLevelMap[key]) {
      continue
    }

    const { depth, parentKey } = lastParentsOnLevelMap[key]

    if (parentKey) {
      keys.push(parentKey)
    }

    if (depth) {
      depthsToSkip[depth] = true
    }
  }

  return depthsToSkip
}

export type TreeTrailProps<TItem = TreeItem> = TreeBaseComponentProps<TItem> &
  Pick<TreeProps, 'withHalfLevelSpacer' | 'levelSpacer'> & {
    /**
     * Флаг последнего элемента внутри дочерних элементов
     */
    isLastChild?: boolean
    lastParentsOnLevelMap: LastParentsOnLevelMap
    childrenCount: number
  }

export const TreeTrail = <TItem extends unknown = TreeItem>({
  isLastChild,
  withHalfLevelSpacer,
  depth,
  size,
  nodeKey,
  expanded,
  levelSpacer,
  childrenCount,
  lastParentsOnLevelMap,
}: TreeTrailProps<TItem>): React.ReactElement | null => {
  const { classesMap } = useTreeContext<TItem>()
  const treeNodeLevelSpacer = getTreeNodeLevelSpacer(
    withHalfLevelSpacer,
    levelSpacer
  )
  const treeNodeLevelSpacerBase = getTreeNodeLevelSpacer(withHalfLevelSpacer)
  const controlFullHeight = getControlFullHeight(size)
  const treeMinNodeHeight = getMinTreeNodeHeight(CONTROL_ELEMENT_SIZE, size)
  const trailOffset = treeNodeLevelSpacerBase / (withHalfLevelSpacer ? 1 : 2)

  return (
    <>
      {expanded && childrenCount >= 1 && (
        <div key={`${nodeKey}-${depth}`}>
          <div
            className={classesMap.trailContainer}
            style={{
              marginLeft: depth * treeNodeLevelSpacer,
              maxWidth: treeNodeLevelSpacer,
              top: controlFullHeight,
            }}
          >
            <div
              className={classesMap.trailVertical}
              style={{
                left: trailOffset,
                height:
                  (childrenCount === 1 &&
                    `calc(100% - ${controlFullHeight}px)`) ||
                  '100%',
              }}
            />
          </div>
        </div>
      )}
      {Array.from({ length: depth }).map((_, localDepth) => {
        const verticalLineHeight =
          !isLastChild || localDepth !== depth - 1
            ? '100%'
            : treeMinNodeHeight / 2 - 1

        const trailLength = DEFAULT_TREE_TRAIL_LENGTH

        const horizontalLineWidth = trailLength / (withHalfLevelSpacer ? 2 : 1)

        if (getDepthsToSkip(nodeKey, lastParentsOnLevelMap)[localDepth + 1]) {
          return
        }

        return (
          <div
            key={`${nodeKey}-${depth}-${localDepth}`}
            className={classesMap.trailContainer}
            style={{
              marginLeft: localDepth * treeNodeLevelSpacer,
              maxWidth: treeNodeLevelSpacer,
            }}
          >
            <div
              className={classesMap.trailVertical}
              style={{
                left: trailOffset,
                height: verticalLineHeight,
              }}
            />
            {depth > 0 && localDepth >= depth - 1 && (
              <div
                className={classesMap.trailHorizohtal}
                style={{
                  width: horizontalLineWidth,
                  left: trailOffset,
                  height: controlFullHeight / 2,
                }}
              />
            )}
          </div>
        )
      })}
    </>
  )
}
