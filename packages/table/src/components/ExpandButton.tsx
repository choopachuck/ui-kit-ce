'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useButtonReset } from '@v-uik/button'
import { ExpandChevronIcon } from '../assets/ExpandChevronIcon'

const useStyles = createUseStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    color: theme.comp.table.expandButtonColorText,
    cursor: 'pointer',

    '&:focus-visible': {
      boxShadow: `inset 0 0 0 2px ${theme.comp.table.expandButtonColorShadowFocus}`,
    },
  },

  expanded: {
    '& $chevronIcon': {
      transform: 'rotate(-180deg)',
    },
  },

  hoverable: {
    '&:hover': {
      backgroundColor: theme.comp.table.expandButtonColorBackgroundHover,
    },
  },

  chevronIcon: {
    transition: 'transform 200ms ease-in-out',
  },
}))

export interface ExpandButtonProps
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

// Ячейка таблицы для расширяемой строки.
export const ExpandButton = ({
  expanded,
  hoverable,
  ...rest
}: ExpandButtonProps): JSX.Element => {
  const buttonClasses = useButtonReset()
  const classList = useStyles()

  const ariaLabel = expanded ? 'Закрыть строку' : 'Раскрыть строку'

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={clsx(buttonClasses.resetButton, classList.root, {
        [classList.expanded]: expanded,
        [classList.hoverable]: hoverable,
      })}
      {...rest}
    >
      <ExpandChevronIcon className={classList.chevronIcon} />
    </button>
  )
}
