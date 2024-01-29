import {
  useDataDateAttribute,
  UseDataDateAttributeReturnType,
} from '../useDataDateAttribute'
import { useDateLibAdapter } from '../useDateLibAdapter'
import * as React from 'react'
import { DataGridNavigationDirection } from '@v-uik/hooks'
import { verticalDirection } from './config'
import {
  useDatePickerNavigation,
  BasicNavigationParams,
  BasicNavigationReturnType,
} from '../useDatePickerNavigation'
import { getButtonCountInRow } from '../../utils/getButtonCountInRow'

type UseMonthViewNavigationReturnType<TDate> = BasicNavigationReturnType &
  Pick<UseDataDateAttributeReturnType<TDate>, 'generateDataDateAttribute'> & {
    setContainerNode: (element: HTMLDivElement | null) => void
  }

/**
 * Хук для навигации Monthview
 */
export const useMonthViewNavigation = <TDate extends unknown>({
  displayedDate,
}: BasicNavigationParams<TDate>): UseMonthViewNavigationReturnType<TDate> => {
  const adapter = useDateLibAdapter<TDate>()

  const [containerNode, setContainerNode] =
    React.useState<HTMLDivElement | null>(null)

  const handleYearViewNavigation = React.useCallback(
    (dir: DataGridNavigationDirection, date: TDate): TDate => {
      let newDate = adapter.addMonths(
        date,
        dir === DataGridNavigationDirection.right ? 1 : -1
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
            ? countInRow
            : -1 * countInRow
        )
      }

      return newDate
    },
    [adapter, containerNode]
  )

  /**
   * месяца находятся в одном "временном периоде", поэтому всегда true
   */
  const isSameDatePeriod = React.useCallback(() => true, [])

  const { generateDataDateAttribute, parseDataDateAttribute } =
    useDataDateAttribute<TDate>('month')

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
    generateDataDateAttribute,
    setContainerNode,
  }
}
