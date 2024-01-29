import { State } from '@popperjs/core'

export const defineListSizeParameters = (
  state: State
): {
  listElement: HTMLElement
  listBorder: number
  listPadding: number
  optionHeight: number
  referenceBounds: DOMRect | ClientRect
} => {
  const listElement = state.elements.popper.firstElementChild as HTMLElement

  const referenceBounds = state.elements.reference.getBoundingClientRect()

  const listComputedStyles = window.getComputedStyle(listElement)

  const listBorder = parseFloat(
    listComputedStyles.getPropertyValue('border-top') || '0'
  )

  const listPadding = parseFloat(
    listComputedStyles.getPropertyValue('padding-top') || '0'
  )

  const optionHeight = (listElement?.lastElementChild as HTMLElement)
    ?.offsetHeight

  return { listElement, listBorder, listPadding, optionHeight, referenceBounds }
}
