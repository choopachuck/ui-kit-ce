'use client'

import { DateLibAdapterProvider } from '@v-uik/base'
import { DateFnsAdapter } from '@v-uik/date-picker/dist/adapters/date-fns'
import { ru } from 'date-fns/locale'
import { App } from '../examples/App'

export default function Home() {
  return (
    <DateLibAdapterProvider
      dateAdapter={DateFnsAdapter}
      options={{ locale: ru }}
    >
      <App />
    </DateLibAdapterProvider>
  )
}
