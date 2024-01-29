'use client'

import { useEffect, useRef } from 'react'

/**
 * Хук показывает, какие изменения свойств вызывают обновление компонента. Взято от [сюда](https://usehooks.com/useWhyDidYouUpdate/)
 *
 * Хук используется только для отладки. НЕ ДЛЯ ПРОДАКШЕНА.
 *
 * @example
 * useWhyDidYouUpdate("Counter", props);
 */
export const useWhyDidYouUpdate = <Props>(name: string, props: Props): void => {
  const previousProps = useRef<Props>()

  useEffect(() => {
    if (previousProps.current) {
      const _previousProps = previousProps.current
      const allKeys = Object.keys({ ..._previousProps, ...props })
      const changesObj = {}

      allKeys.forEach((key) => {
        // @ts-ignore вернуться позже
        if (_previousProps[key] !== props[key]) {
          // @ts-ignore вернуться позже
          changesObj[key] = {
            // @ts-ignore вернуться позже
            from: _previousProps[key] as Props,
            // @ts-ignore вернуться позже
            to: props[key] as Props,
          }
        }
      })
      if (Object.keys(changesObj).length) {
        // eslint-disable-next-line no-console
        console.log('[why-did-you-update]', name, changesObj)
      }
    }

    previousProps.current = props
  })
}
