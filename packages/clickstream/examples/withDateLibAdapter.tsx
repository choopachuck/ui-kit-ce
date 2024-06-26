import * as React from 'react'
import { DateLibAdapterProvider } from '@v-uik/base'
import DateFnsAdapter from '@date-io/date-fns'

// Используйте эту обертку для тестирования компонентов, которые используют DateLibAdapter.
/* eslint-disable */
export const withDateLibAdapter = <T extends any>(
  Component: React.ComponentType<T>
) => {
  return (props: T) => {
    // React.useEffect(() => {
    //   if (props.adapterKey === 'dayjs') {
    //     //с dayjs работает только так
    //     require('dayjs/locale/ru')
    //   }
    // }, [])

    return (
      <DateLibAdapterProvider dateAdapter={DateFnsAdapter}>
        {/** @ts-ignore */}
        <Component {...props} />
      </DateLibAdapterProvider>
    )
  }
}
