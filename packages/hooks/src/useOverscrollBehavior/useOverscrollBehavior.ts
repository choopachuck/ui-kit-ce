'use client'

import { useRef, useCallback } from 'react'
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'

/**
 * Предотвращает прокрутку тела страницы, если скроллится целевой элемент. Похожее поведение вы можете получить используя
 * CSS свойство [overscroll-behavior](https://developer.mozilla.org/ru/docs/Web/CSS/overscroll-behavior).
 *
 * Этот хук можно использовать для элементов, которые отображаются по условию.
 */
export const useOverscrollBehavior = <Ref extends HTMLElement | null>(): ((
  node: Ref | null
) => void) => {
  const handleMouseEnter = useCallback((e: Event) => {
    disableBodyScroll(e.currentTarget as Element)
  }, [])
  const handleMouseLeave = useCallback(
    (e: Event) => enableBodyScroll(e.currentTarget as Element),
    []
  )

  const ref = useRef<Ref | null>(null)

  const callbackRef = useCallback<(node: Ref | null) => void>(
    (node) => {
      if (node) {
        node.style.setProperty('overscroll-behavior', 'contain') // Все мажорные десктопные и мобильные браузеры, кроме Safari
        node.style.setProperty('-ms-scroll-chaining', 'none') // Для IE в системе выше Windows 8

        if (
          window
            .getComputedStyle(node as Element)
            .getPropertyValue('overscroll-behavior') === 'contain' ||
          window
            .getComputedStyle(node as Element)
            .getPropertyValue('-ms-scroll-chaining') === 'none'
        ) {
          return
        }
      }

      // Если браузер не поддерживает overscroll-behavior, применяем fallback
      if (ref.current) {
        ref.current.removeEventListener('mouseenter', handleMouseEnter)
        ref.current.removeEventListener('mouseleave', handleMouseLeave)

        /**
         * Перед удалением элемента, обязательно разблокировать скролл.
         */
        enableBodyScroll(ref.current as NonNullable<typeof ref.current>)
      }

      ref.current = node

      if (ref.current) {
        ref.current.addEventListener('mouseenter', handleMouseEnter)
        ref.current.addEventListener('mouseleave', handleMouseLeave)

        /**
         * Не зависимо от положения всплывающего окна, нужно сразу заблокировать прокрутку,
         * потому что если окно появится под мышкой и пользователь НЕ будет двигать курсором,
         * событие mouseenter не отработает.
         */
        disableBodyScroll(ref.current as NonNullable<typeof ref.current>)
      }
    },
    [handleMouseEnter, handleMouseLeave]
  )

  return callbackRef
}
