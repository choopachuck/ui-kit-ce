import * as React from 'react'
import { DateLibAdapterProvider } from '../src'
import DateFnsAdapter from '@date-io/date-fns'
// import DateFnsAdapterJalali from '@date-io/date-fns-jalali'
import DayjsAdapter from '@date-io/dayjs'
// import HijriAdapter from '@date-io/dayjs'
// import JalaaliAdapter from '@date-io/dayjs'
import LuxonAdapter from '@date-io/luxon'
import MomentAdapter from '@date-io/moment'
import ruLocaleDateFns from 'date-fns/locale/ru'
import { IUtils } from '@date-io/core/IUtils'

const adapterList = {
  dateFns: 'dateFns',
  // dateFnsJalali: 'dateFnsJalali',
  dayjs: 'dayjs',
  // hijri: 'hijri',
  // jalaali: 'jalaali',
  luxon: 'luxon',
  moment: 'moment',
} as const

export type DictionaryAdapter = keyof typeof adapterList
export const adapterKeys = Object.values(adapterList)

export const dictionaryAdapter = {
  dateFns: DateFnsAdapter,
  // dateFnsJalali: DateFnsAdapterJalali,
  dayjs: DayjsAdapter,
  // hijri: HijriAdapter,
  // jalaali: JalaaliAdapter,
  luxon: LuxonAdapter,
  moment: MomentAdapter,
}

export const dictionaryLocales = {
  dateFns: ruLocaleDateFns,
  // dateFnsJalali: ruLocaleDateFns,
  dayjs: 'ru',
  // hijri: 'ru',ё
  // jalaali: 'ru',
  luxon: 'ru',
  moment: 'ru',
}

export const getAdapter = <
  TDate,
  Ctor extends new (...args: any[]) => IUtils<TDate>
>(
  adapterKey: DictionaryAdapter
): Ctor => {
  return dictionaryAdapter[adapterKey] as unknown as Ctor
}

// Используйте эту обертку для тестирования компонентов, которые используют DateLibAdapter.
export const withDateLibAdapter = <T extends { adapterKey: DictionaryAdapter }>(
  Component: React.ComponentType<T>
) => {
  return (props: T) => {
    React.useEffect(() => {
      if (props.adapterKey === 'dayjs') {
        //с dayjs работает только так
        require('dayjs/locale/ru')
      }
    }, [])

    return (
      <DateLibAdapterProvider
        dateAdapter={getAdapter(props.adapterKey)}
        options={{
          locale: dictionaryLocales[props.adapterKey] as unknown as string,
        }}
      >
        <Component {...props} />
      </DateLibAdapterProvider>
    )
  }
}
