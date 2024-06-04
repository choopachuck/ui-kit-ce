'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'

import { DropdownMenuProps } from '@v-uik/dropdown-menu'
import { Ellipsis } from './Ellipsis'
import type { Classes } from './classes'
import type { ComponentPropsWithRefFix } from '@v-uik/common'

const useStyles = createUseStyles((theme) => ({
  root: {},

  list: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },

  listItem: {
    display: 'inline-flex',
    alignItems: 'center',

    '&:last-child': {
      fontFamily: theme.comp.breadcrumbs.typographyFontFamilyLastChild,
      fontWeight: theme.comp.breadcrumbs.typographyFontWeightLastChild,
      fontSize: theme.comp.breadcrumbs.typographyFontSizeLastChild,
      lineHeight: theme.comp.breadcrumbs.typographyLineHeightLastChild,
      letterSpacing: theme.comp.breadcrumbs.typographyLetterSpacingLastChild,
      color: theme.comp.breadcrumbs.colorTextLastChild,
    },

    '&:not(:last-child)': {
      '&::after': {
        content: '"/"',
        marginLeft: 8,
        marginRight: 8,
        color: theme.comp.breadcrumbs.dividerColorText,
        fontFamily: theme.comp.breadcrumbs.dividerTypographyFontFamily,
        fontWeight: theme.comp.breadcrumbs.dividerTypographyFontWeight,
        fontSize: theme.comp.breadcrumbs.dividerTypographyFontSize,
        lineHeight: theme.comp.breadcrumbs.dividerTypographyLineHeight,
        letterSpacing: theme.comp.breadcrumbs.dividerTypographyLetterSpacing,
      },
    },
  },
}))

export interface BreadcrumbsProps<ListElement extends React.ElementType>
  extends ComponentPropsWithRefFix<'div'> {
  /**
   * JSS-классы для стилизации
   */
  classes?: Partial<Classes>
  /**
   * Максимальное число цепочек навигации («хлебных крошек»). Если шагов больше максимального количества,
   * то будут показаны `itemsBeforeCollapse` и `itemsAfterCollapse` с разделителем посередине.
   */
  maxItems?: number
  /**
   * Если шагов больше максимального количества, количество шагов после разделителя.
   */
  itemsAfterCollapse?: number
  /**
   * Если шагов больше максимального количества, количество шагов до разделителя.
   */
  itemsBeforeCollapse?: number
  /**
   * Свойства компонента DropdownMenu (для показа скрытых цепочек навигации («хлебных крошек»))
   */
  dropdownMenuProps?: Omit<DropdownMenuProps<ListElement>, 'children'>
}

const defaultListElement = 'ul'

export const Breadcrumbs = React.forwardRef(
  <ListElement extends React.ElementType = typeof defaultListElement>(
    {
      classes,
      className: classNameProp,
      children,
      itemsAfterCollapse = 1,
      itemsBeforeCollapse = 1,
      maxItems = 8,
      dropdownMenuProps,
      ...other
    }: BreadcrumbsProps<ListElement>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)

    const className = clsx(classNameProp, classesMap.root)
    const listRef = React.useRef<HTMLUListElement>(null)

    const renderBreadcrumbs = () => {
      const allItems = React.Children.toArray(children)

      const wrapWithListItem = (
        child: Exclude<React.ReactNode, boolean | null | undefined>,
        index: number
      ) => (
        <li key={`child-${index}`} className={classesMap.listItem}>
          {child}
        </li>
      )

      const isCollapsed = allItems.length > maxItems

      if (isCollapsed) {
        const afterCollapseIndex = allItems.length - itemsAfterCollapse
        const menuItems = allItems.slice(
          itemsBeforeCollapse,
          afterCollapseIndex
        )

        return [
          ...allItems.slice(0, itemsBeforeCollapse).map(wrapWithListItem),
          <Ellipsis
            key="ellipsis"
            items={menuItems}
            classes={classesMap}
            dropdownMenuProps={dropdownMenuProps}
          />,
          ...allItems
            .slice(afterCollapseIndex)
            .map((child, index) =>
              wrapWithListItem(child, index + itemsBeforeCollapse)
            ),
        ]
      }

      return allItems.map(wrapWithListItem)
    }

    return (
      <nav ref={ref} className={className} {...other}>
        <ul ref={listRef} className={classesMap.list}>
          {renderBreadcrumbs()}
        </ul>
      </nav>
    )
  }
) as <ListElement extends React.ElementType = typeof defaultListElement>(
  props: BreadcrumbsProps<ListElement>
) => JSX.Element
