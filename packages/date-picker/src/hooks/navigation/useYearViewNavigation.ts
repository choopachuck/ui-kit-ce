import * as React from 'react'
import { DataGridNavigationDirection } from '@v-uik/hooks'
import {
  useDataDateAttribute,
  UseDataDateAttributeReturnType,
} from '../useDataDateAttribute'
import {
  useDatePickerNavigation,
  BasicNavigationParams,
  BasicNavigationReturnType,
} from '../useDatePickerNavigation'
import { useDateLibAdapter } from '../useDateLibAdapter'
import { verticalDirection } from './config'
import { getButtonCountInRow } from '../../utils/getButtonCountInRow'

type UseYearViewNavigationReturnType<TDate> = BasicNavigationReturnType &
  Pick<UseDataDateAttributeReturnType<TDate>, 'generateDataDateAttribute'> & {
    setContainerNode: (elem: HTMLDivElement | null) => void
  }

/**
 * Хук для навигации в YearView
 */
export const useYearViewNavigation = <TDate extends unknown>({
  displayedDate,
}: BasicNavigationParams<TDate>): UseYearViewNavigationReturnType<TDate> => {
  const adapter = useDateLibAdapter<TDate>()

  const [containerNode, setContainerNode] =
    React.useState<HTMLDivElement | null>(null)

  const handleYearViewNavigation = React.useCallback(
    (dir: DataGridNavigationDirection, date: TDate): TDate => {
      // кол-во месяцев в годе
      const monthsInYear = 12

      // Все операции происходят в месяцах, потому что в adapter существует только addMonths для этого
      let newDate = adapter.addMonths(
        date,
        dir === DataGridNavigationDirection.right ? monthsInYear : -monthsInYear
      )
      if (verticalDirection.includes(dir)) {
        // количество в строке кнопок меняется от ширины экрана
        const countInRow = getButtonCountInRow(
          containerNode,
          document.activeElement
        )

        newDate = adapter.addMonths(
          date,
          dir === DataGridNavigationDirection.bottom
            ? countInRow * monthsInYear
            : -1 * countInRow * monthsInYear
        )
      }

      return newDate
    },
    [adapter, containerNode]
  )

  /**
   * года находятся в одном "временном периоде", поэтому всегда true
   */
  const isSameDatePeriod = React.useCallback(() => true, [])

  const { generateDataDateAttribute, parseDataDateAttribute } =
    useDataDateAttribute<TDate>('year')

  const { buttonOnFocus, onKeyDown } = useDatePickerNavigation<TDate>({
    displayedDate,
    onNavigate: handleYearViewNavigation,
    generateDataDateAttribute,
    parseDataDateAttribute,
    isSameDatePeriod,
  })

  return {
    buttonOnFocus,
    onKeyDown,
    setContainerNode,
    generateDataDateAttribute,
  }
}
