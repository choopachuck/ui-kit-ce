import { useDateLibAdapter } from './useDateLibAdapter'

export const useDefaultDates = <TDate>({
  minDate,
  maxDate,
}: {
  minDate?: TDate
  maxDate?: TDate
}): {
  minDate: TDate
  maxDate: TDate
} => {
  const adapter = useDateLibAdapter<TDate>()

  return {
    minDate: minDate ?? (adapter.date(new Date('1900-01-01')) as TDate),
    maxDate: maxDate ?? (adapter.date(new Date('2099-12-31')) as TDate),
  }
}
