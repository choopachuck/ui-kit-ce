'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useButtonReset } from '@v-uik/button'
import { TreeExpandArrowIcon } from '../assets/TreeExpandArrowIcon'

const useStyles = createUseStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    color: theme.comp.table.treeExpandButtonColorText,
    cursor: 'pointer',

    '&:focus-visible': {
      boxShadow: `inset 0 0 0 2px ${theme.comp.table.treeExpandButtonColorShadowFocus}`,
    },
  },

  expanded: {
    '& $arrowIcon': {
      transform: 'rotate(90deg)',
    },
  },

  hoverable: {
    '&:hover': {
      backgroundColor: theme.comp.table.treeExpandButtonColorBackgroundHover,
    },
  },

  arrowIcon: {
    transition: 'transform 200ms ease-in-out',
  },
}))

export interface TreeExpandButtonProps
  extends React.ComponentPropsWithoutRef<'button'> {
  /**
   * Устанавливает состояние ячейки — открыто или закрыто.
   */
  expanded?: boolean
  /**
   * Индикация кнопки при наведении курсора
   */
  hoverable?: boolean
}

export const TreeExpandButton = ({
  expanded,
  hoverable,
  ...rest
}: TreeExpandButtonProps): JSX.Element => {
  const buttonClasses = useButtonReset()
  const classesList = useStyles()

  const ariaLabel = expanded ? 'Свернуть строку' : 'Раскрыть строку'

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={clsx(buttonClasses.resetButton, classesList.root, {
        [classesList.expanded]: expanded,
        [classesList.hoverable]: hoverable,
      })}
      {...rest}
    >
      <TreeExpandArrowIcon className={classesList.arrowIcon} />
    </button>
  )
}
