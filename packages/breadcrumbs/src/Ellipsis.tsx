'use client'

import * as React from 'react'
import { Link, LinkProps } from '@v-uik/link'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuItemProps,
  DropdownMenuProps,
} from '@v-uik/dropdown-menu'
import type { Classes } from './classes'
import { createUseStyles } from '@v-uik/theme'
import { ListProps } from '@v-uik/list'

const useStyles = createUseStyles({
  menuItemInteractive: {
    minWidth: 0,

    '& a:focus, & a:focus-visible': {
      boxShadow: 'none',
    },

    '&:not($menuItemDisabled)': {
      '&:hover': {
        backgroundColor: 'transparent',
      },

      '&:hover:active': {
        backgroundColor: 'transparent',
      },

      '&:focus-visible': {
        backgroundColor: 'transparent',
      },
    },
  },

  menuItemDisabled: {},
})

interface EllipsisProps<ListElement extends React.ElementType> {
  items: React.ReactNode[]
  classes: Classes
  dropdownMenuProps?: Omit<DropdownMenuProps<ListElement>, 'children'>
}

const defaultListElement = 'ul'

export const Ellipsis = <
  ListElement extends React.ElementType = typeof defaultListElement
>({
  items,
  classes,
  dropdownMenuProps,
}: React.PropsWithChildren<EllipsisProps<ListElement>>): React.ReactElement => {
  const classesList = useStyles()
  const menuItemClasses: DropdownMenuItemProps<'li', 'ul'>['classes'] = {
    interactive: classesList.menuItemInteractive,
    disabled: classesList.menuItemDisabled,
  }

  const onFocusMenuItem = (event: React.FocusEvent<HTMLElement>) => {
    const link = event.target.querySelector('a')
    link?.focus()
  }

  const getActiveElement = () =>
    document.activeElement?.parentElement?.parentElement ?? null

  const wrappedContent = items.map((item, index) => (
    <DropdownMenuItem
      key={index}
      classes={menuItemClasses}
      disabled={(item as React.ReactElement<LinkProps<'a'>>).props?.disabled}
      onFocus={onFocusMenuItem}
    >
      {item}
    </DropdownMenuItem>
  ))

  return (
    <li className={classes.listItem}>
      <DropdownMenu
        placement="bottom"
        size="sm"
        {...dropdownMenuProps}
        listProps={
          {
            ...dropdownMenuProps?.listProps,
            getActiveElement,
          } as ListProps<ListElement>
        }
        content={wrappedContent}
      >
        <Link
          as="span"
          role="button"
          aria-haspopup="true"
          tabIndex={0}
          className={classes.ellipsis}
        >
          ...
        </Link>
      </DropdownMenu>
    </li>
  )
}
