export type CardContentClasses = {
  /**
   * Стиль, применяемый к контейнеру footer
   */
  footer?: string
  /**
   * Стиль, применяемый к контейнеру body
   */
  body?: string
  /**
   * Стиль, применяемый к тексту header
   */
  headerText?: string
  /**
   * Стиль, применяемый к контейнеру header
   */
  header?: string
  /**
   * Стиль, применяемый к тексту subtitle
   */
  subtitleText?: string
}

export type CardClasses = {
  /**
   * Стиль, применяемый к обертке card
   */
  root?: string
  /**
   * Стиль, применяемый к card
   */
  card?: string
  /**
   * Стиль, применяемый к карточке kind='container'
   */
  container?: string
  /**
   * Стиль, применяемый к карточке kind='selectable'
   */
  selectable?: string
  /**
   * Стиль, применяемый к карточке kind='clickable'
   */
  clickable?: string
  /**
   * Стиль, применяемый к input элементу
   */
  input?: string
  /**
   * Стиль, применяемый к карточке при disabled='true'
   */
  disabled?: string
  /**
   * Стиль, применяемый к карточке при kind='clickable' при active
   */
  active?: string
} & CardContentClasses
