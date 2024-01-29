import * as React from 'react'

/**
 * Тип для калбека кнопки. Event может быть не только нажатием мышкой на кнопку, но и нажатием с помощью клавиш клавиатуры
 */
export type ButtonAriaActionEventHandler<E extends HTMLElement> = (
  event: React.MouseEvent<E> | React.KeyboardEvent<E>
) => void
