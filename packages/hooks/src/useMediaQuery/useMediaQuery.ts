'use client'

import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useLayoutEffect,
} from 'react'
import { useTheme } from '@v-uik/theme'
import { Theme, Breakpoints } from '@v-uik/theme'

type BreakpointsKeys = 'xs' | keyof Breakpoints

type TMediaQuery = {
  [key in BreakpointsKeys]: string | undefined
}

type TMediaQueryList = {
  [key in BreakpointsKeys]: MediaQueryList | undefined
}

type THandleEvent = (event: MediaQueryListEvent) => void
type THandleMatch = (size: BreakpointsKeys, event: MediaQueryListEvent) => void

const getMediaQuery = (theme: Theme): TMediaQuery => {
  const { sm, md, lg, xl, xxl } = theme.breakpoints

  return {
    xs: `(max-width: ${sm - 1}px)`,
    sm: `(min-width: ${sm}px) and (max-width: ${md - 1}px)`,
    md: `(min-width: ${md}px) and (max-width: ${lg - 1}px)`,
    lg: `(min-width: ${lg}px) and (max-width: ${xl - 1}px)`,
    xl: `(min-width: ${xl}px) and (max-width: ${xxl - 1}px)`,
    xxl: `(min-width: ${xxl}px)`,
  }
}

const mediaQueryListDefault = {
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  xxl: undefined,
}

const getMediaQueryList = (mediaQuery: TMediaQuery): TMediaQueryList => {
  return {
    xs: mediaQuery.xs ? window.matchMedia(mediaQuery.xs) : undefined,
    sm: mediaQuery.sm ? window.matchMedia(mediaQuery.sm) : undefined,
    md: mediaQuery.md ? window.matchMedia(mediaQuery.md) : undefined,
    lg: mediaQuery.lg ? window.matchMedia(mediaQuery.lg) : undefined,
    xl: mediaQuery.xl ? window.matchMedia(mediaQuery.xl) : undefined,
    xxl: mediaQuery.xxl ? window.matchMedia(mediaQuery.xxl) : undefined,
  }
}

const handlerMap: {
  [key in BreakpointsKeys]: Map<THandleMatch, THandleEvent>
} = {
  xs: new Map<THandleMatch, THandleEvent>(),
  sm: new Map<THandleMatch, THandleEvent>(),
  md: new Map<THandleMatch, THandleEvent>(),
  lg: new Map<THandleMatch, THandleEvent>(),
  xl: new Map<THandleMatch, THandleEvent>(),
  xxl: new Map<THandleMatch, THandleEvent>(),
}

/**
 * Возвращает текущий типоразмер экрана пользователя
 * @param {MediaQueryList} mediaQueryList
 */
const getCurrentSize = (mediaQueryList: TMediaQueryList): BreakpointsKeys => {
  return (Object.keys(mediaQueryList) as BreakpointsKeys[]).filter(
    (key) => mediaQueryList[key]?.matches
  )[0]
}

const addListener = (
  mediaQueryList: TMediaQueryList,
  onMatch: THandleMatch
) => {
  ;(Object.keys(mediaQueryList) as BreakpointsKeys[]).forEach((sizeKey) => {
    if (!handlerMap[sizeKey].has(onMatch)) {
      const wrappedOnMatch = (event: MediaQueryListEvent) => {
        onMatch(sizeKey, event)
      }

      handlerMap[sizeKey].set(onMatch, wrappedOnMatch)
      mediaQueryList[sizeKey]?.addListener(wrappedOnMatch)
    }
  })
}

const removeListener = (
  mediaQueryList: TMediaQueryList,
  onMatch: THandleMatch
) => {
  ;(Object.keys(mediaQueryList) as BreakpointsKeys[]).forEach((sizeKey) => {
    const wrappedOnMatch = handlerMap[sizeKey].get(onMatch)

    if (wrappedOnMatch) {
      handlerMap[sizeKey].delete(onMatch)
      mediaQueryList[sizeKey]?.removeListener(wrappedOnMatch)
    }
  })
}

export const useMediaQuery = (): BreakpointsKeys => {
  const theme = useTheme()

  const mediaQuery = useMemo(() => getMediaQuery(theme), [theme])

  const [mediaQueryList, setMediaQueryList] = useState<TMediaQueryList>(
    mediaQueryListDefault
  )

  const [currentSize, setCurrentSize] = useState<BreakpointsKeys>(() =>
    getCurrentSize(mediaQueryList)
  )

  useLayoutEffect(() => {
    const mediaQueryList = getMediaQueryList(mediaQuery)

    setMediaQueryList(mediaQueryList)
    setCurrentSize(getCurrentSize(mediaQueryList))
  }, [mediaQuery])

  const handleMatch = useCallback<THandleMatch>((size, event) => {
    if (event.matches) {
      setCurrentSize(size)
    }
  }, [])

  useEffect(() => {
    addListener(mediaQueryList, handleMatch)

    return () => {
      removeListener(mediaQueryList, handleMatch)
    }
  }, [mediaQueryList, handleMatch])

  return currentSize
}
