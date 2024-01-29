'use client'

import * as React from 'react'
import { createUseStyles, useTheme, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { DropdownMenu, DropdownMenuProps } from '@v-uik/dropdown-menu'
import { Direction, ElementSize } from '@v-uik/common'
import { BarContext } from './BarContext'
import { BarMenuItem, BarMenuItemProps } from './BarMenuItem'
import { ArrowIcon } from './assets/ArrowIcon'
import { ChevronIcon } from './assets/ChevronIcon'
import { BarKinds, DarkColors, LightColors } from './constants'
import { barDropdownStyles } from './sharedStyles/barDropdownStyles'
import { ListProps } from '@v-uik/list'

const useStyles = createUseStyles(barDropdownStyles)

type InternalClasses = Partial<Record<'arrow' | 'list', string>>

type Classes = BarMenuItemProps['classes'] & InternalClasses

export interface BarDropdownProps<ListElement extends React.ElementType>
  extends BarMenuItemProps {
  /**
   * JSS-классы для стилизации
   */
  classes?: Classes
  /**
   * Свойства компонента Dropdown
   */
  dropdownMenuProps?: Omit<DropdownMenuProps<ListElement>, 'children'>
}

const defaultListElement = 'ul'

export const BarDropdown = React.forwardRef(
  <ListElement extends React.ElementType = typeof defaultListElement>(
    {
      classes: classesProp,
      dropdownMenuProps,
      children,
      onKeyDown: onKeyDownProp,
      ...rest
    }: BarDropdownProps<ListElement>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const theme = useTheme()

    const barContext = React.useContext(BarContext)

    const isVertical = barContext.direction === Direction.vertical

    const classesList = useStyles()
    const classesMap = useClassList(classesList, classesProp)

    const classes: Classes = {
      ...classesProp,
      menuItem: classesMap.menuItem,
      text: classesMap.text,
      vertical: classesMap.vertical,
    }

    const popupClassName = clsx(dropdownMenuProps?.className, {
      [classesList.dark]: DarkColors.includes(barContext.kind),
      [classesList.light]: LightColors.includes(barContext.kind),
      [classesList.primary]: barContext.kind === BarKinds.primary,
    })

    const size = dropdownMenuProps?.size

    const listClassName = clsx(
      dropdownMenuProps?.listProps?.className,
      classesMap.list,
      {
        [classesList.small]: size === ElementSize.sm,
        [classesList.large]: size === ElementSize.lg,
      }
    )

    return (
      <DropdownMenu
        placement={isVertical ? 'right-start' : 'bottom-start'}
        {...dropdownMenuProps}
        style={{
          zIndex: theme.zIndex.bar + 1,
          ...dropdownMenuProps?.style,
        }}
        className={popupClassName}
        listProps={
          {
            ...dropdownMenuProps?.listProps,
            className: listClassName,
          } as ListProps<ListElement>
        }
      >
        <BarMenuItem {...rest} ref={ref} classes={classes}>
          {children}

          {isVertical ? (
            <ChevronIcon className={classesMap.arrow} />
          ) : (
            <ArrowIcon className={classesMap.arrow} />
          )}
        </BarMenuItem>
      </DropdownMenu>
    )
  }
) as <ListElement extends React.ElementType = typeof defaultListElement>(
  props: BarDropdownProps<ListElement>
) => JSX.Element
