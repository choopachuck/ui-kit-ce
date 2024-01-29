import * as React from 'react'

export type ElementType = React.ElementType | React.ReactElement

/**
 * Вычисляет соответствие элемента переданному типу.
 * @param {React.ReactNode} element
 * @param {ElementType} type
 * @returns {boolean}
 */
export const hasElementType = (
  element: React.ReactNode,
  type: ElementType
): boolean => {
  return React.isValidElement(element) && element.type === type
}
