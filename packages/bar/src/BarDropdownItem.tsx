'use client'

import * as React from 'react'
import { createUseStyles, useTheme, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { DropdownMenuItem, DropdownMenuItemProps } from '@v-uik/dropdown-menu'
import { BarContext } from './BarContext'
import { BarKinds, DarkColors, LightColors } from './constants'
import { ListContext, ListProps } from '@v-uik/list'
import { ElementSize } from '@v-uik/common'
import { BarDropdownItemClasses as Classes } from './interfaces/classes'
import { barDropdownStyles } from './sharedStyles/barDropdownStyles'
import { DropdownProps } from '@v-uik/dropdown'

const useBarDropdownStyles = createUseStyles(barDropdownStyles)

const useStyles = createUseStyles((theme) => ({
  small: {
    borderTopLeftRadius: theme.comp.barDropdownItem.shapeBorderRadiusTopLeftSm,
    borderTopRightRadius:
      theme.comp.barDropdownItem.shapeBorderRadiusTopRightSm,
    borderBottomLeftRadius:
      theme.comp.barDropdownItem.shapeBorderRadiusBottomLeftSm,
    borderBottomRightRadius:
      theme.comp.barDropdownItem.shapeBorderRadiusBottomRightSm,
  },

  medium: {
    borderTopLeftRadius: theme.comp.barDropdownItem.shapeBorderRadiusTopLeftMd,
    borderTopRightRadius:
      theme.comp.barDropdownItem.shapeBorderRadiusTopRightMd,
    borderBottomLeftRadius:
      theme.comp.barDropdownItem.shapeBorderRadiusBottomLeftMd,
    borderBottomRightRadius:
      theme.comp.barDropdownItem.shapeBorderRadiusBottomRightMd,
  },

  large: {
    borderTopLeftRadius: theme.comp.barDropdownItem.shapeBorderRadiusTopLeftLg,
    borderTopRightRadius:
      theme.comp.barDropdownItem.shapeBorderRadiusTopRightLg,
    borderBottomLeftRadius:
      theme.comp.barDropdownItem.shapeBorderRadiusBottomLeftLg,
    borderBottomRightRadius:
      theme.comp.barDropdownItem.shapeBorderRadiusBottomRightLg,
  },

  dark: {
    color: theme.comp.barDropdownItem.colorTextDark,

    '&$disabled': {
      color: theme.comp.barDropdownItem.colorTextDarkDisabled,
    },

    '&:not($disabled)': {
      '&:hover': {
        backgroundColor: theme.comp.barDropdownItem.colorBackgroundDarkHover,
      },

      '&:focus-visible': {
        backgroundColor: theme.comp.barDropdownItem.colorBackgroundDarkFocus,
      },
    },
  },

  light: {
    color: theme.comp.barDropdownItem.colorTextLight,

    '&$disabled': {
      color: theme.comp.barDropdownItem.colorTextLightDisabled,
    },

    '&:not($disabled)': {
      '&:hover': {
        backgroundColor: theme.comp.barDropdownItem.colorBackgroundLightHover,
      },

      '&:focus-visible': {
        backgroundColor: theme.comp.barDropdownItem.colorBackgroundLightFocus,
      },
    },
  },

  primary: {
    color: theme.comp.barDropdownItem.colorTextPrimary,

    '&$disabled': {
      color: theme.comp.barDropdownItem.colorTextPrimaryDisabled,
    },

    '&:not($disabled)': {
      '&:hover': {
        backgroundColor: theme.comp.barDropdownItem.colorBackgroundPrimaryHover,
      },

      '&:focus-visible': {
        backgroundColor: theme.comp.barDropdownItem.colorBackgroundPrimaryFocus,
      },
    },
  },

  disabled: {},

  //TODO: удалить в 2.0
  popupDark: {
    '& $list': {
      backgroundColor:
        theme.comp.barDropdownItem.listColorBackgroundDark ||
        theme.comp.barDropdown.listColorBackgroundDark,
      border: `1px solid ${
        theme.comp.barDropdownItem.listColorBorderDark ||
        theme.comp.barDropdown.listColorBorderDark
      }`,
    },
  },

  popupLight: {
    '& $list': {
      backgroundColor:
        theme.comp.barDropdownItem.listColorBackgroundLight ||
        theme.comp.barDropdown.listColorBackgroundLight,
      border: `1px solid ${
        theme.comp.barDropdownItem.listColorBorderLight ||
        theme.comp.barDropdown.listColorBorderLight
      }`,
    },
  },

  popupPrimary: {
    '& $list': {
      backgroundColor:
        theme.comp.barDropdownItem.listColorBackgroundPrimary ||
        theme.comp.barDropdown.listColorBackgroundPrimary,
      border: `1px solid ${
        theme.comp.barDropdownItem.listColorBorderPrimary ||
        theme.comp.barDropdown.listColorBorderPrimary
      }`,
    },
  },

  list: {},
}))

export type BarDropdownItemProps<
  E extends React.ElementType,
  ListElement extends React.ElementType
> = DropdownMenuItemProps<E, ListElement> & {
  /**
   * JSS-классы для стилизации
   */
  classes?: Classes & DropdownMenuItemProps<E, ListElement>['classes']
}

const defaultElement = 'li'
const defaultListElement = 'ul'

export const BarDropdownItem = React.forwardRef(
  <
    E extends React.ElementType = typeof defaultElement,
    ListElement extends React.ElementType = typeof defaultListElement
  >(
    {
      classes: classesProp,
      className: classNameProp,
      dropdownProps: dropdownPropsProp,
      listProps: listPropsProp,
      ...rest
    }: BarDropdownItemProps<E, ListElement>,
    ref: React.Ref<HTMLElement>
  ) => {
    const theme = useTheme()

    const barContext = React.useContext(BarContext)
    const listContext = React.useContext(ListContext)

    const classesListItem = useStyles()
    const rootClassesList = useBarDropdownStyles()
    const classesList = { ...classesListItem, list: rootClassesList.list }
    const classesMap = useClassList<typeof classesList, Classes>(
      classesList,
      classesProp
    )
    const className = clsx(classNameProp, {
      [classesMap.dark ?? '']: DarkColors.includes(barContext.kind),
      [classesMap.light ?? '']: LightColors.includes(barContext.kind),
      [classesMap.primary ?? '']: barContext.kind === BarKinds.primary,
    })
    const classes: DropdownMenuItemProps<E, ListElement>['classes'] = {
      ...classesMap,
      small: classesMap.small,
      listItem: classesMap.medium,
      large: classesMap.large,
      disabled: classesMap.disabled,
    }

    const popupClassName = clsx(dropdownPropsProp?.className, {
      [classesMap.popupDark]: DarkColors.includes(barContext.kind),
      [classesMap.popupLight]: LightColors.includes(barContext.kind),
      [classesMap.popupPrimary]: barContext.kind === BarKinds.primary,
    })

    const listClassName = clsx(
      listPropsProp?.className,
      classesMap.list,
      classesListItem.list,
      {
        [rootClassesList.small]: listContext.size === ElementSize.sm,
        [rootClassesList.large]: listContext.size === ElementSize.lg,
      }
    )

    const dropdownProps: Omit<DropdownProps, 'children'> | undefined =
      dropdownPropsProp
        ? {
            ...dropdownPropsProp,
            style: {
              zIndex: theme.zIndex.bar + 1,
              ...dropdownPropsProp?.style,
            },
            className: popupClassName,
          }
        : undefined

    const listProps = {
      ...(listPropsProp ?? {}),
      className: listClassName,
    } as ListProps<ListElement>

    return (
      <DropdownMenuItem
        ref={ref as React.Ref<HTMLLIElement>}
        {...(rest as DropdownMenuItemProps<E, ListElement>)}
        classes={classes}
        className={className}
        dropdownProps={dropdownProps}
        listProps={listProps}
      />
    )
  }
) as <
  E extends React.ElementType = typeof defaultElement,
  ListElement extends React.ElementType = typeof defaultListElement
>(
  props: BarDropdownItemProps<E, ListElement>
) => JSX.Element
