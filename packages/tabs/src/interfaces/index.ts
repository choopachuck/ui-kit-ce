export type TabClasses = {
  /** Стиль, применяемый к основному элементу */
  tab?: string
  /** Стиль, применяемый к выбранному элементу */
  selected?: string
  /** Стиль, применяемый к тексту элемента */
  text?: string
}

export type TabsClasses = {
  /** Стиль, применяемый к основному элементу */
  root?: string
  /** Стиль, применяемый к контейнеру табов */
  tabs?: string
  /** Стиль, применяемый к элементу с `direction='vertical'` */
  vertical?: string
  /** Стиль, применяемый к элементу с заливкой `kind='filled'` */
  filled?: string
  /** Стиль, применяемый к контенту вкладок */
  content?: string
}
