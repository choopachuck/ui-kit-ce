'use client'

import * as React from 'react'
import { useTreeContext } from '../../TreeContext'
import { TreeItem, UseTreeReturnProps } from '../../hooks'
import { TreeBaseComponentProps } from '../../types'
import { ComponentPropsWithRefFix } from '@v-uik/common'
import { clsx } from '@v-uik/theme'

export type TreeNodeExpanderProps<TItem = TreeItem> =
  TreeBaseComponentProps<TItem> &
    Pick<UseTreeReturnProps<TItem>, 'toggleExpand'> & {
      /**
       * Флаг отображения пустого контейнера без кнопки
       */
      mock?: boolean
    } & {
      buttonProps?: ComponentPropsWithRefFix<'button'>
    }

export const TreeNodeExpander = <TItem extends unknown = TreeItem>({
  toggleExpand,
  mock,
  buttonProps,
  ...rest
}: TreeNodeExpanderProps<TItem>): React.ReactElement | null => {
  const {
    classesMap,
    getters: { getTreeItemLoadable },
    components: { ExpandButton, ExpandIcon, LoadingIndicator },
  } = useTreeContext<TItem>()

  const buttonClassName = clsx(
    classesMap.nodeControlContainer,
    buttonProps?.className,
    classesMap.nodeExpandButton
  )

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation()
    toggleExpand(rest.nodeKey)
    buttonProps?.onClick?.(event)
  }

  if (!ExpandButton) {
    return null
  }

  if (mock && !getTreeItemLoadable(rest.data)) {
    return <div className={buttonClassName} />
  }

  if (rest.loading) {
    return (
      <div className={buttonClassName}>
        {LoadingIndicator && <LoadingIndicator {...rest} />}
      </div>
    )
  }

  return (
    <ExpandButton
      type="button"
      aria-label={`${rest.expanded ? 'Close' : 'Open'} tree node ${
        rest.nodeKey
      }`}
      tabIndex={-1}
      {...buttonProps}
      className={buttonClassName}
      onClick={handleClick}
      {...rest}
    >
      <span className={classesMap.nodeControl}>
        {ExpandIcon && <ExpandIcon {...rest} />}
      </span>
    </ExpandButton>
  )
}
