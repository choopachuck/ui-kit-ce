'use client'

import { useCallback, useRef } from 'react'

export const useOutsideScroll = <Ref extends HTMLElement>(
  handler: () => void,
  propsRefs?: Array<React.MutableRefObject<Ref | null>>
): ((node: Ref | null) => void) => {
  const ref = useRef<Ref | null>(null)

  const handleScroll = useCallback(
    // Если прокрутка происходит за пределами целевого элемента и доп. элементов в propsRefs, вызвать обработчик
    (e: Event) => {
      const isParent = (e.target as Node).contains(ref.current)

      // это потом удалить
      const isCurrentNodeContains = ref.current?.contains(e.target as Node)
      const isPropsRefsContains =
        propsRefs &&
        propsRefs.every((ref) => ref.current?.contains(e.target as Node))
      // удалить до сюда

      if (isParent && !isCurrentNodeContains && !isPropsRefsContains) {
        handler()
      }
    },
    [handler, propsRefs]
  )

  const callbackRef = useCallback<(node: Ref | null) => void>(
    (node) => {
      if (ref.current) {
        document.removeEventListener('scroll', handleScroll, true)
      }

      ref.current = node

      if (ref.current) {
        document.addEventListener('scroll', handleScroll, true)
      }
    },
    [handleScroll]
  )

  return callbackRef
}
