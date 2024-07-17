export const dispatchChangeEvent = <TValue extends unknown = unknown>(
  element: HTMLInputElement,
  newValue: TValue
) => {
  element.setAttribute('value', String(newValue))
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value'
  )?.set

  nativeInputValueSetter?.call(element, newValue)

  const event = new Event('change', { bubbles: true })
  element.dispatchEvent(event)
}
