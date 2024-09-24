'use client'

import * as React from 'react'
import { createUseStyles } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { Select } from '@v-uik/select'

const useStyles = createUseStyles({
  customSelectButton: {
    border: 'none',
    backgroundColor: 'inherit',
    '&::after': {
      border: 'none',
    },
  },
  optionText: {
    flexShrink: 0,
  },
})

type Classes = Partial<Record<'customSelectButton', string>>

export type PickerProps = {
  /**
   * Классы компонента
   */
  classes?: Classes
  /**
   * Опции для выбора
   */
  options: Array<{ value: string; label: string }>
  /**
   * Значение поля
   */
  value: string
  /**
   * Функция изменения поля
   */
  onChange: (value: string) => void
}

export const Picker = ({
  classes,
  options,
  value,
  onChange,
  ...rest
}: PickerProps): JSX.Element => {
  const classesList = useStyles()

  const classesMap = useClassList<typeof classesList, Classes>(
    classesList,
    classes
  )

  return (
    <Select
      limitByWidth
      selectButtonProps={{
        ...rest,
      }}
      classes={{
        button: classesMap.customSelectButton,
        optionText: classesMap.optionText,
      }}
      options={options}
      value={value}
      onChange={onChange}
    />
  )
}
