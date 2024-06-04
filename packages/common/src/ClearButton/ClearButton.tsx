'use client'

import * as React from 'react'
import { clsx, createUseStyles } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { ElementSizeType, ElementSize } from '../ElementSize'
import { ClearIcon } from './assets/ClearIcon'
import type { ComponentPropsWithRefFix } from '../ReactTypes'

const useStyles = createUseStyles({
  inputClear: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'stretch',
    flexShrink: 0,
    zIndex: 2,
  },
  clearButton: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },

  disabled: {
    cursor: 'default',
    pointerEvents: 'none',
  },

  small: {
    width: 16,
    height: 16,
  },
})

export type Classes = {
  /** Стиль, применяемый к кнопке очистки поля  */
  clearButton?: string
  /** Стиль, применяемый с `disabled='true'` */
  disabled?: string
  /** Стиль, применяемый к элементу с `size='sm` */
  small?: string
}

export interface ClearButtonProps {
  /**
   * Список классов
   */
  classes?: Classes
  /**
   * Кнопка заблокирована для нажатия и фокусировки
   */
  disabled?: boolean
  /**
   * Размер кнопки
   */
  size?: ElementSizeType
  /**
   * Свойства для div контейнера кнопки
   */
  innerProps?: ComponentPropsWithRefFix<'div'>
  /**
   * Иконка для кнопки очистки
   */
  clearIcon?: React.ReactNode
}

export const ClearButton = React.forwardRef(
  (
    {
      clearIcon = <ClearIcon />,
      classes,
      disabled = false,
      size = 'md',
      innerProps,
    }: ClearButtonProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useStyles()

    const classesMap = useClassList<typeof classesList, Classes>(
      classesList,
      classes
    )

    const clearButtonClass = clsx(classesMap.clearButton, {
      [classesMap.disabled]: disabled,
      [classesMap.small]: size === ElementSize.sm,
    })

    return (
      <div
        ref={ref}
        role="button"
        aria-disabled={disabled}
        className={clearButtonClass}
        aria-label="clearButton"
        {...innerProps}
      >
        {clearIcon}
      </div>
    )
  }
)
