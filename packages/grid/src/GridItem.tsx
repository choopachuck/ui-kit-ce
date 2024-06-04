'use client'

import * as React from 'react'
import { createUseStyles, clsx, useTheme } from '@v-uik/theme'
import { omit } from '@v-uik/utils'
import { UseGridDynamicValuesReturnType } from './hooks'
import { BreakpointValue, DEPRECATED_MEDIA_POINTS } from './config'
import type { ComponentPropsWithRefFix } from '@v-uik/common'

export interface GridItemProps extends ComponentPropsWithRefFix<'div'> {
  /**
   * Размер экрана
   */
  screen?: string | number
  /**
   * Ширина элемента для разных размеров экрана
   * Число означает количество полос, занимаемых элементом в 16-и колоночной сетке
   */
  xs?: BreakpointValue
  sm?: BreakpointValue
  md?: BreakpointValue
  lg?: BreakpointValue
  xl?: BreakpointValue
  xxl?: BreakpointValue
  /**
   * Количество колонок
   */
  columns?: number
}

type Params = GridItemProps & UseGridDynamicValuesReturnType

// TODO: неоптимальное решение. Требует переработки
const getWidth = (props: Params) => {
  const { screen, columns } = props
  const columnWidth = 100 / columns
  const autoBreakpoint = {
    flexBasis: 0,
    flexGrow: 1,
    maxWidth: '100%',
  }

  // Если текущий размер экрана соответствует переданному значению
  // то на этом работа функции прекращается и возвращается результат.
  if (typeof screen === 'number') {
    return { width: `${columnWidth * screen}%` }
  }

  const mediaPoints = DEPRECATED_MEDIA_POINTS

  // Иначе необходимо обойти все значения сначала слева от текущего
  // затем справа, если слева результат не был найден.
  // В случае, если поиск в обе стороны не увенчался успехом - вернуть 'auto'
  // @ts-ignore
  const indexOfScreen = mediaPoints.indexOf(screen ?? '')

  for (let i = indexOfScreen; i >= 0; i--) {
    if (props[mediaPoints[i]] === 'auto') {
      return autoBreakpoint
    }

    if (typeof props[mediaPoints[i]] === 'number') {
      const factor = Number(props[mediaPoints[i]]) ?? 0

      return { width: `${columnWidth * factor}%` }
    }
  }

  for (let i = indexOfScreen; i < mediaPoints.length; i++) {
    if (props[mediaPoints[i]] === 'auto') {
      return autoBreakpoint
    }

    if (typeof props[mediaPoints[i]] === 'number') {
      const factor = Number(props[mediaPoints[i]]) ?? 0

      return { width: `${columnWidth * factor}%` }
    }
  }

  return autoBreakpoint
}

const getDynamicStyles = (props: Params) => ({
  item: getWidth(props),
})
const useStyles = createUseStyles({
  item: {
    boxSizing: 'border-box',
  },
})

export const GridItem = React.forwardRef(
  (props: GridItemProps, ref: React.Ref<HTMLDivElement>) => {
    const theme = useTheme()
    const classes = useStyles()
    const dynamicStyles = getDynamicStyles(props as Params)

    const className = clsx(props.className, classes.item)
    const pathsToOmit = React.useMemo(
      () => [
        ...DEPRECATED_MEDIA_POINTS,
        'screen',
        'columnSpacing',
        'rowSpacing',
        'columns',
      ],
      [theme.comp.backwardCompatibilityMode]
    )

    const omittedProps = omit<GridItemProps>(props, pathsToOmit)

    return (
      <div
        {...omittedProps}
        ref={ref}
        style={{ ...dynamicStyles.item, ...(omittedProps?.style ?? {}) }}
        className={className}
      />
    )
  }
)
