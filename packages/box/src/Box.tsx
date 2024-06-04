import * as React from 'react'

/**
 * Для типизации внешних компонентов.
 */
export type PolymorphicComponentProps<E extends React.ElementType, P> = P &
  BoxProps<E>

/**
 * Для типизации внешних компонентов.
 */
export type PolymorphicComponent<P, D extends React.ElementType = 'div'> = <
  E extends React.ElementType = D
>(
  props: PolymorphicComponentProps<E, P>
) => React.ReactElement | null

export type BoxOwnProps<E extends React.ElementType = React.ElementType> = {
  /**
   * HTML-тег, отображаемый компонентом.
   */
  as?: E
}

export type BoxProps<E extends React.ElementType> = BoxOwnProps<E> &
  Omit<
    React.ComponentProps<E>,
    keyof BoxOwnProps | 'onPointerEnterCapture' | 'onPointerLeaveCapture'
  >

const defaultElement = 'div'

/**
 * Polymorphic React components.
 *
 * @see https://github.com/kripod/react-polymorphic-box
 * @see https://blog.andrewbran.ch/polymorphic-react-components/
 * @see https://www.benmvp.com/blog/forwarding-refs-polymorphic-react-component-typescript/
 */
export const Box: <E extends React.ElementType = typeof defaultElement>(
  props: BoxProps<E>
) => React.ReactElement | null = React.forwardRef(function Box(
  props: BoxOwnProps,
  ref: React.Ref<Element>
) {
  const Element = props.as || defaultElement

  return <Element ref={ref} {...props} as={undefined} />
})
