import { useTheme } from '@v-uik/theme'
import { GridProps } from '../types'
import * as React from 'react'
import { useMediaQuery } from '@v-uik/hooks'
import { DEPRECATED_MEDIA_POINTS } from '../config'
import { BreakpointsKeys, BreakpointsNumberValue } from '@v-uik/common'

export type UseGridDynamicValuesReturnType = {
  screen: ReturnType<typeof useMediaQuery>
  columns: number
  spacing: [number, number]
}

type UseGridDynamicValuesParams = {
  columns: GridProps['columns']
  spacing: GridProps['spacing']
  columnSpacing: GridProps['columnSpacing']
  rowSpacing: GridProps['rowSpacing']
}
const isNumber = (
  value: number | null | undefined | BreakpointsNumberValue
): value is number => typeof value === 'number'

/**
 * Хук для расчета динамических значений таких как spacing, columns, screen
 * @param columns
 * @param spacing
 * @param rowSpacing
 * @param columnSpacing
 */
export const useGridDynamicValues = ({
  columns,
  spacing,
  rowSpacing,
  columnSpacing,
}: UseGridDynamicValuesParams): UseGridDynamicValuesReturnType => {
  const theme = useTheme()
  const screen = useMediaQuery()

  /**
   * Вычилсеяем колонки
   */
  const calculatedColumns: number = React.useMemo(() => {
    // По дефолту 16
    const defaultValue = 16

    if (!columns) {
      return defaultValue
    }

    if (typeof columns === 'number') {
      return columns
    }

    return columns[screen] || defaultValue
  }, [screen, columns, theme])

  /**
   * Функция, возвращающая значение spacing
   */
  const getSpacing = React.useCallback(
    (
      space: BreakpointsNumberValue,
      breakpoint: BreakpointsKeys
    ): number | null => {
      if (isNumber(space)) {
        return space
      }

      if (!space) {
        return null
      }

      return space[breakpoint] ?? null
    },
    []
  )

  const mergedSpacing: Record<
    BreakpointsKeys,
    { vertical: number; horizontal: number }
  > = React.useMemo(() => {
    // Поддержка обратной совместимости
    return DEPRECATED_MEDIA_POINTS.reduce((accum, breakpoint) => {
      // Для расчета spacing из функиции getSpacing
      let bufferSpacing = getSpacing(spacing, breakpoint)
      // Вычисляем значение отступа по-умолчанию
      const defaultSpacing = isNumber(bufferSpacing) ? bufferSpacing : 1
      bufferSpacing = getSpacing(rowSpacing, breakpoint)
      // Вычисляем значение отступов по сторонам
      const newRowSpacing = isNumber(bufferSpacing)
        ? bufferSpacing
        : defaultSpacing
      bufferSpacing = getSpacing(columnSpacing, breakpoint)
      const newColumnSpacing = isNumber(bufferSpacing)
        ? bufferSpacing
        : defaultSpacing

      return {
        ...accum,
        [breakpoint]: {
          horizontal: newColumnSpacing * 8,
          vertical: newRowSpacing * 8,
        },
      }
    }, {} as Record<BreakpointsKeys, { vertical: number; horizontal: number }>)
  }, [spacing, rowSpacing, columnSpacing, getSpacing])

  /**
   * Высчитанные отсупы в формате [отступ для колонки, отступ для строчки]
   */
  const calculatedSpacing: [number, number] = React.useMemo(() => {
    return [mergedSpacing[screen]?.vertical, mergedSpacing[screen]?.horizontal]
  }, [mergedSpacing, screen])

  return React.useMemo(
    () => ({
      columns: calculatedColumns,
      screen,
      spacing: calculatedSpacing,
    }),
    [calculatedColumns, screen, calculatedSpacing]
  )
}
