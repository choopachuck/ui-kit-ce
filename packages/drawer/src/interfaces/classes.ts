export type Classes = {
  /** Стиль, применяемый к основному элементу */
  root?: string
  /** Стиль, применяемый к элементу при `backdrop='true'` */
  backdrop?: string
  /** Стиль, применяемый к элементу при `backdrop='false'` */
  nonModalContainer?: string
  /** Стиль, применяемый к содержимому элемента */
  content?: string
}
