'use client'

import * as React from 'react'
import { clsx, createUseStyles } from '@v-uik/theme'
import { useClassList, useButtonReset } from '@v-uik/hooks'

const useStyles = createUseStyles({
  button: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },

  disabled: {
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
})

type Classes = Partial<Record<'button' | 'disabled', string>>

export type PageButtonProps = {
  /**
   * Классы компонента
   */
  classes?: Classes
  /**
   * Условие блокировки кнопки
   */
  disabled?: boolean
  /**
   * Функция изменения поля
   */
  onClick?: () => void
  /**
   * Содержимое кнопки
   */
  children: React.ReactNode
}

export const PageButton = ({
  classes,
  disabled,
  onClick,
  children,
  ...rest
}: PageButtonProps): JSX.Element => {
  const buttonClasses = useButtonReset()

  const classesList = useStyles()

  const classesMap = useClassList<typeof classesList, Classes>(
    classesList,
    classes
  )

  return (
    <button
      {...rest}
      className={clsx(
        classesMap.button,
        buttonClasses.resetButton,
        disabled && classesMap.disabled
      )}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
