import * as React from 'react'

/**
 * Сохраняет ссылку на текущий активный элемент при установке параметра `open = true`,
 * и возвращает этому элементу фокус, когда значение `open = false`
 */
export const useLastActiveElementFocus = (open: boolean): void => {
  const lastActiveElementRef = React.useRef<HTMLElement | null>(null)

  React.useEffect(() => {
    if (open) {
      lastActiveElementRef.current = document.activeElement as HTMLElement
    } else {
      lastActiveElementRef.current?.focus()
    }
  }, [open])
}
