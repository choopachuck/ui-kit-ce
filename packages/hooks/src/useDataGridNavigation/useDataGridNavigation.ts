import {
  DataGridNavigationCallback,
  DataGridNavigationDirection,
} from './types'
import * as React from 'react'
import { isEqualKeyboardKeys } from '@v-uik/utils'

const ARROW_UP = 'ArrowUp'
const ARROW_LEFT = 'ArrowLeft'
const ARROW_DOWN = 'ArrowDown'
const ARROW_RIGHT = 'ArrowRight'

/**
 * Хук для реализации навигации согласно accessibility по паттерну grid
 * @param navigationCallback
 */
export const useDataGridNavigation = <E extends HTMLElement>(
  navigationCallback: DataGridNavigationCallback
): React.KeyboardEventHandler<E> => {
  return React.useCallback(
    (event: React.KeyboardEvent<E>) => {
      if (isEqualKeyboardKeys(ARROW_DOWN, event.key)) {
        event.preventDefault()
        navigationCallback(DataGridNavigationDirection.bottom, event)

        return
      }

      if (isEqualKeyboardKeys(ARROW_UP, event.key)) {
        event.preventDefault()
        navigationCallback(DataGridNavigationDirection.top, event)

        return
      }

      if (isEqualKeyboardKeys(ARROW_LEFT, event.key)) {
        event.preventDefault()
        navigationCallback(DataGridNavigationDirection.left, event)

        return
      }

      if (isEqualKeyboardKeys(ARROW_RIGHT, event.key)) {
        event.preventDefault()
        navigationCallback(DataGridNavigationDirection.right, event)

        return
      }
    },
    [navigationCallback]
  )
}
