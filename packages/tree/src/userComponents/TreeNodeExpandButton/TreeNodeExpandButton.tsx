'use client'

import * as React from 'react'
import { ComponentPropsWithRefFix } from '@v-uik/common'
import { useButtonReset } from '@v-uik/hooks'
import { clsx } from '@v-uik/theme'
import { TreeBaseComponentProps } from '../../types'
import { TreeItem } from '../../hooks'

export type TreeNodeExpandButtonProps<TItem = TreeItem> =
  TreeBaseComponentProps<TItem> & ComponentPropsWithRefFix<'button'>

export const TreeNodeExpandButton = <TItem extends unknown = TreeItem>({
  className,
  data,
  depth,
  nodeKey,
  expanded,
  loading,
  ...rest
}: TreeNodeExpandButtonProps<TItem>): React.ReactElement | null => {
  const { resetButton } = useButtonReset()

  const buttonClassName = clsx(resetButton, className)

  return <button {...rest} className={buttonClassName} />
}
