'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { Dropdown, DropdownProps, DropdownTriggerType } from '@v-uik/dropdown'
import { isEqualKeyboardKeys } from '@v-uik/utils'
import { useMergedRefs } from '@v-uik/hooks'
import {
  DropdownMenuContext,
  DropdownMenuContextValue,
} from './DropdownMenuContext'
import {
  List,
  ListProps,
  ListItem,
  ListItemProps,
  ListContext,
} from '@v-uik/list'
import { ChevronIcon } from './assets/ChevronIcon'
import { ElementSize } from '@v-uik/common'
import { dropdownMenuStyles } from './sharedStyles/dropdownMenuStyles'

const useMenuStyles = createUseStyles(dropdownMenuStyles)

const useStyles = createUseStyles((theme) => ({
  //TODO: удалить в 2.0
  list: {
    backgroundColor:
      theme.comp.dropdownMenuItem.colorBackground ||
      theme.comp.dropdownMenu.colorBackground,
    borderColor:
      theme.comp.dropdownMenuItem.colorBorder ||
      theme.comp.dropdownMenu.colorBorder,
    boxShadow:
      theme.comp.dropdownMenuItem.elevationShadow ||
      theme.comp.dropdownMenu.elevationShadow,
  },
  dropdownMenuItem: {
    borderTopLeftRadius: theme.comp.dropdownMenuItem.shapeBorderRadiusTopLeftMd,
    borderTopRightRadius:
      theme.comp.dropdownMenuItem.shapeBorderRadiusTopRightMd,
    borderBottomLeftRadius:
      theme.comp.dropdownMenuItem.shapeBorderRadiusBottomLeftMd,
    borderBottomRightRadius:
      theme.comp.dropdownMenuItem.shapeBorderRadiusBottomRightMd,

    '&$small': {
      borderTopLeftRadius:
        theme.comp.dropdownMenuItem.shapeBorderRadiusTopLeftSm,
      borderTopRightRadius:
        theme.comp.dropdownMenuItem.shapeBorderRadiusTopRightSm,
      borderBottomLeftRadius:
        theme.comp.dropdownMenuItem.shapeBorderRadiusBottomLeftSm,
      borderBottomRightRadius:
        theme.comp.dropdownMenuItem.shapeBorderRadiusBottomRightSm,
    },

    '&$large': {
      borderTopLeftRadius:
        theme.comp.dropdownMenuItem.shapeBorderRadiusTopLeftLg,
      borderTopRightRadius:
        theme.comp.dropdownMenuItem.shapeBorderRadiusTopRightLg,
      borderBottomLeftRadius:
        theme.comp.dropdownMenuItem.shapeBorderRadiusBottomLeftLg,
      borderBottomRightRadius:
        theme.comp.dropdownMenuItem.shapeBorderRadiusBottomRightLg,
    },
  },
  small: {},
  large: {},
}))

export type DropdownMenuItemProps<
  E extends React.ElementType,
  ListElement extends React.ElementType
> = ListItemProps<E> & {
  /**
   * Свойства компонента List
   */
  listProps?: ListProps<ListElement>
  /**
   * Свойства компонента Dropdown
   */
  dropdownProps?: Omit<DropdownProps, 'children'>
  /**
   * Скрывать выпадающее меню по клику
   */
  closeMenuOnClick?: boolean
}

const defaultElement = 'li'
const defaultListElement = 'ul'

export const DropdownMenuItem = React.forwardRef(
  <
    E extends React.ElementType = typeof defaultElement,
    ListElement extends React.ElementType = typeof defaultListElement
  >(
    {
      listProps,
      dropdownProps,
      children,
      onKeyDown: onKeyDownProp,
      onBlur: onBlurProp,
      closeMenuOnClick = false,
      ...rest
    }: DropdownMenuItemProps<E, ListElement>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      open: openProp,
      content: contentProp,
      onStateChange: onStateChangeProp,
    } = dropdownProps ?? {}

    const listContext = React.useContext(ListContext)

    const classesList = useStyles()
    const menuClassesList = useMenuStyles()

    const innerRef = React.useRef<HTMLElement | null>(null)
    const listRef = React.useRef<HTMLElement | null>(null)

    const mergedRef = useMergedRefs([ref, innerRef])

    const handleListRef = React.useCallback((node: HTMLElement) => {
      listRef.current = node
      listRef.current?.focus()
    }, [])

    // eslint-disable-next-line react/prop-types
    const mergedListRef = useMergedRefs([listProps?.ref, handleListRef])

    const dropdownMenuContext: DropdownMenuContextValue =
      React.useContext(DropdownMenuContext)

    const [open, setOpen] = React.useState(false)

    const isDropdown = !!dropdownProps

    const handleSetOpen = React.useCallback(
      (value: boolean) => {
        setOpen(value)
        if (openProp !== undefined && openProp !== value) {
          onStateChangeProp?.(value)
        }
      },
      [setOpen, openProp, onStateChangeProp]
    )

    const handleClose = React.useCallback(() => {
      handleSetOpen(false)
      innerRef.current?.focus()
    }, [handleSetOpen])

    const dropdownContextValue = React.useMemo<DropdownMenuContextValue>(
      () => ({
        closeRoot: dropdownMenuContext.closeRoot,
        close: handleClose,
        orderNumber: (dropdownMenuContext.orderNumber as number) + 1,
      }),
      [handleClose, dropdownMenuContext.orderNumber]
    )

    const onStateChange = (value: boolean) => {
      setOpen(value)
      onStateChangeProp?.(value)
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      onKeyDownProp?.(event)

      if (isEqualKeyboardKeys('Tab', event.key)) {
        event.preventDefault()
        dropdownMenuContext.close?.()
      }

      if (isEqualKeyboardKeys('ArrowRight', event.key)) {
        event.preventDefault()

        if (isDropdown || !open) {
          setOpen(true)
        }
      }

      if (isEqualKeyboardKeys('ArrowLeft', event.key)) {
        event.preventDefault()

        if (Number(dropdownMenuContext.orderNumber) > 1) {
          dropdownMenuContext.close?.()
        }
      }

      if (isEqualKeyboardKeys('Escape', event.key)) {
        if (!isDropdown || !open) {
          event.preventDefault()
          dropdownMenuContext.close?.()
        }
      }
    }

    const onBlur = (event: React.FocusEvent<HTMLDivElement>) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      onBlurProp?.(event)

      if (open && listRef.current) {
        if (!listRef.current.contains(event.relatedTarget as Node)) {
          handleSetOpen(false)
        }
      }
    }

    const onClick = (event: React.KeyboardEvent<HTMLElement>) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      rest.onClick?.(event)

      if (closeMenuOnClick) {
        dropdownMenuContext.closeRoot?.()
      }
    }

    const propsClasses = (rest.classes ?? {}) as Record<string, string>

    const child = (
      <ListItem<E>
        suffix={isDropdown ? <ChevronIcon /> : undefined}
        {...(rest as ListItemProps<E>)}
        ref={mergedRef}
        role="menuitem"
        aria-haspopup={isDropdown ?? undefined}
        aria-expanded={isDropdown ? open : undefined}
        classes={{
          ...propsClasses,
          small: propsClasses?.small ?? classesList.small,
          listItem: propsClasses?.listItem ?? classesList.dropdownMenuItem,
          large: propsClasses?.large ?? classesList.large,
        }}
        className={rest?.className}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        onClick={onClick}
      >
        {children}
      </ListItem>
    )

    if (isDropdown) {
      const content = (
        <DropdownMenuContext.Provider value={dropdownContextValue}>
          <List<ListElement>
            ref={mergedListRef}
            size={listContext.size}
            {...(listProps as ListProps<ListElement>)}
            interactive
            role="menu"
            // eslint-disable-next-line react/prop-types
            className={clsx(
              listProps?.className,
              menuClassesList.list,
              classesList.list,
              {
                [menuClassesList.small]: listContext.size === ElementSize.sm,
                [menuClassesList.large]: listContext.size === ElementSize.lg,
              }
            )}
          >
            {contentProp}
          </List>
        </DropdownMenuContext.Provider>
      )

      return (
        <Dropdown
          action={DropdownTriggerType.hover}
          open={open}
          placement="right-start"
          {...dropdownProps}
          disablePortal
          content={content}
          onStateChange={onStateChange}
        >
          {child}
        </Dropdown>
      )
    }

    return child
  }
) as <
  E extends React.ElementType = typeof defaultElement,
  ListElement extends React.ElementType = typeof defaultListElement
>(
  props: DropdownMenuItemProps<E, ListElement> &
    React.RefAttributes<HTMLElement>
) => JSX.Element
