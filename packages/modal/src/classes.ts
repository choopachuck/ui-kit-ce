export type Classes = {
  /** Стиль, применяемый к основному элементу */
  root?: string
  /** Стиль, применяемый к заднему фону */
  backdrop?: string
  /** Стиль, применяемый к контейнеру модального окна */
  modalContainer?: string
  /** Стиль, применяемый к содержимому модального окна */
  modalContent?: string
}

export type HeaderClasses = {
  /** Стиль, применяемый к основному элементу */
  root?: string
  /** Стиль, применяемый к элементу с `showCloseButton='true'` */
  withCloseButton?: string
  /** Стиль, применяемый к элементу заголовка */
  title?: string
  /** Стиль, применяемый к элементу заголовка при отсутствии titleProps */
  titleTypography?: string
  /** Стиль, применяемый к элементу подзаголовка */
  subtitle?: string
  /** Стиль, применяемый к элементу подзаголовка при отсутствии subtitleProps */
  subtitleTypography?: string
  /** Стиль, применяемый к кнопке закрытия */
  closeButton?: string
}

export type BodyClasses = {
  /** Стиль, применяемый к основному элементу */
  body?: string
  /** Стиль, применяемый к контейнеру прокрутки */
  scrollContainer?: string
}
