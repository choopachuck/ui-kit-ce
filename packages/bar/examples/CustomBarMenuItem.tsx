import * as React from 'react'
import {
  clsx,
  createUseStyles,
  BarMenuItem,
  BarMenuItemProps,
} from '@v-uik/base'
import { ArrowIcon } from './assets/ArrowIcon'

const useCustomBarItemStyle = createUseStyles({
  text: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },

  expanded: {
    transform: 'rotate(-180deg)',
  },

  arrow: {
    transition: 'transform 200ms linear',
    marginLeft: 'auto',
  },

  nestedItem: {
    paddingLeft: (props: NestedItemStyleProps) =>
      [20, 64, 72, 80, 88, 96, 104][props.count],
  },
})

type NestedItemStyleProps = {
  count: number
}

type NestedBarMenuItem = {
  /**
   * Уровень вложенности элемента
   */
  count?: number
  /**
   * Устанавливает состояние элемента — открыто или закрыто
   */
  expanded?: boolean
  /**
   * Вложенные элементы
   */
  items?: React.ReactNode
}

export const CustomBarMenuItem: React.FC<
  BarMenuItemProps & NestedBarMenuItem
> = ({
  expanded = false,
  count = 0,
  items,
  children,
  classes: classesProp,
  ...rest
}): JSX.Element => {
  const classesList = useCustomBarItemStyle({ count })

  const classes = {
    ...classesProp,
    menuItem: clsx(classesProp?.menuItem, classesList.nestedItem),
    text: clsx(classesProp?.text, classesList.text),
  }

  return (
    <>
      <BarMenuItem classes={classes} {...rest}>
        {children}

        {items && (
          <ArrowIcon
            className={clsx(classesList.arrow, {
              [classesList.expanded]: expanded,
            })}
          />
        )}
      </BarMenuItem>
      {items && expanded && items}
    </>
  )
}
