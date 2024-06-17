export const dispatchChangeEvent = (
  element: HTMLInputElement,
  newValue: unknown
) => {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value'
  )?.set

  nativeInputValueSetter?.call(element, newValue)

  const event = new Event('change', { bubbles: true })
  element.dispatchEvent(event)
}
