import * as React from 'react'
import { useDateLibAdapter } from './useDateLibAdapter'

export const useNowDate = <TDate = unknown>(): TDate => {
  const adapter = useDateLibAdapter<TDate>()
  const now = React.useRef<TDate | null>(null)

  if (now.current === null) {
    now.current = adapter.date()
  }

  return now.current as TDate
}
