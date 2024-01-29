import React from 'react'

import { useDebounce } from '@v-uik/hooks'
import { OFFSET } from './config'

function getContainerScrollOffset<E extends string | number>(
  container: HTMLDivElement | null,
  value: E | undefined
): number | null {
  if (!container || !['string', 'number'].includes(typeof value)) {
    return null
  }

  const element = container.querySelector<HTMLButtonElement>(
    `[data-value='${value as E}']`
  )
  if (!element) {
    console.error('Не найден button c currentValue = ', value)

    return null
  }

  return element.offsetTop - OFFSET
}

type UseAnimationScrollParams<E> = {
  currentValue?: E
  onClickLastColumn?: () => void
  currentTimeToString: (value: E) => string
}

type UseAnimationScrollReturnType = {
  bottomOffset: number
  isClickedRef: React.MutableRefObject<boolean>
  containerRef: React.RefObject<HTMLDivElement>
  handleScroll: () => void
}

const isCurrentValueEmpty = <E extends string | number>(
  val: E | undefined
): boolean => {
  if (typeof val === 'string') {
    return !val
  }

  return isNaN(Number(val))
}

export const useAnimationScroll = <E extends string | number>({
  currentValue,
  currentTimeToString,
  onClickLastColumn,
}: UseAnimationScrollParams<E>): UseAnimationScrollReturnType => {
  const [bottomOffset, setBottomOffset] = React.useState(0)
  const isClickedRef = React.useRef<boolean>(false)
  const [isFirstRender, setIsFirstRender] = React.useState(true)

  const containerRef = React.useRef<HTMLDivElement>(null)

  const currentValueByView = !isCurrentValueEmpty<E>(currentValue)
    ? currentTimeToString(currentValue as E)
    : ''

  React.useLayoutEffect(() => {
    const container = containerRef.current
    if (!isFirstRender) {
      return
    }

    if (!container) {
      return
    }

    const offset = getContainerScrollOffset(container, currentValue)

    if (!offset) {
      return
    }

    requestAnimationFrame(() => (container.scrollTop = offset))
  }, [currentValueByView])

  React.useEffect(() => {
    if (isFirstRender) {
      return
    }

    const container = containerRef.current
    const offset = getContainerScrollOffset(container, currentValue)

    if (offset === null || !container) {
      return
    }

    requestAnimationFrame(() =>
      container.scroll({ behavior: 'smooth', top: offset <= 0 ? 0 : offset })
    )
  }, [currentValueByView])

  const handleOnScrollEnd = React.useCallback(() => {
    if (!isClickedRef.current) {
      return
    }

    onClickLastColumn?.()
    isClickedRef.current = false
  }, [onClickLastColumn])

  React.useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    const optionElement = container.querySelector('button')

    if (!optionElement) {
      return
    }

    setBottomOffset(
      container.offsetHeight - optionElement.clientHeight - OFFSET
    )
  }, [])

  React.useEffect(() => {
    setIsFirstRender(false)
  }, [])
  const debouncedScroll = useDebounce(handleOnScrollEnd, 100)

  return {
    bottomOffset: bottomOffset,
    isClickedRef,
    handleScroll: debouncedScroll,
    containerRef,
  }
}
