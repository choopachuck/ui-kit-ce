import React from 'react'
import { SelectProps } from '../Select'
import { SelectIcon } from '../assets/SelectIcon'
import { createUseStyles, clsx } from '@v-uik/theme'
import { ElementSize } from '@v-uik/common'

const useStyles = createUseStyles({
  small: {
    width: 16,
    height: 16,
  },

  medium: {},

  large: {},

  opened: {
    transform: 'rotate(180deg)',
  },
})

export type SelectDropdownIndicatorProps<
  ListElement extends React.ElementType,
  ListItemElement extends React.ElementType
> = Omit<SelectProps<ListElement, ListItemElement>, 'components'> & {
  /**
   * Дополнительное условие, которое отвечает за раскрытость дропдауна
   */
  opened?: boolean
}

export const SelectDropdownIndicator = <
  ListElement extends React.ElementType,
  ListItemElement extends React.ElementType
>({
  size,
  opened,
  classes: classesProp,
}: SelectDropdownIndicatorProps<
  ListElement,
  ListItemElement
>): React.ReactElement => {
  const classes = useStyles()
  const className = clsx(classesProp?.buttonArrowIcon, {
    [classes.small]: size === ElementSize.sm,
    [classes.medium]: size === ElementSize.md,
    [classes.large]: size === ElementSize.lg,
    [classes.opened]: opened,
  })

  return <SelectIcon className={className} />
}
