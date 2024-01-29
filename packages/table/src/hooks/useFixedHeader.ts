import * as React from 'react'

export const useFixedHeader = (
  headerRef: React.MutableRefObject<HTMLElement | undefined>,
  fixedHeader?: boolean
): number[] | undefined => {
  const [headerRowsTopOffsets, setHeaderRowsTopOffsets] =
    React.useState<number[]>()

  const calculateOffsets = React.useCallback(() => {
    const rowsCount = headerRef.current?.childElementCount
    if (rowsCount) {
      const rowsTopOffsets: number[] = []
      for (let i = 0; i < rowsCount; i++) {
        rowsTopOffsets[i] = (
          headerRef.current?.children.item(i) as HTMLElement
        ).offsetTop
      }
      setHeaderRowsTopOffsets(rowsTopOffsets)
    }
  }, [headerRef])

  React.useLayoutEffect(() => {
    if (fixedHeader) {
      calculateOffsets()
    }
  }, [fixedHeader, calculateOffsets])

  React.useEffect(() => {
    if (fixedHeader) {
      const container = headerRef.current
      let resizeObserver: ResizeObserver | undefined
      if ('ResizeObserver' in window && container) {
        resizeObserver = new ResizeObserver(calculateOffsets)
        resizeObserver.observe(container)
      }

      return () => {
        if (container) {
          resizeObserver?.unobserve(container)
        }
      }
    }
  }, [fixedHeader, headerRef, calculateOffsets])

  return headerRowsTopOffsets
}
