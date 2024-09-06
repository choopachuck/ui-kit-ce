'use client'

import * as React from 'react'
import { CheckboxProps, Checkbox } from '@v-uik/checkbox'
import { TreeBaseComponentProps } from '../../types'
import { TreeItem } from '../../hooks'

export type TreeNodeCheckboxProps<TItem = TreeItem> =
  TreeBaseComponentProps<TItem> & CheckboxProps

export const TreeNodeCheckbox = <TItem extends unknown = TreeItem>({
  nodeKey,
  depth,
  size,
  data,
  expanded,
  loading,
  ...rest
}: TreeNodeCheckboxProps<TItem>): React.ReactElement => <Checkbox {...rest} />
