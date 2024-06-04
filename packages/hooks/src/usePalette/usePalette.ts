'use client'

import { Theme, light } from '@v-uik/theme'
import { shuffle as shuffleFunc } from '@v-uik/utils'
import { useCallback, useState } from 'react'

/**
 * Срединный шаг палитры из `ref`-уровня светлой темы, относительно которого вычисляется цвет текста для соответствующей заливки
 */
const PIVOT_DEPTH: UsePaletteDepth = 50

/**
 * Шаг из палитры `ref`-уровня темы
 */
export type UsePaletteDepth =
  | 10
  | 15
  | 20
  | 30
  | 40
  | 50
  | 60
  | 70
  | 80
  | 90
  | 95
  | 99

export type UsePaletteColors = {
  backgroundColor: string
  textColor: string
}

/**
 * Получить палитру цветов из `ref`-уровня светлой тымы с выбранным шагом
 *
 * @param palette Палитра цветов из темы на `ref`-уровне
 * @param depth Шаг из палитры `ref`-уровня светлой темы
 *
 * @returns Массив цветов из палитры с переданным шагом
 */
const getPaletteByDepth = (
  palette: Theme['ref']['palette'],
  depth: UsePaletteDepth = PIVOT_DEPTH
) => {
  const paletteValues: UsePaletteColors[] = []

  Object.keys(palette).reduce((_, paletteKey) => {
    if (paletteKey.endsWith(String(depth))) {
      paletteValues.push({
        backgroundColor: palette[paletteKey as keyof typeof palette],
        textColor: depth > PIVOT_DEPTH ? palette.black : palette.white,
      })
    }

    return paletteValues
  }, paletteValues)

  return paletteValues
}

/**
 * Сгенерировать палитру цветов из `ref`-уровня светлой темы
 *
 * @param palette Палитра цветов из светлой темы на `ref`-уровне
 * @param depth Шаг из палитры `ref`-уровня светлой темы
 * @param shuffle Отсортировать палитру в случайном порядке
 *
 * @returns Массив цветов из палитры с переданным шагом
 */
const generatePalette = (
  palette: Theme['ref']['palette'],
  depth: UsePaletteDepth = PIVOT_DEPTH,
  shuffle = false
) => {
  const newPalette = getPaletteByDepth(palette, depth)

  return shuffle ? shuffleFunc(newPalette) : newPalette
}

export type UsePaletteOptions = {
  /**
   * Отсортировать палитру в случайном порядке
   */
  shuffle?: boolean
  /**
   * Флаг для отложенной генерации палитры. Если значение `true`, то палитра будет сгенерирована при запуске функции `recreate`
   */
  lazy?: boolean
}

export type PaletteRecreateOptions = {
  /**
   * Отсортировать палитру в случайном порядке
   */
  shuffle?: boolean
}

export type UsePaletteReturnProps = {
  /**
   * Мемоизированный массив цветов из палитры с переданным шагом
   */
  palette: UsePaletteColors[]
  /**
   * Функция для генерации новой палитры
   *
   * @param depth Шаг из палитры `ref`-уровня темы
   *
   * @returns Массив цветов из палитры с переданным шагом
   */
  recreate: (depth?: UsePaletteDepth) => UsePaletteColors[]
}

/**
 * Сгенерировать палитру цветов на основе заданного шага из `ref`-уровня темы.
 *
 * Результирующая палитра является мемоизированой и не будет сгенерирована заново при ререндере
 *
 * @param depth - Шаг из палитры `ref`-уровня темы
 * @param options - Настройка генерации палитры
 *
 * @returns `palette` - Мемоизированный массив цветов из палитры с переданным шагом, `recreate` - Функция для генерации новой палитры
 */
export const usePalette = (
  depth?: UsePaletteDepth,
  options: UsePaletteOptions = {}
): UsePaletteReturnProps => {
  const { shuffle, lazy } = { ...options }
  const [palette, setPalette] = useState(
    lazy ? [] : generatePalette(light.ref.palette, depth, shuffle)
  )

  const recreate = useCallback(
    (d?: UsePaletteDepth, o?: PaletteRecreateOptions) => {
      const newPalette = generatePalette(
        light.ref.palette,
        d || depth,
        o?.shuffle || shuffle
      )

      setPalette(newPalette)

      return newPalette
    },
    [shuffle, depth]
  )

  return { palette, recreate }
}
