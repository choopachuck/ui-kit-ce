import * as React from 'react'
import { isEqualKeyboardKeys } from '@v-uik/utils'

export interface TrapFocusProps {
  /**
   * Уставнливать ли фокус по-умолчанию на sentinelStart?
   */
  focusSentinelStartByDefault?: boolean
}

export const TrapFocus: React.FC<TrapFocusProps> = ({
  children,
  focusSentinelStartByDefault = true,
}) => {
  // sentinels - скрытые элементы, которые используются для "ловушки" фокуса,
  // не давая ему уйти с содержимого модального окна, когда оно открыто
  const sentinelStartRef = React.useRef<HTMLDivElement | null>(null)
  const sentinelEndRef = React.useRef<HTMLDivElement | null>(null)

  const handleSentinelStartRef = React.useCallback(
    (node: HTMLDivElement) => {
      sentinelStartRef.current = node
      if (focusSentinelStartByDefault) {
        sentinelStartRef.current?.focus()
      }
    },
    [focusSentinelStartByDefault]
  )

  const onKeyDownStart = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isEqualKeyboardKeys('Tab', event.key) && event.shiftKey) {
      sentinelEndRef.current?.focus()
    }
  }

  const onKeyDownEnd = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isEqualKeyboardKeys('Tab', event.key) && !event.shiftKey) {
      sentinelStartRef.current?.focus()
    }
  }

  return (
    <>
      <div
        ref={handleSentinelStartRef}
        tabIndex={0}
        onKeyDown={onKeyDownStart}
      />
      {children}
      <div ref={sentinelEndRef} tabIndex={0} onKeyDown={onKeyDownEnd} />
    </>
  )
}
