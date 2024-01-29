'use client'

import * as React from 'react'
import { IUtils } from '@date-io/core/IUtils'
import { CustomUtils, customDateLibAdapter } from './utils/customDateLibAdapter'

export const DateLibAdapterContext =
  React.createContext<CustomUtils<unknown> | null>(null)

export interface DateLibAdapterProviderProps<
  TDate,
  Ctor extends new (...args: any[]) => IUtils<TDate>
> {
  children?: React.ReactNode
  /**
   * Адаптер для форматирования даты из библиотеки [@date-io](https://github.com/dmtrKovalenko/date-io)
   */
  dateAdapter: Ctor
  /**
   * Параметры для конструктора адаптера. В зависимости от конструктора,
   * будет отличаться набор параметров. Общая сигнатура:
   */
  options?: ConstructorParameters<Ctor>[0]
}

/**
 * Компонент Provider, который позволяет дочерним компонентам, использовать
 * контекст DateLibAdapterContext.
 */
export function DateLibAdapterProvider<
  TDate,
  Ctor extends new (...args: any[]) => IUtils<TDate>
>(props: DateLibAdapterProviderProps<TDate, Ctor>): React.ReactElement {
  const { children, dateAdapter, options } = props

  const adapterContext = React.useMemo(() => {
    const Adapter = customDateLibAdapter(dateAdapter)

    return new Adapter(options)
  }, [dateAdapter, options])

  return (
    <DateLibAdapterContext.Provider value={adapterContext}>
      {children}
    </DateLibAdapterContext.Provider>
  )
}
