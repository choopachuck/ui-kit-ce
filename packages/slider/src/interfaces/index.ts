import * as React from 'react'

export interface TickItem {
  /**
   * Подпись под насечкой
   */
  label: React.ReactNode
  /**
   * Значение, на котором должна быть установлена насечка
   */
  value: number
}

export type Classes = {
  /** Стиль, применяемый к основному элементу */
  slider?: string
  /** Стиль, применяемый к активному элементу, или элементу в фокусе */
  active?: string
  /** Стиль, применяемый к линии управления */
  range?: string
  /**
   * Стиль, применяемый к обертке линии управления
   * @deprecated оставлено для обратной совместимости, используйте `track`
   * */
  rail?: string
  /** Стиль, применяемый к обертке линии управления */
  track?: string
  /**
   * Стиль, применяемый к Tooltip с шагом
   * @deprecated оставлено для обратной совместимости, используйте `tooltip`
   * */
  thumb?: string
  /**  Стиль, применяемый к Tooltip с шагом */
  tooltip?: string
  /**  Стиль, применяемый к элементу Marker */
  marker?: string
  /**  Стиль, применяемый к тику */
  tick?: string
  /**  Стиль, применяемый к заголовку тика */
  tickLabel?: string
  /**  Стиль, применяемый к элементу с `disabled='true'` */
  disabled?: string
}

export interface SliderMarkerClasses {
  /** Стиль, применяемый к контейнеру */
  root?: string
  /** Стиль, применяемый к элементу */
  marker?: string
  /** Стиль, применяемый к элементу в состоянии active */
  active?: string
  /** Стиль, применяемый к элементу в состоянии focused */
  focused?: string
  /** Стиль, применяемый к элементу в состоянии disabled */
  disabled?: string
}
