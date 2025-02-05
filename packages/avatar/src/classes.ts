export type AvatarClasses = {
  /** Стиль, применяемый к основному элементу аватара */
  root?: string
  /** Стиль, применяемый к элементу `img` */
  image?: string
  /** Стиль, применяемый к основному элементу аватара с `kind="circle"` */
  circle?: string
  /** Стиль, применяемый к основному элементу аватара с `kind="rounded"` */
  rounded?: string
  /** Стиль, применяемый к основному элементу аватара с `kind="square"` */
  square?: string
  /** Стиль, применяемый к основному элементу аватара с пользовательским размером */
  customSize?: string
  /** Стиль, применяемый к основному элементу аватара с `size="xs"` */
  extraSmall?: string
  /** Стиль, применяемый к основному элементу аватара с `size="sm"` */
  small?: string
  /** Стиль, применяемый к основному элементу аватара с `size="md"` */
  medium?: string
  /** Стиль, применяемый к основному элементу аватара с `size="lg"` */
  large?: string
  /** Стиль,  применяемый к основному элементу аватара с `size="xl"` */
  extraLarge?: string
  /** Стиль, применяемый к основному элементу аватара при отсутствии свойств `color`, `src` или `imgProps.src`*/
  colorDefault?: string
  /** Стиль, применяемый к контейнеру иконки аватара при задании значения `icon` */
  icon?: string
  /** Стиль, применяемый к основному элементу аватара с `withShadow={true}` */
  withShadow?: string
  /** Стиль, применяемый к основному элементу аватара с `withBorder={true}` */
  withBorder?: string
  /** Стиль, применяемый к элементу `fallback` */
  fallback?: string
}

export type AvatarGroupClasses = {
  /** Стиль, применяемый к основному элементу группы аватаров */
  root?: string
  /** Стиль, применяемый к каждому аватару в группе */
  item?: string
  /** Стиль, применяемый к основному элементу группы аватаров с `size="xs"` */
  extraSmall?: string
  /** Стиль, применяемый к основному элементу группы аватаров с `size="sm"` */
  small?: string
  /** Стиль, применяемый к основному элементу группы аватаров с `size="md"` */
  medium?: string
}
