export type TagClasses = {
  /** Стиль, применяемый к основному элементу */
  tag?: string
  /** Стиль, применяемый к элементу с `size='xs'` */
  extraSmall?: string
  /** Стиль, применяемый к элементу с `size='sm'` */
  small?: string
  /** Стиль, применяемый к элементу с `size='md'` */
  medium?: string
  /** Стиль, применяемый к элементу с `size='lg'` */
  large?: string
  /** Стиль, применяемый к элементу с `kind='lite'` */
  lite?: string
  /** Стиль, применяемый к элементу с `kind='secondary'` */
  secondary?: string
  /** Стиль, применяемый к элементу с `kind='primary'` */
  primary?: string
  /** Стиль, применяемый к элементу с `kind='color'` */
  color?: string
  /** Стиль, применяемый к тексту */
  text?: string
  /** Стиль, применяемый к тексту с `size='xs'` */
  textExtraSmall?: string
  /** Стиль, применяемый к тексту с `size='sm'` */
  textSmall?: string
  /** Стиль, применяемый к тексту с `size='md'` */
  textMedium?: string
  /** Стиль, применяемый к тексту с `size='lg'` */
  textLarge?: string
  /**
   * Стиль, применяемый к кнопке закрытия
   * @deprecated оставлено для обратной совместимости, используйте `closeButton`
   * */
  deleteButton?: string
  /** Стиль, применяемый к кнопке закрытия*/
  closeButton?: string
  /** Стиль, применяемый к */
  clickable?: string
  /** Стиль, применяемый к кликабельному тегу */
  selected?: string
  /** Стиль, применяемый к тегу с `dragged='true'` */
  dragged?: string
}

export type TagInputClasses = {
  /** Стиль, применяемый к контейнеру */
  container?: string
  /** Стиль, применяемый к элементу input */
  input?: string
  /** Стиль, применяемый к элементу input с `size='xs'` */
  inputXs?: string
  /** Стиль, применяемый к элементу input с `size='sm'` */
  inputSm?: string
  /** Стиль, применяемый к элементу input с `size='md'` */
  inputMd?: string
  /** Стиль, применяемый к элементу input с `size='lg'` */
  inputLg?: string
  /** Стиль, применяемый к элементу с `disabled='true'` */
  disabled?: string
  /** Стиль, применяемый к элементу при фокусе */
  focused?: string
  /** Стиль, применяемый к элементу с `size='xs'` */
  extraSmall?: string
  /** Стиль, применяемый к элементу с `size='sm'` */
  small?: string
  /** Стиль, применяемый к элементу с `size='md'` */
  medium?: string
  /** Стиль, применяемый к элементу с `size='lg'` */
  large?: string
  /** Стиль, применяемый к тегу */
  tag?: string
  /** Стиль, применяемый к тексту внутри тега */
  text?: string
  /** Стиль, применяемый к тексту с `size='xs'` */
  textExtraSmall?: string
  /** Стиль, применяемый к тексту с `size='sm'` */
  textSmall?: string
  /** Стиль, применяемый к тексту с `size='md'` */
  textMedium?: string
  /** Стиль, применяемый к тексту с `size='lg'` */
  textLarge?: string
  /** Стиль, применяемый к иконке добавления */
  addIcon?: string
}
