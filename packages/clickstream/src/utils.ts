import {
  ClickStreamElementType,
  BaseElementType,
  InputElementType,
  ClickStreamElementProperty,
} from './types'
import {
  CONNECTION_TYPES,
  CLICK_STREAM_GENERIC_ATTRIBUTES,
  ALIGNMENT,
  MINUTES_IN_HOUR,
  MS_IN_MINUTE,
} from './constants'

declare global {
  interface Navigator {
    getBattery: <T>() => Promise<Record<string, T>>
    browserLanguage: string
    userLanguage: string
    systemLanguage: string
    connection?: {
      type?: keyof typeof CONNECTION_TYPES
    }
  }
}

export const isForbiddenForElement = (
  element: HTMLElement,
  eventType: string
): boolean => {
  if (
    element.hasAttribute(CLICK_STREAM_GENERIC_ATTRIBUTES.OFF) ||
    getTagName(element) === 'body'
  ) {
    return true
  }

  if (eventType === 'click') {
    if (
      element.hasAttribute('aria-disabled') &&
      element.getAttribute('aria-disabled') === 'true'
    ) {
      return true
    }

    if (
      isInput(element) ||
      isImg(element) ||
      element.hasAttribute('role') ||
      isSvg(element) ||
      isButton(element)
    ) {
      return false
    }

    return !element.innerText
  }

  return false
}

export const getClickEventElement = (
  event: Event
): [ClickStreamElementType, HTMLElement] => {
  const eventsPath = event.composedPath()
  const fallbackElements: Partial<
    Record<BaseElementType, [ClickStreamElementType, HTMLElement]>
  > = {}
  const defaultElement = [
    getTagName(eventsPath[0] as HTMLElement),
    eventsPath[0],
  ] as [ClickStreamElementType, HTMLElement]

  for (let i = 0; i <= eventsPath.length; i++) {
    const element = eventsPath[i] as HTMLElement
    if (isLabel(element)) {
      return [getTagName(element), element]
    }
    if (isInput(element)) {
      const input = element as HTMLInputElement

      return [input.type as ClickStreamElementType, input]
    }
    if (isButton(element)) {
      return [
        (element as HTMLButtonElement).type as ClickStreamElementType,
        element,
      ]
    }
    if (element instanceof HTMLLinkElement) {
      return ['link', element]
    }
    if (element instanceof HTMLAnchorElement) {
      return ['anchor', element]
    }
    if (element instanceof HTMLElement && element.hasAttribute('role')) {
      return [getTagName(element), element]
    }

    if (isSvg(element)) {
      fallbackElements.svg = [getTagName(element), element]
    }
  }

  return fallbackElements.svg || defaultElement
}

export const getChangeEventElement = (
  event: Event
): [ClickStreamElementType, HTMLInputElement | HTMLTextAreaElement] => {
  const element = event.target as HTMLInputElement | HTMLTextAreaElement
  const tagName = getTagName(element)

  if (tagName === 'select') {
    return [tagName as ClickStreamElementType, element]
  }

  if (element instanceof HTMLTextAreaElement) {
    return ['textarea', element]
  }

  return [element.type as InputElementType, element]
}

export const getElementAttributes = (
  element: HTMLElement
): ClickStreamElementProperty[] => {
  const attributes: ClickStreamElementProperty[] = []
  for (let i = 0, atts = element.attributes, n = atts.length; i < n; i++) {
    attributes.push({ key: atts[i].nodeName, value: String(atts[i].nodeValue) })
  }

  return attributes
}

export const isInput = (element: HTMLElement): boolean =>
  element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement

export const isImg = (element: HTMLElement): boolean =>
  element instanceof HTMLImageElement

export const isSvg = (element: HTMLElement): boolean =>
  element instanceof SVGElement

export const isButton = (element: HTMLElement): boolean =>
  element instanceof HTMLButtonElement

export const isCheckboxOrRadio = (element: HTMLInputElement): boolean =>
  ['checkbox', 'radio'].includes(element.type)

export const isLabel = (element: HTMLElement): boolean =>
  element instanceof HTMLLabelElement

export const getTagName = (element: HTMLElement): BaseElementType =>
  element?.tagName?.toLowerCase() as BaseElementType

export const getElementValue = (
  element: HTMLElement
): string | boolean | null => {
  if (isInput(element)) {
    const input = element as HTMLInputElement
    const value = isCheckboxOrRadio(input) ? input.checked : input.value

    return value
  }

  if (isImg(element)) {
    return element.getAttribute('src')
  }

  return (
    element.getAttribute('aria-label') ||
    element.innerText ||
    element.textContent ||
    ''
  )
}

export const getApplicationLanguage = (): string =>
  globalThis.document?.documentElement.lang.substring(0, 16) || 'ru'

export const getBatteryLevel = async (): Promise<string> => {
  try {
    // Поддерживается не всеми браузерами
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
    const battery = (await globalThis.navigator?.getBattery<number>()) || {}

    const { level } = battery

    if (typeof level === 'number') {
      return String(100 * level)
    }

    return '0'
  } catch (error) {
    return '0'
  }
}

export const getBrowser = (): string => globalThis.navigator?.userAgent

export const getConnectionType = (): string =>
  CONNECTION_TYPES[
    (globalThis.navigator?.connection?.type as keyof typeof CONNECTION_TYPES) ??
      'unknown'
  ]

export const getPageName = (): string => {
  if (!globalThis.document) {
    return ''
  }

  return globalThis.document.title
}

export const getUrl = (): string => {
  if (!window?.location?.href) {
    return ''
  }

  return window.location.href
}

export const getScreenSize = (): string =>
  globalThis.screen
    ? `${globalThis.screen.width}x${globalThis.screen.height}`
    : '0x0'

export const getSystemLanguage = (): string =>
  globalThis.navigator?.language ||
  globalThis.navigator?.userLanguage ||
  globalThis.navigator?.browserLanguage ||
  globalThis.navigator?.systemLanguage ||
  'ru'

const padStart = (value: number): number | string => {
  return value < ALIGNMENT ? `0${value}` : value
}

const formatOffset = (offset: number): string => {
  return `${offset < 0 ? '+' : '-'}${padStart(
    Math.abs(Math.floor(offset / MINUTES_IN_HOUR))
  )}:${padStart(Math.abs(offset % MINUTES_IN_HOUR))}`
}

export const getISOTime = (): string => {
  const date = new Date()
  const correctedDate = new Date(
    date.valueOf() - date.getTimezoneOffset() * MS_IN_MINUTE
  )
  const [correctedShortDate] = correctedDate.toISOString().split('Z')

  return `${correctedShortDate}${formatOffset(
    correctedDate.getTimezoneOffset()
  )}`
}
