// @ts-nocheck
/* eslint-disable */
import { ByRoleMatcher, ByRoleOptions } from '@testing-library/react'
import { customDateLibAdapter } from '@v-uik/base'
import {
  DictionaryAdapter,
  dictionaryLocales,
  getAdapter,
} from './withDateLibAdapter'

export function getTimeButton(
  container: HTMLElement,
  col: number,
  value: number,
  nullable?: false
): Element
export function getTimeButton(
  container: HTMLElement,
  col: number,
  value: number,
  nullable: true
): Element | null
export function getTimeButton(
  container: HTMLElement,
  col = 1,
  value = 0,
  nullable?: boolean
): Element | null {
  const el = container.querySelector(
    `div[class^="column"]:nth-child(${col}) button:nth-child(${value + 1})`
  )

  if (nullable) {
    return el
  }
  if (!el) {
    throw new Error(
      `Кнопка времени не найдена на странице. Args: col: ${col}, value: ${value}`
    )
  }

  return el
}

export const getNextDay = (
  currentDate: Date,
  getAllByRole: (
    role: ByRoleMatcher,
    options?: ByRoleOptions | undefined
  ) => HTMLElement[],
  adapterKey: DictionaryAdapter,
  overrideRole?: string
): HTMLElement => {
  const CustomAdapter = customDateLibAdapter(getAdapter(adapterKey))
  const adapter = new CustomAdapter({ locale: dictionaryLocales[adapterKey] })

  const components = getAllByRole(overrideRole ?? 'gridcell', {
    name: adapter
      .toJsDate(adapter.addDays(adapter.date(currentDate), 1))
      .getDate()
      .toString(),
  })

  const lastDayOfMonth =
    currentDate.getDate() >
    adapter.toJsDate(adapter.addDays(adapter.date(currentDate), 1)).getDate()

  return components.filter(
    (x) =>
      (!lastDayOfMonth &&
        !x.className.includes('notCurrentMonth') &&
        !x.className.includes('notInMonth')) ||
      (lastDayOfMonth &&
        (x.className.includes('notCurrentMonth') ||
          x.className.includes('notInMonth')))
  )?.[0]
}

export const getPrevDay = (
  currentDate: Date,
  getAllByRole: (
    role: ByRoleMatcher,
    options?: ByRoleOptions | undefined
  ) => HTMLElement[],
  adapterKey: DictionaryAdapter,
  overrideRole?: string
): HTMLElement => {
  const CustomAdapter = customDateLibAdapter(getAdapter(adapterKey))
  const adapter = new CustomAdapter({ locale: dictionaryLocales[adapterKey] })

  const components = getAllByRole(overrideRole ?? 'gridcell', {
    name: adapter
      .toJsDate(adapter.addDays(adapter.date(currentDate), -1))
      .getDate()
      .toString(),
  })

  const firstDayOfMonth =
    currentDate.getDate() <
    adapter.toJsDate(adapter.addDays(adapter.date(currentDate), -1)).getDate()

  return components.filter(
    (x) =>
      (!firstDayOfMonth &&
        !x.className.includes('notCurrentMonth') &&
        !x.className.includes('notInMonth')) ||
      (firstDayOfMonth &&
        (x.className.includes('notCurrentMonth') ||
          x.className.includes('notInMonth')))
  )?.[0]
}

export const dayFormat = 'keyboardDate'
export const monthFormat = 'month'
export const yearFormat = 'year'

export const getFormatDateString = (
  date: Date,
  adapterKey: DictionaryAdapter,
  formatString = dayFormat
): string => {
  const CustomAdapter = customDateLibAdapter(getAdapter(adapterKey))
  const adapter = new CustomAdapter({ locale: dictionaryLocales[adapterKey] })
  const tdate = adapter.date(date)

  return adapter.format(tdate, formatString)
}

export const getDateElement = (
  container: HTMLElement,
  date: Date,
  adapterKey: DictionaryAdapter,
  format = dayFormat
): HTMLElement => {
  return container.querySelector(
    `[data-date^="${getFormatDateString(date, adapterKey, format)}"]`
  ) as HTMLElement
}

export const functionProxy = (
  adapter: CustomUtils<unknown>,
  func?: (jsDate: Date) => boolean
) => {
  return func ? (v: unknown): boolean => func?.(adapter.toJsDate(v)) : undefined
}
