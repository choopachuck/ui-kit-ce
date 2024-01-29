import { ButtonAriaActionEventHandler } from './types'
import * as React from 'react'

const SPACE_CODE = 32

const ENTER_CODE = 13

type UseButtonAriaPropsReturnType<E extends HTMLElement> = {
  onClick: React.MouseEventHandler<E>
  onKeyDown: React.KeyboardEventHandler<E>
  onKeyUp: React.KeyboardEventHandler<E>
}

/**
 * Хук, возвращающий калбеки для элемента, который должен вести себя как кнопка
 * @param onClick
 * @param onKeyUp
 * @param onKeyDown
 */
export const useButtonAriaActionProps = <E extends HTMLElement>(
  onClick: ButtonAriaActionEventHandler<E>,
  onKeyUp?: React.KeyboardEventHandler<E>,
  onKeyDown?: React.KeyboardEventHandler<E>
): UseButtonAriaPropsReturnType<E> => {
  return React.useMemo(
    () => ({
      onClick,
      onKeyDown: (event: React.KeyboardEvent<E>) => {
        onKeyDown?.(event)
        if (event.keyCode === SPACE_CODE) {
          event.preventDefault()
        }
        // If enter is pressed, activate the button
        else if (event.keyCode === ENTER_CODE) {
          event.preventDefault()
          onClick(event)
        }
      },
      onKeyUp: (event: React.KeyboardEvent<E>) => {
        onKeyUp?.(event)
        if (event.keyCode === 32) {
          event.preventDefault()
          onClick(event)
        }
      },
    }),
    [onClick, onKeyUp, onKeyDown]
  )
}
