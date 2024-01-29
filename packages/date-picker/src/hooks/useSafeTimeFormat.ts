import { useDateLibAdapter } from './useDateLibAdapter'

export const useSafeTimeFormat = <TDate>(
  is12HoursFormat?: boolean,
  format?: string
): string => {
  const adapter = useDateLibAdapter<TDate>()

  if (format) {
    return format
  }

  return (
    is12HoursFormat ? adapter.formats.fullTime12h : adapter.formats.fullTime24h
  ) as string
}
