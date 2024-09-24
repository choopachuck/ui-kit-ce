'use client'

import * as React from 'react'
import { useTreeContext } from '../../TreeContext'
import { TreeItem, UseTreeReturnProps } from '../../hooks'
import { TreeBaseComponentProps } from '../../types'

export type TreeNodeCheckerProps<TItem = TreeItem> =
  TreeBaseComponentProps<TItem> &
    Pick<UseTreeReturnProps<TItem>, 'toggleCheck'> & {
      checked?: boolean
      indeterminate?: boolean
    }

export const TreeNodeChecker = <TItem extends unknown = TreeItem>({
  nodeKey,
  toggleCheck,
  ...rest
}: TreeNodeCheckerProps<TItem>): React.ReactElement => {
  const {
    classesMap,
    components: { Checkbox },
  } = useTreeContext<TItem>()

  return (
    <label
      className={classesMap.nodeControlContainer}
      onClick={(event) => event.stopPropagation()}
    >
      <span className={classesMap.nodeControl}>
        {Checkbox && (
          <Checkbox
            {...rest}
            nodeKey={nodeKey}
            inputProps={{
              tabIndex: -1,
            }}
            onChange={() => {
              toggleCheck(nodeKey)
            }}
          />
        )}
      </span>
    </label>
  )
}
