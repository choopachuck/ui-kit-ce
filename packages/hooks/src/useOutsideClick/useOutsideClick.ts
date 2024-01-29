'use client'

import { useCallback, useRef } from 'react'

/**
 * Обработка события клика за пределами переданных элементов.
 * targets - это элементы, за пределами которых необходимо отслеживать событие 'click'.
 */
export const useOutsideClick = <Ref extends HTMLElement>(
  handler: (e?: Event) => void
): ((node: Ref | null) => void) => {
  const ref = useRef<Ref | null>(null)

  const handleMouseDown = useCallback(
    (e: Event) => {
      // Если клик происходит за пределами целевого элемента, вызвать обработчик
      if (!ref.current?.contains(e.target as Node)) {
        handler(e)
      }
    },
    [handler]
  )

  const callbackRef = useCallback<(node: Ref | null) => void>(
    (node) => {
      if (ref.current) {
        document.removeEventListener('mousedown', handleMouseDown, true)
      }

      ref.current = node

      if (ref.current) {
        document.addEventListener('mousedown', handleMouseDown, true)
      }
    },
    [handleMouseDown]
  )

  return callbackRef
}
