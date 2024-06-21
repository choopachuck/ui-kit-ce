'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { Dropdown, DropdownProps, DropdownTriggerType } from '@v-uik/dropdown'
import { ElementSize, ElementSizeType } from '@v-uik/common'
import { List, ListProps } from '@v-uik/list'
import { useMergedRefs, useValue } from '@v-uik/hooks'
import { DropdownMenuContext } from './DropdownMenuContext'
import { includesKeyboardKey } from '@v-uik/utils'
import { modifiers as defaultModifiers } from './constants'
import { dropdownMenuStyles } from './sharedStyles/dropdownMenuStyles'

const ARROWS_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

const useStyles = createUseStyles(dropdownMenuStyles)

export interface DropdownMenuProps<E extends React.ElementType>
  extends DropdownProps {
  /**
   * Размер элементов списка
   */
  size?: ElementSizeType
  /**
   * Свойства компонента List
   */
  listProps?: ListProps<E>
}

const defaultListElement = 'ul'

export const DropdownMenu = React.forwardRef(
  <ListElement extends React.ElementType = typeof defaultListElement>(
    {
      size = ElementSize.md,
      listProps,
      open: openProp,
      content: contentProp,
      onStateChange: onStateChangeProp,
      modifiers: modifiersProp,
      children: childrenProp,
      ...rest
    }: DropdownMenuProps<ListElement>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useStyles()

    const targetRef = React.useRef<HTMLDivElement | null>(null)
    const listRef = React.useRef<HTMLElement | null>(null)

    const mergedRef = useMergedRefs([ref, targetRef])

    const handleListRef = React.useCallback((node: HTMLElement) => {
      listRef.current = node
    }, [])

    const mergedListRef = useMergedRefs([listProps?.ref, handleListRef])

    const [open, setOpen] = useValue(openProp)

    const handleSetOpen = (value: boolean) => {
      setOpen(value)
      onStateChangeProp?.(value)
    }

    const handleClose = () => {
      handleSetOpen(false)
      targetRef.current?.focus()
    }

    const onKeyDownTarget = (event: React.KeyboardEvent<HTMLElement>) => {
      if (includesKeyboardKey(ARROWS_KEYS, event.key)) {
        event.preventDefault()

        if (!open) {
          handleSetOpen(true)
        } else {
          listRef.current?.focus()
        }
      }
    }

    const modifiers = React.useMemo<DropdownProps['modifiers']>(() => {
      return [...defaultModifiers, ...(modifiersProp || [])]
    }, [modifiersProp])

    const content = (
      <DropdownMenuContext.Provider
        value={{ close: handleClose, closeRoot: handleClose, orderNumber: 1 }}
      >
        <List<ListElement>
          {...(listProps as ListProps<ListElement>)}
          ref={mergedListRef}
          interactive
          role="menu"
          className={clsx(listProps?.className, classesList.list, {
            [classesList.small]: size === ElementSize.sm,
            [classesList.large]: size === ElementSize.lg,
          })}
          size={size}
        >
          {contentProp}
        </List>
      </DropdownMenuContext.Provider>
    )

    const child = React.Children.only(childrenProp)

    const children = React.cloneElement(child, {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref: mergedRef,
      role: 'button',
      'aria-haspopup': open,
      'aria-expanded': open || undefined,
      onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
        child.props.onKeyDown?.(event)
        onKeyDownTarget(event)
      },
    })

    return (
      <Dropdown
        ref={ref}
        action={DropdownTriggerType.hover}
        {...rest}
        modifiers={modifiers}
        open={open}
        content={content}
        onStateChange={handleSetOpen}
      >
        {children}
      </Dropdown>
    )
  }
) as <ListType extends React.ElementType = typeof defaultListElement>(
  props: DropdownMenuProps<ListType>
) => JSX.Element
