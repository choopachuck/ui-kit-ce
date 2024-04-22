'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { Switch } from '@v-uik/switch'
import { TRangeDate, TRangeValue } from '../../interfaces/range'
import { FunctionComponentCommonFields } from '../../interfaces/common'
import { NegativeIcon } from './icons/negative'
import { PositiveIcon } from './icons/positive'
import type { ComponentPropsWithRefFix } from '@v-uik/common'

const useStyles = createUseStyles((theme) => ({
  root: {
    padding: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: theme.comp.rangePicker.infinityPanelColorBackground,
    display: 'flex',
    alignItems: 'center',
  },

  switchStart: {
    marginRight: 8,
  },

  switchEnd: {
    marginRight: 0,
    marginLeft: 8,
  },

  label: {
    color: theme.comp.rangePicker.infinityPanelColorText,
  },

  labelEnd: {
    marginLeft: 'auto',
  },
}))

export interface Props<TDate = unknown>
  extends ComponentPropsWithRefFix<'div'> {
  /**
   * Значение диапазона
   */
  range: TRangeDate<TDate>
  /**
   * Обработчик изменения значения диапазона
   */
  changeDate: (date: TRangeValue<TDate> | null, index: 0 | 1) => void
}

interface IInfinityPanel extends FunctionComponentCommonFields<Props> {
  <TDate = unknown>(
    props: Props<TDate>,
    context?: unknown
  ): React.ReactElement | null
}

export const InfinityPanel: IInfinityPanel = <TDate extends unknown>(
  props: Props<TDate>
) => {
  const { className, range, changeDate, ...rest } = props

  const classesList = useStyles()

  const onChangeStart = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeDate(event.target.checked ? -Infinity : null, 0)
  }

  const onChangeEnd = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeDate(event.target.checked ? Infinity : null, 1)
  }

  return (
    <div className={clsx(className, classesList.root)} {...rest}>
      <Switch
        className={classesList.switchStart}
        checked={range[0] === -Infinity}
        onChange={onChangeStart}
      />
      <span className={classesList.label}>
        <NegativeIcon />
      </span>
      <span className={clsx(classesList.label, classesList.labelEnd)}>
        <PositiveIcon />
      </span>
      <Switch
        className={classesList.switchEnd}
        checked={range[1] === Infinity}
        onChange={onChangeEnd}
      />
    </div>
  )
}

InfinityPanel.displayName = 'InfinityPanel'
