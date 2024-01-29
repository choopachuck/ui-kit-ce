import * as React from 'react'
import {
  enableBodyScroll,
  disableBodyScroll,
  BodyScrollOptions,
} from 'body-scroll-lock'

interface UseBodyScrollLockResult<MountRefElement extends HTMLElement> {
  /**
   * Функция разблокировки скролла body
   */
  enableBodyScroll: typeof enableBodyScroll
  /**
   * Функция блокировки скролла body
   */
  disableBodyScroll: typeof disableBodyScroll
  /**
   * Ссылка на элемент, при монтировании которого будет блокироваться скролл
   */
  lockOnMountNodeRef: (node: MountRefElement) => void
}

/**
 * Блокирует прокрутку тела страницы при монтировании элемента.
 */
export const useBodyScrollLock = <
  MountRefElement extends HTMLElement = HTMLDivElement
>(
  options?: BodyScrollOptions
): UseBodyScrollLockResult<MountRefElement> => {
  const innerRef = React.useRef<MountRefElement | null>(null)

  const lockOnMountNodeRef = React.useCallback(
    (node: MountRefElement) => {
      if (node) {
        disableBodyScroll(node, { reserveScrollBarGap: true, ...options })
      } else {
        enableBodyScroll(innerRef.current as MountRefElement)
      }
      innerRef.current = node
    },
    [options]
  )

  return {
    enableBodyScroll,
    disableBodyScroll,
    lockOnMountNodeRef,
  }
}
