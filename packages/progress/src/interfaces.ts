export const ProgressSize = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xlg: 'xlg',
} as const

export type ProgressSizeProps = keyof typeof ProgressSize

export type CircularClasses = {
  /** Стиль, применяемый к основному элементу */
  root?: string
  /** Стиль, применяемый к "неопределенному" элементу */
  indeterminate?: string
  /** Стиль, применяемый к "определенному" элементу */
  determinate?: string
  /** Стиль, применяемый к кругу */
  circular?: string
  /** Стиль, применяемый к задней линией (не заполненной) */
  track?: string
  /** Стиль, применяемый к линии заполнения */
  path?: string
  /** Стиль, применяемый к тексту, отображаемому проценты */
  percentage?: string
}

export type LinearClasses = {
  /** Стиль, применяемый к основному элементу */
  root?: string
  /** Стиль, применяемый к "неопределенному" элементу */
  indeterminate?: string
  /**
   * Стиль, применяемый к задней линией (не заполненной)
   * @deprecated оставлено для обратной совместимости, используйте `classes.track`
   * */
  barTrack?: string
  /** Стиль, применяемый к задней линией (не заполненной) */
  track?: string
  /**
   * Стиль, применяемый к линии заполнения
   * @deprecated оставлено для обратной совместимости, используйте `classes.path`
   * */
  barProgress?: string
  /** Стиль, применяемый к линии заполнения */
  path?: string
  /** Стиль скрывающий трек заполнения */
  withoutTrack?: string
}
