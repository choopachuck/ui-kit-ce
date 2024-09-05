import { useDateLibAdapter } from './useDateLibAdapter'
import { useMemo } from 'react'
import { ParsableDate } from '../interfaces'

/**
 * хук заменяющий невалидную value на null
 */
export const useSafeValue = <TDate>(value: TDate): TDate | null => {
  const adapter = useDateLibAdapter<TDate>()

  return adapter.isValid(value) ? value : null
}

export const useSafeRangeValue = <TDate>(
  value?: [ParsableDate<TDate>, ParsableDate<TDate>] | null
): [ParsableDate<TDate>, ParsableDate<TDate>] => {
  const adapter = useDateLibAdapter<TDate>()

  return useMemo(() => {
    return [
      adapter.isValid(value?.[0]) ? value?.[0] : null,
      adapter.isValid(value?.[1]) ? value?.[1] : null,
    ]
  }, [adapter, value])
}
