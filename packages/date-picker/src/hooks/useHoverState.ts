import * as React from 'react'
import { TRangeDate } from '../interfaces/range'

interface IUseHoverStateResult<TDate = unknown> {
  hoverDate: TDate | null
  setHoverDate?: (date: TDate | null) => void
}

export const useHoverState = <TDate = unknown>(
  range: TRangeDate<TDate>,
  activeInputIndex?: 0 | 1
): IUseHoverStateResult<TDate> => {
  const [hoverDate, setHoverDate] = React.useState<TDate | null>(null)

  const shouldTrackHover =
    (activeInputIndex === 0 && range[1]) || (activeInputIndex === 1 && range[0])

  return {
    hoverDate,
    setHoverDate: shouldTrackHover ? setHoverDate : undefined,
  }
}
