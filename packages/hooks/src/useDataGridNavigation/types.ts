// /**
//  * Enum с направлениями навигаций
//  */
// export enum DataGridNavigationDirection {
//   top = 'top',
//   bottom = 'bottom',
//   left = 'left',
//   right = 'right',
// }
//
// /**
//  *  тип калбека, который осуществялет навигацию
//  */
// export type DataGridNavigationCallback = (
//   navigationDirection: DataGridNavigationDirection,
//   event?: KeyboardEvent
// ) => void
import * as React from 'react'
/**
 * Enum с направлениями навигаций
 */
export enum DataGridNavigationDirection {
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right',
}

/**
 *  тип калбека, который осуществялет навигацию
 */
export type DataGridNavigationCallback = <E extends HTMLElement>(
  navigationDirection: DataGridNavigationDirection,
  event?: React.KeyboardEvent<E>
) => void
