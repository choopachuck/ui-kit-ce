import { useMediaQuery } from '@v-uik/hooks'
import { useTheme } from '@v-uik/theme'
import * as React from 'react'
import { BreakpointsKeys, BreakpointsNumberValue } from '@v-uik/common'

export interface UseDynamicContainerParams {
  /**
   * Горизонтальный отступ в контейнере
   */
  margin?: BreakpointsNumberValue
  /**
   * Отключение отступов у контейнера
   */
  disableMargins?: boolean
  /**
   * Фиксированная ширина контейнера, равная величине текузего breakpoint'а экрана
   */
  fixed?: boolean
  /**
   * макс ширина контейнера
   */
  maxWidth?: Exclude<BreakpointsKeys, 'xs'>
  /**
   * Позиционирование контейнера
   */
  justify?: 'center' | 'start' | 'end'
}

export type UseDynamicContainerReturnType = {
  padding: number
  maxWidth?: number
  margin: [number | string, number | string]
}

const breakpointsOrder = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const

/**
 * Функция, возвращающая значение spacing
 */
const getSpacing = (
  space: BreakpointsNumberValue,
  breakpoint: BreakpointsKeys
): number | null => {
  if (typeof space === 'number') {
    return space
  }

  if (!space) {
    return null
  }

  return space[breakpoint] ?? null
}

/**
 * Хук для вычисления динамических параметров контейнера
 * @param maxWidthProps
 * @param disableMargins
 * @param justify
 * @param fixed
 * @param marginProps
 */
export const useDynamicContainer = ({
  maxWidth: maxWidthProps,
  disableMargins,
  justify,
  fixed,
  margin: marginProps,
}: UseDynamicContainerParams): UseDynamicContainerReturnType => {
  const screen = useMediaQuery()
  const theme = useTheme()

  const padding = React.useMemo(() => {
    if (disableMargins) {
      return 0
    }

    const value = getSpacing(marginProps, screen)

    if (!value) {
      // По умолчанию 32
      return 32
    }

    return value * 8
  }, [screen, disableMargins, marginProps])

  const maxWidth = React.useMemo(() => {
    let currentWidth = maxWidthProps
      ? theme.breakpoints[maxWidthProps]
      : undefined

    if (screen === 'xs') {
      return undefined
    }

    if (fixed) {
      // Вычисление приоритетов breakpoint ов
      const maxWidthPriority = breakpointsOrder.findIndex(
        (key) => key === maxWidthProps
      )
      const currentScreenPriority = breakpointsOrder.findIndex(
        (key) => key === screen
      )

      // Если приоритет текущего breakpoint экрана меньше,
      // чем макимальная ширина контейнера или макимальной ширины вообще нету,
      // то берем значение текущего breakpoint экрана
      if (
        maxWidthPriority === -1 ||
        currentScreenPriority <= maxWidthPriority
      ) {
        currentWidth = theme.breakpoints[screen] ?? currentWidth
      }
    }

    return currentWidth
  }, [maxWidthProps, screen, fixed, theme])

  // Вычисление margin для позиционирования [левый отступ, правый отступ]
  const margin: [number | string, number | string] = React.useMemo(() => {
    if (!justify) {
      return [0, 0]
    }

    switch (justify) {
      case 'center':
        return ['auto', 'auto']
      case 'start':
        return [0, 'auto']
      case 'end':
        return ['auto', 0]
      default:
        return [0, 0]
    }
  }, [justify])

  return React.useMemo(
    () => ({
      margin,
      maxWidth,
      padding,
    }),
    [margin, maxWidth, padding]
  )
}
