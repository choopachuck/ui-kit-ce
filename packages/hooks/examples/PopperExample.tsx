import * as React from 'react'
import { Button, usePopper } from '@v-uik/base'

export const PopperExample = (): JSX.Element => {
  const [referenceElement, setReferenceElement] =
    React.useState<HTMLButtonElement | null>(null)
  const [popperElement, setPopperElement] =
    React.useState<HTMLDivElement | null>(null)
  const [arrowElement, setArrowElement] = React.useState<HTMLDivElement | null>(
    null
  )
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
  })

  return (
    <>
      <Button ref={setReferenceElement}>Reference element</Button>

      <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        Popper element
        <div ref={setArrowElement} style={styles.arrow} />
      </div>
    </>
  )
}

export default PopperExample
