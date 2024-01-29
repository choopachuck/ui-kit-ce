import * as React from 'react'
import { DateLibAdapterProvider } from '@v-uik/date-picker'
import ru from 'date-fns/locale/ru'
import DateFnsAdapter from '@date-io/date-fns'

export const Wrapper: React.FC = ({ children }) => {
  return (
    <DateLibAdapterProvider
      dateAdapter={DateFnsAdapter}
      options={{
        locale: ru,
        formats: { weekdayShort: 'EEEEEE', monthShort: 'LLL' },
      }}
    >
      {children}
    </DateLibAdapterProvider>
  )
}
