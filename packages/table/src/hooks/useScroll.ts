import * as React from 'react'

export interface UseScrollResult {
  scrollLeaveTop: boolean
  scrollLeaveStartSide: boolean
  scrollLeaveEndSide: boolean
  onScroll: (event: React.MouseEvent<HTMLDivElement>) => void
}

export const useScroll = (
  innerRef: React.RefObject<HTMLDivElement>
): UseScrollResult => {
  const [isScrollable, setIsScrollable] = React.useReducer(
    () => ({
      horizontal:
        innerRef.current?.offsetWidth !== innerRef.current?.scrollWidth,
      vertical:
        innerRef.current?.offsetHeight !== innerRef.current?.scrollHeight,
    }),
    {
      horizontal: false,
      vertical: false,
    }
  )
  const [scrollLeaveTop, setScrollLeaveTop] = React.useState(false)
  const [scrollLeaveStart, setScrollLeaveStart] = React.useState(false)
  const [scrollLeaveEnd, setScrollLeaveEnd] = React.useState(true)

  React.useEffect(() => {
    const container = innerRef.current
    let resizeObserver: ResizeObserver | undefined
    if ('ResizeObserver' in window && container) {
      resizeObserver = new ResizeObserver(setIsScrollable)
      resizeObserver.observe(container)
    }

    return () => {
      if (container) {
        resizeObserver?.unobserve(container)
      }
    }
  }, [])

  const onScroll = (event: React.MouseEvent<HTMLDivElement>) => {
    setScrollLeaveTop(event.currentTarget.scrollTop > 0)
    setScrollLeaveStart(event.currentTarget.scrollLeft > 0)
    setScrollLeaveEnd(
      Math.ceil(
        event.currentTarget.scrollLeft + event.currentTarget.offsetWidth
      ) < event.currentTarget.scrollWidth
    )
  }

  return {
    scrollLeaveTop: isScrollable.vertical && scrollLeaveTop,
    scrollLeaveStartSide: isScrollable.horizontal && scrollLeaveStart,
    scrollLeaveEndSide: isScrollable.horizontal && scrollLeaveEnd,
    onScroll,
  }
}
